/** Deterministic time-series generation for range-filtered charts (1M / 3M / 6M).
 *  Values are seeded (no Math.random / Date) so output is stable across renders and
 *  static-export builds — no hydration mismatch. Magnitudes are "per-period" rates,
 *  kept stable across ranges so the y-axis stays meaningful; counts can be period-scaled. */

export type RangeKey = '1m' | '3m' | '6m';

export interface RangeSpec {
  key: RangeKey;
  label: string;
  n: number;
}

export const RANGES: RangeSpec[] = [
  { key: '1m', label: '1M', n: 30 },
  { key: '3m', label: '3M', n: 13 },
  { key: '6m', label: '6M', n: 6 },
];

// mulberry32 — small deterministic PRNG.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pointLabels(key: RangeKey, n: number): string[] {
  if (key === '6m') return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(0, n);
  if (key === '3m') return Array.from({ length: n }, (_, i) => `W${i + 1}`);
  return Array.from({ length: n }, (_, i) => `D${i + 1}`);
}

export interface MetricSpec {
  key: string;
  base: number;
  /** end-of-range multiplier vs start (1 = flat, 1.1 = +10% trend, 0.9 = decline). */
  trend?: number;
  /** noise amplitude (fraction of base). */
  vol?: number;
  /** probability of an upward spike at a point. */
  spikeP?: number;
  /** spike magnitude (fraction added). */
  spikeMag?: number;
  decimals?: number;
  floor?: number;
}

export function buildSeries(
  rangeKey: RangeKey,
  seed: number,
  metrics: MetricSpec[]
): Record<string, number | string>[] {
  const spec = RANGES.find((r) => r.key === rangeKey) ?? RANGES[0];
  const n = spec.n;
  const labels = pointLabels(rangeKey, n);
  return labels.map((label, i) => {
    const row: Record<string, number | string> = { label };
    const t = n === 1 ? 1 : i / (n - 1);
    metrics.forEach((m, mi) => {
      const r = rng(seed + mi * 9173 + i * 31 + rangeKey.length);
      const noise = r();
      const spikeRoll = r();
      const spikeAmt = r();
      const trendF = 1 + ((m.trend ?? 1) - 1) * t;
      let v = m.base * trendF * (1 + (noise - 0.5) * 2 * (m.vol ?? 0.1));
      if (spikeRoll < (m.spikeP ?? 0)) v *= 1 + (m.spikeMag ?? 0) * spikeAmt;
      const dec = m.decimals ?? 0;
      v = Math.max(m.floor ?? 0, v);
      row[m.key] = dec > 0 ? Number(v.toFixed(dec)) : Math.round(v);
    });
    return row;
  });
}

/** Period-scaled counts for categorical breakdowns (more occurrences over longer windows). */
export function scaleCounts<T extends { count: number }>(items: T[], rangeKey: RangeKey, seed: number): T[] {
  const factor = rangeKey === '6m' ? 6 : rangeKey === '3m' ? 3 : 1;
  const r = rng(seed);
  return items.map((it) => ({ ...it, count: Math.round(it.count * factor * (0.9 + r() * 0.2)) }));
}

/** Window caption for a chart subtitle. */
export function rangeCaption(key: RangeKey): string {
  return key === '6m' ? 'last 6 months' : key === '3m' ? 'last 3 months' : 'last 30 days';
}
