export function scoreColor(score: number): string {
  if (score >= 8) return 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10';
  if (score >= 6) return 'text-amber-300 border-amber-500/40 bg-amber-500/10';
  return 'text-slate-300 border-slate-500/40 bg-slate-500/10';
}

export function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) {
    const hours = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
    return hours < 1 ? 'just now' : `${hours}h ago`;
  }
  return `${days}d ago`;
}

export function compact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
