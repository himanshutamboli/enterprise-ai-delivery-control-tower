# PROJECT CONTINUITY PACK

> Continuity doc 16 of 16 — **the primary file for transferring project context.** Self-contained; the other docs in `AI_CONTEXT_PACK/` hold full detail. Pair with the gitignored `PRIVATE_PROFILE.md` (personal data) in private sessions. To bootstrap a new AI, also use `PROJECT_RESTART_PROMPT.md`.

---

## 1. Executive Brief
**Enterprise AI Delivery Control Tower** — an AI TPM / Technical Program Manager portfolio built like an enterprise SaaS product (Datadog/Grafana/Azure feel). 5 operational dashboards + resume-driven career explorer + 3 case studies + 5 system-design diagrams. **Next.js 14 static export + React 18 + TS + Tailwind + Recharts + Mermaid**, all static JSON, **free on GitHub Pages**. **~80% complete.** Repo connected to `origin/main`; not yet verified live. Goal: recruiters conclude "this TPM understands AI systems deeply."

## 2. Context
- **Audience:** recruiters/hiring managers for Senior/Principal/Staff TPM & AI PM roles.
- **Goals:** position the owner for senior AI roles; read as a real delivery console; free to host/maintain.
- **Constraints:** ₹0 budget (free tooling only); static export for GitHub Pages (no server); dashboard data mock + labeled; career data factual from resume; no secrets/PII in the public repo.
- **Success:** clean static build + live deploy; zero horizontal overflow at 375/768/1440/1920; recruiter "gets it" in ~60s.
- (Full: `PROJECT_CONTEXT.md`.)

## 3. Architecture
- App Router, `output: 'export'` → static HTML in `out/`. No runtime server.
- `data/*.json` / `lib/*.ts` → typed loaders → pages; `generateStaticParams` prerenders one page per entity (case studies, experience companies).
- Server components for prose/SEO; `'use client'` islands for charts (Recharts), diagrams (Mermaid), filters, and the QA run simulation.
- Base path via `NEXT_PUBLIC_BASE_PATH` (set by CI). No DB, no auth, local React state only.
- Routes: `/`, `/control-tower` (+observability, qa, devops, program), `/experience` (+`[slug]`, education), `/case-studies` (+`[slug]`), `/system-design`.
- (Full + diagrams: `ARCHITECTURE.md`.)

## 4. Features (snapshot)
✅ Scaffold · Landing · Nav · Executive · AI Observability · QA Governance · **QA Test-Suite POC (interactive)** · DevOps/DORA · Program Health · Experience explorer + detail pages · Education/Certifications/Recognitions · 5 certificate PDFs · 3 case studies · 5 Mermaid architectures · responsive · deploy workflow · this pack.
🚧 Live deployment on Pages.
📋 Résumé download · Contact/social footer · Landing profile card + positioning · Blog/Insights · Builds section · Testimonials · Microsoft certificate.
- (Full table + statuses: `FEATURES.md`.)

## 5. Decisions (must not change)
1. **Static export only** (no SSR/server/runtime env). 2. **JSON/TS-driven content** + `generateStaticParams` (no hardcoded entity pages). 3. **`resume.json`/`profile.json` = single source of truth** for career facts (format, never invent). 4. **Mock dashboard data, internally consistent + labeled.** 5. **Dark "control tower" theme** via Tailwind tokens. 6. **React 18/Recharts 2/Tailwind 3** (conservative). 7. **Client-rendered Mermaid** with raw fallback. 8. **fs-existence-check certificate links.** 9. **Never `npm run build` while `npm run dev` runs** (corrupts `.next`). 10. **Continuity via this pack** + gitignored `PRIVATE_PROFILE.md`.
- (Full reasoning/alternatives: `DECISIONS.md`.)

## 6. Roadmap
- **Done:** see Features ✅.
- **In progress:** go live on Pages.
- **Next:** conversion layer (résumé download, contact/social, profile card + positioning) → builds + testimonials → blog/insights → Microsoft cert.
- **Long-term:** optional interactive AI demo, OG images, logos, optional custom domain.
- (Full: `ROADMAP.md`.)

## 7. Backlog (top items)
- 🔴 **C1** Go live on GitHub Pages (commit/push + Source: GitHub Actions + verify).
- 🟠 **H1** Résumé PDF download · **H2** Contact + social footer · **H3** Landing profile card + positioning line · **H4** Blog/Insights (JSON/MD-driven).
- 🟡 **M1** Builds section · **M2** Testimonials · **M3** Microsoft certificate.
- (Full with effort/dependencies: `BACKLOG.md`.)

## 8. Deployment
- Repo: `github.com/himanshutamboli/enterprise-ai-delivery-control-tower` (public). Branch: `main`. Host: GitHub Pages via `.github/workflows/deploy.yml`.
- Go live: `git add -A && git commit -m "…" && git push origin main` → Settings → Pages → Source: **GitHub Actions** → verify `https://himanshutamboli.github.io/enterprise-ai-delivery-control-tower/`.
- Commands: `npm run dev` · `npm run build` (stop dev first) · `npm run serve`. Rollback: `git revert <sha> && git push`, or re-run a prior green Action.
- No credentials anywhere; `.gitignore` blocks `PRIVATE_PROFILE.md`, `.env*`, `secrets/`, `credentials/`, `*.pem`, `*.key`.
- (Full: `DEPLOYMENT.md`.)

## 9. AI Instructions (essentials)
- **Bootstrap:** read this pack + `PROJECT_MEMORY.md`, compare to code, produce a Project Understanding Report; **don't modify code until approved.**
- **Validate:** top 10 implemented, top 10 remaining, decisions that can't change, risks, next milestone.
- **Standards:** TypeScript; reuse primitives (`Panel`/`KpiCard`/`StatusBadge`/`ChartKit`/`Mermaid`/`lib/format.ts`); theme tokens not hex; server for prose, client for interactivity; new views hold at all 4 breakpoints; verify via `npm run build` + browser preview on a separate port.
- **Never:** break static export · invent career facts · add paid deps · build over a live dev server · commit secrets/PII · rebuild completed features.
- **End of session:** update `PROJECT_CONTINUITY_PACK.md`, `PROJECT_RESTART_PROMPT.md`, `CHANGELOG.md`, `ROADMAP.md`, `PROJECT_MEMORY.md`.
- (Full: `AI_INSTRUCTIONS.md`.)

---
**Pack index:** PROJECT_CONTEXT · ARCHITECTURE · FEATURES · DECISIONS · IMPLEMENTATION_HISTORY · ROADMAP · BACKLOG · KNOWN_ISSUES · DESIGN_SYSTEM · DEPLOYMENT · AI_INSTRUCTIONS · CHANGELOG · EXECUTIVE_BRIEF · PROJECT_RESTART_PROMPT · PROJECT_CONTINUITY_PACK (this) · README. Root: `PROJECT_MEMORY.md`, `PRIVATE_PROFILE.md` (gitignored).
