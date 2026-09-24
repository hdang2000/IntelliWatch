export type TimeRange = 7 | 30 | 90;

export interface AnalyzeRequest {
  competitors: string[];
  industry: string;
  keywords?: string;
  timeRange: TimeRange;
}

export type Category =
  | 'Product Launch'
  | 'Pricing'
  | 'Funding'
  | 'Hiring'
  | 'Partnership'
  | 'Content'
  | 'Other';

export interface IntelItem {
  id: string;
  company: string;
  title: string;
  url: string;
  source: 'News';
  publisher: string;
  publishedAt: string;
  summary: string;
  score: number;
  category: Category;
}

export interface WikiSnapshot {
  title: string;
  description: string;
  extract: string;
  url: string;
}

export interface GitHubRepo {
  name: string;
  url: string;
  stars: number;
  language: string | null;
}

export interface GitHubSnapshot {
  login: string;
  url: string;
  avatarUrl: string;
  totalStars: number;
  publicRepos: number;
  followers: number;
  activeRepos30d: number;
  primaryLanguage: string | null;
  repos: GitHubRepo[];
}

export interface AppStoreSnapshot {
  id: number;
  name: string;
  seller: string;
  iconUrl: string;
  rating: number;
  ratingCount: number;
  category: string;
  price: string;
  version: string;
  releaseNotes: string;
  url: string;
}

export interface Review {
  title: string;
  author: string;
  rating: number;
  content: string;
  version: string;
}

export interface CommunityPost {
  title: string;
  url: string;
  points: number | null;
  comments: number | null;
  author: string;
  createdAt: string;
}

export interface Sentiment {
  hackerNews: CommunityPost[];
  hackerNewsTotal: number;
  reddit: CommunityPost[];
  redditTotal: number;
  press: CommunityPost[];
}

export interface CompetitorResult {
  name: string;
  overview: string;
  items: IntelItem[];
  wiki: WikiSnapshot | null;
  github: GitHubSnapshot | null;
  appStore: AppStoreSnapshot | null;
  reviews: Review[];
  reviewsAnalyzed: number;
  sentiment: Sentiment;
}

export interface Narrative {
  marketPulse: string;
  topThemes: string[];
  biggestShift: string;
  recommendedActions: string[];
}

export type LogLevel = 'info' | 'success' | 'error';

export type StreamEvent =
  | { type: 'log'; level: LogLevel; message: string; ts: string }
  | { type: 'progress'; pct: number }
  | { type: 'competitor'; data: CompetitorResult }
  | { type: 'narrative'; data: Narrative }
  | { type: 'done' }
  | { type: 'error'; message: string };
