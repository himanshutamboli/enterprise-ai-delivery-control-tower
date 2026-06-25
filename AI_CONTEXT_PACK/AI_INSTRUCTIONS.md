# AI_INSTRUCTIONS

How any AI assistant should work on this project. Read `PROJECT_CONTEXT.md`, `DECISIONS.md`, and `ROADMAP.md` first.

## How to behave

- Act as a senior engineer + product partner. Be concise and decisive; when a sensible default exists, take it and say so rather than asking.
- The audience is recruiters/hiring managers for senior AI TPM roles. Optimize for an enterprise, executive, credible impression — never "beginner project" energy.
- Preserve the established dark "control tower" aesthetic and component patterns; match the surrounding code's style.
- When you finish a unit of work, briefly state what changed, what you verified, and the recommended next step.

## Coding standards

- **TypeScript** everywhere; typed data models in `lib/`.
- **Reusable components** — extend `components/ui` (KpiCard, Panel, StatusBadge), `components/charts/ChartKit`, and `lib/format.ts` (formatters + color palette). Don't reinvent.
- **Data-driven, never hardcoded** — content comes from `data/*.json`; dynamic routes use `generateStaticParams`. To add an item, edit the data file.
- **Server vs client** — keep prose/SEO in server components; isolate interactivity (Recharts, Mermaid, filters) in `'use client'` components.
- **Tailwind tokens** — use the theme palette (`brand`, `surface`, `text-soft`, `muted`, etc.), not ad-hoc hex.
- **Comments** — explain *why* for non-obvious choices (e.g., base-path handling, fs existence checks). Keep comment density consistent with neighbors.
- **Responsive** — every new view must hold at 375 / 768 / 1440 / 1920 with no horizontal overflow. Put wide tables in `overflow-x-auto` with a `min-w-[…]`.

## Things to avoid

- ❌ **Do not break static export.** No SSR, server actions, route handlers, runtime env, `next/image` optimization, or anything requiring a server. Everything must work as static HTML on GitHub Pages.
- ❌ **Do not invent career facts.** `data/resume.json` + `data/profile.json` are the single source of truth. Never add/alter companies, titles, dates, metrics, technologies, or achievements that aren't provided. Formatting/framing only.
- ❌ **Do not add paid dependencies or services.** Budget is ₹0 (no paid APIs/DB/hosting/domains).
- ❌ **Do not run `npm run build` while `npm run dev` is running** — it corrupts the shared `.next` cache (`Cannot find module './####.js'`). Stop dev first.
- ❌ **Do not commit `PRIVATE_PROFILE.md`, `.env`, or `secrets/`** (gitignored). Keep personal specifics out of public docs/code beyond what already lives in the site's data files.
- ❌ **Do not introduce broken certificate links** — the cert link only renders if the file exists in `public/certificates/`; preserve that pattern.
- ❌ Avoid excessive animation, generic chatbot/demo content, or over-engineering.

## Required workflow

1. **Orient** — read the context pack (this folder) + `PROJECT_MEMORY.md`. Inspect existing code before changing it.
2. **Plan small** — for a feature, follow the `prompts/` flow (brainstorm → plan → build → review → release) at the appropriate stage.
3. **Implement** — data model in `data/`/`lib/` first, then reusable components, then pages. Keep changes scoped; don't touch unrelated files.
4. **Verify before claiming done:**
   - `npm run build` must pass (stop the dev server first). Confirm expected pages are generated.
   - For visual/behavioral changes, run the dev server and check the affected routes (render, console clean, responsive at mobile + desktop).
5. **Reset trick** if the dev server breaks: `lsof -ti tcp:3000 | xargs kill -9; rm -rf .next; npm run dev`.
6. **Record** — update `ROADMAP.md` (status), `DECISIONS.md` (if a significant choice was made), and `PROJECT_MEMORY.md` (running build log).

## Useful commands

```bash
npm run dev      # local dev → http://localhost:3000
npm run build    # static export into ./out  (stop dev first)
npm run serve    # preview the static export
npm run lint
```

## Deploy (when ready)

`git init` → commit → push to GitHub → Settings → Pages → Source: **GitHub Actions**. The workflow sets `NEXT_PUBLIC_BASE_PATH` and publishes `out/`. Do not commit secrets or `PRIVATE_PROFILE.md`.
