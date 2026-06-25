# AI Context Pack

A portable, self-contained context package for this project. Upload these files into a fresh AI assistant (new Claude account/chat, Cursor, etc.) and it can continue the work **without any prior chat history**.

## What's inside

| File | Purpose |
|---|---|
| `PROJECT_CONTEXT.md` | Purpose, user profile, goals, constraints, architecture, stack, folder structure, status. **Start here.** |
| `DECISIONS.md` | Key technical decisions, reasoning, and rejected alternatives. |
| `ROADMAP.md` | Completed work, current work, next milestones. |
| `AI_INSTRUCTIONS.md` | How the AI should behave, coding standards, things to avoid, required workflow. |

## Intended flow

```
Claude Code → build project → generate this pack → commit to GitHub
   → new AI account → upload this pack → continue work
```

You should never need old chat history again. Keep the pack updated as the project evolves (especially `ROADMAP.md` and `DECISIONS.md`).

## Private data

Personal/career specifics are kept in **`PRIVATE_PROFILE.md`** at the repo root, which is **gitignored** and must NOT be committed to a public repo. When continuing work in a private AI session, upload `PRIVATE_PROFILE.md` alongside this pack; for anything public, omit it.

No secrets, credentials, or tokens are included in this pack.
