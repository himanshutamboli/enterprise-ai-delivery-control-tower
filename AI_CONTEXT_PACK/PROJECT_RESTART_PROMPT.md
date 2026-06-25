# PROJECT_RESTART_PROMPT

> Continuity doc 15 of 16. Paste the block below into a fresh AI session (Claude Code, ChatGPT, Gemini, Cursor, Windsurf, GitHub Copilot, etc.) along with the `AI_CONTEXT_PACK/` files (and privately, `PRIVATE_PROFILE.md`). It bootstraps the assistant with zero prior chat history.

---

You are resuming work on an existing project. **Do not modify any code until I approve your understanding.**

**Project:** Enterprise AI Delivery Control Tower — an AI TPM / Technical Program Manager portfolio, built to look like an enterprise SaaS product (Datadog/Grafana/Azure feel), not a chatbot demo.

**Purpose:** Demonstrate to recruiters/hiring managers (for Senior/Principal/Staff TPM & AI PM roles) that the owner leads AI platforms end-to-end — observability, QA governance, DevOps/DORA, program health — plus a career explorer, case studies, and system-design diagrams.

**Architecture (must not break):**
- Next.js 14 App Router with **static export** (`output: 'export'`) → hosted free on **GitHub Pages**. No SSR, server actions, route handlers, runtime env, or `next/image` optimization.
- React 18 + TypeScript + Tailwind 3 (custom dark theme) + Recharts 2 + Mermaid 11.
- **Content is JSON/TS-driven** (`data/*.json`, `lib/*.ts`); dynamic routes (`case-studies/[slug]`, `experience/[slug]`) use `generateStaticParams`. Interactivity is isolated in `'use client'` islands.
- **`data/resume.json` + `data/profile.json` are the single source of truth** for career facts — format only, never invent companies/metrics/dates/tech.
- Dashboard data is mock but kept internally consistent and labeled.

**Current status (~80%):** Done — scaffold; 5 Control Tower dashboards (incl. an interactive QA Test-Suite POC); Experience explorer + Education/Certifications/Recognitions (5 certificate PDFs hosted); 3 case studies; 5 Mermaid architectures; full responsive pass; data realism pass; GitHub Actions deploy workflow; AI continuity pack. Repo connected to `origin/main` (`github.com/himanshutamboli/enterprise-ai-delivery-control-tower`).

**Constraints:** Budget ₹0 (free tooling only, no paid services/hosting/APIs). Must remain a static export deployable on GitHub Pages. No secrets/PII in the public repo (`PRIVATE_PROFILE.md` is gitignored).

**Roadmap / active backlog (next):**
1. Go live on GitHub Pages (commit + enable Pages → Source: GitHub Actions + verify base path).
2. Conversion layer: résumé PDF download, contact/social footer, landing profile card + positioning line.
3. Builds (GitHub-linked) section + Testimonials.
4. Blog / Insights (AI-PM thought leadership) — JSON/MD-driven, mirror the case-studies pattern.
5. Add Microsoft certificate PDF when available.

**Critical decisions:** static export only; JSON-driven content + `generateStaticParams`; resume = source of truth; mock-but-consistent dashboard data; dark "control tower" theme via Tailwind tokens; never `npm run build` while `npm run dev` runs (corrupts `.next`).

**Coding standards:** TypeScript; reuse primitives (`Panel`, `KpiCard`, `StatusBadge`, `ChartKit`, `Mermaid`, `lib/format.ts`); theme tokens not ad-hoc hex; server components for prose, client islands for interactivity; every new view must hold at 375/768/1440/1920 px with no horizontal overflow (wide tables → `min-w` inside `overflow-x-auto`); verify via `npm run build` + a browser preview on a separate port.

**Commands:** `npm run dev` (localhost:3000) · `npm run build` (→ `out/`, stop dev first) · `npm run serve` · recover: `lsof -ti tcp:3000 | xargs kill -9; rm -rf .next; npm run dev`.

**Your first task:** Read the `AI_CONTEXT_PACK/` docs + `PROJECT_MEMORY.md`, compare them to the codebase, and produce a **Project Understanding Report** (executive summary, completion %, implemented features, missing features, technical debt, risks, recommended next actions). Then answer: top 10 implemented features, top 10 remaining tasks, architecture decisions that must not change, current risks, recommended next milestone. **Wait for my approval before changing any code.**

---
