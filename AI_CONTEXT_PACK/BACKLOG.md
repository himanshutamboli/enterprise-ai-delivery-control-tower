# BACKLOG

> Continuity doc 7 of 16. Prioritized work items. Effort: S (≤1 focused pass), M (a few passes), L (multi-session).

## 🔴 Critical
### C1 — Go live on GitHub Pages
- **Description:** Commit the latest uncommitted work, push, enable Pages (Source: GitHub Actions), verify the live URL + base path.
- **Recommended implementation:** `git add -A && git commit && git push origin main`; GitHub → Settings → Pages → Source = GitHub Actions; watch Actions; verify `https://himanshutamboli.github.io/enterprise-ai-delivery-control-tower/`.
- **Dependencies:** `.github/workflows/deploy.yml` (present); repo connected (done).
- **Effort:** S.

## 🟠 High
### H1 — Résumé PDF download
- **Description:** One-click CV for recruiters (currently none).
- **Recommended implementation:** Add `public/resume.pdf`; a base-path-aware "Download résumé" button on landing + Experience (reuse the `certHref` pattern); render only if the file exists.
- **Dependencies:** owner provides the PDF.
- **Effort:** S.

### H2 — Contact / "Work with me" section + persistent social footer
- **Description:** Conversion layer — email, LinkedIn, GitHub, "open to Senior/Principal TPM & AI PM roles."
- **Recommended implementation:** New section on landing + a shared `Footer` component used across pages; data in a small `data/profile.json` addition or inline.
- **Dependencies:** none (use public links; avoid exposing private email if undesired — use LinkedIn/contact form link).
- **Effort:** S.

### H3 — Landing profile card + personal positioning line
- **Description:** At-a-glance identity (8+ yrs · 6 companies · domains · location · top certs) + a voice tagline, above the product modules.
- **Recommended implementation:** `ProfileCard` component fed by a small profile summary; position-statement copy in the hero.
- **Dependencies:** wording approval from owner.
- **Effort:** S.

### H4 — Blog / Insights section
- **Description:** AI-PM thought leadership (biggest content gap).
- **Recommended implementation:** `data/blog/*.md` or `lib/blog.ts` + `app/blog/page.tsx` + `[slug]/page.tsx` with `generateStaticParams` (mirror case-studies pattern). Add to nav.
- **Dependencies:** article content.
- **Effort:** M.

## 🟡 Medium
### M1 — Builds / Experiments section
- **Description:** GitHub-linked projects (incl. this portfolio, QA POC) to show hands-on building.
- **Recommended implementation:** `data/builds.json` + a section/page with repo links + short blurbs.
- **Effort:** S.

### M2 — Testimonials / recommendations
- **Description:** 2–3 LinkedIn recommendation quotes as a trust signal.
- **Recommended implementation:** `data/testimonials.json` + a quote-card section.
- **Dependencies:** quotes (with attribution permission).
- **Effort:** S.

### M3 — Microsoft certificate
- **Description:** Add `public/certificates/program-management-microsoft.pdf`; link auto-appears.
- **Effort:** S (drop file + commit).

## 🟢 Low
### L1 — Per-page OG images + README screenshots.  **Effort:** M.
### L2 — Company logos on the experience timeline.  **Effort:** S.
### L3 — Optional interactive AI demo ("try it") beyond the QA run sim.  **Effort:** M–L.
### L4 — Re-export `data-science-pg-datatrained.pdf` if it renders blank.  **Effort:** S.
