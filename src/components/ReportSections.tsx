'use client';

import { useEffect } from 'react';
import {
  Activity,
  ChartBar,
  ChartNoAxesColumn,
  Funnel,
  Lightbulb,
  ListFilter,
  Sparkles,
  Target,
  TrendingUp,
  TriangleAlert,
  X,
  Zap,
} from 'lucide-react';
import type { Category, CompetitorResult, Narrative } from '@/lib/types';
import { HIGH_SIGNAL } from './CompanyCard';

export function MarketPulse({ narrative, results }: { narrative: Narrative | null; results: CompetitorResult[] }) {
  const items = results.flatMap((r) => r.items);
  const high = items.filter((i) => i.score >= HIGH_SIGNAL).length;
  return (
    <div className="animate-fade-in rounded-2xl border border-slate-700/60 border-l-4 border-l-violet-500 bg-slate-800/40 p-5">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
        <Activity className="h-3.5 w-3.5" /> Market Pulse
      </p>
      <p className="leading-relaxed text-slate-200">
        {narrative?.marketPulse || 'Synthesizing market pulse…'}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/40 px-2.5 py-1 text-slate-400">
          <Target className="h-3 w-3" /> <b className="text-white">{items.length}</b> items found
        </span>
        <span className="flex items-center gap-1.5 rounded-lg border border-emerald-700/50 bg-emerald-900/20 px-2.5 py-1 text-emerald-400">
          <TrendingUp className="h-3 w-3" /> <b>{high}</b> high signal
        </span>
        <span className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/40 px-2.5 py-1 text-slate-400">
          <Activity className="h-3 w-3" /> <b className="text-white">{results.length}</b> companies
        </span>
        <span className="mx-1 h-4 w-px bg-slate-700" />
      </div>
      {narrative && narrative.topThemes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {narrative.topThemes.map((t) => (
            <span key={t} className="rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs text-violet-300">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export interface Filters {
  company: string;
  category: 'All' | Category;
  minScore: number;
  sort: 'score' | 'date';
  highSignalOnly: boolean;
}

export const DEFAULT_FILTERS: Filters = { company: 'All', category: 'All', minScore: 1, sort: 'score', highSignalOnly: false };

const CATEGORIES: Category[] = ['Product Launch', 'Pricing', 'Funding', 'Hiring', 'Partnership', 'Content', 'Other'];
const selectCls =
  'iw-select h-8 rounded-lg border border-slate-700 bg-slate-900/80 pl-3 text-sm text-slate-200 outline-none focus:border-blue-500';

export function FilterBar({
  filters,
  companies,
  onChange,
}: {
  filters: Filters;
  companies: string[];
  onChange: (f: Filters) => void;
}) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => onChange({ ...filters, [k]: v });
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/40 p-3">
      <span className="flex items-center gap-1.5 px-1 text-sm text-slate-400">
        <Funnel className="h-3.5 w-3.5" /> Filter
      </span>
      <select className={selectCls} value={filters.company} onChange={(e) => set('company', e.target.value)}>
        <option value="All">Company: All</option>
        {companies.map((c) => (
          <option key={c} value={c}>
            Company: {c}
          </option>
        ))}
      </select>
      <select className={selectCls} defaultValue="All">
        <option value="All">Source: All</option>
        <option value="News">Source: News</option>
      </select>
      <select
        className={selectCls}
        value={filters.category}
        onChange={(e) => set('category', e.target.value as Filters['category'])}
      >
        <option value="All">Category: All</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            Category: {c}
          </option>
        ))}
      </select>
      <label className="flex h-8 items-center gap-1 rounded-lg border border-slate-700 bg-slate-900/80 pl-3 text-sm text-slate-500">
        <ListFilter className="h-3.5 w-3.5" /> Score ≥
        <select
          className="iw-select h-full bg-transparent pl-1 text-slate-200 outline-none"
          value={filters.minScore}
          onChange={(e) => set('minScore', Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n} className="bg-slate-900">
              {n}
            </option>
          ))}
        </select>
      </label>
      <label className="flex h-8 items-center gap-1 rounded-lg border border-slate-700 bg-slate-900/80 pl-3 text-sm text-slate-500">
        Sort
        <select
          className="iw-select h-full bg-transparent pl-2 text-slate-200 outline-none"
          value={filters.sort}
          onChange={(e) => set('sort', e.target.value as Filters['sort'])}
        >
          <option value="score" className="bg-slate-900">Score</option>
          <option value="date" className="bg-slate-900">Date</option>
        </select>
      </label>
      <button
        type="button"
        onClick={() => set('highSignalOnly', !filters.highSignalOnly)}
        className={`ml-auto flex h-8 items-center gap-1.5 rounded-lg border px-3 text-sm transition-colors ${
          filters.highSignalOnly
            ? 'border-emerald-600/60 bg-emerald-900/30 text-emerald-300'
            : 'border-slate-700 bg-slate-900/80 text-slate-400 hover:text-slate-200'
        }`}
      >
        <Zap className="h-3.5 w-3.5" /> High Signal Only
      </button>
    </div>
  );
}

export function StrategicNarrative({ narrative, results }: { narrative: Narrative; results: CompetitorResult[] }) {
  const ranking = [...results].sort((a, b) => b.items.length - a.items.length);
  const max = Math.max(1, ...ranking.map((r) => r.items.length));
  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/40">
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
        <Sparkles className="h-4 w-4 text-violet-400" />
        <h2 className="text-lg font-semibold text-white">Strategic Narrative</h2>
        <span className="text-sm text-slate-500">The &quot;So What&quot; — AI synthesis</span>
      </div>
      <div className="grid divide-y divide-slate-800 md:grid-cols-4 md:divide-x md:divide-y-0">
        <div className="p-5">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <ChartNoAxesColumn className="h-3.5 w-3.5 text-violet-400" /> Top Themes
          </p>
          <div className="flex flex-col items-start gap-2">
            {narrative.topThemes.map((t) => (
              <span key={t} className="rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs text-violet-300">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="p-5">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <ChartBar className="h-3.5 w-3.5 text-blue-400" /> Activity Ranking
          </p>
          <ol className="space-y-2">
            {ranking.map((r, i) => (
              <li key={r.name} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-slate-600">{i + 1}.</span>
                <span className="flex-1 truncate text-slate-200">{r.name}</span>
                <span className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-700">
                  <span className="block h-full rounded-full bg-blue-500" style={{ width: `${(r.items.length / max) * 100}%` }} />
                </span>
                <span className="w-4 text-right text-slate-400">{r.items.length}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="p-5">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <TriangleAlert className="h-3.5 w-3.5 text-amber-400" /> Biggest Shift
          </p>
          <p className="rounded-lg border border-amber-800/40 bg-amber-950/30 p-3 text-sm leading-relaxed text-amber-300">
            {narrative.biggestShift}
          </p>
        </div>
        <div className="p-5">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Lightbulb className="h-3.5 w-3.5 text-emerald-400" /> Recommended Actions
          </p>
          <ol className="space-y-3">
            {narrative.recommendedActions.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                <span className="font-bold text-emerald-400">{i + 1}.</span>
                {a}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function CompareModal({ results, onClose }: { results: CompetitorResult[]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const rows: { label: string; value: (r: CompetitorResult) => number | null; format?: (n: number) => string }[] = [
    { label: 'Intel items', value: (r) => r.items.length },
    { label: 'High signal items', value: (r) => r.items.filter((i) => i.score >= HIGH_SIGNAL).length },
    { label: 'App Store rating', value: (r) => r.appStore?.rating ?? null, format: (n) => `${n}★` },
    { label: 'App Store ratings', value: (r) => r.appStore?.ratingCount ?? null, format: (n) => n.toLocaleString() },
    { label: 'GitHub stars', value: (r) => r.github?.totalStars ?? null, format: (n) => n.toLocaleString() },
    { label: 'GitHub followers', value: (r) => r.github?.followers ?? null, format: (n) => n.toLocaleString() },
    { label: 'Active repos (30d)', value: (r) => r.github?.activeRepos30d ?? null },
    { label: 'Hacker News stories', value: (r) => r.sentiment.hackerNewsTotal },
    { label: 'Top HN points', value: (r) => Math.max(0, ...r.sentiment.hackerNews.map((p) => p.points ?? 0)) },
    { label: 'Reddit posts', value: (r) => r.sentiment.redditTotal },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm" onClick={onClose}>
      <div
        className="animate-fade-in w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Side-by-side comparison</h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-5 py-3 font-medium text-slate-500">Metric</th>
                {results.map((r) => (
                  <th key={r.name} className="px-5 py-3 font-semibold text-white">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const values = results.map(row.value);
                const best = Math.max(...values.map((v) => v ?? -Infinity));
                return (
                  <tr key={row.label} className="border-b border-slate-800/60 last:border-0">
                    <td className="px-5 py-3 text-slate-400">{row.label}</td>
                    {values.map((v, i) => (
                      <td
                        key={results[i].name}
                        className={`px-5 py-3 tabular-nums ${v !== null && v === best && best > 0 ? 'font-semibold text-emerald-400' : 'text-slate-200'}`}
                      >
                        {v === null ? <span className="text-slate-600">—</span> : row.format ? row.format(v) : v}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
