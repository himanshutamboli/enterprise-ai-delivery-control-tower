/** Architecture diagrams (Mermaid) for the System Design section. */

export interface Diagram {
  id: string;
  title: string;
  summary: string;
  chart: string;
  components: string[];
}

export const diagrams: Diagram[] = [
  {
    id: 'multi-agent',
    title: 'Multi-Agent Architecture',
    summary:
      'A planner/orchestrator agent decomposes requests and routes work to specialized agents that share memory and a governed tool layer. Every hop is traced and policy-checked.',
    components: [
      'Orchestrator/planner agent for decomposition & routing',
      'Specialized agents (retrieval, analysis, execution)',
      'Shared short- and long-term memory',
      'Governed tool layer (APIs, databases, search)',
      'Guardrails for PII, safety, and cost policy',
      'Trace emission to the observability bus on every hop',
    ],
    chart: `flowchart TD
  U["User / API Request"] --> GW["API Gateway + Auth"]
  GW --> ORC["Orchestrator Agent<br/>planner + router"]
  ORC --> MEM["Shared Memory<br/>short + long term"]
  ORC --> SA1["Retrieval Agent"]
  ORC --> SA2["Analyst Agent"]
  ORC --> SA3["Executor Agent"]
  SA1 --> TOOLS["Tool Layer<br/>APIs · DB · search"]
  SA2 --> TOOLS
  SA3 --> TOOLS
  ORC --> GRD["Guardrails + Policy<br/>PII · safety · cost"]
  GRD --> OUT["Response"]
  ORC -. traces .-> OBS["Observability Bus"]
  SA1 -. traces .-> OBS
  SA2 -. traces .-> OBS
  SA3 -. traces .-> OBS`,
  },
  {
    id: 'rag',
    title: 'RAG Architecture',
    summary:
      'A two-path design: an offline ingestion pipeline builds a hybrid index, and an online query path retrieves, reranks, generates, and verifies grounding before returning sourced answers.',
    components: [
      'Ingestion: chunking, metadata enrichment, embeddings',
      'Hybrid retrieval (BM25 + vector) for recall + precision',
      'Reranker to sharpen the top-k context',
      'Grounding / citation check to suppress hallucination',
      'Answers always returned with verifiable sources',
    ],
    chart: `flowchart LR
  subgraph Ingest["Ingestion Pipeline"]
    SRC["Source Docs<br/>SharePoint · S3 · DBs"] --> CHK["Chunking +<br/>Metadata"]
    CHK --> EMB["Embedding Model"]
    EMB --> VDB[("Vector Store")]
  end
  subgraph Query["Query Path"]
    Q["User Query"] --> QE["Query Rewrite +<br/>Embed"]
    QE --> RET["Retriever<br/>hybrid BM25 + vector"]
    RET --> RR["Reranker"]
    RR --> CTX["Context Assembler"]
    CTX --> LLM["LLM Generation"]
    LLM --> GRND["Grounding /<br/>Citation Check"]
    GRND --> ANS["Answer + Sources"]
  end
  VDB --> RET`,
  },
  {
    id: 'observability',
    title: 'Agent Observability Architecture',
    summary:
      'OpenTelemetry instrumentation streams spans, metrics, and logs into a trace store; an eval service scores quality offline; all of it converges on the Control Tower dashboards and alerting.',
    components: [
      'OTel SDK instrumentation in the agent runtime',
      'Collector fan-out to trace + metrics stores',
      'LLM-as-judge eval service for quality scoring',
      'Unified dashboards (this Control Tower)',
      'Threshold-based alerting into on-call',
    ],
    chart: `flowchart TD
  subgraph Apps["Agent Runtime"]
    A1["Agents + Tools"] --> SDK["OTel SDK<br/>spans · metrics · logs"]
  end
  SDK --> COL["Collector<br/>OpenTelemetry"]
  COL --> TS[("Trace Store<br/>ClickHouse")]
  COL --> MET[("Metrics<br/>Prometheus")]
  TS --> EVAL["Eval Service<br/>LLM-as-judge"]
  EVAL --> SCORE[("Quality Scores<br/>hallucination · groundedness")]
  TS --> DASH["Dashboards<br/>Control Tower"]
  MET --> DASH
  SCORE --> DASH
  DASH --> ALERT["Alerting +<br/>On-call"]`,
  },
  {
    id: 'eval-framework',
    title: 'AI Evaluation Framework',
    summary:
      'Candidate prompts and models run against golden and adversarial datasets through a harness that combines LLM-as-judge with heuristics, then a regression gate decides promotion in CI.',
    components: [
      'Versioned golden + adversarial eval datasets',
      'Harness combining LLM-as-judge and deterministic heuristics',
      'Multi-dimensional metrics: accuracy, groundedness, toxicity, cost, latency',
      'Regression gate wired into CI/CD',
      'Eval trend store for longitudinal quality tracking',
    ],
    chart: `flowchart LR
  DS[("Eval Datasets<br/>golden + adversarial")] --> HARN["Eval Harness"]
  CAND["Prompt / Model<br/>Candidate"] --> HARN
  HARN --> JUDGE["LLM-as-Judge +<br/>Heuristics"]
  JUDGE --> METRICS["Metrics<br/>accuracy · groundedness<br/>toxicity · cost · latency"]
  METRICS --> GATE{"Regression<br/>Gate"}
  GATE -->|pass| SHIP["Promote to<br/>Staging / Prod"]
  GATE -->|fail| BLOCK["Block + Report"]
  METRICS --> TREND["Eval Trend Store"]`,
  },
  {
    id: 'llmops',
    title: 'LLMOps Framework',
    summary:
      'The end-to-end lifecycle: versioned prompts and models flow through experiments, an eval gate, and canary deploys into production, where monitoring feeds a data flywheel back to development.',
    components: [
      'Prompt + model versioning and experiment tracking',
      'Eval gate as a required CI/CD step',
      'Canary deploys with automatic rollback',
      'Production monitoring + observability',
      'Feedback loop / data flywheel back into development',
    ],
    chart: `flowchart LR
  subgraph Dev["Develop"]
    PV["Prompt + Model<br/>Versioning"] --> EXP["Experiments"]
  end
  subgraph CICD["CI / CD"]
    EXP --> EG["Eval Gate"]
    EG --> CAN["Canary Deploy"]
  end
  subgraph Prod["Operate"]
    CAN --> SERVE["Serving +<br/>Routing"]
    SERVE --> MON["Monitoring +<br/>Observability"]
    MON --> FB["Feedback +<br/>Data Flywheel"]
  end
  FB --> PV`,
  },
];
