import { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  id?: string;
}

/** Standard dashboard panel: titled, bordered container used for every chart/table block. */
export default function Panel({ title, subtitle, action, children, className = '', bodyClassName = '', id }: PanelProps) {
  return (
    <section id={id} className={`panel scroll-mt-24 ${className}`}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-3.5">
          <div>
            {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={`panel-pad ${bodyClassName}`}>{children}</div>
    </section>
  );
}
