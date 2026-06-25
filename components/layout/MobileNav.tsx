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
    <div className="flex gap-1 overflow-x-auto border-b border-border bg-surface/60 px-3 py-2 lg:hidden">
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
  );
}
