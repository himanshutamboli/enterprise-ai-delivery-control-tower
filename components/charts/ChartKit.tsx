'use client';

import { TooltipProps } from 'recharts';
import { palette } from '@/lib/format';

/** Shared axis styling so every chart looks consistent. */
export const axisProps = {
  stroke: palette.axis,
  tick: { fill: palette.axis, fontSize: 11 },
  tickLine: false,
  axisLine: { stroke: palette.grid },
} as const;

export const gridProps = {
  stroke: palette.grid,
  strokeDasharray: '3 3',
  vertical: false,
} as const;

interface ChartTooltipProps extends TooltipProps<number, string> {
  /** Optional formatter for the displayed value. */
  valueFormatter?: (value: number, name: string) => string;
  labelFormatter?: (label: string) => string;
}

/** Dark, bordered tooltip matching the console theme. */
export function ChartTooltip({ active, payload, label, valueFormatter, labelFormatter }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-border-soft bg-surface-2/95 px-3 py-2 text-xs shadow-xl backdrop-blur">
      {label !== undefined && (
        <div className="mb-1 font-medium text-white">
          {labelFormatter ? labelFormatter(String(label)) : String(label)}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-text-soft">
              <span className="h-2 w-2 rounded-sm" style={{ background: entry.color }} />
              {entry.name}
            </span>
            <span className="font-medium text-white">
              {valueFormatter
                ? valueFormatter(entry.value as number, String(entry.name))
                : (entry.value as number)?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
