'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
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
import { compactNumber, currency, fullNumber, palette, percent } from '@/lib/format';
import data from '@/data/agent_metrics.json';

const s = data.summary;

function hallucinationTone(score: number) {
  if (score < 0.03) return 'text-success';
  if (score < 0.05) return 'text-warning';
  return 'text-danger';
}

export default function ObservabilityDashboard() {
  return (
    <div className="pb-12">
      <Topbar title="AI Observability" subtitle={`${data.meta.platform} · agent traces, latency, cost & hallucination`} />

      <div className="space-y-6 px-5 py-6 md:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          <KpiCard label="Total Agents" value={fullNumber(s.totalAgents)} footnote="monitored" />
          <KpiCard label="Avg Latency" value={`${(s.avgLatencyMs / 1000).toFixed(2)}s`} footnote="across all agents" />
          <KpiCard label="P95 Latency" value={`${(s.p95LatencyMs / 1000).toFixed(2)}s`} footnote="tail latency" />
          <KpiCard label="Hallucination" value={s.avgHallucinationScore.toFixed(3)} footnote="eval score" />
          <KpiCard label="Tool Calls" value={compactNumber(s.totalToolCalls)} footnote="last 24h" />
          <KpiCard label="Failure Rate" value={percent(s.avgFailureRate)} footnote="avg" />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel title="Latency Distribution" subtitle="p50 / p95 / p99 over 24h · ms" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data.latencyTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="time" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={(v) => `${(v as number) / 1000}s`} width={40} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v} ms`} />} />
                <Line type="monotone" dataKey="p50" name="p50" stroke={palette.success} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p95" name="p95" stroke={palette.warning} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p99" name="p99" stroke={palette.danger} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Hallucination Trend" subtitle="LLM-as-judge groundedness · 7d">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data.hallucinationTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="date" {...axisProps} tickFormatter={(d) => String(d).slice(5)} />
                <YAxis {...axisProps} domain={[0, 0.06]} width={40} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => v.toFixed(3)} />} />
                <Line type="monotone" dataKey="score" name="Hallucination" stroke={palette.accent} strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel title="Failure Breakdown" subtitle="By root cause · last 24h" className="xl:col-span-1">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data.failureBreakdown} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} horizontal={false} />
                <XAxis type="number" {...axisProps} tickFormatter={(v) => compactNumber(v as number)} />
                <YAxis type="category" dataKey="category" {...axisProps} width={120} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => fullNumber(v)} />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="count" name="Failures" radius={[0, 4, 4, 0]}>
                  {data.failureBreakdown.map((_, i) => (
                    <Cell key={i} fill={palette.series[i % palette.series.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Agent Registry" subtitle="Per-agent observability · cost, latency, quality" className="xl:col-span-2">
            <div className="max-h-[420px] overflow-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="sticky top-0 bg-surface">
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                    <th className="pb-2 pr-3 font-medium">Agent</th>
                    <th className="pb-2 pr-3 font-medium">Exec</th>
                    <th className="pb-2 pr-3 font-medium">Cost</th>
                    <th className="pb-2 pr-3 font-medium">Tokens</th>
                    <th className="pb-2 pr-3 font-medium">Fail %</th>
                    <th className="pb-2 pr-3 font-medium">Halluc.</th>
                    <th className="pb-2 pr-3 font-medium">Tools</th>
                    <th className="pb-2 font-medium">Trace</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {data.agents.map((a) => (
                    <tr key={a.id} className="text-text-soft hover:bg-surface-2/40">
                      <td className="py-2.5 pr-3">
                        <div className="font-medium text-white">{a.name}</div>
                        <div className="text-[11px] text-muted">{a.type} · {compactNumber(a.requests)} req</div>
                      </td>
                      <td className="py-2.5 pr-3 tabular-nums">{(a.executionTimeMs / 1000).toFixed(2)}s</td>
                      <td className="py-2.5 pr-3 tabular-nums">{currency(a.costUsd, { digits: 3 })}</td>
                      <td className="py-2.5 pr-3 tabular-nums">{compactNumber(a.tokenUsage)}</td>
                      <td className="py-2.5 pr-3 tabular-nums">{percent(a.failureRate)}</td>
                      <td className={`py-2.5 pr-3 tabular-nums ${hallucinationTone(a.hallucinationScore)}`}>{a.hallucinationScore.toFixed(3)}</td>
                      <td className="py-2.5 pr-3 tabular-nums">{a.toolCalls}</td>
                      <td className="py-2.5"><StatusBadge status={a.traceStatus} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
