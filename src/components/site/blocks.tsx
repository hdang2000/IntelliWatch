import Link from 'next/link';
import { ChevronDown, Zap } from 'lucide-react';
import { FAQS } from './content';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">{eyebrow}</p>}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-slate-400">{subtitle}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-20 text-center animate-fade-in">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">{subtitle}</p>
        <div className="mt-8 flex justify-center gap-3">
          <PrimaryCTA />
          <Link
            href="/pricing"
            className="rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
          >
            View plans
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PrimaryCTA({ label = 'Analyze competitors free' }: { label?: string }) {
  return (
    <Link
      href="/#analyze"
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500"
    >
      <Zap className="h-4 w-4" /> {label}
    </Link>
  );
}

export function FAQSection({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeading eyebrow="FAQ" title="Got questions? We've got answers" />
      <div className="mt-10 space-y-3">
        {items.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-slate-700/60 bg-slate-800/40 px-5 py-4 open:bg-slate-800/60"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-slate-100">
              {f.q}
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-slate-800/40 to-violet-600/10 px-8 py-16 text-center">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Analyze your competitors with confidence</h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Your first report is ready in minutes. No account, no credit card.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA label="Try it for free" />
            <Link
              href="/pricing#enterprise"
              className="rounded-xl border border-slate-700 bg-slate-900/50 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
