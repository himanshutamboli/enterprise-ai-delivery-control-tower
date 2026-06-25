/** Structured content model for portfolio case studies. */

export interface CaseSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  metrics?: { label: string; value: string; sub?: string }[];
  /** Optional inline Mermaid architecture diagram for this section. */
  mermaid?: string;
  table?: { headers: string[]; rows: string[][] };
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  domain: string;
  stack: string[];
  summary: string;
  heroMetrics: { label: string; value: string }[];
  sections: CaseSection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'zbrain-observability',
    title: 'Agent Observability for the ZBrain Multi-Agent Platform',
    subtitle: 'From black-box agents to full-trace LLMOps observability',
    role: 'AI Technical Program Manager',
    timeline: '2025 Q3 – 2026 Q1 · 2 quarters',
    domain: 'AI Observability · LLMOps',
    stack: ['ZBrain', 'OpenTelemetry', 'ClickHouse', 'LLM-as-judge', 'Grafana', 'Python'],
    summary:
      'Enterprise customers were running dozens of agents in production with no way to see why an answer was wrong, slow, or expensive. I led the program to instrument the platform end-to-end — traces, cost, and quality — turning agent debugging from days of guesswork into minutes of root-cause analysis.',
    heroMetrics: [
      { label: 'MTTR for agent incidents', value: '−55%' },
      { label: 'Hallucination rate', value: '−42%' },
      { label: 'Cost per request', value: '−28%' },
      { label: 'Trace coverage', value: '100%' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'ZBrain customers were deploying multi-agent workflows into production faster than the platform could explain them. When an agent gave a wrong answer, stalled, or burned an unexpected amount of tokens, support and engineering had no shared source of truth — only scattered logs and screenshots.',
          'Mean time to resolve agent incidents stretched to multiple days, hallucinations went undetected until a customer complained, and finance could not attribute cost to specific agents or business units. Trust in the platform was eroding precisely as adoption accelerated.',
        ],
      },
      {
        heading: 'Discovery',
        paragraphs: [
          'I ran structured discovery with platform engineering, three enterprise design partners, and the support org to separate symptoms from root causes.',
        ],
        bullets: [
          'Shadowed 12 real incident investigations to map where time was actually lost (it was reproduction, not the fix).',
          'Found there was no consistent trace ID across the orchestrator → sub-agent → tool boundary.',
          'Quality was invisible: no offline scoring of groundedness or hallucination, so regressions shipped silently.',
          'Cost was aggregated at the tenant level only — impossible to attribute to an agent or workflow.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'We standardized on OpenTelemetry-based instrumentation across the agent runtime, fanned traces and metrics into purpose-built stores, and ran an asynchronous eval service to score quality without adding request latency. Everything converged on a single observability surface.',
        ],
        mermaid: `flowchart TD
  A["Agents + Tools"] --> SDK["OTel SDK<br/>spans · metrics · logs"]
  SDK --> COL["Collector"]
  COL --> TS[("Trace Store<br/>ClickHouse")]
  COL --> MET[("Metrics")]
  TS --> EVAL["Eval Service<br/>LLM-as-judge"]
  EVAL --> SCORE[("Quality Scores")]
  TS --> DASH["Observability Dashboards"]
  MET --> DASH
  SCORE --> DASH
  DASH --> ALERT["Alerting + On-call"]`,
      },
      {
        heading: 'Requirements',
        bullets: [
          'End-to-end trace propagation across orchestrator, sub-agents, and tool calls (100% coverage).',
          'Per-agent cost and token attribution, rolled up to workflow and business unit.',
          'Asynchronous quality scoring (groundedness, hallucination) with < 1% added p95 latency.',
          'Alerting on latency, failure-rate, and quality-regression thresholds.',
          'Role-based dashboards for engineering, support, and finance from one data model.',
        ],
      },
      {
        heading: 'Metrics',
        paragraphs: ['We defined the success metrics up front and instrumented them as the program shipped.'],
        metrics: [
          { label: 'MTTR (agent incidents)', value: '−55%', sub: 'days → hours' },
          { label: 'Hallucination rate', value: '−42%', sub: 'via eval gate + retrieval fixes' },
          { label: 'Cost / request', value: '−28%', sub: 'model routing + caching insights' },
          { label: 'Undetected regressions', value: '→ 0', sub: 'caught pre-release' },
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Within two quarters, agent debugging shifted from a multi-team manual hunt to a single-pane workflow. Support resolved most agent incidents without escalating to engineering, finance gained per-agent cost attribution that informed model-routing decisions, and quality regressions were caught before release instead of by customers.',
          'The observability layer became the foundation the QA, DevOps, and Executive views were later built on — the same data model now powers this Control Tower.',
        ],
      },
      {
        heading: 'Lessons Learned',
        bullets: [
          'Trace propagation is a platform decision, not a per-team one — mandate the trace ID contract early.',
          'Quality must be scored asynchronously; coupling eval to the request path is a non-starter on latency.',
          'Cost attribution changes behavior: once teams saw per-agent spend, they optimized without being asked.',
          'One data model, many audiences — engineering, support, and finance needed different views, not different pipelines.',
        ],
      },
    ],
  },
  {
    slug: 'flow-builder',
    title: 'Flow Builder — Visual Orchestration for Enterprise AI Agents',
    subtitle: 'A no-code canvas to compose, version, and ship multi-agent workflows',
    role: 'AI Product / Program Manager',
    timeline: '2025 Q1 – 2025 Q4 · 3 quarters',
    domain: 'AI Product Management · Platform',
    stack: ['ZBrain', 'React Flow', 'Agent SDK', 'Versioned configs', 'CI eval gates'],
    summary:
      'Building a multi-agent workflow required engineers and hand-written config. That bottlenecked every new use case behind the platform team. I owned the product strategy and delivery for Flow Builder — a visual canvas that let solution teams compose, version, and ship agent workflows themselves, with governance built in.',
    heroMetrics: [
      { label: 'Time to first working flow', value: '2 wks → 1 day' },
      { label: 'Workflows shipped by non-eng', value: '70%' },
      { label: 'Platform-team bottleneck', value: '−60%' },
      { label: 'Reusable flow templates', value: '20+' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Every new agent workflow — even small variations — needed a platform engineer to write and review configuration. Solution architects and product teams had the domain knowledge but no way to express it, so the platform team became a queue that throttled the entire roadmap.',
          'Worse, hand-authored flows had no consistent versioning or pre-ship validation, so changes were risky and hard to audit.',
        ],
      },
      {
        heading: 'Product Strategy',
        paragraphs: [
          'The strategy was to move workflow authoring left — from engineers to the people who understood the use case — without giving up governance. I framed Flow Builder around three bets:',
        ],
        bullets: [
          'Visual composition: a canvas of agents, tools, and branching logic that mirrors how teams already whiteboard workflows.',
          'Safe by default: versioning, validation, and an eval gate baked into the authoring flow, not bolted on.',
          'Reusable templates: ship vetted starting points so the 80% common cases never start from a blank canvas.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'The canvas compiles to the same versioned workflow spec the runtime already executes, so there is no second execution path to maintain. Validation and eval run before promotion.',
        ],
        mermaid: `flowchart LR
  UI["Visual Canvas<br/>agents · tools · branches"] --> SPEC["Workflow Spec<br/>versioned config"]
  SPEC --> VAL["Validation<br/>schema + policy"]
  VAL --> EVAL["Eval Gate"]
  EVAL -->|pass| REG["Flow Registry"]
  EVAL -->|fail| FIX["Author Feedback"]
  REG --> RT["Agent Runtime"]`,
      },
      {
        heading: 'Roadmap',
        table: {
          headers: ['Phase', 'Scope', 'Outcome'],
          rows: [
            ['MVP', 'Canvas + linear flows + manual publish', 'Internal solution teams self-serve'],
            ['V1', 'Branching, versioning, validation', 'External design partners onboard'],
            ['V2', 'Templates, eval gate, rollback', 'Governed self-serve at GA'],
          ],
        },
      },
      {
        heading: 'KPIs',
        metrics: [
          { label: 'Time to first flow', value: '2 wks → 1 day' },
          { label: 'Flows authored by non-engineers', value: '70%' },
          { label: 'Platform-team request queue', value: '−60%' },
          { label: 'Flows shipped via templates', value: '~45%' },
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'Flow Builder turned workflow creation from an engineering ticket into a self-serve product capability. Solution teams shipped the majority of new workflows themselves, the platform team was freed to invest in core capabilities instead of bespoke configs, and every flow shipped with versioning and an eval gate — making self-serve safe rather than chaotic.',
        ],
      },
    ],
  },
  {
    slug: 'cloud-migration',
    title: 'Enterprise Data Platform Cloud Migration',
    subtitle: 'Migrating on-prem data + AI workloads to a governed cloud platform',
    role: 'Technical Program Manager',
    timeline: '2023 – 2024 · 4 quarters',
    domain: 'Cloud Migration · Data Platform',
    stack: ['AWS', 'Azure', 'Databricks', 'Snowflake', 'Terraform', 'Airflow'],
    summary:
      'A growing on-prem data estate was capping analytics and blocking AI workloads. I ran the program to migrate it to a governed cloud lakehouse — sequencing waves to protect business continuity, managing risk and cost, and keeping a wide stakeholder group aligned through a year-long change.',
    heroMetrics: [
      { label: 'Workloads migrated', value: '120+' },
      { label: 'Pipeline runtime', value: '−40%' },
      { label: 'Infra cost (steady state)', value: '−25%' },
      { label: 'Critical-path incidents', value: '0' },
    ],
    sections: [
      {
        heading: 'Migration Strategy',
        paragraphs: [
          'A big-bang cutover was off the table — the estate ran the business daily. I structured the program as sequenced waves, ordered by dependency and risk, with a clear "lift-and-shift vs. modernize" decision for each workload class.',
        ],
        bullets: [
          'Wave 0: landing zone, networking, IAM, and Terraform baselines before any data moved.',
          'Lift-and-shift for low-complexity, stable pipelines to bank early wins.',
          'Modernize high-value analytics onto the lakehouse (Databricks + Snowflake) for performance.',
          'Dual-run critical pipelines in parallel and reconcile outputs before decommissioning on-prem.',
        ],
      },
      {
        heading: 'Risk Management',
        paragraphs: [
          'The dominant risks were data correctness, business continuity, and cost overrun. Each had an owner, a mitigation, and a tracked status in the program rhythm.',
        ],
        table: {
          headers: ['Risk', 'Mitigation'],
          rows: [
            ['Data integrity drift', 'Automated row/aggregate reconciliation between old and new'],
            ['Business disruption', 'Parallel dual-run + staged cutover per wave'],
            ['Cost overrun', 'FinOps budgets, tagging, and weekly burn review'],
            ['Skills gap', 'Embedded enablement + paired migration squads'],
          ],
        },
      },
      {
        heading: 'Stakeholder Alignment',
        paragraphs: [
          'A migration of this length lives or dies on alignment. I ran a steering cadence for executives focused on risk, cost, and milestones, and a working cadence for the delivery squads — translating between them so neither was surprised.',
        ],
        bullets: [
          'Bi-weekly executive steering on RAG status, budget burn, and milestone health.',
          'Per-wave readiness reviews with data owners as explicit go/no-go gates.',
          'A single program dashboard as the shared source of truth across all groups.',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'All 120+ workloads were migrated across the planned waves with zero critical-path incidents. The lakehouse cut average pipeline runtime substantially and steady-state infrastructure cost dropped while unlocking the compute elasticity that AI and advanced analytics workloads needed.',
        ],
        metrics: [
          { label: 'Workloads migrated', value: '120+', sub: 'across sequenced waves' },
          { label: 'Pipeline runtime', value: '−40%', sub: 'on the lakehouse' },
          { label: 'Steady-state infra cost', value: '−25%', sub: 'with FinOps governance' },
          { label: 'Critical-path incidents', value: '0', sub: 'business continuity held' },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
