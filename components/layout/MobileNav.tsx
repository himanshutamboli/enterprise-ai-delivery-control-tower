'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/control-tower', label: 'Executive', exact: true },
  { href: '/control-tower/observability', label: 'Observability' },
  { href: '/control-tower/qa', label: 'QA' },
  { href: '/control-tower/devops', label: 'DevOps' },
  { href: '/control-tower/program', label: 'Program' },
];

/** Horizontally scrollable tab bar shown on screens below the lg breakpoint. */
export default function MobileNav() {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, '') || '/';

  return (
    <div className="flex items-center gap-1 border-b border-border bg-surface/60 px-3 py-2 lg:hidden">
      <div className="flex flex-1 gap-1 overflow-x-auto">
        {NAV.map((item) => {
          const active = item.exact ? path === item.href : path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active ? 'bg-surface-2 text-white' : 'text-text-soft hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => window.dispatchEvent(new Event('cmdk:open'))}
        aria-label="Open command palette"
        className="ml-1 shrink-0 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-white"
      >
        ⌕
      </button>
    </div>
  );
}
