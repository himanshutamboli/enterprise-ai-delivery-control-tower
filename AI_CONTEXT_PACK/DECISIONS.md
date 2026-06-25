# DECISIONS

> Continuity doc 4 of 16. Major decisions with reasoning, alternatives, impact, and future implications. Append when a significant choice is made.

## D1 — Next.js 14 with static export (not Vite SPA, not SSR)
- **Decision:** Next.js App Router with `output: 'export'`.
- **Reasoning:** Matches the documented stack; produces pure static HTML for free GitHub Pages hosting; keeps file-based routing + metadata.
- **Alternatives considered:** Vite + React SPA; Next.js with SSR/ISR; Astro.
- **Rejected:** SSR/ISR (no server runtime on Pages); Vite SPA (loses routing/metadata, diverges from stated stack); Astro (extra learning, no clear win).
- **Impact:** No server features allowed anywhere; all data must be build-time static.
- **Future implications:** Any "live" feature must be client-side or a third-party widget; a backend would require leaving Pages.

## D2 — React 18.3 + Recharts 2.12 + Tailwind 3.4 (not React 19 / Tailwind 4)
- **Decision:** Conservative, battle-tested versions.
- **Reasoning:** Recharts 2.x is stable on React 18; Tailwind 3 has a simple PostCSS setup; zero version friction for a portfolio.
- **Rejected:** React 19 + Recharts (peer/runtime risk at the time); Tailwind 4 (CSS-first config migration friction).
- **Impact:** Recharts emits a harmless `defaultProps` deprecation **warning in dev only** (gone in prod).
- **Future implications:** Upgrading React/Recharts/Tailwind later is possible but should be a deliberate, tested step.

## D3 — Static-export hardening: `trailingSlash`, `images.unoptimized`, base path via env
- **Decision:** `trailingSlash: true`, `images: { unoptimized: true }`, `basePath` from `NEXT_PUBLIC_BASE_PATH`.
- **Reasoning:** Pages serves files without a server (nested routes need `/path/`), has no image optimizer, and project sites live under `/<repo>`.
- **Impact:** Plain `<a href="/x">` links must add base path manually (see `certHref` on the Education page).
- **Future implications:** A custom domain or `<user>.github.io` repo makes base path empty; the workflow handles both.

## D4 — JSON-driven content + `generateStaticParams` (no hardcoded entity pages)
- **Decision:** Content lives in `data/*.json` / `lib/*.ts`; dynamic routes auto-generate.
- **Reasoning:** Adding a case study, company, or diagram = edit data; routes follow. Clean content/presentation split.
- **Rejected:** One hand-written page per entity (doesn't scale).
- **Impact:** Editors never touch JSX for content changes.
- **Future implications:** Blog should follow the same JSON/MD-driven pattern.

## D5 — Mermaid rendered client-side with graceful fallback
- **Decision:** `components/Mermaid.tsx` renders diagrams post-hydration; falls back to raw text on error.
- **Reasoning:** Works under static export; never hard-crashes a page.
- **Trade-off:** Diagram SVGs aren't in server HTML (rendered after hydration); acceptable for a portfolio (prose is server-rendered for SEO).
- **Future implications:** If SEO of diagrams matters, consider build-time SVG generation.

## D6 — `data/resume.json` is the single source of truth for Experience
- **Decision:** Career facts come only from the resume; AI may format but not invent.
- **Reasoning:** Integrity — a portfolio must not fabricate companies/metrics/dates/tech.
- **Impact:** Deleted an earlier placeholder dataset; removed a fabricated trend chart (no invented metrics). Years-of-experience standardized to "8+ years."
- **Future implications:** All career edits must trace to the resume; `PRIVATE_PROFILE.md` mirrors the canonical facts.

## D7 — Grouped certifications + filesystem-existence check for links
- **Decision:** Certifications are categories → credentials; a "View certificate" link renders only if the file exists in `public/certificates/` (checked at build via `fs.existsSync`).
- **Reasoning:** Dropping a PDF lights up its link; missing files never produce broken links.
- **Alternative:** External Google Drive links (still supported via `http…` URLs) — repo-hosted preferred (faster, never breaks).
- **Future implications:** Future certs = drop file + add one JSON entry.

## D8 — Dark "control tower" theme via custom Tailwind tokens
- **Decision:** Centralized palette in `tailwind.config.ts` + chart colors in `lib/format.ts`.
- **Reasoning:** Enterprise-console aesthetic (Datadog/Grafana/Azure); single source for color consistency.
- **Future implications:** New components must use theme tokens, not ad-hoc hex. See `DESIGN_SYSTEM.md`.

## D9 — Mock dashboard data, clearly labeled; internal consistency enforced
- **Decision:** Realistic mock metrics, kept internally consistent (e.g., token KPI matches token chart; tool calls match per-agent registry; program budget ≤ $1M).
- **Reasoning:** Inconsistent/round numbers read as fake; consistency reads as real telemetry.
- **Impact:** Reworked token totals (8.4B→5.3B to match chart), tool calls (2.1M→5.9M), avg daily cost (now the true average), budget scaled to ≤$1M.
- **Future implications:** When editing one metric, check dependent figures for consistency.

## D10 — QA POC integrated as a tabbed view inside QA Governance
- **Decision:** "Test Suites | Governance" tabs on `/control-tower/qa`, default Test Suites; Run is a **client-side simulation** (no backend).
- **Reasoning:** Showcases the owner's QA automation POC without a server; honest "demo" labeling.
- **Impact:** Added a resize-nudge `useEffect` so Recharts re-measures when the Governance tab is revealed.
- **Future implications:** Other "automation" surfaces can follow the same simulate-and-label pattern.

## D11 — Responsive strategy
- **Decision:** Sidebar at `lg+`, `MobileNav` below; wide tables get `min-w-[…]` inside `overflow-x-auto`.
- **Reasoning:** Legible on phones (tables scroll, not crush); console layout on desktop.
- **Impact:** Verified zero horizontal overflow at 375/768/1440/1920.

## D12 — Operational: never run `next build` while `next dev` is live
- **Decision:** Stop dev before building; reset with `rm -rf .next` if corrupted.
- **Reasoning:** Both share `.next`; a build over a running dev server corrupts webpack chunks → `Cannot find module './####.js'` / route 404s / blank charts.
- **Future implications:** AI assistants verify on a separate managed preview port, never building over the user's live dev server.

## D13 — AI continuity pack as the transfer mechanism
- **Decision:** Maintain `AI_CONTEXT_PACK/` (public) + gitignored `PRIVATE_PROFILE.md` so any new AI session can resume without chat history.
- **Reasoning:** Portability across Claude/ChatGPT/Gemini/Cursor/Windsurf/Copilot.
- **Future implications:** Continuity docs must be updated at the end of each significant session (see `AI_INSTRUCTIONS.md`).
