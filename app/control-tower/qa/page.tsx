'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
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
import { fullNumber, palette, percent } from '@/lib/format';
import data from '@/data/qa_metrics.json';

const k = data.kpis;

export default function QaDashboard() {
  const readyGates = data.readinessGates.filter((g) => g.status === 'pass').length;

  return (
    <div className="pb-12">
      <Topbar title="QA Governance" subtitle={`Release ${data.meta.release} · quality, coverage & release readiness`} />

      <div className="space-y-6 px-5 py-6 md:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          <KpiCard label="Test Cases" value={fullNumber(k.testCases.value)} deltaPct={k.testCases.deltaPct} />
          <KpiCard label="Pass Rate" value={percent(k.passRate.value)} deltaPct={k.passRate.deltaPct} />
          <KpiCard label="Regression Fails" value={fullNumber(k.regressionFailures.value)} deltaPct={k.regressionFailures.deltaPct} invertDelta />
          <KpiCard label="Escaped Defects" value={fullNumber(k.escapedDefects.value)} deltaPct={k.escapedDefects.deltaPct} invertDelta />
          <KpiCard label="Release Readiness" value={percent(k.releaseReadiness.value, 0)} deltaPct={k.releaseReadiness.deltaPct} />
          <KpiCard label="Test Coverage" value={percent(k.testCoverage.value)} deltaPct={k.testCoverage.deltaPct} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel title="Pass Rate & Coverage Trend" subtitle="Across recent builds" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data.passRateTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="build" {...axisProps} />
                <YAxis {...axisProps} domain={[78, 100]} tickFormatter={(v) => `${v}%`} width={42} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => percent(v)} />} />
                <Line type="monotone" dataKey="passRate" name="Pass rate" stroke={palette.success} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="coverage" name="Coverage" stroke={palette.brand} strokeWidth={2} strokeDasharray="5 4" dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Release Readiness Gates" subtitle={`${readyGates}/${data.readinessGates.length} gates passing`}>
            <ul className="space-y-2.5">
              {data.readinessGates.map((g) => (
                <li key={g.gate} className="flex items-center justify-between gap-3 rounded-lg bg-surface-2/40 px-3 py-2">
                  <span className="text-sm text-text-soft">{g.gate}</span>
                  <StatusBadge status={g.status} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel title="Defects by Severity" subtitle="Open vs closed" className="xl:col-span-1">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data.defectsBySeverity} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="severity" {...axisProps} />
                <YAxis {...axisProps} width={32} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="open" name="Open" stackId="d" fill={palette.danger} radius={[0, 0, 0, 0]} />
                <Bar dataKey="closed" name="Closed" stackId="d" fill={palette.success} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Test Suite Health" subtitle="Pass/fail by suite with coverage" className="xl:col-span-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                    <th className="pb-2 pr-3 font-medium">Suite</th>
                    <th className="pb-2 pr-3 font-medium">Pass / Total</th>
                    <th className="pb-2 pr-3 font-medium">Result</th>
                    <th className="pb-2 font-medium">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {data.suites.map((suite) => {
                    const rate = (suite.passed / suite.total) * 100;
                    return (
                      <tr key={suite.name} className="text-text-soft">
                        <td className="py-2.5 pr-3 font-medium text-white">{suite.name}</td>
                        <td className="py-2.5 pr-3 tabular-nums">{suite.passed} / {suite.total}</td>
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-2">
                              <div
                                className={`h-full rounded-full ${rate >= 97 ? 'bg-success' : rate >= 94 ? 'bg-warning' : 'bg-danger'}`}
                                style={{ width: `${rate}%` }}
                              />
                            </div>
                            <span className="tabular-nums text-muted">{percent(rate)}</span>
                          </div>
                        </td>
                        <td className="py-2.5 tabular-nums">{percent(suite.coverage, 0)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
