# EXECUTIVE_BRIEF

> Continuity doc 14 of 16. A <5-minute read for a new AI session or stakeholder.

## Project summary
**Enterprise AI Delivery Control Tower** — an AI TPM / Technical Program Manager portfolio built as an enterprise-style product (Datadog/Grafana/Azure feel). It presents 5 operational dashboards, a resume-driven career explorer, 3 case studies, and 5 system-design diagrams. Stack: **Next.js 14 static export + React 18 + TypeScript + Tailwind + Recharts + Mermaid**, all static JSON, hosted **free on GitHub Pages**. Goal: make recruiters conclude "this TPM understands AI systems deeply," not "another chatbot."

## Current status
**~80% complete.** Done: scaffold; Control Tower (Executive, AI Observability, QA Governance incl. an interactive **QA Test-Suite POC**, DevOps/DORA, Program Health); Experience explorer + Education/Certifications/Recognitions (5 certificate PDFs hosted); 3 case studies; 5 Mermaid architectures; full responsive pass; data realism pass; GitHub Actions deploy workflow; this continuity pack. The repo is connected to `origin/main`.

## Major architecture decisions (must not change)
- **Static export only** (`output: 'export'`) — no SSR/server/runtime env; everything build-time static (GitHub Pages).
- **JSON/TS-driven content** with `generateStaticParams` — no hardcoded entity pages.
- **`data/resume.json` is the single source of truth** for career facts — format, never invent.
- **Mock dashboard data, internally consistent**, clearly labeled.
- **Continuity via `AI_CONTEXT_PACK/`** + gitignored `PRIVATE_PROFILE.md`.
(Full reasoning in `DECISIONS.md`.)

## Risks
- **Not yet live** on Pages — needs commit + enable Pages (Source: GitHub Actions) + verify base path (CRITICAL).
- **Build-over-dev corrupts `.next`** — stop dev before building; reset with `rm -rf .next`.
- One certificate PDF reports "0 pages" — confirm it opens.
- Landing is product-heavy, light on personal-brand/conversion (résumé, contact) — limits recruiter conversion until added.

## Next priorities
1. **Go live** on GitHub Pages (C1).
2. **Conversion layer:** résumé PDF download, contact/social footer, landing profile card + positioning line.
3. **Builds** section (GitHub-linked) + **Testimonials**.
4. **Blog / Insights** (AI-PM thought leadership) — biggest content gap.
5. Add the **Microsoft certificate** PDF when available.
(Details in `BACKLOG.md` / `ROADMAP.md`.)
