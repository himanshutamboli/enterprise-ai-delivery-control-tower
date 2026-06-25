# ROADMAP

Status as of the latest build. Update the checkboxes as work progresses.

## ✅ Completed

- **Scaffold** — Next.js 14 static export, TypeScript, Tailwind (dark theme), Recharts, ESLint; `next.config.mjs` for GitHub Pages.
- **Control Tower (flagship)** — 5 dashboards: Executive, AI Observability, QA Governance, DevOps/DORA, Program Health. Shared sidebar layout + mobile nav. Charts + KPI cards + tables from mock JSON.
- **Case Studies** — index + 3 dynamic detail pages (ZBrain Observability, Flow Builder, Cloud Migration), structured sections, inline Mermaid.
- **System Design** — 5 Mermaid reference architectures (multi-agent, RAG, observability, eval framework, LLMOps).
- **Experience Explorer** — resume-driven (`data/resume.json`), timeline with portfolio-tag filtering, per-company detail pages (9-section spec), prev/next sequence ending in the credentials page.
- **Education & Certifications** — dedicated page; education, grouped certifications with auto-appearing certificate links, recognitions. Certificate PDFs hosted in `public/certificates/`.
- **Prompt library** — `prompts/01–07` (brainstorm → planning → build → review → release → experience builder → resume sync).
- **Responsive pass** — verified phone/tablet/MacBook/Windows widths; no horizontal overflow.
- **Deploy workflow authored** — `.github/workflows/deploy.yml` (builds + publishes `out/` to Pages with base-path resolution).
- **AI context pack** — this folder.

## 🚧 In progress / current

- AI context pack generation (this).

## 🔜 Next milestones

1. **Blog section** — markdown articles (Building Enterprise Multi-Agent Systems, AI Observability Best Practices, LLMOps for PMs, Product Metrics for AI Apps, Agent Evaluation Frameworks). Likely `data/blog/*` + `app/blog/` index and `[slug]` detail, same JSON/MD-driven pattern.
2. **Go live** — `git init`, first commit, push to GitHub, enable Pages (Settings → Pages → Source: GitHub Actions). Verify the deployed base path.
3. **Polish (optional)** — README screenshots; per-page OG images; company logos on the timeline; add the Microsoft certificate PDF (`program-management-microsoft.pdf`) when available; re-verify the Data Science PDF (its metadata reported "0 pages").

## Known notes / watch-items

- `data-science-pg-datatrained.pdf` serves correctly but reported "0 pages" in metadata — confirm it opens, re-export if blank.
- Not deployed yet — site is local only.
- Recharts emits a harmless `defaultProps` deprecation warning in dev (gone in production).
