'use client';

import { useState, type KeyboardEvent } from 'react';
import { ChevronDown, Clock, Search, Tag, X, Zap } from 'lucide-react';
import type { TimeRange } from '@/lib/types';

export const INDUSTRIES = [
  'SaaS',
  'Fintech',
  'E-commerce',
  'AI / ML',
  'Developer Tools',
  'Healthcare',
  'EdTech',
  'Marketing',
  'Media',
  'Other',
];

const SUGGESTIONS = ['Notion', 'Linear', 'Coda'];
const MAX_COMPETITORS = 5;

export interface SearchValues {
  competitors: string[];
  industry: string;
  keywords: string;
  timeRange: TimeRange;
}

interface Props {
  initial: SearchValues;
  onSubmit: (values: SearchValues) => void;
}

export default function SearchForm({ initial, onSubmit }: Props) {
  const [competitors, setCompetitors] = useState(initial.competitors);
  const [draft, setDraft] = useState('');
  const [industry, setIndustry] = useState(initial.industry);
  const [keywords, setKeywords] = useState(initial.keywords);
  const [timeRange, setTimeRange] = useState<TimeRange>(initial.timeRange);
  const [error, setError] = useState<string | null>(null);

  function add(name: string) {
    const n = name.trim();
    if (!n) return;
    setCompetitors((prev) =>
      prev.some((p) => p.toLowerCase() === n.toLowerCase()) || prev.length >= MAX_COMPETITORS ? prev : [...prev, n],
    );
    setDraft('');
    setError(null);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(draft);
    } else if (e.key === 'Backspace' && !draft && competitors.length) {
      setCompetitors((prev) => prev.slice(0, -1));
    }
  }

  function submit() {
    const list = draft.trim() ? [...competitors, draft.trim()].slice(0, MAX_COMPETITORS) : competitors;
    if (!list.length) {
      setError('Add at least one competitor to analyze.');
      return;
    }
    onSubmit({ competitors: list, industry, keywords, timeRange });
  }

  return (
    <section
      id="analyze"
      className="relative flex min-h-[calc(100vh-4rem)] scroll-mt-16 flex-col items-center justify-center overflow-hidden px-6 py-16"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.07] blur-[120px]" />

      <div className="relative w-full max-w-[620px] animate-fade-in">
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            AI-Powered Intelligence
          </span>
        </div>

        <h1 className="text-center text-5xl font-bold tracking-tight text-white">
          Intelli<span className="text-blue-500">Watch</span>
        </h1>
        <p className="mt-4 text-center text-lg text-slate-200">
          Know what your competitors are doing. <span className="text-slate-400">Before you need to.</span>
        </p>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-slate-500">
          AI-powered intelligence from blogs, LinkedIn, Product Hunt, and more. Delivered in minutes. Completely free.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 shadow-[0_0_60px_-15px_rgba(59,130,246,0.35)] backdrop-blur">
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Search className="h-3.5 w-3.5" /> Competitors
          </label>
          <div className="flex min-h-[46px] flex-wrap items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/40">
            {competitors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/15 px-2.5 py-1 text-sm text-blue-200"
              >
                {c}
                <button
                  type="button"
                  onClick={() => setCompetitors((prev) => prev.filter((p) => p !== c))}
                  className="text-blue-300/60 transition-colors hover:text-white"
                  aria-label={`Remove ${c}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={competitors.length ? 'Add another...' : 'Enter a competitor name and press Enter...'}
              disabled={competitors.length >= MAX_COMPETITORS}
              className="min-w-[140px] flex-1 bg-transparent py-0.5 text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>

          {competitors.length === 0 && (
            <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500">
              Try:
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => add(s)}
                  className="rounded-md border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <ChevronDown className="h-3.5 w-3.5" /> Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="iw-select h-[38px] w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:border-blue-500"
              >
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i} className="bg-slate-900">
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Tag className="h-3.5 w-3.5" /> Keywords{' '}
                <span className="font-normal normal-case tracking-normal text-slate-600">(optional)</span>
              </label>
              <input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="pricing, launch, funding..."
                className="h-[38px] w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Clock className="h-3.5 w-3.5" /> Time Range
              </label>
              <div className="grid h-[38px] grid-cols-3 overflow-hidden rounded-lg border border-slate-700 bg-slate-950/60 text-sm">
                {([7, 30, 90] as TimeRange[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeRange(t)}
                    className={`transition-colors ${
                      timeRange === t ? 'bg-blue-600 font-medium text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t} days
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={submit}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500"
          >
            <Zap className="h-4 w-4" /> Analyze Competitors
          </button>

          {error && <p className="mt-3 text-center text-sm text-rose-400">{error}</p>}

          <p className="mt-3 text-center text-xs text-slate-600">
            Analysis takes 2–3 minutes · 100% free · No account required
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {['Blog RSS', 'Google News', 'Product Hunt', 'LinkedIn', 'App Store'].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
