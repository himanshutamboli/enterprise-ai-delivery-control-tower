import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/layout/SiteHeader';
import { companies } from '@/lib/experience';
import profile from '@/data/profile.json';

export const metadata: Metadata = {
  title: 'Education & Certifications · AI Delivery Control Tower',
  description: 'Education, certifications, and recognitions — academic and professional credentials.',
};

// Local files (e.g. /certificates/x.pdf) need the GitHub Pages base path; external
// (Google Drive, etc.) links are used as-is.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const certHref = (file: string) => (file.startsWith('http') ? file : `${basePath}${file}`);

// Evaluated at build time (server component): a "View certificate" link only renders
// when the file actually exists in /public — so dropping a PDF/JPG in lights it up,
// and missing files never produce a broken link.
function certAvailable(file: string): boolean {
  if (!file) return false;
  if (file.startsWith('http')) return true;
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', file));
  } catch {
    return false;
  }
}

export default function EducationPage() {
  // Oldest role is the last item; "previous" in the sequence links back to it.
  const lastCompany = companies[companies.length - 1];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        <Link href="/experience" className="text-sm text-muted transition-colors hover:text-white">
          ← Experience timeline
        </Link>

        <header className="mt-6">
          <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">Credentials</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Education &amp; Certifications
          </h1>
          <p className="mt-3 max-w-2xl text-text-soft">
            Academic background, professional certifications, and recognitions.
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {/* Education */}
          <section>
            <h2 className="border-l-2 border-brand pl-3 text-xl font-semibold tracking-tight text-white">Education</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {profile.education.map((e) => (
                <div key={e.degree} className="panel panel-pad">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-white">{e.degree}</h3>
                    {e.status && (
                      <span className="chip shrink-0 bg-warning/10 text-warning ring-1 ring-inset ring-warning/20">{e.status}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-text-soft">{e.institution}</p>
                  <p className="mt-0.5 text-xs text-muted">{e.period}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications — grouped by category, each with multiple credentials */}
          <section>
            <h2 className="border-l-2 border-brand pl-3 text-xl font-semibold tracking-tight text-white">Certifications</h2>
            <div className="mt-4 space-y-6">
              {profile.certifications.map((group) => (
                <div key={group.category}>
                  <h3 className="stat-label">{group.category}</h3>
                  <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {group.credentials.map((c) => (
                      <div key={c.title} className="panel panel-pad">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-medium text-white">{c.title}</h4>
                          {c.status && (
                            <span className="chip shrink-0 bg-warning/10 text-warning ring-1 ring-inset ring-warning/20">{c.status}</span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                        {c.period && <p className="mt-0.5 text-xs text-muted">{c.period}</p>}
                        {certAvailable(c.file) && (
                          <a
                            href={certHref(c.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block text-sm font-medium text-brand-soft hover:text-white"
                          >
                            View certificate ↗
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recognitions */}
          <section>
            <h2 className="border-l-2 border-brand pl-3 text-xl font-semibold tracking-tight text-white">Recognitions</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {profile.recognitions.map((r) => (
                <div key={r.title} className="flex items-start gap-3 rounded-lg bg-surface-2/50 px-4 py-3">
                  <span className={r.type === 'personal' ? 'text-accent' : 'text-brand-soft'}>★</span>
                  <div>
                    <div className="text-sm font-medium text-white">{r.title}</div>
                    <div className="text-xs text-muted">{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Prev / next — closes the sequence and continues to the live demo */}
        <nav className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
          <Link href={`/experience/${lastCompany.slug}`} className="text-brand-soft hover:text-white">
            ← {lastCompany.company}
          </Link>
          <Link href="/control-tower" className="text-right text-brand-soft hover:text-white">
            Open the Control Tower →
          </Link>
        </nav>
      </main>
    </>
  );
}
