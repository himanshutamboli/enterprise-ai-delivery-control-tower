'use client';

import {
  Bar,
  CartesianGrid,
  ComposedChart,
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
import { palette, percent, relativeTime } from '@/lib/format';
import data from '@/data/devops_metrics.json';

const k = data.kpis;

function ratingChip(rating?: string) {
  if (!rating) return undefined;
  return (
    <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">{rating}</span>
  );
}

export default function DevOpsDashboard() {
  return (
    <div className="pb-12">
      <Topbar title="DevOps / DORA" subtitle={`${data.meta.program} · delivery performance & pipeline health`} />

      <div className="space-y-6 px-5 py-6 md:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <KpiCard label="Deploy Frequency" value={`${k.deploymentFrequency.value}${k.deploymentFrequency.unit}`} deltaPct={k.deploymentFrequency.deltaPct} badge={ratingChip(k.deploymentFrequency.rating)} />
          <KpiCard label="Lead Time" value={`${k.leadTime.value}${k.leadTime.unit}`} deltaPct={k.leadTime.deltaPct} invertDelta badge={ratingChip(k.leadTime.rating)} />
          <KpiCard label="MTTR" value={`${k.mttr.value}${k.mttr.unit}`} deltaPct={k.mttr.deltaPct} invertDelta badge={ratingChip(k.mttr.rating)} />
          <KpiCard label="Change Failure Rate" value={percent(k.changeFailureRate.value)} deltaPct={k.changeFailureRate.deltaPct} invertDelta badge={ratingChip(k.changeFailureRate.rating)} />
          <KpiCard label="Release Success" value={percent(k.releaseSuccessRate.value)} deltaPct={k.releaseSuccessRate.deltaPct} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Panel title="DORA Trend — Throughput" subtitle="Deploy frequency & lead time · weekly">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data.doraTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="week" {...axisProps} />
                <YAxis yAxisId="l" {...axisProps} width={32} />
                <YAxis yAxisId="r" orientation="right" {...axisProps} width={36} tickFormatter={(v) => `${v}h`} />
                <Tooltip content={<ChartTooltip />} />
                <Line yAxisId="l" type="monotone" dataKey="deployFreq" name="Deploys/day" stroke={palette.success} strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="r" type="monotone" dataKey="leadTimeH" name="Lead time (h)" stroke={palette.brand} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="DORA Trend — Stability" subtitle="MTTR & change failure rate · weekly">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data.doraTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="week" {...axisProps} />
                <YAxis yAxisId="l" {...axisProps} width={36} tickFormatter={(v) => `${v}m`} />
                <YAxis yAxisId="r" orientation="right" {...axisProps} width={36} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<ChartTooltip />} />
                <Line yAxisId="l" type="monotone" dataKey="mttrMin" name="MTTR (min)" stroke={palette.warning} strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="r" type="monotone" dataKey="cfrPct" name="Change fail %" stroke={palette.danger} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel title="CI/CD Pipeline Stages" subtitle="Avg duration & success rate" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={data.pipelineStages} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="stage" {...axisProps} interval={0} angle={-12} textAnchor="end" height={50} />
                <YAxis yAxisId="l" {...axisProps} width={36} tickFormatter={(v) => `${v}m`} />
                <YAxis yAxisId="r" orientation="right" domain={[90, 100]} {...axisProps} width={36} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar yAxisId="l" dataKey="avgDurationMin" name="Duration (min)" fill={palette.brand} radius={[3, 3, 0, 0]} barSize={26} />
                <Line yAxisId="r" type="monotone" dataKey="successRate" name="Success %" stroke={palette.success} strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Environments" subtitle="Version & health">
            <ul className="space-y-3">
              {data.environments.map((env) => (
                <li key={env.name} className="rounded-lg bg-surface-2/40 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize text-white">{env.name}</span>
                    <StatusBadge status={env.health} />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted">
                    <span className="font-mono">{env.version}</span>
                    <span>{percent(env.uptime, 2)} uptime</span>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel title="Recent Deployments" subtitle="Latest pipeline runs to staging & production">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                  <th className="pb-2 pr-3 font-medium">ID</th>
                  <th className="pb-2 pr-3 font-medium">Service</th>
                  <th className="pb-2 pr-3 font-medium">Environment</th>
                  <th className="pb-2 pr-3 font-medium">Duration</th>
                  <th className="pb-2 pr-3 font-medium">When</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {data.deployments.map((d) => (
                  <tr key={d.id} className="text-text-soft">
                    <td className="py-2.5 pr-3 font-mono text-xs text-muted">{d.id}</td>
                    <td className="py-2.5 pr-3 font-medium text-white">{d.service}</td>
                    <td className="py-2.5 pr-3 capitalize">{d.env}</td>
                    <td className="py-2.5 pr-3 tabular-nums">{d.durationMin}m</td>
                    <td className="py-2.5 pr-3 text-muted">{relativeTime(d.timestamp, new Date('2026-06-25T08:00:00Z'))}</td>
                    <td className="py-2.5"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
