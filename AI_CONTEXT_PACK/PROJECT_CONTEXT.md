# PROJECT_CONTEXT

> Continuity doc 1 of 16. Read this first, then `ARCHITECTURE.md`, `FEATURES.md`, `ROADMAP.md`, `AI_INSTRUCTIONS.md`.
> Personal/career specifics live in the gitignored `PRIVATE_PROFILE.md` (repo root) — not in this public pack.

## Project name
**Enterprise AI Delivery Control Tower** — an AI TPM / Technical Program Manager portfolio.

## Business purpose
A professional portfolio that demonstrates, like an enterprise SaaS product (Datadog / Grafana / Azure-portal style), how the owner leads AI platforms end-to-end: observability, QA governance, DevOps/DORA, and program health — plus an interactive career explorer, case studies, and system-design diagrams. It is deliberately **not** a chatbot or tutorial demo.

## Executive summary
A statically-exported Next.js site, hosted free on GitHub Pages, that presents an "AI Delivery Control Tower" (5 operational dashboards) alongside a resume-driven Experience explorer, 3 case studies, and 5 Mermaid reference architectures. All data is static JSON — dashboards use realistic mock data; career data is factual from the owner's resume. Goal: convert recruiters' impression from "another chatbot" to "this TPM understands AI systems, observability, quality, DevOps, and product execution."

## User profile (generalized)
AI Product & Technical Program Manager, ~8+ years across enterprise AI, cloud/data, SaaS, and operations. Demonstrated domains: AI product management, multi-agent systems, AI observability/LLMOps, RAG, AI evaluation, QA governance, DevOps/DORA, cloud migration, executive KPI reporting. Full details in `PRIVATE_PROFILE.md`.

## Stakeholders
- **Owner** — the portfolio's subject; sole decision-maker and maintainer.
- **AI assistants** — build/maintain the site (see `AI_INSTRUCTIONS.md`).

## Primary users (audience)
- Recruiters & hiring managers for Senior / Principal / Staff TPM and AI Product/Platform Manager roles.
- Engineering leaders evaluating the owner's technical depth.

## Goals
1. Position the owner for senior AI TPM / AI PM roles.
2. Read as a real enterprise delivery console, not a resume site.
3. Be deployable and maintainable for free.

## Constraints
- **Budget = ₹0.** Free tooling only (GitHub, GitHub Pages, VS Code, AI assistants, React/Next/Tailwind/Recharts, Markdown/JSON, Mermaid).
- **No paid services** (no AWS/Azure cost, paid DB/APIs/hosting, Vercel Pro, custom domain).
- **GitHub Pages → Next.js static export** (no SSR, server actions, route handlers, runtime env, or image optimization).
- Dashboard data is **mock** (labeled); career data is **factual** (from resume).

## Success criteria
- Site builds clean to static HTML and deploys on GitHub Pages.
- Zero horizontal overflow at 375 / 768 / 1440 / 1920 px.
- A recruiter understands the owner's value within ~60 seconds.
- No invented career facts; no leaked secrets/PII in the public repo.

## Technology stack
Next.js 14.2.5 (App Router, static export) · React 18.3.1 · TypeScript 5 · Tailwind CSS 3.4 (custom dark theme) · Recharts 2.12.7 · Mermaid 11 (client-rendered) · static JSON data · GitHub Pages + GitHub Actions.

## Hosting strategy
GitHub Pages (free), public repo. Project-site subpath handled via `NEXT_PUBLIC_BASE_PATH` injected by the deploy workflow.

## Deployment strategy
Push to `main` → GitHub Actions builds the static export → publishes `out/` to Pages. See `DEPLOYMENT.md`.

## Folder structure (top level)
```
app/            App Router routes (landing, control-tower/*, experience/*, case-studies/*, system-design)
components/     layout/, ui/, charts/, experience/, qa/, Mermaid.tsx
lib/            format.ts, case-studies.ts, experience.ts, system-design.ts
data/           *_metrics.json (mock), qa_suites.json (mock), resume.json + profile.json (factual)
public/         certificates/ (PDFs), assets
prompts/        01–07 workflow prompt templates
AI_CONTEXT_PACK/ this continuity system
.github/workflows/deploy.yml
PROJECT_MEMORY.md · PRIVATE_PROFILE.md (gitignored) · README.md · config files
```
Full detail in `ARCHITECTURE.md`.

## Architecture overview
JSON-driven content → typed in `lib/` → rendered by App Router pages. Dynamic routes (`case-studies/[slug]`, `experience/[slug]`) use `generateStaticParams` to prerender one static page per entity. Interactive bits (Recharts, Mermaid, filters, the QA run simulation) are `'use client'` islands; prose/SEO stays in server components.

## Current implementation status
**~80% complete.** Built: scaffold, 5 Control Tower dashboards (incl. QA Test-Suite POC), Experience explorer + Education/Certs/Recognitions, 3 case studies, 5 system-design diagrams, full responsive pass, deploy workflow, continuity pack. Pending: go-live verification on Pages, blog/insights, and personal-brand/conversion additions (résumé download, contact/social, profile card, builds, testimonials).

## Completion percentage
**~80%** (core product + content complete; thought-leadership + conversion layer + live deploy remaining).

## Intended end state
A live, public, polished portfolio where a recruiter can: grasp the owner's identity in seconds, explore an enterprise-grade Control Tower, read deep case studies, browse the career timeline with verifiable certificates, download a résumé, read AI-PM thought leadership, and contact the owner — all free-hosted and easy to keep current via JSON edits.
