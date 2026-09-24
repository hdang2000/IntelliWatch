import type { GitHubSnapshot } from '../types';
import { getJSON } from '../http';

interface Org {
  login: string;
  html_url: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
}

interface Repo {
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

function headers(): HeadersInit {
  const h: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

export async function fetchGitHub(company: string): Promise<GitHubSnapshot | null> {
  const slug = company.toLowerCase().replace(/[^a-z0-9-]/g, '');
  let org = slug ? await getJSON<Org>(`https://api.github.com/orgs/${slug}`, { headers: headers() }) : null;

  if (!org) {
    const search = await getJSON<{ items?: { login: string }[] }>(
      `https://api.github.com/search/users?q=${encodeURIComponent(company)}+type:org&per_page=1`,
      { headers: headers() },
    );
    const login = search?.items?.[0]?.login;
    if (!login) return null;
    org = await getJSON<Org>(`https://api.github.com/orgs/${login}`, { headers: headers() });
    if (!org) return null;
  }

  const repos =
    (await getJSON<Repo[]>(`https://api.github.com/orgs/${org.login}/repos?sort=pushed&per_page=100`, {
      headers: headers(),
    })) ?? [];

  const cutoff = Date.now() - 30 * 86_400_000;
  const langCounts = new Map<string, number>();
  for (const r of repos) if (r.language) langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
  const primaryLanguage = [...langCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    login: org.login,
    url: org.html_url,
    avatarUrl: org.avatar_url,
    totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    publicRepos: org.public_repos,
    followers: org.followers,
    activeRepos30d: repos.filter((r) => new Date(r.pushed_at).getTime() >= cutoff).length,
    primaryLanguage,
    repos: repos
      .filter((r) => !r.fork)
      .slice(0, 3)
      .map((r) => ({ name: r.name, url: r.html_url, stars: r.stargazers_count, language: r.language })),
  };
}
