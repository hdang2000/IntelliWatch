'use client';

import { useEffect, useRef } from 'react';
import { Circle, CircleCheck, CircleX } from 'lucide-react';
import type { LogLevel } from '@/lib/types';

export interface LogLine {
  level: LogLevel;
  message: string;
  ts: string;
}

export default function PipelineTerminal({ lines, running }: { lines: LogLine[]; running: boolean }) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [lines.length]);

  const lastTs = lines.at(-1)?.ts ?? new Date().toLocaleTimeString('en-GB', { hour12: false });

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0b0f17]">
      <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-900/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-600/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-600/90" />
        <span className="ml-2 font-mono text-xs text-slate-500">intelliwatch — analysis pipeline</span>
      </div>
      <div ref={bodyRef} className="terminal-scroll h-[232px] space-y-1.5 overflow-y-auto px-4 py-3 font-mono text-[13px]">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center gap-2.5 animate-fade-in">
            <span className="shrink-0 text-slate-600">[{l.ts}]</span>
            {l.level === 'success' ? (
              <CircleCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            ) : l.level === 'error' ? (
              <CircleX className="h-3.5 w-3.5 shrink-0 text-rose-400" />
            ) : (
              <Circle className="h-3.5 w-3.5 shrink-0 text-blue-400" />
            )}
            <span
              className={
                l.level === 'success' ? 'text-slate-200' : l.level === 'error' ? 'text-rose-300' : 'text-blue-300'
              }
            >
              {l.message}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2.5">
          <span className="text-slate-600">[{lastTs}]</span>
          {running && <span className="inline-block h-4 w-2 animate-blink bg-blue-500" />}
        </div>
      </div>
    </div>
  );
}
