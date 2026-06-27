'use client';

import { useMemo, useState } from 'react';
import Panel from '@/components/ui/Panel';
import CountUp from '@/components/ui/CountUp';
import data from '@/data/qa_suites.json';

type Suite = (typeof data.suites)[number];

const KPIS: { label: string; value: string; tone?: string }[] = [
  { label: 'Total Scenarios', value: String(data.kpis.totalScenarios) },
  { label: 'Jira Imported', value: String(data.kpis.jiraImported) },
  { label: 'Smoke Critical-Path', value: String(data.kpis.smokeCriticalPath) },
  { label: 'Latest Pass Rate', value: `${data.kpis.latestPassRate}%` },
  { label: 'Active Bugs', value: String(data.kpis.activeBugs), tone: data.kpis.activeBugs === 0 ? 'success' : 'danger' },
];

function envClasses(env: string) {
  return env === 'Production'
    ? 'bg-warning/10 text-warning ring-1 ring-inset ring-warning/20'
    : 'bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20';
}

export default function TestSuitesView() {
  const [activeId, setActiveId] = useState<string>('regression');
  const [version, setVersion] = useState('');
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');

  const suite = useMemo(() => data.suites.find((s) => s.id === activeId) as Suite, [activeId]);

  // Reset the simulated run whenever the selected suite changes.
  function selectSuite(id: string) {
    setActiveId(id);
    setPhase('idle');
  }

  function runSuite() {
    setPhase('running');
    // Simulated run — no backend. Reveals canned results after a short delay.
    setTimeout(() => setPhase('done'), 1600);
  }

  const lr = suite.lastRun;
  const log = [
    `▸ Loading ${suite.tag} scenarios across ${suite.modules.length || 'all'} modules…`,
    `▸ Connecting to ${suite.environment} environment…`,
    `▸ Executing ${suite.scenarios} scenarios…`,
    `✓ ${lr.passed} passed    ✗ ${lr.failed} failed`,
    `◼ Completed in ${lr.durationMin}m · pass rate ${lr.passRate}%`,
  ];

  return (
    <div className="space-y-6">
      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="panel panel-pad">
            <div className={`text-2xl font-semibold tracking-tight ${kpi.tone === 'success' ? 'text-success' : 'text-white'}`}>
              <CountUp value={kpi.value} />
            </div>
            <div className="mt-1 stat-label">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Suite runner */}
      <Panel
        title="Test Suites — Smoke & Regression"
        subtitle="From features/*.feature tags · a suite run executes the matching tagged scenarios across modules"
        action={
          <span className="chip bg-success/10 text-success ring-1 ring-inset ring-success/20">
            <span className="h-1.5 w-1.5 rounded-full bg-current" /> connected
          </span>
        }
      >
        {/* Suite selector */}
        <div className="flex flex-wrap gap-2">
          {data.suites.map((s) => (
            <button
              key={s.id}
              onClick={() => selectSuite(s.id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                s.id === activeId
                  ? 'bg-surface-2 text-white ring-1 ring-inset ring-border-soft'
                  : 'text-text-soft hover:bg-surface-2/60 hover:text-white'
              }`}
            >
              {s.name}
              <span className="rounded bg-surface px-1.5 py-0.5 text-xs tabular-nums text-muted">{s.scenarios}</span>
            </button>
          ))}
        </div>

        {/* Selected suite control surface */}
        <div className="mt-4 rounded-xl border border-border-soft p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip bg-surface-2 text-text-soft ring-1 ring-inset ring-border">{suite.tag}</span>
                <span className={`chip ${envClasses(suite.environment)}`}>🔒 {suite.envNote}</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight text-white">{suite.scenarios}</span>
                <span className="text-sm text-muted">scenarios</span>
              </div>
              <p className="mt-1 max-w-md text-sm text-text-soft">{suite.description}</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <input
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="version e.g. v1.0"
                className="w-36 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-muted focus:border-brand focus:outline-none"
              />
              <button
                onClick={runSuite}
                disabled={phase === 'running'}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                {phase === 'running' ? 'Running…' : `Run ${suite.name} Suite`}
              </button>
            </div>
          </div>

          {/* Simulated run output */}
          {phase !== 'idle' && (
            <div className="mt-4 rounded-lg border border-border bg-canvas/60 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-text-soft">
                  Run output · {suite.environment} {version && `· ${version}`}
                </span>
                <span className="text-muted">{suite.tag}</span>
              </div>
              {phase === 'running' ? (
                <div>
                  <div className="font-mono text-xs text-text-soft">{log.slice(0, 3).join('\n')}</div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-brand" />
                  </div>
                  <p className="mt-1 text-[11px] text-muted">streaming live output…</p>
                </div>
              ) : (
                <div>
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-text-soft">{log.join('\n')}</pre>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-success">✓ {lr.passed} passed</span>
                    <span className="text-danger">✗ {lr.failed} failed</span>
                    <span className="text-muted">{lr.durationMin}m</span>
                    <span className="ml-auto font-semibold text-white">{lr.passRate}% pass rate</span>
                  </div>
                  <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full bg-success" style={{ width: `${lr.passRate}%` }} />
                    <div className="h-full bg-danger" style={{ width: `${100 - lr.passRate}%` }} />
                  </div>
                  <p className="mt-2 text-[11px] text-muted">Demo — run is simulated client-side; the live POC streams real CI output.</p>
                </div>
              )}
            </div>
          )}

          {/* Module scenario grid */}
          {suite.modules.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 stat-label">Scenarios by module · {suite.modules.length} modules</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {suite.modules.map((m) => (
                  <div key={m.name} className="flex items-center justify-between rounded-lg bg-surface-2/50 px-3 py-2">
                    <span className="truncate text-sm text-brand-soft">{m.name}</span>
                    <span className="ml-2 shrink-0 text-sm font-semibold tabular-nums text-white">{m.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Panel>

      {/* Test types */}
      <Panel title="Test Types" subtitle="Non-functional & specialized coverage">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {data.testTypes.map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-lg bg-surface-2/50 px-4 py-3">
              <span className="text-sm text-text-soft">{t.name}</span>
              <span className="text-lg font-semibold tabular-nums text-white">{t.count}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
