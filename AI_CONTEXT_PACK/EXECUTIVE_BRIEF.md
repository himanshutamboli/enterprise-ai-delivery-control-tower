# EXECUTIVE_BRIEF

> Continuity doc 14 of 16. A <5-minute read for a new AI session or stakeholder.

## Project summary
**Enterprise AI Delivery Control Tower** — an AI TPM / Technical Program Manager portfolio built as an enterprise-style product (Datadog/Grafana/Azure feel). It presents 5 operational dashboards, a resume-driven career explorer, 8 case studies, and 10 system-design diagrams, plus an interactive layer (⌘K palette, count-up KPIs, scroll-reveal, KPI drill-downs, 1M/3M/6M chart filters). Stack: **Next.js 14 static export + React 18 + TypeScript + Tailwind + Recharts + Mermaid**, all static JSON, hosted **free on GitHub Pages**. Goal: make recruiters conclude "this TPM understands AI systems deeply," not "another chatbot."

- **Live:** https://himanshutamboli.github.io/enterprise-ai-delivery-control-tower/

## Current status
**~90% complete. Live on GitHub Pages** (auto-deploys on push to `main`). Done: scaffold; Control Tower (Executive, AI Observability, QA Governance incl. an interactive **QA Test-Suite POC**, DevOps/DORA, Program Health); Experience explorer + Education/Certifications/Recognitions (5 certificate PDFs hosted); 8 case studies + prev/next nav; 10 Mermaid architectures (700px height-capped); interactive layer (⌘K palette, count-up KPIs, scroll-reveal, KPI drill-downs, range filters); brand favicon + animated-gradient icons; full responsive pass; data realism pass; this continuity pack.

## Major architecture decisions (must not change)
- **Static export only** (`output: 'export'`) — no SSR/server/runtime env; everything build-time static (GitHub Pages).
- **JSON/TS-driven content** with `generateStaticParams` — no hardcoded entity pages.
- **`data/resume.json` is the single source of truth** for career facts — format, never invent.
- **Mock dashboard data, internally consistent**, clearly labeled.
- **Continuity via `AI_CONTEXT_PACK/`** + gitignored `PRIVATE_PROFILE.md`.
(Full reasoning in `DECISIONS.md`.)

## Risks
- **Illustrative metrics** in the 5 newer case studies (Cloud Migration, Loan, Twilio→Marketo, NetSuite, Tableau→Power BI) + AI XPLR — owner must verify against real figures before relying on them.
- **Build-over-dev corrupts `.next`** — stop dev before building; reset with `rm -rf .next`.
- One certificate PDF (`data-science-pg-datatrained.pdf`) reports "0 pages" — confirm it opens.
- Landing is product-heavy, light on personal-brand/conversion (résumé, contact) — limits recruiter conversion until added.

## Next priorities
1. **Blog / Insights** (AI-PM thought leadership) — biggest content gap.
2. **Conversion layer:** résumé PDF download, contact/social footer, landing profile card + positioning line.
3. **Builds** section (GitHub-linked) + **Testimonials**.
4. **Verify illustrative metrics** in the newer case studies + AI XPLR.
5. Add the **Microsoft certificate** PDF when available.
(Details in `BACKLOG.md` / `ROADMAP.md`.)
