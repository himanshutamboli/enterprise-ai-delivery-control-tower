'use client';

import { RANGES, type RangeKey } from '@/lib/timeseries';

/** Compact 1M / 3M / 6M time-range selector for chart panels. */
export default function RangeTabs({ value, onChange }: { value: RangeKey; onChange: (k: RangeKey) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-0.5">
      {RANGES.map((r) => (
        <button
          key={r.key}
          onClick={() => onChange(r.key)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            value === r.key ? 'bg-surface-2 text-white' : 'text-muted hover:text-white'
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
