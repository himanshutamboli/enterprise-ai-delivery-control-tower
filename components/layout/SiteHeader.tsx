'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoIcon } from '@/components/icons';

const LINKS = [
  { href: '/', label: 'Home', exact: true },
  { href: '/experience', label: 'Experience' },
  { href: '/control-tower', label: 'Control Tower' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/system-design', label: 'System Design' },
];

/** Top navigation for the marketing/content pages (home, case studies, system design). */
export default function SiteHeader() {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, '') || '/';

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-soft">
            <LogoIcon className="h-[18px] w-[18px]" />
          </span>
          {/* Long brand label hidden on the smallest screens so the nav has room. */}
          <span className="hidden text-sm font-semibold text-white sm:block">AI Delivery Control Tower</span>
        </Link>
        <nav className="-mr-2 flex min-w-0 items-center gap-1 overflow-x-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LINKS.map((l) => {
            const active = l.exact ? path === l.href : path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? 'bg-surface-2 text-white' : 'text-text-soft hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => window.dispatchEvent(new Event('cmdk:open'))}
          aria-label="Open command palette"
          className="ml-1 flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-border-soft hover:text-white"
        >
          <span className="text-sm leading-none">⌕</span>
          <span className="hidden sm:inline">Search</span>
          <span className="hidden rounded border border-border px-1 text-[10px] sm:inline">⌘K</span>
        </button>
      </div>
    </header>
  );
}
