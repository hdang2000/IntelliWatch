import type {
  AnalyzeRequest,
  Category,
  CommunityPost,
  CompetitorResult,
  IntelItem,
  LogLevel,
  Narrative,
  StreamEvent,
} from './types';
import { chatJSON } from './groq';
import { fetchNews, type RawNewsItem } from './sources/news';
import { fetchWikipedia } from './sources/wikipedia';
import { fetchGitHub } from './sources/github';
import { fetchAppStore, fetchReviews } from './sources/appstore';
import { fetchHackerNews, fetchReddit } from './sources/community';

const RELEVANCE_THRESHOLD = 6;
const TOP_ITEMS = 3;
const STEPS_PER_COMPETITOR = 8;
const CATEGORIES: Category[] = ['Product Launch', 'Pricing', 'Funding', 'Hiring', 'Partnership', 'Content', 'Other'];

type Emit = (e: StreamEvent) => void;

function timestamp(): string {
  return new Date().toLocaleTimeString('en-GB', { hour12: false });
}

async function scoreItems(
  company: string,
  req: AnalyzeRequest,
  raw: RawNewsItem[],
  signal: AbortSignal,
): Promise<{ score: number; category: Category }[]> {
  if (!raw.length) return [];
  const list = raw.map((r, i) => `${i}. ${r.title} (${r.publisher})`).join('\n');
  const res = await chatJSON<{ items: { i: number; score: number; category: string }[] }>(
    `You are a competitive-intelligence analyst scoring news for strategic relevance about the company "${company}" in the ${req.industry} industry.
Score each headline 1-10: 9-10 = major strategic move by ${company} (launch, pricing change, funding, acquisition); 6-8 = meaningful signal about ${company}; 3-5 = passing mention; 1-2 = unrelated (e.g. a different entity sharing the name).
${req.keywords ? `Give extra weight to these focus topics: ${req.keywords}.` : ''}
Category must be one of: ${CATEGORIES.join(', ')}.
JSON shape: {"items":[{"i":number,"score":number,"category":string}]}`,
    list,
    signal,
  );
  return raw.map((_, i) => {
    const hit = res.items?.find((x) => x.i === i);
    const category = CATEGORIES.includes(hit?.category as Category) ? (hit!.category as Category) : 'Other';
    return { score: Math.max(1, Math.min(10, Math.round(hit?.score ?? 1))), category };
  });
}

async function summarizeItems(company: string, items: IntelItem[], signal: AbortSignal): Promise<string[]> {
  if (!items.length) return [];
  const list = items.map((it, i) => `${i}. ${it.title} (${it.publisher}, ${it.publishedAt.slice(0, 10)})`).join('\n');
  const res = await chatJSON<{ summaries: { i: number; summary: string }[] }>(
    `For each headline about "${company}", write 2-3 sentences: what happened, and what it signals strategically. Base it only on the headline; do not invent figures.
JSON shape: {"summaries":[{"i":number,"summary":string}]}`,
    list,
    signal,
  );
  return items.map((_, i) => res.summaries?.find((s) => s.i === i)?.summary ?? '');
}

async function generateOverview(
  company: string,
  days: number,
  items: IntelItem[],
  signal: AbortSignal,
): Promise<string> {
  const context = items.length
    ? items.map((it) => `- [${it.category}] ${it.title}: ${it.summary}`).join('\n')
    : 'No significant news items passed the relevance threshold.';
  const res = await chatJSON<{ overview: string }>(
    `Write a 3-4 sentence strategic overview of what "${company}" has been doing over the last ${days} days and what it suggests about their strategic direction. Start with "${company} has" or "Over the last ${days} days". If there is little news, say so and describe what that suggests.
JSON shape: {"overview":string}`,
    context,
    signal,
  );
  return res.overview ?? '';
}

async function generateNarrative(
  req: AnalyzeRequest,
  results: CompetitorResult[],
  signal: AbortSignal,
): Promise<Narrative> {
  const context = results
    .map(
      (r) =>
        `## ${r.name}\nOverview: ${r.overview}\nItems:\n${r.items.map((i) => `- [${i.category}, score ${i.score}] ${i.title}`).join('\n') || '- none'}`,
    )
    .join('\n\n');
  const res = await chatJSON<Narrative>(
    `You are a strategy analyst synthesizing competitor intelligence for the ${req.industry} industry over the last ${req.timeRange} days.
Return:
- marketPulse: 2-3 sentences on what is happening across these competitors.
- topThemes: exactly 5 short theme labels (2-3 words, Title Case).
- biggestShift: one sentence naming the single most significant competitive move.
- recommendedActions: exactly 3 concrete actions.
JSON shape: {"marketPulse":string,"topThemes":string[],"biggestShift":string,"recommendedActions":string[]}`,
    context,
    signal,
  );
  return {
    marketPulse: res.marketPulse ?? '',
    topThemes: (res.topThemes ?? []).slice(0, 5),
    biggestShift: res.biggestShift ?? '',
    recommendedActions: (res.recommendedActions ?? []).slice(0, 3),
  };
}

export async function runAnalysis(req: AnalyzeRequest, emit: Emit, signal: AbortSignal): Promise<void> {
  const log = (level: LogLevel, message: string) => emit({ type: 'log', level, message, ts: timestamp() });
  const total = req.competitors.length * STEPS_PER_COMPETITOR + 1;
  let step = 0;
  const advance = () => emit({ type: 'progress', pct: Math.round((++step / total) * 100) });
  const check = () => {
    if (signal.aborted) throw new Error('Analysis cancelled');
  };

  log('info', 'Starting IntelliWatch analysis pipeline…');
  const results: CompetitorResult[] = [];

  for (const company of req.competitors) {
    check();
    log('info', `Fetching intelligence sources for ${company}…`);
    const raw = await fetchNews(company, req.timeRange, req.keywords, signal);
    log('success', `Found ${raw.length} raw items for ${company}`);
    advance();

    check();
    log('info', `Scoring ${raw.length} items for ${company}…`);
    const scores = await scoreItems(company, req, raw, signal);
    const scored: IntelItem[] = raw.map((r, i) => ({
      id: `${company}-${i}`,
      company,
      title: r.title,
      url: r.url,
      source: 'News',
      publisher: r.publisher,
      publishedAt: r.publishedAt,
      summary: '',
      score: scores[i].score,
      category: scores[i].category,
    }));
    const passed = scored.filter((s) => s.score >= RELEVANCE_THRESHOLD).sort((a, b) => b.score - a.score);
    log('success', `${passed.length} items passed relevance threshold for ${company}`);
    advance();

    check();
    const top = passed.slice(0, TOP_ITEMS);
    log('info', `Summarizing top ${top.length} items for ${company}…`);
    const summaries = await summarizeItems(company, top, signal);
    top.forEach((it, i) => (it.summary = summaries[i]));
    advance();

    check();
    log('info', `Generating strategic overview for ${company}…`);
    const overview = await generateOverview(company, req.timeRange, top, signal);
    advance();

    check();
    log('info', `Fetching company snapshot for ${company}…`);
    const [wiki, github] = await Promise.all([fetchWikipedia(company, req.industry), fetchGitHub(company)]);
    if (wiki) log('success', `✓ Wikipedia data found for ${company}`);
    if (github) log('success', `✓ GitHub org found: ${github.login}`);
    advance();

    check();
    log('info', `Fetching app store data for ${company}…`);
    const appStore = await fetchAppStore(company);
    if (appStore) {
      log('success', `✓ iOS app found: ${appStore.rating}★ (${appStore.ratingCount.toLocaleString()} ratings)`);
    }
    advance();

    check();
    log('info', `Scanning community signals for ${company}…`);
    const [hn, reddit] = await Promise.all([
      fetchHackerNews(company, req.timeRange),
      fetchReddit(company, req.timeRange),
    ]);
    const press: CommunityPost[] = scored
      .filter((s) => s.score >= 4 && s.score < RELEVANCE_THRESHOLD)
      .slice(0, 3)
      .map((s) => ({ title: s.title, url: s.url, points: null, comments: null, author: s.publisher, createdAt: s.publishedAt }));
    const signalCount = hn.length + reddit.length + press.length;
    log('success', `✓ ${signalCount} community signals found for ${company}`);
    advance();

    check();
    const reviews = appStore ? await fetchReviews(appStore.id) : [];
    if (reviews.length) log('info', `Analyzing ${reviews.length} reviews for ${company}…`);
    advance();

    const result: CompetitorResult = {
      name: company,
      overview,
      items: top,
      wiki,
      github,
      appStore,
      reviews,
      reviewsAnalyzed: reviews.length,
      sentiment: {
        hackerNews: hn.slice(0, 5),
        hackerNewsTotal: hn.length,
        reddit: reddit.slice(0, 5),
        redditTotal: reddit.length,
        press,
      },
    };
    results.push(result);
    log('success', `✓ ${company} complete — ${top.length} intel items, ${signalCount} signals`);
    emit({ type: 'competitor', data: result });
  }

  check();
  log('info', `Generating market pulse for ${results.length} competitors…`);
  const narrative = await generateNarrative(req, results, signal);
  emit({ type: 'narrative', data: narrative });
  advance();
  log('success', '✓ Analysis complete');
  emit({ type: 'done' });
}
