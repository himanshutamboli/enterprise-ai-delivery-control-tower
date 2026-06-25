# DECISIONS

Key technical decisions, the reasoning, and the alternatives rejected. Update this file when a significant choice is made.

## 1. Next.js 14 + static export (not Vite SPA, not SSR)
- **Why:** Matches the documented stack and deploys free on GitHub Pages. `output: 'export'` produces pure static HTML — no server cost.
- **Rejected:** Vite + React SPA (lighter, but diverges from the project's stated Next.js stack and loses file-based routing/metadata). Next.js with SSR/ISR (no server runtime exists on GitHub Pages).

## 2. React 18.3 + Recharts 2.12 + Tailwind 3.4 (not React 19 / Tailwind 4)
- **Why:** Battle-tested, friction-free combination. Recharts 2.x is fully stable on React 18; Tailwind 3 has a simple, predictable PostCSS setup.
- **Rejected:** React 19 + Recharts (peer-dependency/runtime risk at the time) and Tailwind 4 (CSS-first config + `@tailwindcss/postcss` migration friction). The visual result is identical; stability was prioritized for a portfolio.

## 3. Static export details: `trailingSlash: true`, `images.unoptimized: true`, `basePath` via env
- **Why:** GitHub Pages serves files without a server, so nested routes need `/path/` URLs, image optimization must be off, and project sites live under `/<repo-name>`. `NEXT_PUBLIC_BASE_PATH` is set by the deploy workflow (`actions/configure-pages`) so links/assets resolve.

## 4. JSON-driven content + `generateStaticParams` (no hardcoded pages)
- **Why:** Adding a case study, company, or diagram = edit a JSON/TS data file; routes auto-generate. Clean separation of content and presentation; trivial to extend.
- **Rejected:** Hand-written page per entity (does not scale, violates the brief's "data must come from JSON").

## 5. Mermaid rendered client-side with graceful fallback
- **Why:** Diagrams render after hydration in the browser; works under static export. The `Mermaid` component falls back to showing the raw definition if a diagram fails, so it never hard-crashes a page.
- **Trade-off:** Diagram SVGs are not in the server HTML (rendered post-hydration). Acceptable for a portfolio; the surrounding prose is server-rendered for SEO.
- **Rejected:** Build-time SVG generation (extra tooling/complexity for marginal benefit).

## 6. `data/resume.json` is the single source of truth for Experience
- **Why:** The owner's resume is authoritative. Facts (company names, titles, dates, metrics, technologies, achievements) are preserved exactly; only narrative framing is written.
- **Consequence:** The earlier placeholder `data/experience.json` was deleted, and the fabricated `ImpactChart` (invented trend data) was removed — **no invented metrics**. Company-level metrics render as KPI cards instead.

## 7. Grouped certifications + filesystem-existence check for links
- **Why:** Certifications are organized as categories → multiple credentials. Each credential's "View certificate" link **only renders if the file exists** in `public/certificates/` (checked at build via `fs.existsSync` in the server component). Dropping a PDF/JPG in lights up the link; missing files never produce a broken link.
- **Alternative offered:** external Google Drive links (set `"file": "https://…"`). Repo-hosted files are recommended (faster, never break on Drive permission changes).

## 8. Dark "control tower" theme via custom Tailwind tokens
- **Why:** Enterprise-console aesthetic (Datadog/Grafana/Azure). Centralized palette + chart colors in `tailwind.config.ts` and `lib/format.ts` for consistency.

## 9. Mock data for dashboards, clearly labeled
- **Why:** No real integrations allowed/needed; demonstrates metric/KPI design without backends. Data is realistic and reflects real platform experience, labeled as mock in the UI.

## 10. Responsive strategy
- **Why:** Sidebar shows at `lg+`, replaced by a scrollable `MobileNav` below. Wide tables get `min-w-[…]` inside `overflow-x-auto` containers so they scroll legibly on phones instead of crushing. Verified at 375/768/1440/1920 with zero horizontal overflow.

## 11. Operational: never run `next build` while `next dev` is live
- **Why:** Both share the `.next` directory. Running a production build over a running dev server corrupts its webpack chunks (`Cannot find module './####.js'`). Always stop dev before building; reset with `rm -rf .next` if it happens.
