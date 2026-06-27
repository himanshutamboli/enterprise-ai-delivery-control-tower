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
        mermaid: `flowchart TB
  AGENTS["Agents + Tools"] --> SDK["OTel SDK<br/>traces · metrics · logs"]
  SDK --> COL[("Collector + Stores<br/>ClickHouse · Prometheus")]
  COL --> EVAL["Eval Service<br/>LLM-as-judge"]
  COL --> DASH["Observability Dashboards"]
  EVAL --> SCORE[("Quality Scores")]
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
          'The canvas compiles to the same versioned workflow spec the runtime already executes, so there is no second execution path to maintain. Authoring stays self-serve, while versioning, validation, and an eval gate enforce governance before anything is promoted — and production observability feeds back into the canvas.',
        ],
        mermaid: `flowchart TB
  subgraph Author["Authoring · self-serve"]
    direction LR
    PAL["Component Palette<br/>agents · tools · branches"] --> UI["Visual Canvas"]
    TPL["Templates<br/>vetted starting points"] --> UI
  end
  UI --> SPEC["Workflow Spec<br/>versioned config"]
  subgraph Gov["Governance"]
    direction LR
    SPEC --> VAL["Validation<br/>schema + policy"]
    VAL --> EVAL{"Eval Gate"}
    SPEC --> VER[("Version Store<br/>history + rollback")]
  end
  EVAL -->|fail| FIX["Author Feedback"]
  FIX --> UI
  EVAL -->|pass| REG[("Flow Registry")]
  subgraph Run["Runtime"]
    direction LR
    RT["Agent Runtime<br/>orchestrator + tools"] --> OBS["Observability<br/>traces · cost · quality"]
  end
  REG --> RT
  VER -. restore .-> REG
  OBS -. feedback .-> UI`,
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
        heading: 'Problem',
        paragraphs: [
          'The on-prem data estate had outgrown its hardware. Analytics jobs queued for hours, storage and compute were capped, and there was no elastic capacity for the AI/ML workloads the business wanted to launch. Fixed infrastructure cost was high and rising, and every new data initiative waited on procurement.',
          'The mandate was to move the estate to a governed cloud lakehouse without disrupting daily operations — protecting data correctness and business continuity while unlocking elastic compute and lower steady-state cost.',
        ],
      },
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
        heading: 'Architecture',
        paragraphs: [
          'Source systems land in a governed cloud zone (IAM, networking, and Terraform baselines), flow through Airflow ingestion into a Databricks + Snowflake lakehouse, and serve both BI and AI/ML workloads. Critical pipelines dual-run against on-prem with automated reconciliation until cutover.',
        ],
        mermaid: `flowchart TB
  subgraph OnPrem["On-Prem · source"]
    direction LR
    SRC["Data Sources<br/>DBs · files · streams"]
    JOBS["Legacy Jobs<br/>schedulers"]
  end
  subgraph Landing["Cloud Landing Zone"]
    direction LR
    IAM["IAM + Network<br/>Terraform baselines"] --> ING["Ingestion<br/>Airflow"]
  end
  subgraph Lake["Governed Lakehouse"]
    direction LR
    RAW[("Raw / Bronze")] --> CUR[("Curated<br/>Databricks + Snowflake")]
  end
  subgraph Consume["Consumption"]
    direction LR
    BI["Analytics + BI"]
    AI["AI / ML Workloads"]
  end
  SRC --> IAM
  JOBS --> ING
  ING --> RAW
  CUR --> BI
  CUR --> AI
  CUR --> GOV["Governance<br/>catalog · lineage · FinOps"]
  SRC -. dual-run + reconcile .-> CUR`,
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
  {
    slug: 'loan-management-platform',
    title: 'Loan Management Platform Modernization',
    subtitle: 'Re-platforming a monolithic lending system into scalable SaaS',
    role: 'Technical Agile Project Manager',
    timeline: '2019 – 2021 · 4 quarters',
    domain: 'FinTech · Lending SaaS',
    stack: ['Java / Spring', 'React', 'AWS', 'PostgreSQL', 'CI/CD', 'Jira'],
    summary:
      'A business-critical loan management platform shipped slowly and unpredictably off a monolith. I led the agile transformation and SaaS re-platforming — incremental releases, CI/CD, and a single backlog — lifting throughput while protecting a system that processes live lending operations daily.',
    heroMetrics: [
      { label: 'Sprint velocity', value: '+40%' },
      { label: 'Epics delivered', value: '100+' },
      { label: 'Data migrated', value: '2TB+' },
      { label: 'Customer satisfaction', value: '+25%' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'The lending platform was a monolith with six-week, big-bang releases. Velocity was low and unpredictable, defects escaped to production, and onboarding new enterprise customers meant risky, manual deployments.',
        ],
      },
      {
        heading: 'Product Strategy',
        bullets: [
          'Decompose the monolith into modular services behind a multi-tenant SaaS boundary.',
          'Shift releases from six-week big-bangs to weekly increments with CI/CD.',
          'Unify product + engineering on a single prioritized backlog and clear definition-of-done.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: ['Strangler-pattern modernization — services peel off the monolith while a CI/CD pipeline ships incrementally to the multi-tenant platform.'],
        mermaid: `flowchart TB
  subgraph Channels["Channels"]
    direction LR
    WEB["Web App<br/>React"]
    API["Partner APIs"]
  end
  GW["API Gateway"]
  subgraph Services["Modular Services"]
    direction LR
    ORIG["Origination"] --> SERV["Servicing"]
    SERV --> BILL["Billing"]
  end
  subgraph Platform["Multi-Tenant SaaS"]
    direction LR
    RT["Service Runtime"]
    DB[("PostgreSQL<br/>per-tenant")]
  end
  WEB --> GW
  API --> GW
  GW --> ORIG
  ORIG --> RT
  RT --> DB
  CICD["CI/CD Pipeline"] --> RT
  MONO["Legacy Monolith"] -. strangler migration .-> ORIG`,
      },
      {
        heading: 'Delivery Approach',
        bullets: [
          'Two-week sprints with flow metrics (velocity, cycle time) driving retrospectives.',
          'Automated test + deploy gates before each incremental release.',
          'Phased customer migration with parallel run and reconciliation.',
        ],
      },
      {
        heading: 'Results',
        metrics: [
          { label: 'Sprint velocity', value: '+40%', sub: 'over 3 quarters' },
          { label: 'Release cadence', value: '6w → weekly', sub: 'incremental' },
          { label: 'Escaped defects', value: '−45%', sub: 'post-CI/CD' },
          { label: 'C-SAT', value: '+25%', sub: 'enterprise customers' },
        ],
      },
      {
        heading: 'Lessons Learned',
        bullets: [
          'Incremental release cadence de-risks everything downstream.',
          'A single shared backlog ends the product-vs-engineering tug of war.',
          'Velocity is an outcome of flow discipline, not a target to chase directly.',
        ],
      },
    ],
  },
  {
    slug: 'twilio-marketo-migration',
    title: 'Customer Engagement Migration — Twilio to Marketo',
    subtitle: 'Consolidating messaging and marketing automation onto one stack',
    role: 'Technical Program Manager',
    timeline: '2 quarters',
    domain: 'MarTech · Customer Engagement',
    stack: ['Twilio', 'Marketo', 'REST / Webhooks', 'ETL', 'Segment'],
    summary:
      'Customer communications were split across Twilio messaging flows and disconnected campaign tools, fragmenting the customer view and slowing campaigns. I led the migration that consolidated engagement onto Marketo, mapping flows and journeys with a dual-run cutover and zero campaign downtime.',
    heroMetrics: [
      { label: 'Campaign launch time', value: '−50%' },
      { label: 'Journeys migrated', value: '60+' },
      { label: 'Deliverability', value: '+18%' },
      { label: 'Campaign downtime', value: '0' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Messaging logic lived in Twilio while campaign orchestration lived elsewhere — no unified customer profile, duplicated audiences, and slow, error-prone campaign launches.',
        ],
      },
      {
        heading: 'Approach',
        bullets: [
          'Audited every Twilio flow and campaign; built a journey-by-journey mapping to Marketo programs.',
          'Standardized a unified profile + consent model before migrating audiences.',
          'Dual-ran critical journeys and reconciled sends before cutover.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: ['Flows and audiences are mapped through an ETL/normalization layer into Marketo programs, with webhooks preserving real-time triggers.'],
        mermaid: `flowchart TB
  subgraph Source["Source · Twilio"]
    direction LR
    TWF["Messaging Flows"]
    TWA["Audiences"]
  end
  subgraph Migrate["Migration Layer"]
    direction LR
    MAP["Journey Mapping"] --> ETL["ETL + Normalize"]
    ETL --> PROF["Unified Profile<br/>+ consent"]
  end
  subgraph Target["Target · Marketo"]
    direction LR
    MKTO[("Programs & Journeys")] --> CH["Email · SMS · Push"]
  end
  TWF --> MAP
  TWA --> MAP
  PROF --> MKTO
  HOOK["Webhooks<br/>real-time triggers"] --> MKTO
  TWF -. dual-run + reconcile .-> MKTO`,
      },
      {
        heading: 'Results',
        metrics: [
          { label: 'Campaign launch time', value: '−50%', sub: 'unified tooling' },
          { label: 'Journeys migrated', value: '60+', sub: 'with parity checks' },
          { label: 'Deliverability', value: '+18%', sub: 'cleaner audiences' },
          { label: 'Downtime', value: '0', sub: 'dual-run cutover' },
        ],
      },
      {
        heading: 'Lessons Learned',
        bullets: [
          'Migrate the customer profile + consent model first; journeys follow cleanly.',
          'Parity mapping per journey is the only safe basis for cutover.',
        ],
      },
    ],
  },
  {
    slug: 'netsuite-implementation',
    title: 'Enterprise ERP — NetSuite Implementation',
    subtitle: 'Standardizing finance and operations on a single ERP',
    role: 'Technical Program Manager',
    timeline: '3 quarters',
    domain: 'ERP · Finance Operations',
    stack: ['NetSuite', 'SuiteScript', 'REST / SOAP', 'Data Migration', 'SSO'],
    summary:
      'Finance and operations ran on siloed systems and spreadsheets, with manual reconciliation and slow close cycles. I led the NetSuite implementation — phased rollout, data migration, and system integrations — to standardize processes and shorten the financial close.',
    heroMetrics: [
      { label: 'Month-end close', value: '−40%' },
      { label: 'Systems consolidated', value: '5 → 1' },
      { label: 'Manual reconciliation', value: '−60%' },
      { label: 'Go-lives', value: 'on schedule' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Disconnected finance, billing, and inventory systems forced manual reconciliation and a long, error-prone month-end close with limited real-time visibility.',
        ],
      },
      {
        heading: 'Approach',
        bullets: [
          'Phased rollout by module (GL → AR/AP → inventory) to contain risk.',
          'Mapped and migrated master + transactional data with validation and reconciliation.',
          'Integrated upstream/downstream systems via REST/SOAP and SuiteScript automations.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: ['Source systems feed a migration + integration layer into NetSuite, with SuiteScript automations and SSO for governed access.'],
        mermaid: `flowchart TB
  subgraph Legacy["Legacy Systems"]
    direction LR
    FIN["Finance"]
    BILL["Billing"]
    INV["Inventory"]
  end
  subgraph Bridge["Migration + Integration"]
    direction LR
    MIG["Data Migration<br/>+ reconciliation"] --> INT["Integration Layer<br/>REST / SOAP"]
  end
  subgraph ERP["NetSuite ERP"]
    direction LR
    CORE[("GL · AR/AP · Inventory")]
    SS["SuiteScript<br/>automations"] --> CORE
  end
  FIN --> MIG
  BILL --> MIG
  INV --> MIG
  INT --> CORE
  CORE --> RPT["Reporting +<br/>real-time dashboards"]`,
      },
      {
        heading: 'Results',
        metrics: [
          { label: 'Month-end close', value: '−40%', sub: 'faster cycle' },
          { label: 'Systems consolidated', value: '5 → 1', sub: 'single ERP' },
          { label: 'Manual reconciliation', value: '−60%', sub: 'automated' },
          { label: 'Rollout', value: 'on schedule', sub: 'phased go-lives' },
        ],
      },
      {
        heading: 'Lessons Learned',
        bullets: [
          'Phase ERP go-lives by module — a big-bang cutover is rarely worth the risk.',
          'Data migration is the program; reconciliation gates protect the close.',
        ],
      },
    ],
  },
  {
    slug: 'tableau-powerbi-migration',
    title: 'BI Platform Migration — Tableau to Power BI',
    subtitle: 'Migrating enterprise reporting with zero reporting downtime',
    role: 'Technical Program Manager · Data',
    timeline: '2 quarters',
    domain: 'Data · Business Intelligence',
    stack: ['Tableau', 'Power BI', 'Azure', 'DAX', 'ADF / ETL'],
    summary:
      'An enterprise reporting estate on Tableau needed to move to Power BI for cost and ecosystem fit, without disrupting the dashboards leadership relied on daily. I led the migration — inventory, parity mapping, rebuild, and parallel run — landing it with no reporting downtime.',
    heroMetrics: [
      { label: 'Dashboards migrated', value: '200+' },
      { label: 'Licensing cost', value: '−35%' },
      { label: 'Refresh time', value: '−30%' },
      { label: 'Reporting downtime', value: '0' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Hundreds of business-critical Tableau dashboards needed to migrate to Power BI for cost and Microsoft-ecosystem alignment — without breaking the reports executives depend on every morning.',
        ],
      },
      {
        heading: 'Approach',
        bullets: [
          'Inventoried and tiered all dashboards by usage and criticality.',
          'Built a parity mapping (visuals, calculations, data sources) and rebuilt in Power BI with DAX.',
          'Ran Tableau and Power BI in parallel, reconciled outputs, then decommissioned by tier.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: ['Sources flow through Azure Data Factory into a governed model; dashboards are rebuilt in Power BI and validated against Tableau during a parallel run.'],
        mermaid: `flowchart TB
  subgraph Sources["Data Sources"]
    direction LR
    DB["Databases"]
    APP["Apps · files"]
  end
  subgraph Pipeline["Pipeline"]
    direction LR
    ADF["Azure Data Factory<br/>ETL"] --> MODEL[("Semantic Model<br/>DAX")]
  end
  subgraph Target["Target · Power BI"]
    direction LR
    PBI["Dashboards"] --> WS["Workspaces<br/>by usage tier"]
  end
  DB --> ADF
  APP --> ADF
  MODEL --> PBI
  TAB["Tableau<br/>(legacy)"] -. parallel run + reconcile .-> PBI`,
      },
      {
        heading: 'Results',
        metrics: [
          { label: 'Dashboards migrated', value: '200+', sub: 'by usage tier' },
          { label: 'Licensing cost', value: '−35%', sub: 'steady state' },
          { label: 'Refresh time', value: '−30%', sub: 'optimized model' },
          { label: 'Downtime', value: '0', sub: 'parallel run' },
        ],
      },
      {
        heading: 'Lessons Learned',
        bullets: [
          'Tier dashboards by real usage — not everything deserves a migration.',
          'Parallel run + output reconciliation is what makes "zero downtime" true.',
        ],
      },
    ],
  },
  {
    slug: 'ai-xplr',
    title: 'AI XPLR — Enterprise Gen AI Opportunity Discovery & Solution Design',
    subtitle: 'From AI ambition to a feasibility-scored, ROI-prioritized agentic roadmap',
    role: 'AI Technical Program Manager',
    timeline: '2025 · ongoing',
    domain: 'GenAI Strategy · AI Product',
    stack: ['AI XPLR', 'ZBrain Builder', 'Agentic blueprints', 'ROI / feasibility scoring', 'AI COE dashboard'],
    summary:
      'Enterprises knew they wanted Gen AI but could not see where it would actually pay off — or how to get from idea to production. I drove delivery for AI XPLR (The Hackett Group / ZBrain), which discovers AI opportunities, evaluates them against an org’s real process and technology landscape, designs agentic solution blueprints, and prioritizes them by feasibility, cost, and ROI — then hands the winners to ZBrain Builder for implementation.',
    heroMetrics: [
      { label: 'Idea → roadmap', value: 'weeks → days' },
      { label: 'Use cases assessed', value: '100s' },
      { label: 'Prioritized by', value: 'ROI + feasibility' },
      { label: 'Ideation → build', value: 'one handoff' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Gen AI strategy stalled at the starting line: leaders had long wish-lists of "AI ideas" with no consistent way to judge which were feasible, what they would cost, or what return they would generate against the organization’s actual processes and tech stack. Promising ideas died in slide decks, and the few that moved forward were chosen by intuition, not evidence.',
        ],
      },
      {
        heading: 'What AI XPLR Does',
        paragraphs: ['AI XPLR turns AI ambition into an evidence-based, prioritized portfolio — and connects that portfolio directly to delivery.'],
        bullets: [
          'Opportunity discovery — surfaces where AI can reimagine work across functions.',
          'Feasibility assessment — evaluates each opportunity against the existing process and technology landscape.',
          'Agentic solution blueprints — designs how the solution would actually be built.',
          'Simulation + prioritization — scores cost, ROI, and business value to rank initiatives.',
          'AI COE dashboard — a single view of the enterprise AI portfolio and its progress.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'A staged pipeline: discover opportunities, assess feasibility against the org landscape, simulate cost/ROI, design an agentic blueprint, and produce a prioritized roadmap that feeds both an AI COE dashboard and ZBrain Builder for implementation.',
        ],
        mermaid: `flowchart TB
  subgraph Discover["Discover"]
    direction LR
    OPP["Opportunity<br/>Discovery"] --> MAP["Process + Tech<br/>Landscape Map"]
  end
  subgraph Design["Assess & Design"]
    direction LR
    FEAS["Feasibility"] --> SIM["Simulation<br/>cost · ROI · value"]
    SIM --> BP["Agentic<br/>Blueprint"]
  end
  subgraph Deliver["Prioritize & Deliver"]
    direction LR
    PRI["Prioritized Roadmap<br/>feasibility · ROI"] --> COE["AI COE<br/>Dashboard"]
    PRI --> BUILD[("ZBrain Builder<br/>implementation")]
  end
  MAP --> FEAS
  BP --> PRI`,
      },
      {
        heading: 'My Role',
        bullets: [
          'Owned program delivery and requirements for AI XPLR capabilities alongside the ZBrain platform.',
          'Shaped the opportunity-assessment and prioritization model (feasibility, cost, ROI) with product and SMEs.',
          'Connected the AI XPLR → ZBrain Builder handoff so prioritized blueprints flow straight into delivery.',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'AI XPLR moved enterprises from scattered AI wish-lists to a defensible, prioritized roadmap in days, with each initiative scored on feasibility and ROI and ready to build — closing the gap between Gen AI ideation and production deployment.',
        ],
        metrics: [
          { label: 'Idea → roadmap', value: 'weeks → days', sub: 'structured assessment' },
          { label: 'Use cases assessed', value: '100s', sub: 'across functions' },
          { label: 'Prioritization', value: 'ROI + feasibility', sub: 'evidence-based' },
          { label: 'Handoff', value: 'XPLR → Builder', sub: 'ideation to delivery' },
        ],
      },
      {
        heading: 'Lessons Learned',
        bullets: [
          'Prioritization needs a shared scoring model — feasibility and ROI beat intuition and politics.',
          'Discovery is only useful if it connects to delivery; the blueprint → build handoff is the whole point.',
          'An AI COE dashboard turns a one-off assessment into an ongoing, governed portfolio.',
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
