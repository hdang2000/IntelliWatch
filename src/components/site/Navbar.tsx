'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Menu, X, Zap } from 'lucide-react';
import { INDUSTRIES_SOLUTIONS, TEAMS } from './content';

const LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/solutions', label: 'Solutions', dropdown: true },
  { href: '/pricing', label: 'Pricing' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0f172a]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold text-white">
          Intelli<span className="text-blue-500">Watch</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) =>
            l.dropdown ? (
              <div key={l.href} className="group relative">
                <Link
                  href={l.href}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors hover:text-white ${
                    pathname.startsWith(l.href) ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {l.label} <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-6 rounded-2xl border border-slate-700/60 bg-slate-900 p-5 shadow-2xl shadow-black/40">
                    <DropdownColumn title="By team" items={TEAMS} />
                    <DropdownColumn title="By industry" items={INDUSTRIES_SOLUTIONS} />
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors hover:text-white ${
                  pathname === l.href ? 'text-white' : 'text-slate-400'
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:text-white">
            Talk to sales
          </Link>
          <Link
            href="/#analyze"
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-500"
          >
            <Zap className="h-3.5 w-3.5" /> Analyze free
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((o) => !o)} className="text-slate-300 md:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="space-y-1 border-t border-slate-800 px-6 py-4 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-slate-300">
              {l.label}
            </Link>
          ))}
          <Link
            href="/#analyze"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-blue-600 py-2 text-center font-semibold text-white"
          >
            Analyze free
          </Link>
        </div>
      )}
    </header>
  );
}

function DropdownColumn({ title, items }: { title: string; items: { slug: string; icon: React.ComponentType<{ className?: string }>; title: string; tagline: string }[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.slug}>
            <Link
              href={`/solutions#${it.slug}`}
              className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-slate-800/60"
            >
              <it.icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <span>
                <span className="block text-sm font-medium text-slate-100">{it.title}</span>
                <span className="block text-xs leading-snug text-slate-500">{it.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
