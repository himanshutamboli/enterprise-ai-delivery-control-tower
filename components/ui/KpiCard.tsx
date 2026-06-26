'use client';

import { ReactNode, useEffect, useState } from 'react';

interface KpiCardProps {
  label: string;
  value: string;
  deltaPct?: number;
  /** When true, a negative delta is "good" (e.g. cost, MTTR, incidents). */
  invertDelta?: boolean;
  footnote?: string;
  badge?: ReactNode;
  /** CSS selector of a chart to scroll to + highlight on click (drill-down). */
  targetId?: string;
  /** Optional sparkline values revealed on hover. */
  spark?: number[];
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Split a formatted value like "$490", "24.2K", "98.7%", "4/6" into prefix + number + suffix. */
function parseValue(v: string) {
  const m = v.match(/^(\D*?)(-?\d[\d,]*\.?\d*)(.*)$/);
  if (!m) return null;
  const numStr = m[2].replace(/,/g, '');
  const num = parseFloat(numStr);
  if (Number.isNaN(num)) return null;
  const decimals = (numStr.split('.')[1] || '').length;
  return { prefix: m[1], num, suffix: m[3], decimals };
}

function Sparkline({ points }: { points: number[] }) {
  const w = 88;
  const h = 22;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const coords = points
    .map((p, i) => `${((i / (points.length - 1)) * w).toFixed(1)},${(h - ((p - min) / span) * h).toFixed(1)}`)
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-5 w-full" aria-hidden>
      <polyline points={coords} fill="none" stroke="#818cf8" strokeWidth={2} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Headline metric tile: animated count-up, optional drill-down + hover sparkline. */
export default function KpiCard({ label, value, deltaPct, invertDelta = false, footnote, badge, targetId, spark }: KpiCardProps) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parseValue(value);
    if (!parsed || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start = 0;
    const dur = 750;
    const tick = (now: number) => {
      if (!start) start = now;
      const k = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      setDisplay(`${parsed.prefix}${(parsed.num * eased).toFixed(parsed.decimals)}${parsed.suffix}`);
      if (k < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const hasDelta = typeof deltaPct === 'number';
  const isGood = hasDelta ? (invertDelta ? deltaPct! < 0 : deltaPct! > 0) : true;
  const arrow = hasDelta ? (deltaPct! > 0 ? '▲' : deltaPct! < 0 ? '▼' : '■') : '';

  function drill() {
    if (!targetId) return;
    const el = document.querySelector(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('kpi-pulse');
    setTimeout(() => el.classList.remove('kpi-pulse'), 1300);
  }

  const interactive = !!targetId;
  const Wrapper = interactive ? 'button' : 'div';

  return (
    <Wrapper
      {...(interactive ? { onClick: drill, type: 'button' as const, 'aria-label': `${label} — view chart` } : {})}
      className={`panel panel-pad group block w-full text-left transition-colors hover:border-border-soft ${interactive ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
        {badge}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums text-white">{display}</span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {hasDelta && (
          <span className={isGood ? 'text-success' : 'text-danger'}>
            {arrow} {Math.abs(deltaPct!).toFixed(1)}%
          </span>
        )}
        {footnote && <span className="text-muted">{footnote}</span>}
      </div>
      {spark && (
        <div className="mt-2 h-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Sparkline points={spark} />
        </div>
      )}
      {interactive && (
        <span className="mt-1 inline-block text-[11px] font-medium text-brand-soft opacity-0 transition-opacity group-hover:opacity-100">
          ↓ view chart
        </span>
      )}
    </Wrapper>
  );
}
