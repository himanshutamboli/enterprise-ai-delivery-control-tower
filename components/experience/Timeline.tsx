import Link from 'next/link';
import type { Company } from '@/lib/experience';

/** Vertical career timeline. Each node links to a company's detail page. */
export default function Timeline({ companies }: { companies: Company[] }) {
  if (companies.length === 0) {
    return <p className="text-sm text-muted">No roles match the selected tag.</p>;
  }

  return (
    <ol className="relative space-y-4 border-l border-border pl-6">
      {companies.map((c) => (
        <li key={c.slug} className="relative">
          {/* node */}
          <span className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-brand bg-canvas" />
          <Link
            href={`/experience/${c.slug}`}
            className="panel group block panel-pad transition-colors hover:border-border-soft"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{c.company}</h3>
                  <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">{c.theme}</span>
                </div>
                <p className="mt-0.5 text-sm text-text-soft">{c.role}</p>
                <p className="mt-0.5 text-xs text-muted">{c.industry}</p>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <div className="text-sm font-medium text-text-soft">{c.period}</div>
                <span className="mt-1 inline-block text-xs font-medium text-brand-soft opacity-0 transition-opacity group-hover:opacity-100">
                  View experience →
                </span>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-muted">{c.summary}</p>
          </Link>
        </li>
      ))}
    </ol>
  );
}
