# ROADMAP

> Continuity doc 6 of 16. Status as of the latest session (commit `dce7276`).

## ✅ Completed
- Scaffold (Next.js 14 static export, TS, Tailwind dark theme, Recharts).
- Control Tower — 5 dashboards (Executive, AI Observability, QA Governance, DevOps/DORA, Program Health).
- **QA Test-Suite POC** inside QA Governance (tabbed, environment scoping, simulated Run, 22-module scenario grid, count-up KPIs).
- Experience explorer — resume-driven timeline + tag filter, 6 company detail pages (LeewayHertz shows two process-flows: ZBrain + AI XPLR), Education/Certifications/Recognitions.
- Certificate hosting (5 PDFs, self-activating links).
- Case Studies — index + **8 detail pages** with inline Mermaid + prev/next nav (last → System Design).
- System Design — **10 Mermaid reference architectures**.
- **Interactive layer** — ⌘K command palette, count-up KPIs, scroll-reveal, KPI drill-downs, 1M/3M/6M chart range filters.
- **Branding** — hexagon favicon + SVG icon set with animated indigo→cyan→violet gradient.
- Systematic Mermaid diagram sizing (700px height cap).
- Full responsive pass (375/768/1440/1920, zero overflow).
- Data realism pass (internally consistent, budget ≤ $1M, v1.0→v3.0 version scheme across QA + DevOps).
- GitHub Actions deploy workflow.
- **Live on GitHub Pages** — https://himanshutamboli.github.io/enterprise-ai-delivery-control-tower/ (auto-deploys on push to `main`).
- Prompt library (`prompts/01–07`).
- AI continuity system (this pack) + gitignored `PRIVATE_PROFILE.md`.

## 🚧 In Progress
- None open.

## 🔜 Upcoming (next milestones)
1. **Blog / Insights** — AI-PM thought-leadership articles (JSON/MD-driven, same dynamic-route pattern). Topics: multi-agent systems, AI observability, LLMOps for PMs, AI product metrics, agent evaluation.
2. **Personal-brand / conversion layer** (inspired by reference portfolios): landing positioning line + profile card; **résumé PDF download**; **Contact / "Work with me" section + persistent social footer** (LinkedIn, GitHub, email, "open to roles").
3. **Builds / Experiments section** — GitHub-linked projects (including this portfolio and the QA POC).
4. **Testimonials** — 2–3 LinkedIn recommendation quotes.
5. **Verify illustrative metrics** — the 5 newer case studies (Cloud Migration, Loan, Twilio→Marketo, NetSuite, Tableau→Power BI) + AI XPLR against real figures.
6. **Microsoft certificate** — drop `public/certificates/program-management-microsoft.pdf` (link auto-appears).

## 🌅 Long-term vision
- Optional interactive AI demo ("try it" moment) beyond the QA run simulation.
- Per-page OG images; company logos on the timeline; README screenshots.
- Optional custom domain (only if the ₹0 constraint is relaxed).
- Keep the live site current purely via JSON edits → commit → auto-redeploy.

## Watch-items
- `data-science-pg-datatrained.pdf` reports "0 pages" in metadata — confirm it opens; re-export if blank.
- Recharts `defaultProps` warning is dev-only (gone in prod) — ignore.
