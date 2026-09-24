import type { CommunityPost } from '../types';
import { getJSON, getText, xmlAttr, xmlTag } from '../http';

interface HNHit {
  objectID: string;
  title: string;
  url?: string;
  points: number;
  num_comments: number;
  author: string;
  created_at: string;
}

export async function fetchHackerNews(company: string, days: number): Promise<CommunityPost[]> {
  const since = Math.floor(Date.now() / 1000) - days * 86400;
  const data = await getJSON<{ hits: HNHit[] }>(
    `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(company)}&tags=story&hitsPerPage=10&numericFilters=created_at_i>${since}`,
  );
  return (data?.hits ?? [])
    .map((h) => ({
      title: h.title,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      points: h.points,
      comments: h.num_comments,
      author: h.author,
      createdAt: h.created_at,
    }))
    .sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
}

function redditWindow(days: number): string {
  return days <= 7 ? 'week' : days <= 30 ? 'month' : 'year';
}

let redditToken: { value: string; expires: number } | null = null;

async function getRedditToken(): Promise<string | null> {
  const id = process.env.REDDIT_CLIENT_ID;
  const secret = process.env.REDDIT_CLIENT_SECRET;
  if (!id || !secret) return null;
  if (redditToken && redditToken.expires > Date.now()) return redditToken.value;

  try {
    const res = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'IntelliWatch/1.0',
      },
      body: 'grant_type=client_credentials',
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    redditToken = { value: data.access_token, expires: Date.now() + (data.expires_in - 60) * 1000 };
    return redditToken.value;
  } catch {
    return null;
  }
}

interface RedditChild {
  data: {
    title: string;
    permalink: string;
    score: number;
    num_comments: number;
    subreddit_name_prefixed: string;
    created_utc: number;
  };
}

// Reddit blocks anonymous JSON search; OAuth credentials give scores, otherwise fall back to RSS (no scores).
export async function fetchReddit(company: string, days: number): Promise<CommunityPost[]> {
  const t = redditWindow(days);
  const token = await getRedditToken();

  if (token) {
    const data = await getJSON<{ data?: { children?: RedditChild[] } }>(
      `https://oauth.reddit.com/search?q=${encodeURIComponent(company)}&t=${t}&limit=12&sort=relevance&raw_json=1`,
      { headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'IntelliWatch/1.0' } },
    );
    const children = data?.data?.children ?? [];
    if (children.length) {
      return children.map(({ data: d }) => ({
        title: d.title,
        url: `https://www.reddit.com${d.permalink}`,
        points: d.score,
        comments: d.num_comments,
        author: d.subreddit_name_prefixed,
        createdAt: new Date(d.created_utc * 1000).toISOString(),
      }));
    }
  }

  const xml = await getText(
    `https://www.reddit.com/search.rss?q=${encodeURIComponent(company)}&t=${t}&limit=12&sort=relevance`,
  );
  if (!xml) return [];
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, block]) => ({
      title: xmlTag(block, 'title'),
      url: xmlAttr(block, 'link', 'href'),
      points: null,
      comments: null,
      author: `r/${xmlAttr(block, 'category', 'term')}`,
      createdAt: new Date(xmlTag(block, 'published') || xmlTag(block, 'updated')).toISOString(),
    }))
    .filter((p) => p.url.includes('/comments/'))
    .slice(0, 12);
}
