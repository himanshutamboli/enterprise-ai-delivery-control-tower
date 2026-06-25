/** Shared formatting + presentation helpers used across the Control Tower. */

export function compactNumber(n: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

export function fullNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

export function currency(n: number, opts: { compact?: boolean; digits?: number } = {}): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: opts.compact ? 'compact' : 'standard',
    maximumFractionDigits: opts.digits ?? (opts.compact ? 1 : 2),
  }).format(n);
}

export function percent(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}

export function shortDate(iso: string): string {
  // Accepts "2026-06-25" or full ISO; renders e.g. "Jun 25"
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  const diffMin = Math.round((now.getTime() - then) / 60000);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.round(diffH / 24)}d ago`;
}

/** Semantic color tokens for status strings used throughout the data. */
export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export function statusTone(status: string): StatusTone {
  const s = status.toLowerCase();
  if (['healthy', 'success', 'pass', 'done', 'satisfied', 'on_track', 'elite'].includes(s)) return 'success';
  if (['degraded', 'warn', 'at_risk', 'amber', 'in_progress', 'mitigating', 'monitoring', 'pending', 'triaged', 'high'].includes(s)) return 'warning';
  if (['critical', 'fail', 'failed', 'rolled_back', 'open', 'red'].includes(s)) return 'danger';
  if (['not_started', 'skipped'].includes(s)) return 'neutral';
  return 'info';
}

export const toneClasses: Record<StatusTone, string> = {
  success: 'bg-success/10 text-success ring-1 ring-inset ring-success/20',
  warning: 'bg-warning/10 text-warning ring-1 ring-inset ring-warning/20',
  danger: 'bg-danger/10 text-danger ring-1 ring-inset ring-danger/20',
  info: 'bg-info/10 text-info ring-1 ring-inset ring-info/20',
  neutral: 'bg-muted/10 text-muted ring-1 ring-inset ring-muted/20',
};

/** Chart palette — keep consistent across all dashboards. */
export const palette = {
  brand: '#818cf8',
  accent: '#22d3ee',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  grid: '#1f2937',
  axis: '#7c8aa5',
  series: ['#818cf8', '#22d3ee', '#22c55e', '#f59e0b', '#ef4444', '#a78bfa'],
};
