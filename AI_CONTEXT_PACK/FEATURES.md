# FEATURES

> Continuity doc 3 of 16. Status legend: ✅ Complete · 🚧 In Progress · 📋 Planned · ⛔ Blocked

| Feature | Status | Description | Notes |
|---|---|---|---|
| Project scaffold | ✅ | Next.js 14 static export, TS, Tailwind dark theme, Recharts, ESLint | `output: 'export'`, basePath via env |
| Landing / About page | ✅ | Hero, stat tiles, module cards, skills, explore cards, footer | Product-positioned; personal-brand layer planned |
| Site navigation | ✅ | `SiteHeader` (content pages) + `Sidebar`/`MobileNav` (Control Tower) | active-link via `usePathname` |
| Executive dashboard | ✅ | 8 KPIs, request/reliability, model mix, spend vs budget, token chart, BU table | `executive_metrics.json` |
| AI Observability dashboard | ✅ | Latency p50/p95/p99, hallucination trend, failure breakdown, agent registry | `agent_metrics.json` |
| QA Governance dashboard | ✅ | Pass/coverage trend, defects by severity, readiness gates, suite health | `qa_metrics.json` |
| QA Test-Suite POC | ✅ | Tabbed view: suite selector (Smoke/Regression/Jira), env scoping, **simulated Run**, module-scenario grid, test types | `qa_suites.json`; default tab |
| DevOps / DORA dashboard | ✅ | 4 DORA metrics + ratings, pipeline stages, environments, deployments | `devops_metrics.json` |
| Program Health dashboard | ✅ | Budget burn, milestones, risk register, issues, dependencies, team capacity | `program_metrics.json` |
| Experience timeline | ✅ | Most-recent-first timeline of 6 companies w/ tag filter | `resume.json` (factual) |
| Experience detail pages | ✅ | 9-section per-company case study (SSG, 6 slugs), prev/next sequence | ends → Education page |
| Education / Certifications / Recognitions | ✅ | Dedicated page; grouped certs with auto-appearing certificate links | fs-existence check on `public/certificates/` |
| Certificate hosting | ✅ | 5 PDFs served; link auto-appears when file present | Microsoft cert pending |
| Case studies | ✅ | Index + 3 detail pages (ZBrain Observability, Flow Builder, Cloud Migration) | `lib/case-studies.ts`, inline Mermaid |
| System design | ✅ | 5 Mermaid reference architectures w/ component lists | `lib/system-design.ts` |
| Responsive design | ✅ | Verified 375/768/1440/1920; tables scroll; sidebar↔mobile nav | no horizontal overflow |
| Mermaid rendering | ✅ | Client renderer w/ graceful raw-text fallback | `components/Mermaid.tsx` |
| Deploy workflow | ✅ | GitHub Actions → Pages, base-path auto-resolved, `.nojekyll` | `.github/workflows/deploy.yml` |
| AI continuity pack | ✅ | This 16-file system + gitignored `PRIVATE_PROFILE.md` | `AI_CONTEXT_PACK/` |
| Prompt library | ✅ | `prompts/01–07` staged workflow templates | brainstorm→release + resume sync |
| Live deployment on Pages | 🚧 | Repo connected & pushed; needs Pages source = GitHub Actions + verify | see `DEPLOYMENT.md` |
| Blog / Insights | 📋 | AI-PM thought-leadership articles (JSON/MD-driven) | top content gap |
| Résumé PDF download | 📋 | One-click CV (`public/resume.pdf` + button) | high-value for recruiters |
| Contact / "Work with me" + social footer | 📋 | Email, LinkedIn, GitHub, "open to roles" status, persistent footer | conversion layer |
| Landing profile card + personal positioning | 📋 | At-a-glance identity + voice tagline above product modules | inspired by vishalbagla.com |
| Builds / Experiments section | 📋 | GitHub-linked projects (incl. this portfolio, QA POC) | shows hands-on building |
| Testimonials / recommendations | 📋 | 2–3 LinkedIn recommendation quotes | trust signal |
| Microsoft certificate | 📋 | Drop `program-management-microsoft.pdf` → link auto-appears | awaiting file |
| Interactive AI demo (optional) | 📋 | A "try it" moment beyond the QA run sim | optional differentiator |
