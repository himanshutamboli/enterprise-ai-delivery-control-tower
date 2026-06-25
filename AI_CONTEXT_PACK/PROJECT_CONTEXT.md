# PROJECT_CONTEXT

> Portable context for AI assistants. Read this first, then `DECISIONS.md`, `ROADMAP.md`, and `AI_INSTRUCTIONS.md`.
> Personal/career specifics live in the gitignored `PRIVATE_PROFILE.md` (not in this pack if the repo is public).

## Project purpose

An **Enterprise AI Delivery Control Tower** — a professional portfolio for an **AI Product / Technical Program Manager (TPM)**. It is deliberately *not* a chatbot or tutorial demo. It presents, like an enterprise SaaS product (Datadog / Grafana / Azure-portal style), how the owner leads AI platforms: observability, QA governance, DevOps/DORA, program health, plus an interactive career experience explorer, case studies, and system-design diagrams.

The portfolio should make a recruiter conclude: *"This TPM understands AI systems deeply — observability, quality, DevOps, product execution"* — not *"another chatbot."*

## User profile (generalized)

- Role: AI Product & Technical Program Manager, ~8+ years across enterprise AI, cloud/data, SaaS, and operations.
- Strengths the portfolio demonstrates: AI product management, multi-agent systems, AI observability / LLMOps, RAG, AI evaluation, QA governance, DevOps/DORA, cloud migration, executive KPI reporting.
- Detailed resume, company names, metrics, education, certifications, and contact info: **see `PRIVATE_PROFILE.md`** (and the app data files `data/resume.json` + `data/profile.json`, which are the live site content).

## Goals

- Position the owner for Senior / Principal / Staff TPM and AI Product/Platform Manager roles.
- Look like a real enterprise delivery console, not a resume site.
- Be fully deployable for free.

## Constraints

- **Budget = ₹0.** Free tooling only (GitHub, GitHub Pages, VS Code, Claude Code/Cursor/Codex, React/Next/Tailwind/Recharts, Markdown/JSON, Mermaid).
- **No paid services**: no AWS/Azure cost, no paid DB/APIs/hosting, no Vercel Pro, no custom domain (optional later).
- **Must deploy on GitHub Pages** → requires Next.js **static export** (no SSR / server runtime / server APIs).
- All dashboard data is **mock** (realistic, labeled as such). All career data is **factual** and sourced from the resume.

## Architecture

- **Next.js 14 App Router**, `output: 'export'` → static HTML in `out/`. No server at runtime.
- **JSON-driven content**: pages read from `data/*.json`; nothing is hardcoded per-entity. Dynamic routes use `generateStaticParams` to prerender one static page per item (case studies, experience companies).
- **Client islands** for interactivity: Recharts charts and Mermaid diagrams are `'use client'` components that render after hydration (works under static export). Server components hold the prose/SEO content.
- **base path** is injected at build via `NEXT_PUBLIC_BASE_PATH` so the site works under a GitHub Pages project subpath.
- **Deploy**: GitHub Actions workflow builds and publishes `out/` to Pages.

## Technology stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2 (App Router, static export) |
| Language | TypeScript 5 |
| UI | React 18.3 |
| Styling | Tailwind CSS 3.4 (custom dark "control tower" palette) |
| Charts | Recharts 2.12 |
| Diagrams | Mermaid 11 (client-rendered) |
| Data | Static JSON under `data/` |
| Hosting | GitHub Pages via GitHub Actions |

## Folder structure

```
app/
  layout.tsx, page.tsx, globals.css        # root + landing
  control-tower/                           # flagship: shared sidebar layout
    page.tsx (Executive), observability/, qa/, devops/, program/
  experience/                              # career explorer (resume-driven)
    page.tsx (timeline+filter), [slug]/, education/
  case-studies/  page.tsx, [slug]/
  system-design/ page.tsx                  # 5 Mermaid architectures
components/
  layout/   Sidebar, Topbar, MobileNav, SiteHeader
  ui/       KpiCard, Panel, StatusBadge
  charts/   ChartKit (themed Recharts tooltip/axes)
  experience/ Timeline, ExperienceExplorer
  Mermaid.tsx                              # client diagram renderer
lib/        format.ts, case-studies.ts, experience.ts, system-design.ts
data/       executive/agent/qa/devops/program_metrics.json (mock),
            resume.json + profile.json (factual career data)
public/certificates/                       # certificate PDFs/JPGs
prompts/    01–07 workflow prompt templates
next.config.mjs, tailwind.config.ts, tsconfig.json, .github/workflows/deploy.yml
```

## Current implementation status

**Done:** project scaffold; Control Tower (Executive, AI Observability, QA, DevOps/DORA, Program Health); 3 case studies; System Design (5 Mermaid diagrams); resume-driven Experience explorer with tag filtering + per-company detail pages; Education/Certifications/Recognitions page with auto-appearing certificate links; certificate files hosted in `public/certificates/`; full mobile→desktop responsive pass; GitHub Actions deploy workflow authored.

**Not yet:** blog section; `git init` + first commit + enabling GitHub Pages (not deployed live yet).

See `ROADMAP.md` for the running status and `DECISIONS.md` for the why behind the stack.
