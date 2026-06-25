# KNOWN_ISSUES

> Continuity doc 8 of 16.

## Bugs
- **None known** in the current build. (A prior tab-switch chart-rendering bug in the QA page was fixed with a resize-nudge `useEffect`.)

## Technical debt
- **Dashboard data shapes are page-coupled.** `data/*_metrics.json` are consumed directly by their pages without shared TS interfaces (unlike `lib/experience.ts`). Low risk; consider typing if dashboards grow.
- **Landing page is product-positioned**, light on personal-brand/conversion elements (résumé, contact, profile card) — tracked in `BACKLOG.md` (H1–H3).
- **Avg Daily Cost delta** (−1.8%) on the Executive KPI is static, while the value is computed — cosmetic.

## Missing features
- Live deployment not yet verified on Pages (CRITICAL — `BACKLOG.md` C1).
- No résumé download, contact section, blog, builds, or testimonials yet (see backlog).
- Microsoft certificate PDF not yet added (link stays hidden until present).

## UX issues
- `SiteHeader` nav on very small screens is horizontally scrollable (acceptable; could become a hamburger menu later).
- Mermaid diagrams are wide on mobile — they scroll horizontally inside their container (by design).

## Security concerns
- **None in-repo.** No secrets/tokens/credentials committed. `PRIVATE_PROFILE.md`, `.env*`, `secrets/`, `credentials/`, `*.pem`, `*.key` are gitignored.
- **Awareness:** the public repo intentionally publishes factual career data (`resume.json`, `profile.json`) — that is the portfolio content, not a leak. Contact email is kept out of public files (only in gitignored `PRIVATE_PROFILE.md`).

## Performance concerns
- Mermaid (~big) loads only on `/system-design` and case-study detail; Recharts on dashboards. First-load JS on chart/diagram routes is ~190–260 kB — acceptable for a portfolio, all static.
- Recharts `defaultProps` deprecation **warning appears in dev only** (verbose in console) — harmless, gone in production.

## Deployment issues
- **`next build` while `next dev` is running corrupts `.next`** → `Cannot find module './####.js'`, route 404s, or blank charts. Mitigation: stop dev before building; reset with `lsof -ti tcp:3000 | xargs kill -9; rm -rf .next; npm run dev`.
- GitHub Pages requires **Source = GitHub Actions** (not "Deploy from a branch") or the workflow won't publish.
