'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check } from 'lucide-react';

type Feature = { label: string; soon?: boolean };

const TIERS: {
  id: string;
  name: string;
  monthly: number | null;
  tagline: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: Feature[];
}[] = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0,
    tagline: 'For a quick look at your market',
    cta: 'Start free',
    href: '/#analyze',
    features: [
      { label: 'Up to 5 competitors per report' },
      { label: '7, 30 and 90-day windows' },
      { label: 'All data sources & AI narrative' },
      { label: 'Side-by-side compare' },
      { label: 'No account required' },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 19,
    tagline: 'For founders and PMs who track rivals weekly',
    cta: 'Get Pro',
    href: '/#analyze',
    featured: true,
    features: [
      { label: 'Everything in Free' },
      { label: 'Up to 10 competitors per report', soon: true },
      { label: 'Saved report history', soon: true },
      { label: 'Weekly scheduled tracking', soon: true },
      { label: 'PDF export', soon: true },
    ],
  },
  {
    id: 'team',
    name: 'Team',
    monthly: 79,
    tagline: 'For product, marketing and sales teams',
    cta: 'Get Team',
    href: '/#analyze',
    features: [
      { label: 'Everything in Pro' },
      { label: '5 seats included' },
      { label: 'Shared workspace', soon: true },
      { label: 'Slack & email alerts', soon: true },
      { label: 'Priority support' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    tagline: 'For organisations with custom needs',
    cta: 'Talk to sales',
    href: 'mailto:sales@intelliwatch.app',
    features: [
      { label: 'Everything in Team' },
      { label: 'Unlimited seats & competitors', soon: true },
      { label: 'API access', soon: true },
      { label: 'SSO & custom data retention', soon: true },
      { label: 'Dedicated success manager' },
    ],
  },
];

export default function PricingTiers() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-grid grid-cols-2 overflow-hidden rounded-lg border border-slate-700 bg-slate-950/60 text-sm">
          {[false, true].map((a) => (
            <button
              key={String(a)}
              type="button"
              onClick={() => setAnnual(a)}
              className={`px-5 py-2 transition-colors ${annual === a ? 'bg-blue-600 font-medium text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {a ? 'Annual · save 20%' : 'Monthly'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t) => {
          const price = t.monthly === null ? null : annual ? Math.round(t.monthly * 0.8) : t.monthly;
          return (
            <div
              key={t.id}
              id={t.id}
              className={`relative flex scroll-mt-24 flex-col rounded-2xl border p-6 ${
                t.featured
                  ? 'border-blue-500/60 bg-blue-950/20 shadow-[0_0_60px_-15px_rgba(59,130,246,0.45)]'
                  : 'border-slate-700/60 bg-slate-800/40'
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{t.name}</h3>
              <p className="mt-1 min-h-10 text-sm text-slate-400">{t.tagline}</p>
              <div className="mt-5 flex items-end gap-1">
                {price === null ? (
                  <span className="text-4xl font-bold text-white">Custom</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-white">${price}</span>
                    <span className="mb-1 text-sm text-slate-500">/ month</span>
                  </>
                )}
              </div>
              <p className="mt-1 h-4 text-xs text-slate-500">
                {price ? (annual ? `$${price * 12} billed yearly` : 'billed monthly') : ''}
              </p>
              <Link
                href={t.href}
                className={`mt-6 rounded-xl py-2.5 text-center text-sm font-semibold transition-colors ${
                  t.featured
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500'
                    : 'border border-slate-700 bg-slate-900/50 text-slate-200 hover:text-white'
                }`}
              >
                {t.cta}
              </Link>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      {f.label}
                      {f.soon && (
                        <span className="ml-1.5 rounded border border-violet-500/30 bg-violet-500/10 px-1.5 py-px text-[10px] text-violet-300">
                          Soon
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
