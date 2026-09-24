import type { Metadata } from 'next';
import { CircleCheck } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { FinalCTA, PageHero, SectionHeading } from '@/components/site/blocks';
import {
  MockCompare,
  MockCustomers,
  MockFeed,
  MockNarrative,
  MockOverview,
  MockSentiment,
  MockSnapshot,
  MockTerminal,
} from '@/components/site/mocks';

export const metadata: Metadata = {
  title: 'Features — IntelliWatch',
  description: 'Every layer of competitor intelligence in one report: news, AI overviews, company data, customer reviews and community sentiment.',
};

const BLOCKS = [
  {
    id: 'pipeline',
    eyebrow: 'Live pipeline',
    title: 'Watch every step, as it happens',
    points: [
      'A live log shows each source being fetched, scored and summarised',
      'Competitor cards appear the moment each one finishes',
      'Cancel any time; nothing runs in the background',
    ],
    mock: MockTerminal,
  },
  {
    id: 'feed',
    eyebrow: 'Intelligence feed',
    title: 'Every competitor move, scored for relevance',
    points: [
      'News from the last 7, 30 or 90 days, pulled live from Google News',
      'AI scores each item 1–10 and tags it: launch, pricing, funding, hiring, partnership',
      'Filter by company, category or score, or show High Signal only',
    ],
    mock: MockFeed,
  },
  {
    id: 'overview',
    eyebrow: 'AI overview',
    title: 'Understand their strategy in one paragraph',
    points: [
      'A plain-English summary of what each competitor has been doing',
      'Reads the signals to infer where they are heading next',
      'Grounded in the scored items shown below it',
    ],
    mock: MockOverview,
  },
  {
    id: 'snapshot',
    eyebrow: 'Company snapshot',
    title: 'Know who you are up against',
    points: [
      'Company background from Wikipedia, matched to the actual business',
      'GitHub footprint: total stars, followers, active repos and recent projects',
      'Primary engineering language, at a glance',
    ],
    mock: MockSnapshot,
  },
  {
    id: 'customers',
    eyebrow: 'Customer snapshot & reviews',
    title: 'Hear what their customers really think',
    points: [
      'App Store rating, total ratings, category, version and latest release notes',
      'Recent reviews tinted by rating, so complaints stand out',
      'Find the pain points you can solve better',
    ],
    mock: MockCustomers,
  },
  {
    id: 'sentiment',
    eyebrow: 'Market sentiment',
    title: 'See what the community is saying',
    points: [
      'Hacker News stories ranked by points and comments',
      'Reddit threads across every subreddit',
      'Press coverage that mentions them in passing',
    ],
    mock: MockSentiment,
  },
  {
    id: 'narrative',
    eyebrow: 'Strategic narrative',
    title: 'Get the "so what", not just the data',
    points: [
      'Market pulse and the top five themes across all competitors',
      'The single biggest competitive shift, called out',
      'Three concrete actions you can take this week',
    ],
    mock: MockNarrative,
  },
  {
    id: 'compare',
    eyebrow: 'Compare',
    title: 'Benchmark competitors side by side',
    points: [
      'Intel volume, high-signal items, app ratings and GitHub traction in one table',
      'The leader in every row is highlighted',
      'Spot who is gaining momentum and who is going quiet',
    ],
    mock: MockCompare,
  },
];

const ROADMAP = [
  ['Scheduled tracking', 'Re-run reports weekly and get notified about new high-signal moves.'],
  ['Saved reports', 'Keep a history of every analysis and see how competitors change over time.'],
  ['PDF & Slides export', 'Share polished competitor briefs with your team or clients.'],
  ['Slack & email digests', 'Get the biggest shifts delivered where your team already works.'],
  ['Team workspaces', 'Shared competitor lists, notes and reports for the whole team.'],
  ['API access', 'Pipe IntelliWatch intelligence into your own dashboards and tools.'],
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Features"
          title={
            <>
              Uncover your competitors&apos; <span className="text-blue-500">strategy</span>
            </>
          }
          subtitle="Eight layers of intelligence in every report, from raw signals to recommended actions. Built on live public data, with every insight linked to its source."
        />

        <div className="mx-auto max-w-6xl space-y-28 px-6 pb-28">
          {BLOCKS.map((b, i) => (
            <section
              key={b.id}
              id={b.id}
              className="grid scroll-mt-24 items-center gap-12 lg:grid-cols-2"
            >
              <div className={i % 2 ? 'lg:order-2' : ''}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">{b.eyebrow}</p>
                <h2 className="text-3xl font-bold tracking-tight text-white">{b.title}</h2>
                <ul className="mt-6 space-y-3">
                  {b.points.map((p) => (
                    <li key={p} className="flex gap-3 text-slate-300">
                      <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={i % 2 ? 'lg:order-1' : ''}>
                <b.mock />
              </div>
            </section>
          ))}
        </div>

        <section className="border-y border-slate-800/80 bg-slate-900/30">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              eyebrow="On the roadmap"
              title="More ways to stay ahead"
              subtitle="Coming to paid plans. Tell us which one you want first."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ROADMAP.map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <span className="rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-xs text-violet-300">
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
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
