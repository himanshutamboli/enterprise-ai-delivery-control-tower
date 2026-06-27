# Enterprise AI Delivery Control Tower Portfolio

## Purpose

This repository serves as my professional AI TPM / Technical Program Manager portfolio.

The goal is NOT to demonstrate full-stack engineering expertise.

The goal is to demonstrate:

* AI Product Management
* Technical Program Management
* Multi-Agent AI understanding
* AI Observability
* QA Governance
* DevOps & Delivery Metrics
* Product Thinking
* Enterprise Architecture Thinking
* Cloud & Data Platform Knowledge
* Executive Reporting and KPI Design

This portfolio should position me for:

* Senior TPM
* Principal TPM
* Staff TPM
* AI Product Manager
* GenAI Program Manager
* AI Platform Product Manager

roles.

---

# Personal Background

AI Product & Program Manager with 8+ years of experience delivering:

* Enterprise AI Products
* Multi-Agent Platforms
* Cloud Migration Programs
* Data Platforms
* SaaS Products
* DataOps Initiatives

Key experience:

* ZBrain Multi-Agent Platform
* Agent Observability
* Flow Builder
* RAG Pipelines
* LLMOps
* AWS
* Azure
* Databricks
* Snowflake
* Agile Delivery
* Program Governance

This portfolio must reflect real-world enterprise experience rather than tutorial projects.

---

# Budget Constraints

Budget = ₹0

Allowed:

* GitHub
* GitHub Pages
* VS Code
* Claude Code
* Codex
* Cursor
* React
* Next.js
* Tailwind
* Recharts
* Markdown
* JSON
* Mermaid Diagrams
* Draw.io

Avoid:

* AWS costs
* Azure costs
* Paid databases
* Paid APIs
* Paid hosting
* Vercel Pro
* Custom domains (optional later)

Everything should be deployable free via GitHub Pages.

---

# Portfolio Strategy

Do NOT build generic projects such as:

* Chatbot
* PDF Chatbot
* Simple RAG Demo
* Weather App
* To-Do App

These do not differentiate an experienced TPM.

Instead build enterprise-focused dashboards and case studies.

---

# Flagship Project

Enterprise AI Delivery Control Tower

This should look similar to:

* Datadog
* Grafana
* Azure Portal
* Splunk
* New Relic

but focused on AI delivery and program execution.

---

# Dashboard Modules

## Executive Dashboard

KPIs:

* Active Agents
* Daily Requests
* Success Rate
* Cost Per Request
* Total Token Consumption
* Production Incidents
* Release Health

---

## AI Observability Dashboard

Metrics:

* Agent Name
* Execution Time
* Cost
* Token Usage
* Failure Rate
* Hallucination Score
* Trace Status
* Tool Calls

Purpose:

Demonstrate understanding of:

* Agent Monitoring
* LLMOps
* Observability
* AI Governance

---

## QA Dashboard

Metrics:

* Test Cases
* Pass Rate
* Regression Failures
* Escaped Defects
* Release Readiness
* Test Coverage

Purpose:

Demonstrate QA leadership.

---

## DevOps Dashboard

Metrics:

* Deployment Frequency
* Lead Time
* MTTR
* Change Failure Rate
* Release Success Rate

Purpose:

Demonstrate DevOps governance understanding.

---

## Program Health Dashboard

Metrics:

* Budget
* Forecast
* Risks
* Issues
* Dependencies
* Team Capacity
* Milestones

Purpose:

Demonstrate TPM capabilities.

---

# Data Strategy

Use mock data only.

No real integrations required.

Generate realistic enterprise sample data.

Store under:

/data

Example:

agent_metrics.json
qa_metrics.json
devops_metrics.json
program_metrics.json

---

# Tech Stack

Frontend:

* Next.js
* React
* Tailwind

Visualization:

* Recharts

Hosting:

* GitHub Pages

Data:

* Static JSON

Version Control:

* GitHub

---

# Repository Structure

portfolio/

├── app/
├── components/
├── data/
├── docs/
├── assets/
├── public/
├── case-studies/
├── system-design/
├── blog/
├── PROJECT_MEMORY.md
└── README.md

---

# Case Studies

Create professional writeups.

## ZBrain Observability

Sections:

* Problem
* Discovery
* Architecture
* Requirements
* Metrics
* Outcome
* Lessons Learned

---

## Flow Builder

Sections:

* Problem
* Product Strategy
* Architecture
* Roadmap
* KPIs
* Results

---

## Cloud Migration

Sections:

* Migration Strategy
* Risk Management
* Stakeholder Alignment
* Results

---

# System Design Section

Create architecture diagrams for:

* Multi-Agent Architecture
* RAG Architecture
* Agent Observability Architecture
* AI Evaluation Framework
* LLMOps Framework

Use Mermaid diagrams.

---

# Blog Topics

Publish markdown articles.

Examples:

* Building Enterprise Multi-Agent Systems
* AI Observability Best Practices
* LLMOps for Product Managers
* Product Metrics for AI Applications
* Agent Evaluation Frameworks

---

# Coding Standards

Claude must:

* Generate production-quality code
* Use reusable components
* Follow clean architecture
* Use TypeScript
* Use responsive layouts
* Add comments where necessary
* Create documentation

---

# Success Criteria

Portfolio should make recruiters conclude:

"This TPM understands AI systems deeply, can lead technical teams, understands observability, quality, DevOps, and product execution."

rather than:

"This person built another chatbot."

End Goal:

A professional GitHub-hosted portfolio showcasing enterprise AI delivery leadership.

---

# Build Log

## 2026-06-25 — Scaffold + Control Tower (flagship)

* Bootstrapped Next.js 14 (App Router) with **static export** (`output: 'export'`) for free GitHub Pages hosting.
* Stack: React 18, TypeScript, Tailwind CSS (custom dark "control tower" theme), Recharts.
* Built all five dashboard modules: Executive, AI Observability, QA Governance, DevOps/DORA, Program Health.
* Reusable components under `components/` (KpiCard, Panel, StatusBadge, Sidebar, Topbar, MobileNav, ChartKit).
* Mock datasets under `data/` (executive, agent, qa, devops, program metrics).
* GitHub Actions deploy workflow with auto base-path resolution for project sites.
* Verified: `npm run build` exports 9 static pages cleanly.

## 2026-06-25 — Case Studies + System Design

* Added `prompts/` workflow templates (01 brainstorm → 05 release).
* Built **Case Studies** as first-class site pages (rendered, not loose markdown — what recruiters actually see):
  * Content modeled in `lib/case-studies.ts` (structured sections: paragraphs, bullets, metrics, tables, inline Mermaid).
  * `app/case-studies/` index + `[slug]` detail pages with `generateStaticParams` (3 studies: ZBrain Observability, Flow Builder, Cloud Migration).
* Built **System Design** page (`app/system-design/`) with 5 Mermaid architecture diagrams (multi-agent, RAG, observability, eval framework, LLMOps) defined in `lib/system-design.ts`.
* Added `components/Mermaid.tsx` (client) — themed, dark, graceful error fallback; renders post-hydration in static export.
* Added `components/layout/SiteHeader.tsx` top nav for content pages; wired case-studies + system-design into landing page and Control Tower sidebar.
* Installed `mermaid@11`.
* Verified: `npm run build` exports 14 static pages; browser preview confirms all 5 system-design diagrams + inline case-study diagram render with zero console errors.

## 2026-06-25 — Career Experience Explorer

* Added `prompts/06-career-experience-builder.md`.
* Built a JSON-driven **Career Experience Explorer** (6 companies: LeewayHertz, NCS Global, Profusion Systems, Mapsted, Soda In Mind, WNS).
* Data in `data/experience.json`; types/loader in `lib/experience.ts` (sorted most-recent-first).
* `app/experience/` timeline index + `[slug]` detail pages via `generateStaticParams` (no hardcoded pages).
* Detail sections: Overview, Business Problem (+ challenge callout), Solution, Architecture (Mermaid), My Role, Tech Stack (badges), Business Impact (Recharts trend), Achievements, Lessons Learned, prev/next nav.
* New components: `components/experience/Timeline.tsx`, `components/experience/ImpactChart.tsx`.
* Wired "Experience" into SiteHeader, Control Tower sidebar, and landing page.
* Verified: build exports 20 static pages (6 experience slugs); browser preview confirms Mermaid + impact chart + KPI cards render, timeline order correct, no real console errors (only Recharts defaultProps dev warning).
* NOTE: experience metrics/dates are illustrative placeholders — user to confirm against real records before publishing.

## 2026-06-25 — Resume Sync (Experience = real resume data)

* Added `prompts/07-resume-experience-sync.md`.
* **`data/resume.json` is now the single source of truth** for Experience (replaces the placeholder `data/experience.json`, which was deleted).
* 6 real companies with exact names/titles/dates/metrics/tech: LeewayHertz (Jan 2025–Present, TPM GenAI), NCS Global (Oct 2023–Jan 2025), Profusion Systems (Jun–Oct 2023), Mapsted (Feb–Jun 2023), Soda In Mind (Jun 2019–Jun 2022), WNS (Oct 2017–Feb 2019).
* New richer model (business_context, key_challenges, initiatives, technical_environment, delivery_practices, metrics{value,impact}, portfolio_tags, process_flow).
* `lib/experience.ts` rewritten to consume resume.json (+ `allTags`, `flattenTech`).
* Detail view rebuilt to the 9-section spec: Overview, Business Context, Problems Solved, Initiatives, My Contribution, Architecture/Process Flow, Technology Stack, Metrics Dashboard, Achievements.
* Index upgraded to an interactive Explorer with portfolio-tag filtering (`components/experience/ExperienceExplorer.tsx`); removed `ImpactChart` (its trend data was fabricated — dropped to honor "no invented metrics").
* Facts preserved exactly; only narrative framing written. ASSUMPTIONS flagged in resume.json meta: `employment_type` defaulted to Full-time; `industry` derived for the timeline; some `location` fields left blank where not in resume — user to confirm.
* Verified: build exports all 6 slugs; browser preview confirms 9 sections, exact metrics (300+ TB / ~$200K / 20,000+), tag filter works, Mermaid renders, zero console errors.

## 2026-06-25 — Profile additions + CTA + fixes

* Landing hero now leads with **"Explore my Experience →"** (primary) then "Open the Control Tower" (secondary) — hiring-manager-first flow.
* Corrected employment types: Profusion Systems & Mapsted = **Contract** (were Full-time).
* Corrected LeewayHertz award: Best Executor Spot Award = **Mar & Apr 2025 (The Hackett Group)** (was 2026).
* Added `data/profile.json` (education, certifications, recognitions) rendered on the Experience page below the timeline. Recognitions include personal (footballer 2010, kickboxer 2009).
* Verified in browser: hero CTA order/styling, Contract labels, all profile sections.
* Earlier fix: stale `next dev` on :3000 caused the `/experience` 404 — killed it + cleared `.next`; route confirmed 200 with content.

## 2026-06-25 — Responsive pass (mobile + desktop aspect ratios)

* Added explicit `viewport` export in `app/layout.tsx` (device-width, zoom allowed).
* `SiteHeader`: brand text now `hidden sm:block` (icon-only on phones), nav is `min-w-0` horizontally scrollable with hidden scrollbar — no more 3-line wrap.
* Wide dashboard tables given `min-w-[...]` inside their scroll containers so they scroll legibly instead of crushing (observability 720, devops 600, qa 520, executive 480, case-study 420).
* Verified zero horizontal overflow at 375 (mobile), 768 (tablet), 1440 (MacBook), 1920 (Windows) across home, all 5 Control Tower dashboards, Experience (incl. long-name detail), Education, Case Studies, System Design (5 Mermaid diagrams scroll). Sidebar hidden < lg with MobileNav; visible ≥ lg.
* Build clean: 22 static pages.

## 2026-06-25 — AI context pack

* Created `AI_CONTEXT_PACK/` (portable, upload to a fresh AI session): `README.md`, `PROJECT_CONTEXT.md`, `DECISIONS.md`, `ROADMAP.md`, `AI_INSTRUCTIONS.md`. No secrets/credentials/tokens.
* Created gitignored `PRIVATE_PROFILE.md` (root) — consolidated personal/career data + email; generalized in the public pack.
* `.gitignore` now excludes `PRIVATE_PROFILE.md`, `.env`, `secrets/`, `*.key`. Verified email domain appears only in `PRIVATE_PROFILE.md`.
* NUANCE: `data/resume.json` + `data/profile.json` are committed site content → personal career data is inherently public on the deployed portfolio (by design). PRIVATE_PROFILE protects the consolidated doc + contact email, not the on-site career facts.

## 2026-06-25 — Case studies expansion + interactive UI/UX

* +4 case studies (Loan Mgmt, Twilio→Marketo, NetSuite, Tableau→Power BI) → 7 total; case-study prev/next nav (last → System Design). +4 system-design diagrams → 9 total. New case studies flagged illustrative (verify vs real projects).
* Interactive layer: **⌘K command palette** (global; triggers in SiteHeader/Sidebar/MobileNav incl. mobile icon), **count-up KPIs**, **scroll-reveal** panels, **KPI drill-downs** (click→scroll+pulse, hover sparkline on Executive). New: `CommandPalette.tsx`, `ScrollReveal.tsx`, `RangeTabs` already existed; `KpiCard` now client w/ count-up; `Panel` gained `id`.
* Verified responsive + interactive at 375 / 1440 / 1920: no overflow, palette opens/filters everywhere, drill + reveal work. Build clean: 26 static pages.

## 2026-06-25 — AI Continuity System (16-file pack)

* Generated a full transfer system in `AI_CONTEXT_PACK/`: PROJECT_CONTINUITY_PACK (master), EXECUTIVE_BRIEF, PROJECT_RESTART_PROMPT, PROJECT_CONTEXT, ARCHITECTURE, FEATURES, DECISIONS, IMPLEMENTATION_HISTORY, ROADMAP, BACKLOG, KNOWN_ISSUES, DESIGN_SYSTEM, DEPLOYMENT, AI_INSTRUCTIONS, CHANGELOG, README. Lets any new AI session/platform resume with no chat history.
* Root long-term memory = this file; personal data = gitignored `PRIVATE_PROFILE.md` (+ added a "Working preferences" section).
* `.gitignore` hardened: `PRIVATE_PROFILE.md`, `.env`, `.env.*`, `.env*.local`, `secrets/`, `credentials/`, `*.pem`, `*.key`, `.claude/settings.local.json`. No secrets/PII in the public repo.
* END-OF-SESSION RULE: keep PROJECT_CONTINUITY_PACK, PROJECT_RESTART_PROMPT, CHANGELOG, ROADMAP, PROJECT_MEMORY current.

## 2026-06-25 — Data realism + QA POC (Test Suites)

* Fixed stale-`.next` symptoms on user's :3000 dev server (blank Observability charts + QA 404) — killed + `rm -rf .next` + fresh dev. Code was fine (verified on clean preview).
* Data realism: tokens KPI 8.4B→5.29B and rescaled `tokenConsumption` chart to match (~5.3B/day, was 10× inconsistent); `totalToolCalls` 2.1M→5.91M (now consistent with per-agent registry); Avg Daily Cost now computed = true average of costTrend (~$25.5K) not hardcoded latest; program budget scaled to ≤$1M (approved $960K / spent $614K / forecast $932K) with burnTrend rescaled.
* **QA POC added inside QA Governance** as a tabbed view (Test Suites | Governance, default Test Suites): `data/qa_suites.json` (Smoke 187 / Regression 668 / Jira 625, 22 modules w/ scenario counts, test types) + `components/qa/TestSuitesView.tsx` — suite selector, environment scoping (Smoke=Production only, Regression/Jira=Staging only), version input, **simulated client-side Run** (streaming→results, labeled demo), module-scenario grid. Added `useEffect` resize-nudge so Recharts re-measures when Governance tab is revealed.
* Verified: production build clean (22 pages); fresh :3000 dev server confirmed Observability charts + QA Test Suites render.

## 2026-06-25 — Phase 1 ROLLED BACK (user request)

* User did not like Phase 1; fully reverted to the pre-Phase-1 version. Deleted RiskHeatmap/ScorecardCard/SloPanel components + scorecard.json/slo.json; reverted program_metrics.json risks, lib/format.ts (removed 'breached'), and the Executive/DevOps/Program pages. Verified: no Phase 1 references remain; all three dashboards render clean.
* User shared screenshots of their QA POC (qa.staging.zbrain.ai): a **QA test-suite dashboard** — suites (Smoke 187 / Regression 668 / Jira 625), test types (Figma/Visual, API/Postman, Load/JMeter), 22 modules each with scenario counts, KPIs (Total Scenarios, Jira Imported, Smoke Critical-Path, Latest Pass Rate 69%, Active Bugs), tabs (Run/Results/Flow/Logs/Bugs/Shots), Smoke=Production-only / Regression=Staging-only tags. Awaiting direction on whether/how to adapt (do NOT re-add Phase 1 style).

## 2026-06-25 — Governance enhancements: Phase 1 (quick wins) [REVERTED — see above]

* Context: user has a separate QA-governance POC (login-walled `qa.staging.zbrain.ai`) — couldn't crawl it; built standards-based enhancements (ISO 25010, DORA, NIST AI RMF, SRE) instead. Full Sections 1–9 blueprint delivered in chat; Phase 1 implemented:
* **Risk Heatmap** — `components/RiskHeatmap.tsx` (5×5 likelihood×impact grid, zone-colored, plots risk IDs); added `likelihoodScore`/`impactScore` to risks in `program_metrics.json`; placed beside Risk Register on Program page.
* **Balanced Governance Scorecard** — `data/scorecard.json` + `components/ScorecardCard.tsx` (inline-SVG sparkline, RAG dot, delta); 5 dims (Delivery/Quality/Risk/Cost/AI-Governance) on Executive dashboard.
* **Service SLOs & Error Budgets** — `data/slo.json` + `components/SloPanel.tsx` (target vs actual + error-budget bar); added `breached` to `statusTone` danger list; placed on DevOps dashboard.
* Verified via managed preview (separate port — left user's :3000 dev server untouched): all three render at desktop + 375px mobile, no overflow, no new console errors (only known Recharts defaultProps dev warning). Production build NOT run to avoid clobbering the running :3000 dev server — run `npm run build` after stopping dev.
* Phases 2–4 (quality gates, traceability, compliance/controls, approvals/RACI, audit log, AI Governance Center, exec rollup) still open.

## 2026-06-25 — Live deploy + data/version realism + QA POC screenshots

* **Went live on GitHub Pages**: https://himanshutamboli.github.io/enterprise-ai-delivery-control-tower/ — auto-deploys via GitHub Actions on every push to `main`.
* Reduced "huge/fake-looking" headline figures to realistic, internally-consistent values (Daily Requests→24.2K, Tokens→97M, Avg Daily Cost→$490 vs $580 budget, Tool Calls→76.4K, QA Test Cases→668, program budget $960K/$614K/$932K). Added 1M/3M/6M range filters to 6 charts (deterministic seeded generator in `lib/timeseries.ts` + `RangeTabs`). Applied a v1.0→v3.0 version scheme across QA + DevOps. Program burn given spikes, Milestones 4/6, Team 60+.
* Rebuilt the QA Test-Suite POC from the owner's real screenshots (qa.staging.zbrain.ai — owner's own POC, not company/IP data): Smoke 187 / Regression 668 / Jira 625, 22 modules with exact scenario counts, env scoping, simulated Run.

## 2026-06-25 — Reference analysis + branding + case-study expansion + AI XPLR

* Analyzed reference portfolios (vishalbagla.com; replit one inaccessible).
* Branding: hexagon **favicon** (`app/icon.svg`) + SVG **icon set** (`components/icons.tsx`) replacing unicode glyphs; all icons now stroke an **animated indigo→cyan→violet gradient** (SMIL `#brandGrad` def in `app/layout.tsx`) — the "GIF-like vibrant" ask (GIFs not feasible in static/CSP, animated SVG delivered instead).
* +4 case studies (Loan Mgmt, Twilio→Marketo, NetSuite, Tableau→Power BI) + matching system-design diagrams + prev/next nav (last → System Design).
* Researched + added **AI XPLR** (Hackett/ZBrain Gen-AI opportunity discovery → feasibility/ROI → agentic blueprints → AI COE dashboard → ZBrain Builder): case study, system-design diagram, and a 2nd LeewayHertz process-flow (`data/resume.json` `process_flows`), with metrics/tech/tags.
* Systematic Mermaid sizing: rebuilt 6 case-study architectures larger; capped ALL diagrams to 700px height in `components/Mermaid.tsx` (Flow Builder = reference; ZBrain reduced to match). Test Suite KPIs now count-up like other modules.
* Now: 8 case studies, 10 system-design diagrams, 28 static pages. Latest commit `dce7276`.
* STANDING RULE: do not deploy future changes directly — owner reviews locally first, then says "Deploy".

### Next up (roadmap)

* `blog/` — technical articles (Multi-Agent Systems, AI Observability, LLMOps for PMs, AI metrics, Eval frameworks) — biggest content gap.
* Conversion layer: résumé PDF download, contact/social footer, landing profile card + positioning line, testimonials, builds section.
* Verify illustrative metrics in the 5 newer case studies + AI XPLR against real figures.
* Add Microsoft certificate PDF (`public/certificates/program-management-microsoft.pdf`) when available.
* Optional: screenshots in README; per-case-study OG images.
