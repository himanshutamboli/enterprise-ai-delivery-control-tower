import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/layout/SiteHeader';
import { caseStudies } from '@/lib/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies · AI Delivery Control Tower',
  description:
    'Enterprise AI program case studies: agent observability, visual workflow orchestration, and cloud data migration.',
};

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">Case Studies</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          How I lead enterprise AI programs
        </h1>
        <p className="mt-3 max-w-2xl text-text-soft">
          Three programs spanning AI observability, product strategy, and cloud migration — each framed
          the way I run delivery: problem, decisions, architecture, metrics, outcome.
        </p>

        <div className="mt-10 space-y-5">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="panel group block panel-pad transition-colors hover:border-border-soft"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="text-brand-soft">{cs.domain}</span>
                    <span>·</span>
                    <span>{cs.timeline}</span>
                  </div>
                  <h2 className="mt-1.5 text-lg font-semibold text-white">{cs.title}</h2>
                  <p className="mt-1.5 max-w-3xl text-sm text-text-soft">{cs.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cs.stack.map((s) => (
                      <span key={s} className="chip bg-surface-2 text-muted ring-1 ring-inset ring-border">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="grid shrink-0 grid-cols-2 gap-3 lg:w-64">
                  {cs.heroMetrics.slice(0, 4).map((m) => (
                    <div key={m.label} className="rounded-lg bg-surface-2/50 px-3 py-2">
                      <div className="text-lg font-semibold text-white">{m.value}</div>
                      <div className="text-[11px] leading-tight text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <span className="mt-4 inline-block text-sm font-medium text-brand-soft opacity-0 transition-opacity group-hover:opacity-100">
                Read case study →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
