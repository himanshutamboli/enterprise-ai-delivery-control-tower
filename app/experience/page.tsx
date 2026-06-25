import type { Metadata } from 'next';
import SiteHeader from '@/components/layout/SiteHeader';
import ExperienceExplorer from '@/components/experience/ExperienceExplorer';
import Link from 'next/link';
import { allTags, companies } from '@/lib/experience';

export const metadata: Metadata = {
  title: 'Experience · AI Delivery Control Tower',
  description:
    'Career experience explorer — AI platform product delivery, enterprise data modernization, SaaS delivery, AI/R&D, and operations automation, told as executive case studies.',
};

export default function ExperiencePage() {
  const earliest = companies[companies.length - 1];
  const startYear = Math.floor(earliest.start / 100);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">Career Experience</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Professional experience
        </h1>
        <p className="mt-3 max-w-2xl text-text-soft">
          A Technical Program Manager track record across AI platforms, enterprise data, SaaS, and
          operations. Filter by focus area, or click any company to open its full case study.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="chip bg-surface text-text-soft ring-1 ring-inset ring-border">{companies.length} companies</span>
          <span className="chip bg-surface text-text-soft ring-1 ring-inset ring-border">{startYear} — Present</span>
          <span className="chip bg-surface text-text-soft ring-1 ring-inset ring-border">AI · Data · SaaS · Cloud</span>
        </div>

        <div className="mt-10">
          <ExperienceExplorer companies={companies} tags={allTags} />
        </div>

        {/* Continuation into credentials — the final step in the sequence */}
        <Link
          href="/experience/education"
          className="panel group mt-8 flex items-center justify-between gap-4 panel-pad transition-colors hover:border-border-soft"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">Education, Certifications &amp; Recognitions →</h3>
            <p className="mt-1 text-sm text-text-soft">
              Academic background, professional certifications, and awards.
            </p>
          </div>
          <span className="shrink-0 text-2xl text-brand-soft transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </main>
    </>
  );
}
