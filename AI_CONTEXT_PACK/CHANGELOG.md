# CHANGELOG

> Continuity doc 12 of 16. Consolidated, reverse-chronological. Dates reflect the build session (June 2026). Append new entries at the top.

## 2026-06-25
| Change | Files affected | Reason |
|---|---|---|
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
