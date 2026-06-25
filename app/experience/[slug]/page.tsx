import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/SiteHeader';
import Mermaid from '@/components/Mermaid';
import { companies, flattenTech, getCompany } from '@/lib/experience';

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCompany(params.slug);
  if (!c) return { title: 'Experience Not Found' };
  return { title: `${c.company} · ${c.role}`, description: c.summary };
}

export default function ExperienceDetail({ params }: { params: { slug: string } }) {
  const c = getCompany(params.slug);
  if (!c) notFound();

  const idx = companies.findIndex((x) => x.slug === c.slug);
  const prev = companies[idx - 1];
  const next = companies[idx + 1];
  const techGroups = flattenTech(c.technical_environment);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        <Link href="/experience" className="text-sm text-muted transition-colors hover:text-white">
          ← Experience timeline
        </Link>

        {/* Header */}
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">{c.theme}</span>
            <span>{c.industry}</span>
            {c.location && (
              <>
                <span>·</span>
                <span>{c.location}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">{c.company}</h1>
          <p className="mt-1.5 text-lg text-text-soft">{c.role}</p>
          <p className="mt-0.5 text-sm text-muted">
            {c.period}
            {c.employment_type && <span> · {c.employment_type}</span>}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {c.portfolio_tags.map((t) => (
              <span key={t} className="chip bg-surface-2 text-muted ring-1 ring-inset ring-border">{t}</span>
            ))}
          </div>
        </header>

        <div className="mt-10 space-y-10">
          {/* 1. Overview */}
          <Section title="Overview">
            <p className="leading-relaxed text-text-soft">{c.summary}</p>
          </Section>

          {/* 2. Business Context */}
          <Section title="Business Context">
            <BulletList items={c.business_context} />
          </Section>

          {/* 3. Problems Solved */}
          <Section title="Problems Solved">
            <ul className="space-y-2">
              {c.key_challenges.map((k, i) => (
                <li key={i} className="flex gap-2.5 text-text-soft">
                  <span className="mt-1 text-warning">▸</span>
                  <span className="leading-relaxed">{k}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* 4. Initiatives */}
          <Section title="Initiatives">
            <div className="space-y-4">
              {c.initiatives.map((init, i) => (
                <div key={i} className="panel panel-pad">
                  <h3 className="font-semibold text-white">{init.name}</h3>
                  <p className="mt-1 text-sm text-text-soft">{init.description}</p>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-medium text-text-soft">My role · </span>
                    {init.my_role}
                  </p>
                  {init.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {init.technologies.map((t) => (
                        <span key={t} className="chip bg-surface-2 text-muted ring-1 ring-inset ring-border">{t}</span>
                      ))}
                    </div>
                  )}
                  {init.outcomes.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {init.outcomes.map((o, j) => (
                        <li key={j} className="flex gap-2 text-sm text-text-soft">
                          <span className="text-success">✓</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* 5. My Contribution */}
          <Section title="My Contribution">
            <BulletList items={c.responsibilities} />
            {c.delivery_practices.length > 0 && (
              <div className="mt-4">
                <span className="stat-label">Delivery practices</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.delivery_practices.map((p) => (
                    <span key={p} className="chip bg-surface-2 text-text-soft ring-1 ring-inset ring-border">{p}</span>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* 6. Architecture / Process Flow */}
          <Section title="Architecture / Process Flow">
            <Mermaid id={`exp-${c.slug}`} chart={c.process_flow} />
          </Section>

          {/* 7. Technology Stack */}
          <Section title="Technology Stack">
            {techGroups.length === 0 ? (
              <p className="text-sm text-muted">Tooling not specified for this role.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {techGroups.map((g) => (
                  <div key={g.group} className="panel panel-pad">
                    <span className="stat-label">{g.group}</span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {g.items.map((t) => (
                        <span key={t} className="chip bg-surface-2 text-text-soft ring-1 ring-inset ring-border">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* 8. Metrics Dashboard */}
          <Section title="Metrics Dashboard">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {c.metrics.map((m, i) => (
                <div key={i} className="panel panel-pad">
                  <div className="text-2xl font-semibold tracking-tight text-white">{m.value}</div>
                  <div className="mt-1 text-xs leading-tight text-muted">{m.impact}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* 9. Achievements */}
          <Section title="Achievements">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.achievements.map((a, i) => (
                <div key={i} className="flex gap-2.5 rounded-lg bg-surface-2/50 px-4 py-3 text-sm text-text-soft">
                  <span className="text-brand-soft">★</span>
                  <span className="leading-relaxed">{a}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Prev / next */}
        <nav className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
          {prev ? (
            <Link href={`/experience/${prev.slug}`} className="text-brand-soft hover:text-white">
              ← {prev.company}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/experience/${next.slug}`} className="text-right text-brand-soft hover:text-white">
              {next.company} →
            </Link>
          ) : (
            // After the oldest role, continue the sequence into credentials.
            <Link href="/experience/education" className="text-right text-brand-soft hover:text-white">
              Education &amp; Certifications →
            </Link>
          )}
        </nav>
      </main>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="border-l-2 border-brand pl-3 text-xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 text-text-soft">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-soft" />
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}
