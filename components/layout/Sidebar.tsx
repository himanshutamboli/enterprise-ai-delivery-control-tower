'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/control-tower', label: 'Executive', icon: '◫', exact: true },
  { href: '/control-tower/observability', label: 'AI Observability', icon: '◉' },
  { href: '/control-tower/qa', label: 'QA Governance', icon: '✓' },
  { href: '/control-tower/devops', label: 'DevOps / DORA', icon: '⟳' },
  { href: '/control-tower/program', label: 'Program Health', icon: '◆' },
];

export default function Sidebar() {
  const pathname = usePathname();
  // Normalize trailing slash from static export.
  const path = pathname.replace(/\/$/, '') || '/';

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface/60 lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/15 text-brand">▲</span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">Control Tower</div>
          <div className="text-[11px] text-muted">AI Delivery Ops</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        <button
          onClick={() => window.dispatchEvent(new Event('cmdk:open'))}
          aria-label="Open command palette"
          className="mb-2 flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted transition-colors hover:border-border-soft hover:text-white"
        >
          <span className="flex items-center gap-2"><span className="text-base">⌕</span> Search</span>
          <span className="rounded border border-border px-1 text-[10px]">⌘K</span>
        </button>
        <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Dashboards
        </div>
        {NAV.map((item) => {
          const active = item.exact ? path === item.href : path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${active ? 'nav-link-active' : ''}`}
            >
              <span className="w-4 text-center text-base text-brand-soft">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        <div className="px-3 pb-1 pt-5 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Portfolio
        </div>
        <Link href="/experience" className="nav-link">
          <span className="w-4 text-center text-base text-brand-soft">❘</span>
          Experience
        </Link>
        <Link href="/case-studies" className="nav-link">
          <span className="w-4 text-center text-base text-brand-soft">▤</span>
          Case Studies
        </Link>
        <Link href="/system-design" className="nav-link">
          <span className="w-4 text-center text-base text-brand-soft">⌗</span>
          System Design
        </Link>
        <Link href="/" className="nav-link">
          <span className="w-4 text-center text-base text-brand-soft">←</span>
          Home / About
        </Link>
      </nav>

      <div className="border-t border-border p-4 text-[11px] text-muted">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          All systems operational
        </div>
        <div className="mt-1">Mock data · Portfolio demo</div>
      </div>
    </aside>
  );
}
