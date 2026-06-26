'use client';

import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Topbar from '@/components/layout/Topbar';
import Panel from '@/components/ui/Panel';
import KpiCard from '@/components/ui/KpiCard';
import RangeTabs from '@/components/ui/RangeTabs';
import { axisProps, ChartTooltip, gridProps } from '@/components/charts/ChartKit';
import { compactNumber, currency, fullNumber, palette, percent } from '@/lib/format';
import { buildSeries, type RangeKey } from '@/lib/timeseries';
import data from '@/data/executive_metrics.json';

const k = data.kpis;
const DAILY_BUDGET = 580; // USD/day operational budget

export default function ExecutiveDashboard() {
  const [reqRange, setReqRange] = useState<RangeKey>('1m');
  const [costRange, setCostRange] = useState<RangeKey>('1m');
  const [tokRange, setTokRange] = useState<RangeKey>('1m');

  const requests = useMemo(
    () =>
      buildSeries(reqRange, 101, [
        { key: 'success', base: 23900, trend: 1.14, vol: 0.08 },
        { key: 'failed', base: 300, vol: 0.28, spikeP: 0.12, spikeMag: 0.9, floor: 60 },
      ]),
    [reqRange]
  );
  const costSeries = useMemo(
    () =>
      buildSeries(costRange, 202, [
        { key: 'cost', base: 470, trend: 1.1, vol: 0.13, spikeP: 0.12, spikeMag: 0.45 },
        { key: 'budget', base: DAILY_BUDGET, vol: 0 },
      ]),
    [costRange]
  );
  const tokens = useMemo(
    () =>
      buildSeries(tokRange, 303, [
        { key: 'input', base: 70000000, trend: 1.12, vol: 0.12 },
        { key: 'output', base: 27000000, trend: 1.12, vol: 0.12 },
      ]),
    [tokRange]
  );

  return (
    <div className="pb-12">
      <Topbar
        title="Executive"
        subtitle={`${data.meta.program} · program-level delivery & unit economics`}
        period={data.meta.reportingPeriod}
      />

      <div className="space-y-6 px-5 py-6 md:px-8">
        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard label="Active Agents" value={fullNumber(k.activeAgents.value)} deltaPct={k.activeAgents.deltaPct} footnote="in production" />
          <KpiCard label="Daily Requests" value={compactNumber(k.dailyRequests.value)} deltaPct={k.dailyRequests.deltaPct} footnote="vs prior wk" targetId="#chart-requests" spark={[18, 20, 19, 22, 23, 24]} />
          <KpiCard label="Success Rate" value={percent(k.successRate.value)} deltaPct={k.successRate.deltaPct} />
          <KpiCard label="Cost / Request" value={currency(k.costPerRequest.value, { digits: 4 })} deltaPct={k.costPerRequest.deltaPct} invertDelta footnote="optimized" />
          <KpiCard label="Token Consumption" value={`${compactNumber(k.totalTokens.value)}`} deltaPct={k.totalTokens.deltaPct} footnote="tokens / day" targetId="#chart-tokens" spark={[80, 79, 92, 95, 97]} />
          <KpiCard label="Prod Incidents" value={fullNumber(k.productionIncidents.value)} deltaPct={k.productionIncidents.deltaPct} invertDelta footnote="last 7d" />
          <KpiCard label="Release Health" value={percent(k.releaseHealth.value, 0)} deltaPct={k.releaseHealth.deltaPct} />
          <KpiCard label="Avg Daily Cost" value={currency(490, { compact: true })} deltaPct={-1.8} invertDelta footnote={`vs $${DAILY_BUDGET} budget`} targetId="#chart-cost" spark={[520, 500, 470, 455, 490]} />
        </div>

        {/* Primary trends */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel
            id="chart-requests"
            title="Request Volume & Reliability"
            subtitle="Daily requests vs failures"
            className="xl:col-span-2"
            action={<RangeTabs value={reqRange} onChange={setReqRange} />}
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={requests} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.brand} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={palette.brand} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={(v) => compactNumber(v as number)} width={48} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => fullNumber(v)} />} />
                <Area type="monotone" dataKey="success" name="Successful" stroke={palette.brand} fill="url(#gReq)" strokeWidth={2} />
                <Area type="monotone" dataKey="failed" name="Failed" stroke={palette.danger} fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Model Mix" subtitle="Share of requests vs cost">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={data.modelMix} dataKey="share" nameKey="model" innerRadius={48} outerRadius={78} paddingAngle={2} stroke="none">
                  {data.modelMix.map((_, i) => (
                    <Cell key={i} fill={palette.series[i % palette.series.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v}%`} />} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-1 space-y-1.5 text-xs">
              {data.modelMix.map((m, i) => (
                <li key={m.model} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-text-soft">
                    <span className="h-2 w-2 rounded-sm" style={{ background: palette.series[i % palette.series.length] }} />
                    {m.model}
                  </span>
                  <span className="text-muted">{m.share}% req · {m.costShare}% cost</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Cost & tokens */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Panel
            id="chart-cost"
            title="Daily Spend vs Budget"
            subtitle="Inference + infra cost · USD"
            action={<RangeTabs value={costRange} onChange={setCostRange} />}
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={costSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.accent} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={palette.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={(v) => currency(v as number, { compact: true })} width={48} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => currency(v)} />} />
                <Area type="monotone" dataKey="cost" name="Actual cost" stroke={palette.accent} fill="url(#gCost)" strokeWidth={2} />
                <Line type="monotone" dataKey="budget" name="Budget" stroke={palette.warning} strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel
            id="chart-tokens"
            title="Token Consumption"
            subtitle="Input vs output tokens"
            action={<RangeTabs value={tokRange} onChange={setTokRange} />}
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={tokens} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={(v) => compactNumber(v as number)} width={48} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => fullNumber(v)} />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="input" name="Input" stackId="t" fill={palette.brand} radius={[0, 0, 0, 0]} />
                <Bar dataKey="output" name="Output" stackId="t" fill={palette.accent} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        {/* Business units */}
        <Panel title="Adoption by Business Unit" subtitle="Where the platform is creating value">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                  <th className="pb-2 font-medium">Business Unit</th>
                  <th className="pb-2 font-medium">Daily Requests</th>
                  <th className="pb-2 font-medium">Success Rate</th>
                  <th className="pb-2 font-medium">Cost Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {data.businessUnits.map((bu) => (
                  <tr key={bu.unit} className="text-text-soft">
                    <td className="py-3 font-medium text-white">{bu.unit}</td>
                    <td className="py-3">{fullNumber(bu.requests)}</td>
                    <td className="py-3">{percent(bu.successRate)}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-surface-2">
                          <div className="h-full rounded-full bg-brand" style={{ width: `${bu.costShare}%` }} />
                        </div>
                        <span className="text-muted">{bu.costShare}%</span>
                      </div>
                    </td>
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
