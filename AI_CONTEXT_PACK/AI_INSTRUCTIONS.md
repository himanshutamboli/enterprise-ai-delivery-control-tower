# AI_INSTRUCTIONS

> Continuity doc 11 of 16. How any AI assistant (Claude Code, ChatGPT, Gemini, Cursor, Windsurf, Copilot, future tools) must operate on this project.

## Bootstrap procedure (run when a new session starts)
1. Read this pack: `PROJECT_CONTEXT` → `ARCHITECTURE` → `FEATURES` → `DECISIONS` → `ROADMAP` → `BACKLOG` → `KNOWN_ISSUES` → `DESIGN_SYSTEM` → `DEPLOYMENT` → this file. Plus root `PROJECT_MEMORY.md` and (privately) `PRIVATE_PROFILE.md`.
2. Read the codebase and compare it to the docs; note inconsistencies.
3. Produce a **Project Understanding Report**: executive summary, completion %, implemented features, missing features, technical debt, risks, recommended next actions.
4. **Do not modify code until the user approves your understanding.**

## Validation (answer before coding)
- Top 10 implemented features. (See `FEATURES.md`.)
- Top 10 remaining tasks. (See `BACKLOG.md` / `ROADMAP.md`.)
- Architecture decisions that must NOT change. (See `DECISIONS.md` — esp. D1 static export, D4 JSON-driven, D6 resume-as-truth.)
- Current project risks. (See `KNOWN_ISSUES.md`.)
- Recommended next milestone.
Proceed only after the user confirms.

## Required behavior
- Senior engineer + product partner. Concise and decisive; take sensible defaults and say so rather than over-asking.
- Audience = recruiters/hiring managers for senior AI TPM roles. Optimize for an enterprise, executive, credible impression.
- Preserve the dark "control tower" aesthetic and existing component patterns (`DESIGN_SYSTEM.md`).
- After a unit of work, state what changed, what you verified, and the recommended next step.

## Coding standards
- **TypeScript** everywhere; typed models in `lib/`.
- **Reuse primitives:** `Panel`, `KpiCard`, `StatusBadge`, `ChartKit`, `Mermaid`, `lib/format.ts` (formatters + `palette` + `statusTone`). Don't reinvent.
- **Data-driven, never hardcoded:** content from `data/*.json` / `lib/*.ts`; dynamic routes via `generateStaticParams`.
- **Naming:** PascalCase components/files (`KpiCard.tsx`); camelCase functions/vars; kebab-case route segments + data files; slugs match data keys.
- **Architecture conventions:** server components for prose/SEO; `'use client'` only for interactivity (charts, Mermaid, filters, simulations); theme tokens, not ad-hoc hex; new views must hold at 375/768/1440/1920 with no horizontal overflow (wide tables → `min-w` inside `overflow-x-auto`).
- **Comments:** explain *why* for non-obvious choices (base-path handling, fs checks, resize nudge). Match neighboring density.
- **Testing standards:** no unit-test suite (static portfolio). "Tests" = `npm run build` passes + browser verification on a managed preview (render, console clean, responsive). Verify visual/behavioral changes before claiming done.

## Workflow
**Before modifying code:** explain the change, explain why, identify affected files.
**Implement:** data model (`data/`/`lib/`) → reusable components → pages. Keep changes scoped; don't touch unrelated files.
**Verify:** `npm run build` must pass (stop `npm run dev` first — see below). For UI changes, run a preview and check the affected routes (render, console, responsive at mobile + desktop). Verify on a **separate managed preview port**, never by building over the user's live dev server.
**After changes:** update documentation, the continuity pack, and the changelog (see End-of-session rule).

## Never
- ❌ Break the static export (no SSR, server actions, route handlers, runtime env, `next/image` optimization, or any server dependency).
- ❌ Invent career facts. `data/resume.json` + `data/profile.json` are the single source of truth — format only.
- ❌ Add paid dependencies or services (budget ₹0).
- ❌ Run `npm run build` while `npm run dev` is running (corrupts `.next`).
- ❌ Commit `PRIVATE_PROFILE.md`, `.env*`, `secrets/`, `credentials/`, `*.pem`, `*.key`, or any secret/token/credential.
- ❌ Rebuild already-completed features, break the architecture, or ignore these docs.
- ❌ Introduce broken certificate links (preserve the fs-existence-check pattern).

## Useful commands
```bash
npm run dev      # http://localhost:3000
npm run build    # static export → ./out  (stop dev first)
npm run serve    # preview ./out
npm run lint
# recover a corrupted dev cache:
lsof -ti tcp:3000 | xargs kill -9; rm -rf .next; npm run dev
```

## End-of-session rule
At the end of every significant work session, update so the continuity docs always reflect the latest state:
`PROJECT_CONTINUITY_PACK.md` · `PROJECT_RESTART_PROMPT.md` · `CHANGELOG.md` · `ROADMAP.md` · `PROJECT_MEMORY.md` (and any of FEATURES/BACKLOG/KNOWN_ISSUES/IMPLEMENTATION_HISTORY that changed).
