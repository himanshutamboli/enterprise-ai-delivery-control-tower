import Link from 'next/link';
import SiteHeader from '@/components/layout/SiteHeader';
import { ExecutiveIcon, ObservabilityIcon, QaIcon, DevOpsIcon, ProgramIcon } from '@/components/icons';

const MODULES = [
  { href: '/control-tower', title: 'Executive Dashboard', desc: 'Program-level KPIs: active agents, request volume, success rate, unit economics, release health.', icon: ExecutiveIcon },
  { href: '/control-tower/observability', title: 'AI Observability', desc: 'Per-agent traces, latency percentiles, token cost, failure root-cause, hallucination scoring.', icon: ObservabilityIcon },
  { href: '/control-tower/qa', title: 'QA Governance', desc: 'Test pass rates, coverage, eval regressions, escaped defects, release-readiness gates.', icon: QaIcon },
  { href: '/control-tower/devops', title: 'DevOps / DORA', desc: 'Deploy frequency, lead time, MTTR, change-failure rate, pipeline & environment health.', icon: DevOpsIcon },
  { href: '/control-tower/program', title: 'Program Health', desc: 'Budget burn, milestones, risk register, dependencies, team capacity — the TPM cockpit.', icon: ProgramIcon },
];

const SKILLS = [
  'AI Product Management', 'Technical Program Management', 'Multi-Agent Systems', 'AI Observability / LLMOps',
  'RAG Pipelines', 'AI Evaluation Frameworks', 'QA Governance', 'DevOps & DORA', 'Cloud Migration',
  'AWS · Azure', 'Databricks · Snowflake', 'Executive KPI Reporting',
];

const STATS = [
  { value: '8+ yrs', label: 'Delivering enterprise AI & data programs' },
  { value: '47', label: 'Production agents under one control tower' },
  { value: 'DORA Elite', label: 'Delivery performance benchmark' },
  { value: '₹0', label: 'Infra cost — fully static, GitHub Pages' },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      {/* Hero */}
      <div className="flex flex-col items-start gap-6">
        <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">
          AI TPM · Technical Program Manager Portfolio
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          Enterprise AI Delivery <span className="text-brand-soft">Control Tower</span>
        </h1>
        <p className="max-w-2xl text-lg text-text-soft">
          A single pane of glass for running AI products at enterprise scale — observability, quality,
          delivery performance, and program governance. Built to demonstrate how I lead AI platforms,
          not another chatbot demo.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/experience"
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-soft"
          >
            Explore my Experience →
          </Link>
          <Link
            href="/control-tower"
            className="rounded-lg border border-border-soft bg-surface px-5 py-2.5 text-sm font-semibold text-text-soft transition-colors hover:border-brand hover:text-white"
          >
            Open the Control Tower
          </Link>
          <a
            href="#modules"
            className="px-2 text-sm font-medium text-muted transition-colors hover:text-white"
          >
            Explore modules ↓
          </a>
        </div>
        <p className="text-sm text-muted">
          Start with my experience to understand the profile, then explore the live Control Tower.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="panel panel-pad">
            <div className="text-2xl font-semibold tracking-tight text-white">{s.value}</div>
            <div className="mt-1 text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div id="modules" className="mt-20 scroll-mt-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Five operational dashboards</h2>
        <p className="mt-2 max-w-2xl text-text-soft">
          Each module mirrors a real responsibility of an AI platform TPM — modeled on tools like Datadog,
          Grafana, and the Azure portal, but focused on AI delivery.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="panel group panel-pad transition-colors hover:border-border-soft"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/15 text-brand-soft">
                  <m.icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-white">{m.title}</h3>
              </div>
              <p className="mt-3 text-sm text-text-soft">{m.desc}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand-soft opacity-0 transition-opacity group-hover:opacity-100">
                View dashboard →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-white">What this portfolio demonstrates</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span key={s} className="chip bg-surface text-text-soft ring-1 ring-inset ring-border">{s}</span>
          ))}
        </div>
      </div>

      {/* Explore further */}
      <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/experience" className="panel group panel-pad transition-colors hover:border-border-soft">
          <h3 className="text-lg font-semibold text-white">Experience →</h3>
          <p className="mt-2 text-sm text-text-soft">
            8+ years across six companies — AI platform delivery, cloud data modernization, SaaS, and
            automation — each told as an interactive case study with metrics.
          </p>
        </Link>
        <Link href="/case-studies" className="panel group panel-pad transition-colors hover:border-border-soft">
          <h3 className="text-lg font-semibold text-white">Case Studies →</h3>
          <p className="mt-2 text-sm text-text-soft">
            Deep dives on agent observability, visual workflow orchestration, and a cloud data migration —
            framed as problem, decisions, architecture, metrics, outcome.
          </p>
        </Link>
        <Link href="/system-design" className="panel group panel-pad transition-colors hover:border-border-soft">
          <h3 className="text-lg font-semibold text-white">System Design →</h3>
          <p className="mt-2 text-sm text-text-soft">
            Reference architectures for multi-agent systems, RAG, observability, evaluation, and LLMOps —
            rendered as live diagrams.
          </p>
        </Link>
      </div>

      {/* Footer note */}
      <div className="mt-20 border-t border-border pt-6 text-sm text-muted">
        <p>
          All data shown is realistic mock data for demonstration. The platform context (ZBrain multi-agent
          system, observability, Flow Builder, RAG) reflects real enterprise programs I have delivered.
        </p>
        <p className="mt-2">Built with Next.js, Tailwind CSS & Recharts · statically exported · hosted free on GitHub Pages.</p>
      </div>
      </div>
    </>
  );
}
