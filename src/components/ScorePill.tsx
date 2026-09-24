'use client';

import { scoreColor } from '@/lib/utils';

interface Props {
  score: number;
  size?: 'sm' | 'md';
}

export default function ScorePill({ score, size = 'md' }: Props) {
  const colorClass = scoreColor(score);
  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-bold border rounded-md tabular-nums ${colorClass} ${
        size === 'sm' ? 'text-xs px-1.5 py-0.5 min-w-[28px]' : 'text-sm px-2 py-1 min-w-[36px]'
      }`}
    >
      {score}
    </span>
  );
}
