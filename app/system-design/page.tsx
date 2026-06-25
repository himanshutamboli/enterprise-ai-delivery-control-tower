import type { Metadata } from 'next';
import SiteHeader from '@/components/layout/SiteHeader';
import Mermaid from '@/components/Mermaid';
import { diagrams } from '@/lib/system-design';

export const metadata: Metadata = {
  title: 'System Design · AI Delivery Control Tower',
  description:
    'Architecture diagrams for enterprise AI: multi-agent systems, RAG, observability, evaluation, and LLMOps.',
};

export default function SystemDesignPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">System Design</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Reference architectures for enterprise AI
        </h1>
        <p className="mt-3 max-w-2xl text-text-soft">
          The architectural patterns behind the platforms in these case studies — how I think about
          multi-agent systems, retrieval, observability, evaluation, and the operational lifecycle.
        </p>

        {/* Quick jump */}
        <nav className="mt-8 flex flex-wrap gap-2">
          {diagrams.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              className="chip bg-surface text-text-soft ring-1 ring-inset ring-border transition-colors hover:text-white"
            >
              {d.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-12">
          {diagrams.map((d) => (
            <section key={d.id} id={d.id} className="scroll-mt-20">
              <h2 className="text-xl font-semibold tracking-tight text-white">{d.title}</h2>
              <p className="mt-2 max-w-3xl text-sm text-text-soft">{d.summary}</p>
              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
                <Mermaid id={d.id} chart={d.chart} />
                <aside className="panel panel-pad">
                  <h3 className="stat-label">Key components</h3>
                  <ul className="mt-3 space-y-2 text-sm text-text-soft">
                    {d.components.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-soft" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
