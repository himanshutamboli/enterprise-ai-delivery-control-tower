# IMPLEMENTATION_HISTORY

> Continuity doc 5 of 16. Chronological build log. Dates reflect the working session (June 2026).

## Phase 0 — Scaffold
- **Completed:** Next.js 14 static-export project; TypeScript, Tailwind (custom dark theme), Recharts, ESLint; `next.config.mjs` (export, trailingSlash, unoptimized images, env base path); `.gitignore`.
- **Files:** `package.json`, `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`.
- **Architecture:** Established JSON-driven, static-export foundation.
- **Lessons:** Conservative versions (React 18/Recharts 2/Tailwind 3) avoid friction.

## Phase 1 — Control Tower (flagship)
- **Completed:** 5 dashboards — Executive, AI Observability, QA Governance, DevOps/DORA, Program Health; shared sidebar + mobile nav; reusable `KpiCard`/`Panel`/`StatusBadge`/`ChartKit`; mock datasets.
- **Files:** `app/control-tower/**`, `components/layout/*`, `components/ui/*`, `components/charts/ChartKit.tsx`, `data/*_metrics.json`, `lib/format.ts`.
- **Lessons:** Recharts needs `ComposedChart` to mix bars+lines; ResponsiveContainer drives all charts.

## Phase 2 — Case Studies + System Design
- **Completed:** 3 case studies (index + `[slug]` SSG) from `lib/case-studies.ts`; 5 Mermaid architectures from `lib/system-design.ts`; client `Mermaid` renderer; `SiteHeader` content nav.
- **Files:** `app/case-studies/**`, `app/system-design/page.tsx`, `components/Mermaid.tsx`, `components/layout/SiteHeader.tsx`, `lib/case-studies.ts`, `lib/system-design.ts`.
- **Lessons:** Install `mermaid@11`; render client-side with raw-text fallback.

## Phase 3 — Experience explorer (placeholder → resume-driven)
- **Completed:** Timeline + tag filter, per-company detail (9 sections), Education/Certifications/Recognitions page. Initially built on placeholder data, then **fully replaced with `data/resume.json`** (single source of truth); removed a fabricated impact chart.
- **Files:** `app/experience/**`, `components/experience/*`, `lib/experience.ts`, `data/resume.json`, `data/profile.json`, `prompts/06`, `prompts/07`.
- **Lessons:** Never invent career facts; format only. fs-existence check makes certificate links self-activating.

## Phase 4 — Responsive pass
- **Completed:** Viewport export; `SiteHeader` brand hides on small screens; wide tables `min-w` inside scroll containers; verified 375/768/1440/1920.
- **Files:** `app/layout.tsx`, `components/layout/SiteHeader.tsx`, dashboard pages (table `min-w`).
- **Lessons:** `innerText` reflects CSS `uppercase` (false negatives in DOM checks) — query `textContent` instead.

## Phase 5 — Certificates
- **Completed:** Hosted 5 certificate PDFs in `public/certificates/`; normalized file permissions (two were owner-read-only); links auto-appear.
- **Files:** `public/certificates/*`, `data/profile.json`, `app/experience/education/page.tsx`, `public/certificates/README.md`.
- **Lessons:** `chmod 644` PDFs so they serve once deployed; one PDF reported "0 pages" (flagged to owner).

## Phase 6 — AI context pack (v1)
- **Completed:** `AI_CONTEXT_PACK/` (PROJECT_CONTEXT, DECISIONS, ROADMAP, AI_INSTRUCTIONS, README); gitignored `PRIVATE_PROFILE.md`; `.gitignore` hardened.
- **Lessons:** Career data in `data/*.json` is inherently public on the live site; `PRIVATE_PROFILE.md` protects the consolidated doc + contact email.

## Phase 7 — Governance "Phase 1" experiment → ROLLED BACK
- **Completed then reverted:** Risk Heatmap, Balanced Scorecard, SLO panel (standards-based, since the owner's QA POC is login-walled and couldn't be crawled). Owner rejected; fully reverted.
- **Files (reverted):** Program/Executive/DevOps pages, `program_metrics.json`, `lib/format.ts`; deleted RiskHeatmap/ScorecardCard/SloPanel + scorecard/slo JSON.
- **Lessons:** Don't replicate a proprietary platform; align to the owner's actual POC concept instead.

## Phase 8 — Data realism + QA POC (Test Suites)
- **Completed:** Fixed stale-`.next` symptoms (blank charts/QA 404) via clean restart; made metrics consistent (tokens 5.3B, tool calls 5.9M, avg daily cost = true average, budget ≤ $1M); built the **QA Test-Suite POC** inside QA Governance (tabbed, simulated Run, 22-module scenario grid) from the owner's real POC screenshots.
- **Files:** `data/executive_metrics.json`, `data/agent_metrics.json`, `data/program_metrics.json`, `app/control-tower/page.tsx`, `app/control-tower/qa/page.tsx`, `components/qa/TestSuitesView.tsx`, `data/qa_suites.json`.
- **Lessons:** Recharts charts revealed via tab switch need a resize nudge to re-measure.

## Phase 9 — Deployment prep + continuity system (this pack)
- **Completed:** `.gitignore` hardened (PRIVATE_PROFILE, `.env*`, `secrets/`, `credentials/`, `*.pem`, `*.key`, `.claude/settings.local.json`); deploy steps documented; full 16-file continuity system generated.
- **Files:** `AI_CONTEXT_PACK/*`, `.gitignore`, `PROJECT_MEMORY.md`.
- **Lessons:** Repo already connected to `origin/main`; deploy = commit + push + enable Pages (GitHub Actions source).
