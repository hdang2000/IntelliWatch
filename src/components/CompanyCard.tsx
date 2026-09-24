'use client';

import {
  ArrowUp,
  Building2,
  ChevronDown,
  ChevronUp,
  Code,
  ExternalLink,
  Flame,
  GitFork,
  Info,
  MessageCircle,
  MessageSquare,
  Newspaper,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import type { CommunityPost, CompetitorResult, IntelItem, Review } from '@/lib/types';
import { compact, formatDate, timeAgo } from '@/lib/utils';
import ScorePill from './ScorePill';
import { CategoryBadge, HighSignalBadge, Section, Stars } from './ui';

export const HIGH_SIGNAL = 8;

interface Props {
  result: CompetitorResult;
  feed: IntelItem[];
  expanded: boolean;
  live: boolean;
  onToggle: () => void;
}

export default function CompanyCard({ result, feed, expanded, live, onToggle }: Props) {
  const highSignal = result.items.filter((i) => i.score >= HIGH_SIGNAL).length;

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-5 py-4 text-left ${expanded ? 'border-b border-slate-700/50' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              {result.name.charAt(0).toUpperCase()}
            </div>
            {live && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-800" />}
          </div>
          <div>
            <p className="font-semibold text-white">{result.name}</p>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
              {result.items.length} items
              {highSignal > 0 && <HighSignalBadge label={`${highSignal} high signal`} />}
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
      </button>

      {expanded && (
        <div className="space-y-4 p-5">
          {result.overview && (
            <div className="rounded-xl border-l-2 border-violet-500 bg-violet-950/20 p-4">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
                <Sparkles className="h-3.5 w-3.5" /> AI Overview
              </p>
              <p className="text-[15px] leading-relaxed text-slate-200">{result.overview}</p>
            </div>
          )}

          {(result.wiki || result.github) && <CompanySnapshot result={result} />}
          {result.appStore && <CustomerSnapshot result={result} />}
          {result.reviews.length > 0 && <CustomerReviews reviews={result.reviews} analyzed={result.reviewsAnalyzed} />}
          <MarketSentiment result={result} />

          {feed.length > 0 ? (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Intelligence Feed</p>
              <div className="space-y-3">
                {feed.map((item) => (
                  <FeedItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-slate-500">No items match your current filters.</p>
          )}
        </div>
      )}
    </div>
  );
}

function CompanySnapshot({ result }: { result: CompetitorResult }) {
  const { wiki, github } = result;
  return (
    <Section icon={Building2} title="Company Snapshot" subtitle="who they are" tone="blue">
      {wiki && (
        <div className="mb-4">
          <a href={wiki.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-400 hover:text-blue-300">
            {wiki.description || wiki.title}
          </a>
          <p className="mt-1.5 line-clamp-4 text-[13px] leading-relaxed text-slate-400">{wiki.extract}</p>
          <a
            href={wiki.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300"
          >
            <ExternalLink className="h-3 w-3" /> Wikipedia
          </a>
        </div>
      )}
      {github && (
        <div className="rounded-lg border border-slate-800 bg-[#0d1117] p-4">
          <div className="mb-3 flex items-center justify-between">
            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-200 hover:text-white"
            >
              <GitFork className="h-3.5 w-3.5 text-slate-500" /> github.com/{github.login}
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={github.avatarUrl} alt="" className="h-5 w-5 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Total Stars', compact(github.totalStars)],
              ['Public Repos', compact(github.publicRepos)],
              ['Followers', compact(github.followers)],
              ['Active Repos (30d)', String(github.activeRepos30d)],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-0.5 font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          {github.primaryLanguage && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
              <Code className="h-3 w-3" /> Primary language: <span className="text-slate-200">{github.primaryLanguage}</span>
            </p>
          )}
          {github.repos.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {github.repos.map((r) => (
                <li key={r.name} className="flex items-center justify-between text-[13px]">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-mono text-blue-400 hover:text-blue-300">
                    {r.name}
                  </a>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Star className="h-3 w-3 text-amber-400" /> {r.stars}
                    {r.language && <span className="ml-1">{r.language}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Section>
  );
}

function CustomerSnapshot({ result }: { result: CompetitorResult }) {
  const app = result.appStore!;
  return (
    <Section
      icon={Smartphone}
      title="Customer Snapshot"
      subtitle="app store presence"
      tone="green"
      right={
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-slate-200">{app.rating}</span>
          <span className="text-slate-500">· {app.ratingCount.toLocaleString()} total ratings</span>
        </span>
      }
    >
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4">
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={app.iconUrl} alt="" className="h-10 w-10 rounded-xl" />
          <div>
            <p className="font-semibold text-white">{app.name}</p>
            <p className="text-xs text-slate-500">{app.seller}</p>
            <span className="mt-1 inline-block rounded bg-sky-500/15 px-1.5 py-0.5 text-xs text-sky-400">App Store</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-3xl font-bold text-white">{app.rating}</span>
          <div>
            <Stars rating={app.rating} size="md" />
            <p className="text-xs text-slate-500">{app.ratingCount.toLocaleString()} ratings</p>
          </div>
        </div>
        <dl className="mt-3 space-y-1 text-[13px]">
          {[
            ['Category', app.category],
            ['Price', app.price],
            ['Version', app.version],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="text-slate-500">{k}: </span>
              <span className="text-slate-200">{v}</span>
            </div>
          ))}
        </dl>
        {app.releaseNotes && (
          <div className="mt-3 rounded-lg bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Latest update</p>
            <p className="mt-1 line-clamp-2 text-[13px] text-slate-300">{app.releaseNotes}</p>
          </div>
        )}
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300"
        >
          <ExternalLink className="h-3 w-3" /> View in store
        </a>
      </div>
    </Section>
  );
}

function reviewTone(rating: number): string {
  if (rating <= 2) return 'border-rose-900/40 bg-rose-950/30';
  if (rating >= 4) return 'border-emerald-900/40 bg-emerald-950/20';
  return 'border-slate-700/50 bg-slate-800/50';
}

function CustomerReviews({ reviews, analyzed }: { reviews: Review[]; analyzed: number }) {
  return (
    <Section icon={MessageSquare} title="Customer Reviews" subtitle={`${analyzed} reviews analyzed`} tone="amber">
      <div className="grid gap-2 sm:grid-cols-2">
        {reviews.slice(0, 6).map((r, i) => (
          <div key={i} className={`rounded-lg border p-3 ${reviewTone(r.rating)}`}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-slate-100">{r.title}</p>
              <span className="shrink-0 rounded bg-sky-500/15 px-1.5 py-0.5 text-xs text-sky-400">iOS</span>
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <Stars rating={r.rating} />
              <span className="text-xs text-slate-500">{r.author}</span>
            </div>
            <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slate-400">{r.content}</p>
            {r.version && <p className="mt-1.5 text-xs text-slate-600">v{r.version}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

function PostRow({ post, tone }: { post: CommunityPost; tone: 'orange' | 'rose' | 'slate' }) {
  const color = tone === 'orange' ? 'text-orange-400' : tone === 'rose' ? 'text-rose-400' : 'text-slate-500';
  const box =
    tone === 'slate' ? 'border-slate-700/50 bg-slate-800/40' : 'border-rose-900/30 bg-rose-950/20 hover:border-rose-800/50';
  const meta = [post.author, post.comments !== null ? `${post.comments} comments` : null, timeAgo(post.createdAt)].filter(Boolean);
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-start gap-3 rounded-lg border p-3 transition-colors ${box}`}
    >
      <div className={`flex w-9 shrink-0 flex-col items-center text-xs font-bold ${color}`}>
        {tone === 'slate' ? (
          <Newspaper className="mt-0.5 h-3.5 w-3.5" />
        ) : post.points !== null ? (
          <>
            <ArrowUp className="h-3 w-3" />
            {compact(post.points)}
          </>
        ) : (
          <MessageCircle className="mt-0.5 h-3.5 w-3.5" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-200">{post.title}</p>
        <p className="mt-1 text-xs text-slate-500">{meta.join('  ·  ')}</p>
      </div>
      <ExternalLink className="mt-1 h-3 w-3 shrink-0 text-slate-600 group-hover:text-slate-400" />
    </a>
  );
}

function MarketSentiment({ result }: { result: CompetitorResult }) {
  const s = result.sentiment;
  const total = s.hackerNewsTotal + s.redditTotal + s.press.length;
  if (!total) return null;
  const topHN = Math.max(0, ...s.hackerNews.map((p) => p.points ?? 0));
  return (
    <Section
      icon={TrendingUp}
      title="Market Sentiment"
      subtitle="community & press signals"
      tone="rose"
      right={
        <span className="flex items-center gap-1">
          <Flame className="h-3.5 w-3.5 text-rose-400" />
          <span className="text-slate-200">{total} signals</span>
          {s.hackerNews.length > 0 && <span className="text-slate-500">· top HN: {topHN}pts</span>}
        </span>
      }
    >
      <div className="space-y-4">
        {s.hackerNews.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
              Hacker News <span className="font-normal text-slate-600">({s.hackerNewsTotal})</span>
            </p>
            <div className="space-y-2">
              {s.hackerNews.map((p) => (
                <PostRow key={p.url} post={p} tone="orange" />
              ))}
            </div>
          </div>
        )}
        {s.reddit.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <MessageCircle className="h-3.5 w-3.5" /> Reddit <span className="font-normal text-slate-600">({s.redditTotal})</span>
            </p>
            <div className="space-y-2">
              {s.reddit.map((p) => (
                <PostRow key={p.url} post={p} tone="rose" />
              ))}
            </div>
          </div>
        )}
        {s.press.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Newspaper className="h-3.5 w-3.5" /> Press Coverage <span className="font-normal text-slate-600">({s.press.length})</span>
            </p>
            <div className="space-y-2">
              {s.press.map((p) => (
                <PostRow key={p.url} post={p} tone="slate" />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

function FeedItem({ item }: { item: IntelItem }) {
  const high = item.score >= HIGH_SIGNAL;
  return (
    <div
      className={`rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 ${high ? 'border-l-2 border-l-emerald-500' : ''}`}
    >
      <div className="flex gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-700/60 text-xs font-semibold text-slate-300">
          N
        </span>
        <div className="min-w-0 flex-1">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-medium text-slate-100 hover:text-blue-400"
          >
            {item.title}
            <ExternalLink className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
          {item.summary && <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-400">{item.summary}</p>}
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ScorePill score={item.score} size="sm" />
              <CategoryBadge category={item.category} />
              {high && <HighSignalBadge />}
            </div>
            <span className="flex items-center gap-1 text-xs text-slate-500" title={item.publisher}>
              {formatDate(item.publishedAt)} <Info className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
