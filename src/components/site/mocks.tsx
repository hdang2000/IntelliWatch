import {
  ArrowUp,
  Building2,
  Circle,
  CircleCheck,
  Flame,
  GitFork,
  Lightbulb,
  MessageSquare,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react';

function Frame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4 shadow-[0_0_60px_-20px_rgba(59,130,246,0.35)] ${className}`}
      aria-hidden
    >
      {children}
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-3 w-3 ${i < n ? 'fill-amber-400 text-amber-400' : 'fill-slate-600 text-slate-600'}`} />
      ))}
    </span>
  );
}

export function MockTerminal() {
  const lines: [boolean, string][] = [
    [false, 'Fetching intelligence sources for Acme…'],
    [true, 'Found 10 raw items for Acme'],
    [false, 'Scoring 10 items for Acme…'],
    [true, '4 items passed relevance threshold'],
    [true, '✓ GitHub org found: acme'],
    [true, '✓ iOS app found: 4.6★ (12,480 ratings)'],
  ];
  return (
    <Frame className="overflow-hidden p-0">
      <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-900/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-600/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-600/90" />
        <span className="ml-2 font-mono text-xs text-slate-500">intelliwatch — analysis pipeline</span>
      </div>
      <div className="space-y-1.5 bg-[#0b0f17] px-4 py-3 font-mono text-[12px]">
        {lines.map(([ok, text], i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-slate-600">[09:41:0{i}]</span>
            {ok ? <CircleCheck className="h-3 w-3 text-emerald-400" /> : <Circle className="h-3 w-3 text-blue-400" />}
            <span className={ok ? 'text-slate-200' : 'text-blue-300'}>{text}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-slate-600">[09:41:06]</span>
          <span className="inline-block h-3.5 w-1.5 animate-blink bg-blue-500" />
        </div>
      </div>
    </Frame>
  );
}

export function MockFeed() {
  const items = [
    { t: 'Acme launches AI assistant for enterprise teams', s: 9, c: 'Product Launch', cc: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
    { t: 'Acme raises prices on its Business tier by 20%', s: 8, c: 'Pricing', cc: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
    { t: 'Acme hires former Stripe exec as CRO', s: 6, c: 'Hiring', cc: 'bg-green-500/15 text-green-300 border-green-500/30' },
  ];
  return (
    <Frame className="space-y-2.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Intelligence Feed</p>
      {items.map((it) => (
        <div
          key={it.t}
          className={`rounded-xl border border-slate-700/50 bg-slate-800/40 p-3 ${it.s >= 8 ? 'border-l-2 border-l-emerald-500' : ''}`}
        >
          <p className="text-sm font-medium text-slate-100">{it.t}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`rounded-md border px-1.5 py-0.5 font-mono text-xs font-bold ${
                it.s >= 8 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'
              }`}
            >
              {it.s}
            </span>
            <span className={`rounded-md border px-2 py-0.5 text-xs ${it.cc}`}>{it.c}</span>
            {it.s >= 8 && (
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                High Signal
              </span>
            )}
          </div>
        </div>
      ))}
    </Frame>
  );
}

export function MockOverview() {
  return (
    <Frame>
      <div className="rounded-xl border-l-2 border-violet-500 bg-violet-950/20 p-4">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
          <Sparkles className="h-3.5 w-3.5" /> AI Overview
        </p>
        <p className="text-sm leading-relaxed text-slate-200">
          Over the last 30 days, Acme has doubled down on AI, shipping an enterprise assistant and raising Business-tier
          prices. The moves suggest a push upmarket, funded by higher revenue per seat.
        </p>
      </div>
    </Frame>
  );
}

export function MockSnapshot() {
  return (
    <Frame className="space-y-3">
      <div className="rounded-xl border border-blue-800/50 bg-blue-950/20 p-4">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200">
          <Building2 className="h-3.5 w-3.5 text-blue-400" /> Company Snapshot
          <span className="font-normal normal-case tracking-normal text-slate-500">— who they are</span>
        </p>
        <p className="text-sm font-medium text-blue-400">American software company</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          Acme, Inc. builds collaboration software for teams. Founded in 2015 and headquartered in San Francisco.
        </p>
        <div className="mt-3 rounded-lg border border-slate-800 bg-[#0d1117] p-3">
          <p className="mb-2 flex items-center gap-2 text-xs text-slate-300">
            <GitFork className="h-3 w-3 text-slate-500" /> github.com/acme
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              ['Stars', '12.4k'],
              ['Repos', '86'],
              ['Followers', '2.1k'],
              ['Active', '14'],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] text-slate-500">{k}</p>
                <p className="text-sm font-semibold text-white">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function MockCustomers() {
  const reviews = [
    { t: 'Search is broken', n: 1, c: 'Search never finds my docs. Please fix.', tone: 'border-rose-900/40 bg-rose-950/30' },
    { t: 'Best tool we use', n: 5, c: 'Keeps our whole team in sync.', tone: 'border-emerald-900/40 bg-emerald-950/20' },
  ];
  return (
    <Frame className="space-y-3">
      <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/15 p-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200">
            <Smartphone className="h-3.5 w-3.5 text-emerald-400" /> Customer Snapshot
          </p>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> <b className="text-slate-200">4.6</b> · 12,480 ratings
          </span>
        </div>
      </div>
      <div className="rounded-xl border border-amber-800/40 bg-amber-950/10 p-4">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200">
          <MessageSquare className="h-3.5 w-3.5 text-amber-400" /> Customer Reviews
        </p>
        <div className="grid grid-cols-2 gap-2">
          {reviews.map((r) => (
            <div key={r.t} className={`rounded-lg border p-2.5 ${r.tone}`}>
              <p className="text-xs font-semibold text-slate-100">{r.t}</p>
              <Stars n={r.n} />
              <p className="mt-1 text-[11px] text-slate-400">{r.c}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function MockSentiment() {
  const posts = [
    { p: '412', t: 'Show HN: Acme open-sources its sync engine', m: '128 comments · 3d ago', c: 'text-orange-400' },
    { p: '96', t: 'Anyone else switching away from Acme after the price hike?', m: 'r/SaaS · 5d ago', c: 'text-rose-400' },
  ];
  return (
    <Frame>
      <div className="rounded-xl border border-rose-900/50 bg-rose-950/15 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200">
            <TrendingUp className="h-3.5 w-3.5 text-rose-400" /> Market Sentiment
          </p>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Flame className="h-3 w-3 text-rose-400" /> 18 signals
          </span>
        </div>
        <div className="space-y-2">
          {posts.map((p) => (
            <div key={p.t} className="flex gap-3 rounded-lg border border-rose-900/30 bg-rose-950/20 p-2.5">
              <div className={`flex w-8 flex-col items-center text-xs font-bold ${p.c}`}>
                <ArrowUp className="h-3 w-3" />
                {p.p}
              </div>
              <div>
                <p className="text-xs text-slate-200">{p.t}</p>
                <p className="text-[11px] text-slate-500">{p.m}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function MockNarrative() {
  return (
    <Frame className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-amber-800/40 bg-amber-950/30 p-3">
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
          <TriangleAlert className="h-3 w-3 text-amber-400" /> Biggest Shift
        </p>
        <p className="text-xs leading-relaxed text-amber-300">Acme&apos;s AI assistant launch resets buyer expectations across the category.</p>
      </div>
      <div>
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
          <Lightbulb className="h-3 w-3 text-emerald-400" /> Recommended Actions
        </p>
        <ol className="space-y-1 text-xs text-slate-300">
          <li><b className="text-emerald-400">1.</b> Ship AI search before Q3</li>
          <li><b className="text-emerald-400">2.</b> Target Acme users hit by the price rise</li>
          <li><b className="text-emerald-400">3.</b> Fix mobile search pain points</li>
        </ol>
      </div>
    </Frame>
  );
}

export function MockCompare() {
  const rows = [
    ['App rating', '4.6★', '4.8★', '4.2★', 1],
    ['GitHub stars', '12.4k', '3.1k', '28.9k', 2],
    ['High signal items', '3', '1', '2', 0],
    ['HN stories', '10', '6', '10', 0],
  ] as const;
  return (
    <Frame className="overflow-hidden p-0">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-800 text-left">
            <th className="px-4 py-2.5 font-medium text-slate-500">Metric</th>
            {['Acme', 'Globex', 'Initech'].map((n) => (
              <th key={n} className="px-4 py-2.5 font-semibold text-white">{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, a, b, c, best]) => (
            <tr key={label} className="border-b border-slate-800/60 last:border-0">
              <td className="px-4 py-2.5 text-slate-400">{label}</td>
              {[a, b, c].map((v, i) => (
                <td key={i} className={`px-4 py-2.5 ${i === best ? 'font-semibold text-emerald-400' : 'text-slate-200'}`}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}
