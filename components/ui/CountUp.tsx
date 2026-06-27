'use client';

import { useEffect, useState } from 'react';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Split a formatted value like "668", "69%", "$490" into prefix + number + suffix. */
function parseValue(v: string) {
  const m = v.match(/^(\D*?)(-?\d[\d,]*\.?\d*)(.*)$/);
  if (!m) return null;
  const numStr = m[2].replace(/,/g, '');
  const num = parseFloat(numStr);
  if (Number.isNaN(num)) return null;
  return { prefix: m[1], num, suffix: m[3], decimals: (numStr.split('.')[1] || '').length };
}

/** Animated count-up for a formatted value string. Falls back to the raw value if not numeric. */
export default function CountUp({ value, className }: { value: string; className?: string }) {
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

  return <span className={className}>{display}</span>;
}
