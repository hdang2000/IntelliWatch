import { getText, xmlTag } from '../http';

export interface RawNewsItem {
  title: string;
  url: string;
  publisher: string;
  publishedAt: string;
}

export async function fetchNews(
  company: string,
  days: number,
  keywords: string | undefined,
  signal?: AbortSignal,
): Promise<RawNewsItem[]> {
  const terms = keywords?.split(',').map((k) => k.trim()).filter(Boolean) ?? [];
  const q = `"${company}"${terms.length ? ` (${terms.join(' OR ')})` : ''} when:${days}d`;
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;
  const xml = await getText(url, signal);
  if (!xml) return [];

  const cutoff = Date.now() - days * 86_400_000;
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, block]) => {
      const publisher = xmlTag(block, 'source');
      const rawTitle = xmlTag(block, 'title');
      return {
        title: rawTitle,
        url: xmlTag(block, 'link'),
        publisher,
        publishedAt: new Date(xmlTag(block, 'pubDate')).toISOString(),
      };
    })
    .filter((i) => i.title && new Date(i.publishedAt).getTime() >= cutoff)
    .slice(0, 10);
}
