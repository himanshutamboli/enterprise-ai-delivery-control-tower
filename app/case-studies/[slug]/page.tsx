import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/SiteHeader';
import Mermaid from '@/components/Mermaid';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return { title: 'Case Study Not Found' };
  return { title: `${cs.title} · Case Study`, description: cs.summary };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <Link href="/case-studies" className="text-sm text-muted transition-colors hover:text-white">
          ← All case studies
        </Link>

        {/* Header */}
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">{cs.domain}</span>
            <span>{cs.role}</span>
            <span>·</span>
            <span>{cs.timeline}</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">{cs.title}</h1>
          <p className="mt-2 text-lg text-text-soft">{cs.subtitle}</p>
          <p className="mt-4 text-text-soft">{cs.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {cs.stack.map((s) => (
              <span key={s} className="chip bg-surface-2 text-muted ring-1 ring-inset ring-border">{s}</span>
            ))}
          </div>
        </div>

        {/* Hero metrics */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cs.heroMetrics.map((m) => (
            <div key={m.label} className="panel panel-pad">
              <div className="text-2xl font-semibold tracking-tight text-white">{m.value}</div>
              <div className="mt-1 text-[11px] leading-tight text-muted">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <article className="mt-12 space-y-10">
          {cs.sections.map((sec, i) => (
            <section key={i}>
              <h2 className="border-l-2 border-brand pl-3 text-xl font-semibold tracking-tight text-white">
                {sec.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {sec.paragraphs?.map((p, j) => (
                  <p key={j} className="leading-relaxed text-text-soft">{p}</p>
                ))}

                {sec.bullets && (
                  <ul className="space-y-2">
                    {sec.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-text-soft">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-soft" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.metrics && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {sec.metrics.map((m, j) => (
                      <div key={j} className="rounded-lg bg-surface-2/50 px-3 py-3">
                        <div className="text-xl font-semibold text-white">{m.value}</div>
                        <div className="mt-0.5 text-xs font-medium text-text-soft">{m.label}</div>
                        {m.sub && <div className="mt-0.5 text-[11px] text-muted">{m.sub}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {sec.table && (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[420px] text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                          {sec.table.headers.map((h) => (
                            <th key={h} className="pb-2 pr-4 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri} className="text-text-soft">
                            {row.map((cell, ci) => (
                              <td key={ci} className={`py-2.5 pr-4 ${ci === 0 ? 'font-medium text-white' : ''}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sec.mermaid && <Mermaid id={`${cs.slug}-${i}`} chart={sec.mermaid} />}
              </div>
            </section>
          ))}
        </article>

        {/* Footer nav */}
        <div className="mt-14 border-t border-border pt-6">
          <Link href="/case-studies" className="text-sm font-medium text-brand-soft hover:text-white">
            ← Back to all case studies
          </Link>
        </div>
      </main>
    </>
  );
}
