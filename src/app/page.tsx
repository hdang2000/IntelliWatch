'use client';

import { useMemo, useRef, useState } from 'react';
import { ArrowLeftRight, Circle, CircleCheck, LoaderCircle, RotateCcw } from 'lucide-react';
import SearchForm, { type SearchValues } from '@/components/SearchForm';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import HomeSections from '@/components/site/HomeSections';
import PipelineTerminal, { type LogLine } from '@/components/PipelineTerminal';
import CompanyCard, { HIGH_SIGNAL } from '@/components/CompanyCard';
import {
  CompareModal,
  DEFAULT_FILTERS,
  FilterBar,
  MarketPulse,
  StrategicNarrative,
  type Filters,
} from '@/components/ReportSections';
import type { CompetitorResult, IntelItem, Narrative, StreamEvent } from '@/lib/types';

type Phase = 'idle' | 'running' | 'done' | 'error';

const INITIAL: SearchValues = { competitors: [], industry: 'SaaS', keywords: '', timeRange: 30 };

export default function Home() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [values, setValues] = useState<SearchValues>(INITIAL);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<CompetitorResult[]>([]);
  const [narrative, setNarrative] = useState<Narrative | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showCompare, setShowCompare] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  function handleEvent(e: StreamEvent) {
    switch (e.type) {
      case 'log':
        setLogs((prev) => [...prev, { level: e.level, message: e.message, ts: e.ts }]);
        break;
      case 'progress':
        setProgress(e.pct);
        break;
      case 'competitor':
        setResults((prev) => [...prev, e.data]);
        setExpanded((prev) => ({
          ...Object.fromEntries(Object.keys(prev).map((k) => [k, false])),
          [e.data.name]: true,
        }));
        break;
      case 'narrative':
        setNarrative(e.data);
        break;
      case 'done':
        setProgress(100);
        setExpanded((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, true])));
        setPhase('done');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'error':
        setLogs((prev) => [
          ...prev,
          { level: 'error', message: e.message, ts: new Date().toLocaleTimeString('en-GB', { hour12: false }) },
        ]);
        setPhase('error');
        break;
    }
  }

  async function start(v: SearchValues) {
    setValues(v);
    setPhase('running');
    setLogs([]);
    setProgress(0);
    setResults([]);
    setNarrative(null);
    setExpanded({});
    setFilters(DEFAULT_FILTERS);
    window.scrollTo({ top: 0 });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        handleEvent({ type: 'error', message: data.error ?? `Request failed (${res.status})` });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) if (line.trim()) handleEvent(JSON.parse(line));
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        handleEvent({ type: 'error', message: err instanceof Error ? err.message : 'Connection lost' });
      }
    }
  }

  function reset() {
    abortRef.current?.abort();
    setPhase('idle');
  }

  const feedFor = useMemo(() => {
    return (r: CompetitorResult): IntelItem[] => {
      if (phase !== 'done') return r.items;
      return r.items
        .filter((i) => filters.category === 'All' || i.category === filters.category)
        .filter((i) => i.score >= filters.minScore)
        .filter((i) => !filters.highSignalOnly || i.score >= HIGH_SIGNAL)
        .sort((a, b) =>
          filters.sort === 'score'
            ? b.score - a.score
            : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        );
    };
  }, [phase, filters]);

  if (phase === 'idle') {
    return (
      <>
        <Navbar />
        <SearchForm initial={values} onSubmit={start} />
        <HomeSections />
        <Footer />
      </>
    );
  }

  const done = phase === 'done';
  const visible = done && filters.company !== 'All' ? results.filter((r) => r.name === filters.company) : results;
  const finished = new Set(results.map((r) => r.name));
  const active = values.competitors.find((c) => !finished.has(c));

  return (
    <div className="min-h-screen pb-24">
      {phase === 'running' && (
        <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {done ? (
        <header className="animate-fade-in border-b border-slate-800/80">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-lg font-bold text-white">
                Intelli<span className="text-blue-500">Watch</span>
              </span>
              {results.map((r) => (
                <span
                  key={r.name}
                  className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-2.5 py-0.5 text-xs text-slate-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  {r.name}
                </span>
              ))}
              <span className="text-xs text-slate-600">· {values.industry}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCompare(true)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" /> Compare
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> New Analysis
              </button>
            </div>
          </div>
        </header>
      ) : null}

      <main className={`mx-auto space-y-6 px-6 ${done ? 'max-w-6xl pt-6' : 'max-w-4xl pt-12'}`}>
        {!done && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${phase === 'error' ? 'bg-rose-500' : 'animate-pulse bg-blue-500'}`}
                  />
                  {phase === 'error' ? 'Analysis Stopped' : 'Analyzing Competitors'}
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  {phase === 'error'
                    ? 'Something went wrong — see the pipeline log below.'
                    : `Scraping, scoring, and synthesizing intelligence... ${progress}% complete`}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> {phase === 'error' ? 'Back' : 'Cancel'}
              </button>
            </div>

            <PipelineTerminal lines={logs} running={phase === 'running'} />

            <div className="flex flex-wrap gap-3">
              {values.competitors.map((c) => {
                const isDone = finished.has(c);
                const isActive = phase === 'running' && c === active;
                return (
                  <div
                    key={c}
                    className={`flex w-48 items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      isDone
                        ? 'border-emerald-700/50 bg-emerald-900/20 text-emerald-400'
                        : 'border-slate-700 bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    {isDone ? (
                      <CircleCheck className="h-3.5 w-3.5" />
                    ) : isActive ? (
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin text-blue-400" />
                    ) : (
                      <Circle className="h-2.5 w-2.5 text-slate-600" />
                    )}
                    {c}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {done && (
          <>
            <MarketPulse narrative={narrative} results={results} />
            <FilterBar filters={filters} companies={results.map((r) => r.name)} onChange={setFilters} />
          </>
        )}

        {visible.map((r) => (
          <CompanyCard
            key={r.name}
            result={r}
            feed={feedFor(r)}
            expanded={!!expanded[r.name]}
            live={!done}
            onToggle={() => setExpanded((prev) => ({ ...prev, [r.name]: !prev[r.name] }))}
          />
        ))}

        {done && narrative && <StrategicNarrative narrative={narrative} results={results} />}
      </main>

      {showCompare && <CompareModal results={results} onClose={() => setShowCompare(false)} />}
    </div>
  );
}
