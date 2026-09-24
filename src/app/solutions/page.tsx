import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CircleCheck } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { FinalCTA, PageHero, SectionHeading } from '@/components/site/blocks';
import { INDUSTRIES_SOLUTIONS, TEAMS } from '@/components/site/content';

export const metadata: Metadata = {
  title: 'Solutions — IntelliWatch',
  description: 'Competitor intelligence for founders, product, marketing, sales, investors and engineering teams across every industry.',
};

const EXAMPLES: Record<string, string> = {
  founders: '"What did our three biggest competitors do this quarter, and what should we do about it?"',
  product: '"What are users complaining about in our rival\'s app that we could fix first?"',
  marketing: '"How is each competitor positioning its AI features, and where is the gap?"',
  sales: '"What did Acme ship last week that my prospect will ask about?"',
  investors: '"Which player in this category has the most momentum right now?"',
  engineering: '"Whose open-source projects are gaining developer mindshare?"',
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Solutions"
          title={
            <>
              Competitive intelligence for <span className="text-blue-500">every team</span>
            </>
          }
          subtitle="Whether you are building the roadmap, closing deals or briefing the board, IntelliWatch answers the question: what are competitors doing, and why does it matter?"
        />

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionHeading eyebrow="By team" title="Who uses our competitor analysis platform?" />
          <div className="mt-14 space-y-6">
            {TEAMS.map((t) => (
              <div
                key={t.slug}
                id={t.slug}
                className="grid scroll-mt-24 gap-8 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-8 lg:grid-cols-[1fr_1.3fr]"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-white">{t.title}</h3>
                  <p className="mt-2 text-slate-400">{t.tagline}</p>
                  <p className="mt-6 rounded-xl border-l-2 border-violet-500 bg-violet-950/20 p-4 text-sm italic leading-relaxed text-slate-300">
                    {EXAMPLES[t.slug]}
                  </p>
                </div>
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">What you can do</p>
                  <ul className="space-y-3">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-slate-300">
                        <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#analyze"
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
                  >
                    Run your first report <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-800/80 bg-slate-900/30">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              eyebrow="By industry"
              title="Industry leaders move fast. Keep up."
              subtitle="IntelliWatch works in any market with public news, apps or communities."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES_SOLUTIONS.map((i) => (
                <div key={i.slug} id={i.slug} className="scroll-mt-24 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
                  <i.icon className="h-6 w-6 text-blue-400" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{i.title}</h3>
                  <p className="mt-1 text-sm font-medium text-blue-300/80">{i.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{i.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-24">
          <FinalCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
