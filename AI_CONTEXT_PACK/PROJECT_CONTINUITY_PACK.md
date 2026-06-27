# PROJECT CONTINUITY PACK

> Primary transfer doc. Self-contained; other docs in `AI_CONTEXT_PACK/` hold detail. Pair with gitignored `PRIVATE_PROFILE.md` for personal data. To bootstrap a new AI, use `PROJECT_RESTART_PROMPT.md`. Last refreshed after the icon/diagram-sizing release (commit `dce7276`).

---

## 1. Executive Brief
**Enterprise AI Delivery Control Tower** — an AI TPM / Technical Program Manager portfolio built like an enterprise SaaS product (Datadog/Grafana/Azure feel). **Live on GitHub Pages.** Next.js 14 static export + React 18 + TS + Tailwind 3 + Recharts 2 + Mermaid 11, all static JSON. **~90% complete.** Goal: prove the owner leads AI platforms — not "another chatbot."

- **Live:** https://himanshutamboli.github.io/enterprise-ai-delivery-control-tower/
- **Repo:** github.com/himanshutamboli/enterprise-ai-delivery-control-tower (public, branch `main`, auto-deploys via GitHub Actions on push)

## 2. Context
- **Audience:** recruiters/hiring managers for Senior/Principal/Staff TPM & AI PM roles.
- **Constraints:** ₹0 budget (free tooling only); static export for GitHub Pages (no server/SSR/runtime env); dashboard data is mock + labeled; career data is factual from the resume; no secrets/PII in the public repo.
- **Owner workflow rule:** make changes → verify locally (build + preview) → **owner reviews → commit + push only when owner says "Deploy".** Do not auto-deploy.

## 3. Architecture
- App Router, `output: 'export'` → 28 static pages in `out/`. No runtime server.
- `data/*.json` + `lib/*.ts` → typed loaders → pages; `generateStaticParams` prerenders per-entity pages (8 case studies, 6 experience companies).
- Server components for prose/SEO; `'use client'` islands for Recharts, Mermaid, the ⌘K palette, count-up, scroll-reveal, range filters, QA run-sim.
- Base path via `NEXT_PUBLIC_BASE_PATH` (set by CI). No DB, no auth; local React state only.
- **Routes:** `/` · `/control-tower` (Executive) + `/observability` `/qa` `/devops` `/program` · `/experience` + `/[slug]` + `/education` · `/case-studies` + `/[slug]` (8) · `/system-design` (10 diagrams).
- (Full + diagrams: `ARCHITECTURE.md`.)

## 4. Features (current)
✅ 5 Control Tower dashboards · **QA Test-Suite POC** (tabbed Test Suites|Governance, simulated Run, 22-module grid) · Experience explorer (timeline + tag filter; LeewayHertz detail shows **two** process-flows: ZBrain + AI XPLR) · Education/Certifications/Recognitions (self-activating certificate links from `public/certificates/`) · **8 case studies** (zbrain-observability, flow-builder, cloud-migration, loan-management-platform, twilio-marketo-migration, netsuite-implementation, tableau-powerbi-migration, ai-xplr) with prev/next → System Design · **10 Mermaid architectures** (capped 700px height for uniform sizing) · **⌘K command palette** (global; header/sidebar/mobile triggers) · **count-up KPIs** (`KpiCard` + `CountUp`) · **scroll-reveal** · **KPI drill-downs** (Executive) · **1M/3M/6M range filters** (Executive + Observability via `lib/timeseries.ts` + `RangeTabs`) · brand **favicon** (`app/icon.svg`) · **animated-gradient icons** (`components/icons.tsx` + `#brandGrad` def in `app/layout.tsx`) · responsive 375/768/1440/1920.
📋 Blog/insights · résumé PDF download · contact/social footer · landing profile card + positioning · testimonials · builds section · Microsoft certificate PDF.
(Full statuses: `FEATURES.md`.)

## 5. Decisions (must not change)
1. Static export only (no SSR/server/runtime env). 2. JSON/TS-driven content + `generateStaticParams`. 3. `resume.json`/`profile.json` = single source of truth for career facts (format, never invent). 4. Mock dashboard data, internally consistent + labeled. 5. Dark "control tower" Tailwind theme. 6. React 18/Recharts 2/Tailwind 3 (conservative). 7. Client-rendered Mermaid w/ fallback; diagrams capped at 700px height. 8. fs-existence-check certificate links. 9. **Never `npm run build` while `npm run dev` runs** (corrupts `.next`). 10. Continuity via this pack + gitignored `PRIVATE_PROFILE.md`. 11. Owner reviews before any deploy.
(Full: `DECISIONS.md`.)

## 6. Roadmap
- **Done:** see Features ✅ + live deploy.
- **Next:** blog/insights → conversion layer (résumé download, contact/social footer, profile card, testimonials, builds) → verify illustrative metrics → Microsoft cert.
- (Full: `ROADMAP.md`.)

## 7. Backlog (top)
- 🟠 Blog (JSON/MD-driven, mirror case-studies pattern) · Résumé PDF (`public/resume.pdf`, base-path-aware link) · Contact + persistent social footer · Landing profile card + positioning line.
- 🟡 Testimonials · Builds section (GitHub-linked) · Microsoft cert PDF (`public/certificates/program-management-microsoft.pdf`).
- (Full: `BACKLOG.md`.)

## 8. Deployment
- `git add -A && git commit && git push origin main` → GitHub Actions builds + publishes `out/`. Source = GitHub Actions. Rollback: `git revert` or re-run a green Action.
- Commands: `npm run dev` · `npm run build` (stop dev first) · `npm run serve`. Recover corrupted cache: `lsof -ti tcp:3000 | xargs kill -9; rm -rf .next; npm run dev`.
- No credentials anywhere; `.gitignore` blocks `PRIVATE_PROFILE.md`, `.env*`, `secrets/`, `credentials/`, `*.pem`, `*.key`, `AI_CONTEXT_PACK.zip`.
- (Full: `DEPLOYMENT.md`.)

## 9. AI Instructions (essentials)
- Bootstrap: read this pack + `PROJECT_MEMORY.md`, compare to code, produce an understanding report; don't modify code until approved.
- Standards: TypeScript; reuse primitives (`Panel`/`KpiCard`/`StatusBadge`/`ChartKit`/`Mermaid`/`CountUp`/`RangeTabs`/`icons`/`lib/format.ts`); theme tokens not hex; server for prose, client for interactivity; new views hold at 375/768/1440/1920; verify via build + browser preview on a separate port.
- Never: break static export · invent career facts · add paid deps · build over a live dev server · commit secrets/PII · rebuild completed features · **auto-deploy without the owner's go-ahead**.
- End of session: refresh `PROJECT_CONTINUITY_PACK.md`, `PROJECT_RESTART_PROMPT.md`, `CHANGELOG.md`, `ROADMAP.md`, `PROJECT_MEMORY.md`.
- (Full: `AI_INSTRUCTIONS.md`.)

## 10. Risks / watch-items
- The 5 newer case studies (loan, twilio, netsuite, tableau) + **AI XPLR** use **illustrative metrics** — owner must verify against real figures.
- `data-science-pg-datatrained.pdf` reported "0 pages" — confirm it opens.
- `.next` corruption if building over `next dev` (see recovery above).
- Mermaid diagram sizing is controlled by a 700px max-height cap in `components/Mermaid.tsx` + an animated `#brandGrad` gradient (SMIL) used by all icons.

---
**Pack index:** PROJECT_CONTEXT · ARCHITECTURE · FEATURES · DECISIONS · IMPLEMENTATION_HISTORY · ROADMAP · BACKLOG · KNOWN_ISSUES · DESIGN_SYSTEM · DEPLOYMENT · AI_INSTRUCTIONS · CHANGELOG · EXECUTIVE_BRIEF · PROJECT_RESTART_PROMPT · PROJECT_CONTINUITY_PACK (this) · README. Root: `PROJECT_MEMORY.md`, `PRIVATE_PROFILE.md` (gitignored).
