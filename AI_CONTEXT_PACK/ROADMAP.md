# ROADMAP

> Continuity doc 6 of 16. Status as of the latest session.

## ✅ Completed
- Scaffold (Next.js 14 static export, TS, Tailwind dark theme, Recharts).
- Control Tower — 5 dashboards (Executive, AI Observability, QA Governance, DevOps/DORA, Program Health).
- **QA Test-Suite POC** inside QA Governance (tabbed, environment scoping, simulated Run, 22-module scenario grid).
- Experience explorer — resume-driven timeline + tag filter, 6 company detail pages, Education/Certifications/Recognitions.
- Certificate hosting (5 PDFs, self-activating links).
- Case Studies — index + 3 detail pages with inline Mermaid.
- System Design — 5 Mermaid reference architectures.
- Full responsive pass (375/768/1440/1920, zero overflow).
- Data realism pass (internally consistent, budget ≤ $1M).
- GitHub Actions deploy workflow.
- Prompt library (`prompts/01–07`).
- AI continuity system (this pack) + gitignored `PRIVATE_PROFILE.md`.

## 🚧 In Progress
- **Go live on GitHub Pages** — repo connected & pushed; remaining: commit latest work, enable Pages (Source: GitHub Actions), verify the deployed base path.

## 🔜 Upcoming (next milestones)
1. **Personal-brand / conversion layer** (inspired by reference portfolios): landing positioning line + profile card; **résumé PDF download**; **Contact / "Work with me" section + persistent social footer** (LinkedIn, GitHub, email, "open to roles").
2. **Builds / Experiments section** — GitHub-linked projects (including this portfolio and the QA POC).
3. **Testimonials** — 2–3 LinkedIn recommendation quotes.
4. **Blog / Insights** — AI-PM thought-leadership articles (JSON/MD-driven, same dynamic-route pattern). Topics: multi-agent systems, AI observability, LLMOps for PMs, AI product metrics, agent evaluation.
5. **Microsoft certificate** — drop `public/certificates/program-management-microsoft.pdf` (link auto-appears).

## 🌅 Long-term vision
- Optional interactive AI demo ("try it" moment) beyond the QA run simulation.
- Per-page OG images; company logos on the timeline; README screenshots.
- Optional custom domain (only if the ₹0 constraint is relaxed).
- Keep the live site current purely via JSON edits → commit → auto-redeploy.

## Watch-items
- `data-science-pg-datatrained.pdf` reports "0 pages" in metadata — confirm it opens; re-export if blank.
- Recharts `defaultProps` warning is dev-only (gone in prod) — ignore.
