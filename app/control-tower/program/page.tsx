'use client';

import {
  Area,
  ComposedChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Topbar from '@/components/layout/Topbar';
import Panel from '@/components/ui/Panel';
import KpiCard from '@/components/ui/KpiCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { axisProps, ChartTooltip, gridProps } from '@/components/charts/ChartKit';
import { currency, palette, percent } from '@/lib/format';
import data from '@/data/program_metrics.json';

const b = data.budget;

function severityDot(sev: string) {
  const map: Record<string, string> = { high: 'bg-danger', medium: 'bg-warning', low: 'bg-info' };
  return <span className={`h-2 w-2 rounded-full ${map[sev] ?? 'bg-muted'}`} />;
}

export default function ProgramDashboard() {
  const spentPct = (b.spent / b.approved) * 100;
  const doneMilestones = data.milestones.filter((m) => m.status === 'done').length;
  const teamAllocated = data.teamCapacity.reduce((sum, t) => sum + t.allocated, 0);

  return (
    <div className="pb-12">
      <Topbar
        title="Program Health"
        subtitle={`${data.meta.program} · budget, milestones, risks & capacity`}
        period={data.meta.reportingPeriod}
      />

      <div className="space-y-6 px-5 py-6 md:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <KpiCard label="Approved Budget" value={currency(b.approved, { compact: true })} footnote="FY26 program" />
          <KpiCard label="Spent to Date" value={currency(b.spent, { compact: true })} footnote={`${percent(spentPct, 0)} of budget`} />
          <KpiCard label="Forecast at Close" value={currency(b.forecast, { compact: true })} deltaPct={b.variancePct} invertDelta footnote="vs approved" />
          <KpiCard label="Milestones Done" value={`${doneMilestones}/${data.milestones.length}`} footnote="this program" />
          <KpiCard label="Open Risks" value={`${data.risks.filter((r) => r.status === 'open').length}`} footnote={`${data.risks.length} tracked`} badge={<StatusBadge status={data.meta.ragStatus} label="Amber" />} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel title="Budget Burn — Planned vs Actual" subtitle="Cumulative spend · USD" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={b.burnTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gBurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.brand} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={palette.brand} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={(v) => currency(v as number, { compact: true })} width={48} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => currency(v, { compact: true })} />} />
                <Area type="monotone" dataKey="actual" name="Actual" stroke={palette.brand} fill="url(#gBurn)" strokeWidth={2} />
                <Line type="monotone" dataKey="planned" name="Planned" stroke={palette.warning} strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Team Capacity" subtitle={`${teamAllocated} people across ${data.teamCapacity.length} teams`}>
            <ul className="space-y-3">
              {data.teamCapacity.map((t) => (
                <li key={t.team}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-soft">{t.team}</span>
                    <span className="tabular-nums text-muted">{t.allocated}/{t.capacity}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={`h-full rounded-full ${t.utilizationPct >= 100 ? 'bg-danger' : t.utilizationPct >= 90 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${t.utilizationPct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel title="Milestone Roadmap" subtitle="Delivery status across the program">
          <div className="space-y-2.5">
            {data.milestones.map((m) => (
              <div key={m.name} className="flex flex-col gap-2 rounded-lg bg-surface-2/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <StatusBadge status={m.status} />
                  <div className="min-w-0">
                    <div className="truncate font-medium text-white">{m.name}</div>
                    <div className="text-xs text-muted">Due {m.due}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:w-64">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${m.completion}%` }} />
                  </div>
                  <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted">{m.completion}%</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Panel title="Risk Register" subtitle="Top program risks & mitigations">
            <ul className="space-y-3">
              {data.risks.map((r) => (
                <li key={r.id} className="rounded-lg bg-surface-2/40 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5">{severityDot(r.severity)}</span>
                      <div>
                        <div className="text-sm font-medium text-white">
                          <span className="font-mono text-xs text-muted">{r.id}</span> · {r.title}
                        </div>
                        <div className="mt-0.5 text-xs text-muted">Owner: {r.owner} · {r.severity}/{r.likelihood}</div>
                      </div>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="mt-2 pl-4 text-xs text-text-soft">↳ {r.mitigation}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="space-y-6">
            <Panel title="Open Issues" subtitle="Active blockers & defects">
              <ul className="space-y-2">
                {data.issues.map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-3 rounded-lg bg-surface-2/40 px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <span className="chip bg-surface text-text-soft ring-1 ring-inset ring-border">{i.priority}</span>
                      <div>
                        <div className="text-sm font-medium text-white">{i.title}</div>
                        <div className="text-xs text-muted">{i.id} · {i.owner} · {i.age}d old</div>
                      </div>
                    </div>
                    <StatusBadge status={i.status} />
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Dependencies" subtitle="Cross-stream delivery dependencies">
              <ul className="space-y-2">
                {data.dependencies.map((d, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 rounded-lg bg-surface-2/40 px-3 py-2.5 text-sm">
                    <span className="text-text-soft">
                      <span className="text-white">{d.from}</span>
                      <span className="px-1.5 text-muted">→ needs →</span>
                      <span className="text-white">{d.on}</span>
                    </span>
                    <StatusBadge status={d.status} />
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
