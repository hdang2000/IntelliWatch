import Link from 'next/link';
import { ArrowRight, CircleCheck, Crosshair, Radar, Scale } from 'lucide-react';
import { DATA_SOURCES, INDUSTRIES_SOLUTIONS, REPORT_FEATURES, TEAMS, TONE_CLASSES } from './content';
import { FAQSection, FinalCTA, PrimaryCTA, SectionHeading } from './blocks';
import { MockNarrative, MockTerminal } from './mocks';

const VALUE_PROPS = [
  {
    icon: Radar,
    title: 'See what they ship',
    body: 'Launches, pricing changes, funding and hiring, gathered from the news and scored for relevance.',
  },
  {
    icon: Crosshair,
    title: 'Learn why customers choose them',
    body: 'App Store ratings, real reviews and community threads show what customers love and hate.',
  },
  {
    icon: Scale,
    title: 'Know where you stand',
    body: 'Benchmark competitors side by side and get AI-recommended actions to take next.',
  },
];

const STATS = [
  ['7', 'Live data sources', 'News, Wikipedia, GitHub, App Store, HN, Reddit and AI'],
  ['1–3 min', 'Per report', 'From adding names to a full strategic narrative'],
  ['5', 'Competitors at once', 'Analyzed together and compared side by side'],
  ['$0', 'To get started', 'No account and no credit card needed'],
];

const STEPS = [
  { n: '01', title: 'Add your competitors', body: 'Type up to 5 names, pick an industry, optional keywords and a 7, 30 or 90-day window.' },
  { n: '02', title: 'Watch the pipeline run', body: 'A live log shows every source being scanned, scored and summarised, in real time.' },
  { n: '03', title: 'Act on the narrative', body: 'Get the biggest shift, top themes and three recommended actions, with every claim linked.' },
];

export default function HomeSections() {
  return (
    <>
      <section className="border-y border-slate-800/80 bg-slate-900/30">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Powered by live public data</span>
          {DATA_SOURCES.map((s) => (
            <span key={s} className="text-sm font-semibold text-slate-400">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Why IntelliWatch"
          title="Your single source of truth for competitor moves"
          subtitle="Stop checking a dozen tabs. One report brings together everything public about your competitors."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <SectionHeading
          eyebrow="Every report includes"
          title="The business impact of smarter competitor analysis"
          subtitle="Eight intelligence layers in every report, from raw signals to the strategic 'so what'."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REPORT_FEATURES.map((f) => {
            const t = TONE_CLASSES[f.tone];
            return (
              <div
                key={f.label}
                className="group rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 transition-colors hover:border-slate-600"
              >
                <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold ${t.border} ${t.bg} ${t.text}`}>
                  <f.icon className="h-3.5 w-3.5" /> {f.label}
                </span>
                <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center gap-3">
          <PrimaryCTA label="Try it for free" />
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
          >
            Explore features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-800/80 bg-slate-900/30">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="How it works" title="From a list of names to a strategy in minutes" />
            <ol className="mt-10 space-y-8">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="font-mono text-sm font-bold text-blue-400">{s.n}</span>
                  <div>
                    <h3 className="font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <MockTerminal />
            <MockNarrative />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Built for your team"
          title="Who uses IntelliWatch?"
          subtitle="Anyone who needs to know what the competition is doing, and why it matters."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TEAMS.map((t) => (
            <div key={t.slug} className="flex flex-col rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{t.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{t.tagline}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {t.points.slice(0, 3).map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-slate-300">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {p}
                  </li>
                ))}
              </ul>
              <Link
                href={`/solutions#${t.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-800/80 bg-gradient-to-b from-slate-900/40 to-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="The data" title="Back your strategy with real data" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-700/60 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(([value, label, sub]) => (
              <div key={label} className="bg-[#111a2e] p-6">
                <p className="text-4xl font-bold tracking-tight text-white">{value}</p>
                <p className="mt-2 font-medium text-blue-400">{label}</p>
                <p className="mt-1 text-sm text-slate-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="Industries" title="Made for fast-moving markets" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_SOLUTIONS.map((i) => (
            <Link
              key={i.slug}
              href={`/solutions#${i.slug}`}
              className="group rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 transition-colors hover:border-blue-500/40"
            >
              <i.icon className="h-5 w-5 text-blue-400" />
              <h3 className="mt-4 font-semibold text-white">{i.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{i.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FAQSection />
      <FinalCTA />
    </>
  );
}
