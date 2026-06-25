import { ReactNode } from 'react';

interface KpiCardProps {
  label: string;
  value: string;
  deltaPct?: number;
  /** When true, a negative delta is "good" (e.g. cost, MTTR, incidents). */
  invertDelta?: boolean;
  footnote?: string;
  badge?: ReactNode;
}

/** Headline metric tile used across the Executive / QA / DevOps dashboards. */
export default function KpiCard({ label, value, deltaPct, invertDelta = false, footnote, badge }: KpiCardProps) {
  const hasDelta = typeof deltaPct === 'number';
  const isGood = hasDelta ? (invertDelta ? deltaPct! < 0 : deltaPct! > 0) : true;
  const arrow = hasDelta ? (deltaPct! > 0 ? '▲' : deltaPct! < 0 ? '▼' : '■') : '';

  return (
    <div className="panel panel-pad transition-colors hover:border-border-soft">
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
        {badge}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-2xl font-semibold tracking-tight text-white">{value}</span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {hasDelta && (
          <span className={isGood ? 'text-success' : 'text-danger'}>
            {arrow} {Math.abs(deltaPct!).toFixed(1)}%
          </span>
        )}
        {footnote && <span className="text-muted">{footnote}</span>}
      </div>
    </div>
  );
}
