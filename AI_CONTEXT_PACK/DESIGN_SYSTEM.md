# DESIGN_SYSTEM

> Continuity doc 9 of 16. Source of truth: `tailwind.config.ts`, `app/globals.css`, `lib/format.ts`.

## Theme
Dark "control tower" / enterprise-console aesthetic, inspired by Datadog · Grafana · Azure Portal. Calm dark canvas, indigo brand accent, cyan secondary accent, semantic status colors. Subtle radial brand glows on the body background.

## Color palette (Tailwind tokens → hex)
| Token | Hex | Use |
|---|---|---|
| `canvas` | `#0a0e17` | page background |
| `surface` | `#111725` | panels/cards |
| `surface-2` | `#161d2e` | nested surfaces, hovers |
| `border` | `#1f2937` | default borders |
| `border-soft` | `#26304a` | emphasized borders |
| `muted` | `#7c8aa5` | secondary text |
| `text-soft` | `#a9b6cf` | body text |
| `brand` | `#6366f1` | primary (indigo) |
| `brand-soft` | `#818cf8` | links, accents |
| `accent` | `#22d3ee` | secondary (cyan) |
| `success` | `#22c55e` | healthy/pass |
| `warning` | `#f59e0b` | degraded/at-risk |
| `danger` | `#ef4444` | critical/fail |
| `info` | `#3b82f6` | informational |

**Chart palette** (`lib/format.ts` → `palette`): brand `#818cf8`, accent `#22d3ee`, success, warning, danger, info, grid `#1f2937`, axis `#7c8aa5`, plus a `series` array. Always use these for new charts.

**Status colors:** `statusTone(status)` maps strings (healthy/pass/done… → success; degraded/warn/at_risk… → warning; critical/fail/breached… → danger; etc.) to `toneClasses`. Reuse it; don't hand-roll status colors.

## Typography
- Sans: `var(--font-sans)` → system stack (`ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`). Mono: `ui-monospace, SFMono-Regular, Menlo`.
- Scale: page titles `text-xl`→`text-4xl font-semibold tracking-tight text-white`; section headings often `text-xl font-semibold` with a `border-l-2 border-brand pl-3` accent; KPI values `text-2xl font-semibold`; body `text-sm text-text-soft`; labels `.stat-label` (`text-xs uppercase tracking-wider text-muted`).

## Layout principles
- Dashboards: full-width fluid (fill ultrawide). Content/marketing pages: centered `max-w-6xl`/`max-w-4xl`/`max-w-3xl` for readability.
- Standard page padding `px-5 py-6 md:px-8`; vertical rhythm `space-y-6`.
- Panels use the `.panel` + `.panel-pad` component classes; titled blocks use the `<Panel>` component.
- Grids: `grid-cols-2 … lg:grid-cols-{4,5,6}` for KPIs; `xl:grid-cols-{2,3}` with `xl:col-span-2` for chart layouts.

## Component conventions
- **Reusable building blocks:** `Panel` (titled container), `KpiCard` (label/value/delta), `StatusBadge` (semantic pill), `ChartKit` (themed Recharts tooltip + `axisProps`/`gridProps`), `Mermaid` (diagram).
- **Component CSS classes** (in `globals.css` `@layer components`): `.panel`, `.panel-pad`, `.stat-label`, `.chip`, `.nav-link`, `.nav-link-active`.
- **Server vs client:** prose/SEO in server components; interactivity (`'use client'`) only where needed (charts, Mermaid, filters, QA run sim, active-nav).
- **Charts:** always `ResponsiveContainer` + `ChartTooltip`; mix bar+line via `ComposedChart`.
- Use theme tokens (`bg-surface`, `text-muted`, `text-brand-soft`, …) — never ad-hoc hex in JSX.

## Accessibility requirements
- Keyboard-reachable links/buttons (native elements used).
- `viewport` allows zoom (`maximumScale: 5`).
- Sufficient contrast on dark surfaces (text-soft/white on canvas/surface).
- `target="_blank"` links use `rel="noopener noreferrer"`; decorative SVGs `aria-hidden`.
- Improvement area: add `aria-label`s to icon-only controls as the conversion layer grows.

## Responsiveness strategy
- Breakpoints: phone 375, tablet 768, laptop 1440, desktop 1920 — verified no horizontal overflow.
- Sidebar shows at `lg+`; `MobileNav` (scrollable) below.
- Wide tables: `min-w-[…]` inside `overflow-x-auto` so they scroll (not crush).
- Mermaid diagrams: `max-w-full` inside `overflow-x-auto`.

## Design standards (for new work)
1. Reuse existing primitives before creating new ones.
2. Match neighboring code's spacing/naming/comment density.
3. Keep the enterprise, executive tone — no beginner UI, minimal animation.
4. Every new view must hold at all four breakpoints with no overflow.
