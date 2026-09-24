import type { AppStoreSnapshot, Review } from '../types';
import { getJSON } from '../http';

interface ITunesApp {
  trackId: number;
  trackName: string;
  sellerName: string;
  artworkUrl100: string;
  averageUserRating?: number;
  userRatingCount?: number;
  primaryGenreName: string;
  formattedPrice?: string;
  version: string;
  releaseNotes?: string;
  trackViewUrl: string;
}

type Label = { label: string };
interface ReviewEntry {
  title: Label;
  content: Label;
  author: { name: Label };
  'im:rating'?: Label;
  'im:version'?: Label;
}

export async function fetchAppStore(company: string): Promise<AppStoreSnapshot | null> {
  const data = await getJSON<{ results: ITunesApp[] }>(
    `https://itunes.apple.com/search?term=${encodeURIComponent(company)}&entity=software&limit=10&country=us`,
  );
  const results = data?.results ?? [];
  const lc = company.toLowerCase();
  const app =
    results.find((r) => r.trackName.toLowerCase().startsWith(lc)) ??
    results.find((r) => r.sellerName.toLowerCase().includes(lc)) ??
    results.find((r) => r.trackName.toLowerCase().includes(lc));
  if (!app) return null;

  return {
    id: app.trackId,
    name: app.trackName,
    seller: app.sellerName,
    iconUrl: app.artworkUrl100,
    rating: Math.round((app.averageUserRating ?? 0) * 10) / 10,
    ratingCount: app.userRatingCount ?? 0,
    category: app.primaryGenreName,
    price: app.formattedPrice ?? 'Free',
    version: app.version,
    releaseNotes: app.releaseNotes ?? '',
    url: app.trackViewUrl,
  };
}

export async function fetchReviews(appId: number): Promise<Review[]> {
  const data = await getJSON<{ feed?: { entry?: ReviewEntry[] | ReviewEntry } }>(
    `https://itunes.apple.com/us/rss/customerreviews/page=1/id=${appId}/sortby=mostrecent/json`,
  );
  const raw = data?.feed?.entry;
  const entries = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return entries
    .filter((e) => e['im:rating'])
    .slice(0, 15)
    .map((e) => ({
      title: e.title.label,
      author: e.author.name.label,
      rating: Number(e['im:rating']!.label),
      content: e.content.label,
      version: e['im:version']?.label ?? '',
    }));
}
