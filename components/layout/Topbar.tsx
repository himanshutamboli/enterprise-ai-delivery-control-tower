interface TopbarProps {
  title: string;
  subtitle?: string;
  period?: string;
}

/** Page header for each dashboard, with live-period chip and environment selector mock. */
export default function Topbar({ title, subtitle, period = '2026-Q2' }: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-3 border-b border-border bg-canvas/80 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:px-8">
      <div>
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <span>Control Tower</span>
          <span>/</span>
          <span className="text-text-soft">{title}</span>
        </div>
        <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-white">{title}</h1>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip bg-surface-2 text-text-soft ring-1 ring-inset ring-border">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          production
        </span>
        <span className="chip bg-surface-2 text-text-soft ring-1 ring-inset ring-border">{period}</span>
        <span className="chip bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20">Live · 24h</span>
      </div>
    </header>
  );
}
