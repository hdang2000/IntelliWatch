import type { Metadata } from 'next';
import { Fragment } from 'react';
import { Check, Minus } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PricingTiers from '@/components/site/PricingTiers';
import { Eyebrow, FAQSection, FinalCTA, SectionHeading } from '@/components/site/blocks';

export const metadata: Metadata = {
  title: 'Pricing — IntelliWatch',
  description: 'Start free. Upgrade for more competitors, saved reports, scheduled tracking and team features.',
};

type Cell = boolean | string;
const COMPARISON: { group: string; rows: [string, Cell, Cell, Cell, Cell][] }[] = [
  {
    group: 'Analysis',
    rows: [
      ['Competitors per report', '5', '10 · soon', '10 · soon', 'Unlimited · soon'],
      ['Time windows', '7 / 30 / 90 days', '7 / 30 / 90 days', '7 / 30 / 90 days', 'Custom'],
      ['AI overview & strategic narrative', true, true, true, true],
      ['Keyword focus', true, true, true, true],
      ['Side-by-side compare', true, true, true, true],
    ],
  },
  {
    group: 'Data sources',
    rows: [
      ['Google News intelligence feed', true, true, true, true],
      ['Wikipedia & GitHub snapshot', true, true, true, true],
      ['App Store ratings & reviews', true, true, true, true],
      ['Hacker News, Reddit & press', true, true, true, true],
    ],
  },
  {
    group: 'Workflow',
    rows: [
      ['Saved report history', false, 'Soon', 'Soon', 'Soon'],
      ['Scheduled tracking', false, 'Weekly · soon', 'Daily · soon', 'Custom · soon'],
      ['PDF export', false, 'Soon', 'Soon', 'Soon'],
      ['Slack & email alerts', false, false, 'Soon', 'Soon'],
    ],
  },
  {
    group: 'Team & support',
    rows: [
      ['Seats', '1', '1', '5', 'Unlimited'],
      ['Shared workspace', false, false, 'Soon', 'Soon'],
      ['API access', false, false, false, 'Soon'],
      ['Support', 'Community', 'Email', 'Priority', 'Dedicated manager'],
    ],
  },
];

const PRICING_FAQS = [
  {
    q: 'Do I need an account to use the Free plan?',
    a: 'No. Open the homepage, add your competitors and click Analyze. Paid plans need an account so we can save your reports and schedules.',
  },
  {
    q: 'What does "Soon" mean on a feature?',
    a: 'Those features are on our roadmap and not available yet. Paid plans include them automatically as they launch.',
  },
  {
    q: 'Can I cancel any time?',
    a: 'Yes. Monthly plans can be cancelled at any time. Annual plans run until the end of the billing year.',
  },
  {
    q: 'Do you offer discounts for startups or non-profits?',
    a: 'Yes. Reach out to sales and tell us about your organisation.',
  },
];

function Value({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-emerald-400" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-slate-600" />;
  const soon = v.toLowerCase().includes('soon');
  return <span className={soon ? 'text-violet-300' : 'text-slate-200'}>{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[120px]" />
          <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20">
            <div className="text-center animate-fade-in">
              <Eyebrow>Pricing</Eyebrow>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Start free. <span className="text-blue-500">Scale</span>{' '}when you&apos;re ready.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
                Every plan includes the full intelligence report. Upgrade for more competitors, history and team features.
              </p>
            </div>
            <div className="mt-12">
              <PricingTiers />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-8">
          <SectionHeading title="Compare plans" />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-800/40">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-slate-700/60">
                  <th className="px-5 py-4 text-left font-medium text-slate-500">Features</th>
                  {['Free', 'Pro', 'Team', 'Enterprise'].map((p) => (
                    <th key={p} className={`px-5 py-4 text-center font-semibold ${p === 'Pro' ? 'text-blue-400' : 'text-white'}`}>
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((g) => (
                  <Fragment key={g.group}>
                    <tr className="bg-slate-900/40">
                      <td colSpan={5} className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {g.group}
                      </td>
                    </tr>
                    {g.rows.map(([label, ...cells]) => (
                      <tr key={label} className="border-t border-slate-800/60">
                        <td className="px-5 py-3 text-slate-300">{label}</td>
                        {cells.map((c, i) => (
                          <td key={i} className="px-5 py-3 text-center">
                            <Value v={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FAQSection items={PRICING_FAQS} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
