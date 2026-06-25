# DEPLOYMENT

> Continuity doc 10 of 16. No credentials are stored here or anywhere in the repo.

## Repository
- **URL:** https://github.com/himanshutamboli/enterprise-ai-delivery-control-tower
- **Visibility:** Public (required for free GitHub Pages).

## Branch strategy
- `main` is the single source of truth and the deploy branch.
- Push to `main` → automatic build + deploy via GitHub Actions.
- For larger changes, use short-lived feature branches → PR → merge to `main` (optional for a solo portfolio).

## Hosting platform
- **GitHub Pages** (static). Live URL after enabling: `https://himanshutamboli.github.io/enterprise-ai-delivery-control-tower/`.

## Environment requirements
- Node 20 (CI). Local dev: Node 18+.
- **Env var:** `NEXT_PUBLIC_BASE_PATH` — set automatically in CI by `actions/configure-pages` (`/<repo>` for project sites). Empty locally.
- No secrets, API keys, or `.env` files are required to build or run.

## CI/CD process
GitHub Actions workflow: `.github/workflows/deploy.yml`.
```mermaid
flowchart LR
  PUSH["push to main / workflow_dispatch"] --> CHECKOUT["checkout"]
  CHECKOUT --> NODE["setup-node 20 (npm cache)"]
  NODE --> CFG["configure-pages → base_path"]
  CFG --> CI["npm ci"]
  CI --> BUILD["npm run build (NEXT_PUBLIC_BASE_PATH)"]
  BUILD --> NJ["touch out/.nojekyll"]
  NJ --> UP["upload-pages-artifact (out/)"]
  UP --> DEP["deploy-pages → Pages"]
```

## Build commands
```bash
npm ci            # CI install (clean)
npm install       # local install
npm run build     # static export → ./out   (STOP `npm run dev` first)
```

## Run commands
```bash
npm run dev       # local dev → http://localhost:3000
npm run serve     # serve the built ./out locally (npx serve out)
npm run lint
```

## Deployment workflow (first-time go-live)
1. Set git identity (once): `git config --global user.name "…"; git config --global user.email "…"` (use a `…@users.noreply.github.com` email to keep it private).
2. `git add -A && git commit -m "…" && git push origin main`  (verify `PRIVATE_PROFILE.md` is NOT listed in `git status`).
3. GitHub → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Watch the **Actions** tab; when green, the live URL is under Settings → Pages.

## Ongoing deploys
Edit → `git add -A && git commit -m "…" && git push origin main` → Actions rebuilds & redeploys (~1–2 min). Most edits are JSON-only.

## Rollback procedure
- **Fast:** revert the offending commit and push — `git revert <sha> && git push origin main` (triggers a fresh deploy of the prior state).
- **Re-run a known-good deploy:** Actions tab → select a previous successful run → "Re-run all jobs."
- **Hard reset (use with care):** `git reset --hard <good-sha> && git push --force-with-lease origin main`.

## Local recovery (corrupted dev cache)
```bash
lsof -ti tcp:3000 | xargs kill -9   # free port 3000
rm -rf .next                        # clear corrupted cache
npm run dev
```

## Security
Never commit API keys, passwords, tokens, secrets, credentials, private certificates, or `.env*` files. `.gitignore` blocks `PRIVATE_PROFILE.md`, `.env`, `.env.*`, `.env*.local`, `secrets/`, `credentials/`, `*.pem`, `*.key`, `.claude/settings.local.json`.
