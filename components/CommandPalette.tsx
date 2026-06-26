'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { caseStudies } from '@/lib/case-studies';
import { companies } from '@/lib/experience';

interface Item {
  label: string;
  href: string;
  group: string;
}

const STATIC_ITEMS: Item[] = [
  { label: 'Home / About', href: '/', group: 'Pages' },
  { label: 'Executive Dashboard', href: '/control-tower', group: 'Control Tower' },
  { label: 'AI Observability', href: '/control-tower/observability', group: 'Control Tower' },
  { label: 'QA Governance', href: '/control-tower/qa', group: 'Control Tower' },
  { label: 'DevOps / DORA', href: '/control-tower/devops', group: 'Control Tower' },
  { label: 'Program Health', href: '/control-tower/program', group: 'Control Tower' },
  { label: 'Experience', href: '/experience', group: 'Pages' },
  { label: 'Education & Certifications', href: '/experience/education', group: 'Pages' },
  { label: 'Case Studies', href: '/case-studies', group: 'Pages' },
  { label: 'System Design', href: '/system-design', group: 'Pages' },
];

const ALL_ITEMS: Item[] = [
  ...STATIC_ITEMS,
  ...caseStudies.map((c) => ({ label: c.title, href: `/case-studies/${c.slug}`, group: 'Case Studies' })),
  ...companies.map((c) => ({ label: c.company, href: `/experience/${c.slug}`, group: 'Experience' })),
];

/** Global ⌘K / Ctrl-K command palette for quick navigation. Mounted once in the root layout. */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ITEMS;
    return ALL_ITEMS.filter((i) => `${i.label} ${i.group}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('cmdk:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('cmdk:open', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-canvas/70 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border-soft bg-surface-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="text-muted">⌘K</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onListKey}
            placeholder="Jump to a dashboard, case study, or section…"
            aria-label="Search destinations"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
          />
        </div>
        <ul className="max-h-[320px] overflow-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches</li>}
          {results.map((item, i) => (
            <li key={item.href}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => go(item.href)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  i === active ? 'bg-brand/15 text-white' : 'text-text-soft hover:text-white'
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span className="shrink-0 text-[11px] text-muted">{item.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
