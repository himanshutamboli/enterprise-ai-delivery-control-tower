# AI Continuity Pack

A self-contained context package that lets this project be transferred to **any** new AI session, account, or platform (Claude Code, ChatGPT, Gemini, Cursor, Windsurf, GitHub Copilot, future tools) **without prior chat history**.

## How to use
1. In a fresh AI session, upload this `AI_CONTEXT_PACK/` folder (and, privately, the gitignored `PRIVATE_PROFILE.md` from the repo root).
2. Paste the prompt from **`PROJECT_RESTART_PROMPT.md`**.
3. The assistant produces a Project Understanding Report and waits for approval before coding.

> Quick path: **`PROJECT_CONTINUITY_PACK.md`** alone is a self-contained transfer doc. **`EXECUTIVE_BRIEF.md`** is a <5-min overview.

## Contents
| File | Purpose |
|---|---|
| `PROJECT_CONTINUITY_PACK.md` | **Master consolidated transfer doc** — start here |
| `EXECUTIVE_BRIEF.md` | <5-minute overview |
| `PROJECT_RESTART_PROMPT.md` | Paste-anywhere bootstrap prompt for a new AI |
| `PROJECT_CONTEXT.md` | Purpose, users, goals, constraints, stack, status |
| `ARCHITECTURE.md` | System architecture, modules, data models, diagrams |
| `FEATURES.md` | Full feature inventory with statuses |
| `DECISIONS.md` | Major decisions, reasoning, alternatives, impact |
| `IMPLEMENTATION_HISTORY.md` | Chronological build log by phase |
| `ROADMAP.md` | Completed / in-progress / upcoming / long-term |
| `BACKLOG.md` | Prioritized work (Critical→Low) w/ effort & deps |
| `KNOWN_ISSUES.md` | Bugs, debt, gaps, UX/security/perf/deploy notes |
| `DESIGN_SYSTEM.md` | Theme, palette, typography, conventions, a11y, responsive |
| `DEPLOYMENT.md` | Repo, branches, CI/CD, build/run, rollback (no secrets) |
| `AI_INSTRUCTIONS.md` | Behavior, standards, workflow, bootstrap/validation rules |
| `CHANGELOG.md` | Consolidated change history |
| `README.md` | This index |

**At repo root:** `PROJECT_MEMORY.md` (long-term memory / build log) and `PRIVATE_PROFILE.md` (personal/career data — **gitignored**, never committed).

## Transfer workflow
```
Build → update continuity pack + CHANGELOG → commit to Git → open new AI session
      → upload pack (+ PRIVATE_PROFILE privately) → validate understanding → continue
```

## Maintenance
At the end of each significant session, refresh: `PROJECT_CONTINUITY_PACK.md`, `PROJECT_RESTART_PROMPT.md`, `CHANGELOG.md`, `ROADMAP.md`, `PROJECT_MEMORY.md` (and any detail doc that changed). No secrets, credentials, or tokens belong in this pack.
