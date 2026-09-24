'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import type { Category } from '@/lib/types';

export function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const filled = Math.round(rating);
  const cls = size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3';
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < filled ? 'fill-amber-400 text-amber-400' : 'fill-slate-600 text-slate-600'}`}
        />
      ))}
    </span>
  );
}

const TONES = {
  blue: { box: 'border-blue-800/50 bg-blue-950/20', icon: 'text-blue-400' },
  green: { box: 'border-emerald-800/50 bg-emerald-950/15', icon: 'text-emerald-400' },
  amber: { box: 'border-amber-800/40 bg-amber-950/10', icon: 'text-amber-400' },
  rose: { box: 'border-rose-900/50 bg-rose-950/15', icon: 'text-rose-400' },
};

interface SectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  tone: keyof typeof TONES;
  right?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function Section({ icon: Icon, title, subtitle, tone, right, defaultOpen = true, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const t = TONES[tone];
  return (
    <div className={`rounded-xl border ${t.box}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200">
          <Icon className={`h-3.5 w-3.5 ${t.icon}`} />
          {title}
          <span className="font-normal normal-case tracking-normal text-slate-500">— {subtitle}</span>
        </span>
        <span className="flex items-center gap-2 text-xs text-slate-400">
          {right}
          {open ? <ChevronUp className="h-3.5 w-3.5 text-slate-500" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-500" />}
        </span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

const CATEGORY_STYLES: Record<Category, string> = {
  'Product Launch': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  Pricing: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Funding: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Hiring: 'bg-green-500/15 text-green-300 border-green-500/30',
  Partnership: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  Content: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
  Other: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${CATEGORY_STYLES[category]}`}>{category}</span>
  );
}

export function HighSignalBadge({ label = 'High Signal' }: { label?: string }) {
  return (
    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
      {label}
    </span>
  );
}
