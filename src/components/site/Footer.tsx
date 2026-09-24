import Link from 'next/link';
import { INDUSTRIES_SOLUTIONS, TEAMS } from './content';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/#analyze', label: 'Run an analysis' },
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/features#compare', label: 'Compare competitors' },
    ],
  },
  { title: 'By team', links: TEAMS.map((t) => ({ href: `/solutions#${t.slug}`, label: t.title })) },
  { title: 'By industry', links: INDUSTRIES_SOLUTIONS.map((i) => ({ href: `/solutions#${i.slug}`, label: i.title })) },
  {
    title: 'Data sources',
    links: [
      { href: '/features#feed', label: 'Google News' },
      { href: '/features#snapshot', label: 'Wikipedia & GitHub' },
      { href: '/features#customers', label: 'App Store' },
      { href: '/features#sentiment', label: 'Hacker News & Reddit' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Link href="/" className="text-lg font-bold text-white">
            Intelli<span className="text-blue-500">Watch</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
            AI-powered competitor intelligence. Know what your competitors are doing, before you need to.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-500 transition-colors hover:text-slate-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-5 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} IntelliWatch. All rights reserved.</span>
          <span>Built on public data · Every insight links to its source</span>
        </div>
      </div>
    </footer>
  );
}
