# Enterprise AI Delivery Control Tower

A portfolio project demonstrating **AI Product & Technical Program Management** at enterprise scale.

This is not a chatbot demo. It's a single pane of glass — modeled on Datadog, Grafana, and the
Azure portal — for running AI products in production: **observability, quality governance, delivery
performance (DORA), and program health.**

> Built by an AI TPM with 8+ years delivering enterprise AI platforms, multi-agent systems,
> observability, RAG pipelines, and cloud/data programs.

## Live demo

Deployed free via GitHub Pages → enable Pages (Settings → Pages → Source: **GitHub Actions**) and push to `main`.

## Modules

| Dashboard | What it demonstrates |
| --- | --- |
| **Executive** | Program KPIs — active agents, request volume, success rate, cost/request, token spend, release health, model mix, BU adoption |
| **AI Observability** | Per-agent traces, latency percentiles (p50/p95/p99), token cost, failure root-cause, hallucination scoring — LLMOps |
| **QA Governance** | Pass rate & coverage trends, eval regressions, escaped defects, defects by severity, release-readiness gates |
| **DevOps / DORA** | Deploy frequency, lead time, MTTR, change-failure rate, CI/CD pipeline & environment health |
| **Program Health** | Budget burn vs plan, milestone roadmap, risk register, dependencies, team capacity — the TPM cockpit |

## Tech stack

- **Next.js 14** (App Router, static export — no server runtime)
- **React 18** + **TypeScript**
- **Tailwind CSS** for the dark control-tower theme
- **Recharts** for visualization
- **Static JSON** mock data under [`/data`](./data) — no backend, no paid APIs
- **GitHub Pages** hosting via GitHub Actions (₹0 infra)

## Project structure

```
app/                      App Router pages
  page.tsx                Landing / about
  control-tower/          Dashboard shell (sidebar + mobile nav)
    page.tsx              Executive
    observability/        AI Observability
    qa/                   QA Governance
    devops/               DevOps / DORA
    program/              Program Health
components/
  layout/                 Sidebar, Topbar, MobileNav
  ui/                     KpiCard, Panel, StatusBadge
  charts/                 Shared Recharts toolkit (themed tooltip, axes)
data/                     Mock enterprise datasets (JSON)
lib/format.ts             Formatting + status/color helpers
.github/workflows/        GitHub Pages deploy pipeline
```

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & preview the static export

```bash
npm run build        # outputs to ./out
npm run serve        # serves ./out locally
```

## Deployment notes

GitHub Pages serves project sites under `/<repo-name>`. The deploy workflow resolves this automatically
via `actions/configure-pages` and passes it to Next.js as `NEXT_PUBLIC_BASE_PATH`, so links and assets
resolve correctly without manual config.

## Data

All metrics are realistic mock data for demonstration. The platform context (ZBrain multi-agent system,
agent observability, Flow Builder, RAG pipelines, LLMOps) reflects real enterprise programs delivered by
the author.

---

_Roadmap: case studies (ZBrain Observability, Flow Builder, Cloud Migration), Mermaid system-design
diagrams (multi-agent, RAG, observability, eval framework, LLMOps), and a technical blog._
