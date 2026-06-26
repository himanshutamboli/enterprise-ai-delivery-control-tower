# CHANGELOG

> Continuity doc 12 of 16. Consolidated, reverse-chronological. Dates reflect the build session (June 2026). Append new entries at the top.

## 2026-06-25
| Change | Files affected | Reason |
|---|---|---|
| Brand favicon (hexagon) + line-icon set; replaced unicode glyphs in header/sidebar/module cards with SVG icons | `app/icon.svg`, `components/icons.tsx`, `SiteHeader`, `Sidebar`, `app/page.tsx` | Real logo instead of globe; advanced icons |
| Applied v3.x version scheme to DevOps/DORA (env v3.0/v3.1-rc1) + Program dependency → v3.0 | `data/devops_metrics.json`, `data/program_metrics.json` | Version consistency (was missed) |
| Fixed experience process-flow diagrams (`\n`→`<br/>` label breaks) | `data/resume.json` | Mermaid labels rendered literal `\n` |
| Added ⌘K command palette (global, keyboard + header/sidebar/mobile-nav triggers, 23 destinations, filter + keyboard nav) | `components/CommandPalette.tsx`, `app/layout.tsx`, `components/layout/{SiteHeader,Sidebar,MobileNav}.tsx` | Standout interactive navigation |
| Count-up KPI animation + hover sparkline + click-to-drill (scroll to chart + highlight) | `components/ui/KpiCard.tsx`, `components/ui/Panel.tsx` (id prop), `app/control-tower/page.tsx` (panel ids + KPI targets) | Interactive KPI UX |
| Scroll-reveal for below-fold panels | `components/ScrollReveal.tsx`, `app/control-tower/layout.tsx`, `app/globals.css` | Motion polish (reduced-motion aware) |
| 4 new case studies (Loan Mgmt, Twilio→Marketo, NetSuite, Tableau→Power BI) + prev/next nav (last → System Design) | `lib/case-studies.ts`, `app/case-studies/[slug]/page.tsx` | Broaden delivery breadth; sequential browsing |
| 4 new system-design diagrams matching the new case studies (now 9) | `lib/system-design.ts` | Architecture coverage |
| Scaled dashboards to realistic figures (Daily Requests 1.3M→24.2K, Tokens 5.3B→97M, Avg Daily Cost→$490/$580 budget, Tool Calls 5.9M→76.4K) | `data/executive_metrics.json`, `data/agent_metrics.json` (incl. rescaled per-agent requests) | Headline numbers looked "huge"/unrealistic |
| Added 1M/3M/6M time-range filters to 6 charts (Executive: requests, spend, tokens; Observability: latency, hallucination, failure breakdown) | `lib/timeseries.ts` (new, deterministic generator), `components/ui/RangeTabs.tsx` (new), `app/control-tower/page.tsx`, `app/control-tower/observability/page.tsx` | User requested range filters; trends now generated (removed static trend arrays) |
| QA: Test Cases 3,284→668 + suites rescaled to ~668; trend relabeled v1.0→v3.0 with a Test Cases line (40→668); release tag → v3.0 | `data/qa_metrics.json`, `data/qa_suites.json`, `app/control-tower/qa/page.tsx` | Align with QA POC scenario count; versioned growth story |
| Program: burn trend given spikes/under-budget months ($960K & $614K untouched); Milestones 2/6→4/6; Team Capacity → 62 people/6 teams; refreshed stale R-01 | `data/program_metrics.json`, `app/control-tower/program/page.tsx` | Realism + reflect 60+ org |
| Generated full 16-file AI continuity system | `AI_CONTEXT_PACK/*` | Portable transfer to any new AI session/platform |
| Hardened `.gitignore` (`.env.*`, `credentials/`, `*.pem`; earlier `*.key`, `secrets/`, `PRIVATE_PROFILE.md`, `.claude/settings.local.json`) | `.gitignore` | Security rules — never commit secrets/PII |
| Built QA Test-Suite POC inside QA Governance (tabbed, env scoping, simulated Run, 22-module grid) | `app/control-tower/qa/page.tsx`, `components/qa/TestSuitesView.tsx`, `data/qa_suites.json` | Showcase the owner's real QA automation POC (read-only demo) |
| Added resize-nudge `useEffect` for charts on QA tab switch | `app/control-tower/qa/page.tsx` | Recharts re-measures when Governance tab is revealed |
| Data realism pass — tokens 8.4B→5.3B (match chart), tool calls 2.1M→5.9M (match registry), avg daily cost = true average, program budget scaled to ≤ $1M with burnTrend | `data/executive_metrics.json`, `data/agent_metrics.json`, `data/program_metrics.json`, `app/control-tower/page.tsx` | Numbers looked fake / inconsistent |
| Rolled back governance "Phase 1" (Risk Heatmap, Scorecard, SLO panel) | reverted Program/Executive/DevOps pages + deleted components/data | Owner rejected; not aligned to the actual POC |
| Fixed stale-`.next` symptoms (blank Observability charts, QA 404) via clean restart | `.next` (cache), dev server | Build-over-dev had corrupted the cache |
| Deployment guide + `.claude/settings.local.json` ignored | `.gitignore`, docs | Prep go-live; keep machine-local settings out of git |
| Certificate links de-duplicated + Data Science PG title renamed | `data/profile.json` | Owner correction |
| Hosted 5 certificate PDFs; normalized permissions | `public/certificates/*` | Self-activating "View certificate" links |
| Added Education/Certifications/Recognitions page + grouped certs w/ fs-existence link check | `app/experience/education/page.tsx`, `data/profile.json` | Surface credentials; auto-show links when files exist |
| Experience CTA promoted on landing; Profusion/Mapsted set to Contract | `app/page.tsx`, `data/resume.json` | Hiring-manager-first flow; factual correction |
| Replaced placeholder experience with resume-driven model (single source of truth); removed fabricated impact chart | `data/resume.json`, `lib/experience.ts`, `app/experience/**` | No invented career facts |
| Built Experience explorer (timeline + tag filter + detail pages) | `app/experience/**`, `components/experience/*` | Career section |
| Responsive pass (375/768/1440/1920) + viewport export + table `min-w` | `app/layout.tsx`, `components/layout/SiteHeader.tsx`, dashboard pages | Mobile/desktop compatibility |
| Built Case Studies + System Design (5 Mermaid diagrams) | `app/case-studies/**`, `app/system-design/page.tsx`, `components/Mermaid.tsx`, `lib/*` | Depth + architecture storytelling |
| Built Control Tower (5 dashboards) + reusable UI/chart kit + mock data | `app/control-tower/**`, `components/**`, `data/*_metrics.json`, `lib/format.ts` | Flagship product |
| Project scaffold (Next.js 14 static export, TS, Tailwind, Recharts) | config + `app/layout.tsx`, `app/globals.css` | Foundation |
| Added prompt library (`prompts/01–07`) | `prompts/*` | Staged build workflow templates |

## 8927aff — Initial commit
"Initial commit: Enterprise AI Delivery Control Tower" — pushed to `origin/main`.
