# PROJECT_RESTART_PROMPT

> Paste the block below into a fresh AI session along with the `AI_CONTEXT_PACK/` files (and privately, `PRIVATE_PROFILE.md`). Bootstraps the assistant with zero prior chat history. Last refreshed after commit `dce7276`.

---

You are resuming an existing project. **Do not modify code until I approve your understanding.**

**Project:** Enterprise AI Delivery Control Tower — an AI TPM / Technical Program Manager portfolio built like an enterprise SaaS product (Datadog/Grafana/Azure feel), **live on GitHub Pages**.

**Live:** https://himanshutamboli.github.io/enterprise-ai-delivery-control-tower/ · **Repo:** github.com/himanshutamboli/enterprise-ai-delivery-control-tower (public, `main`, auto-deploys via GitHub Actions on push).

**Architecture (must not break):**
- Next.js 14 App Router, **static export** (`output: 'export'`) → GitHub Pages. No SSR, server actions, route handlers, runtime env, or `next/image` optimization.
- React 18 + TypeScript + Tailwind 3 (dark "control tower" theme) + Recharts 2 + Mermaid 11.
- **Content is JSON/TS-driven** (`data/*.json`, `lib/*.ts`); dynamic routes use `generateStaticParams`. Interactivity isolated in `'use client'` islands.
- **`data/resume.json` + `data/profile.json` = single source of truth** for career facts — format only, never invent.
- Dashboard data is mock but kept internally consistent and labeled. Base path via `NEXT_PUBLIC_BASE_PATH`.

**Current status (~90%):** Live. Done — 5 Control Tower dashboards (Executive, AI Observability, QA Governance incl. an interactive QA Test-Suite POC, DevOps/DORA, Program Health); Experience explorer + per-company detail (LeewayHertz shows two process-flows: ZBrain + AI XPLR) + Education/Certifications/Recognitions; 8 case studies with prev/next → System Design; 10 Mermaid architectures (capped 700px height); ⌘K command palette; count-up KPIs; scroll-reveal; KPI drill-downs; 1M/3M/6M chart range filters; brand favicon; animated-gradient icons; responsive 375/768/1440/1920.

**Roadmap / backlog (next):**
1. Blog / Insights (JSON/MD-driven, mirror the case-studies pattern).
2. Conversion layer: résumé PDF download, contact/social footer, landing profile card + positioning line, testimonials, builds (GitHub-linked) section.
3. Verify the illustrative metrics in the 5 newer case studies + AI XPLR against real figures.
4. Add Microsoft certificate PDF when available.

**Critical decisions (never change):** static export only; JSON-driven content + `generateStaticParams`; resume = source of truth; mock-but-consistent dashboard data; dark theme via Tailwind tokens; never `npm run build` while `npm run dev` runs (corrupts `.next`); **owner reviews locally and says "Deploy" before any commit/push** — do not auto-deploy.

**Coding standards:** TypeScript; reuse primitives (`Panel`, `KpiCard`, `StatusBadge`, `ChartKit`, `Mermaid`, `CountUp`, `RangeTabs`, `components/icons`, `lib/format.ts`); theme tokens not ad-hoc hex; server components for prose, client islands for interactivity; every new view holds at 375/768/1440/1920 with no horizontal overflow (wide tables → `min-w` inside `overflow-x-auto`); Mermaid label line-breaks use `<br/>` (never `\n`); verify via `npm run build` + browser preview on a separate port.

**Commands:** `npm run dev` (localhost:3000) · `npm run build` (→ `out/`, stop dev first) · `npm run serve` · recover: `lsof -ti tcp:3000 | xargs kill -9; rm -rf .next; npm run dev`.

**Known risks:** illustrative case-study metrics (loan, twilio, netsuite, tableau, AI XPLR) need owner verification; `.next` corruption if building over dev.

**Your first task:** Read `AI_CONTEXT_PACK/` + `PROJECT_MEMORY.md`, compare to the codebase, and produce a Project Understanding Report (executive summary, completion %, implemented vs missing features, technical debt, risks, next actions). Then answer: top 10 implemented features, top 10 remaining tasks, decisions that must not change, current risks, recommended next milestone. **Wait for my approval before changing any code.**

---
