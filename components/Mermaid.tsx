'use client';

import { useEffect, useState } from 'react';
import mermaid from 'mermaid';

let initialized = false;

function ensureInit() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    themeVariables: {
      darkMode: true,
      background: '#111725',
      primaryColor: '#161d2e',
      primaryBorderColor: '#26304a',
      primaryTextColor: '#e6ecf7',
      secondaryColor: '#1b2440',
      tertiaryColor: '#13192a',
      lineColor: '#6366f1',
      textColor: '#a9b6cf',
      clusterBkg: '#0f1422',
      clusterBorder: '#26304a',
      edgeLabelBackground: '#0a0e17',
      fontSize: '13px',
    },
  });
  initialized = true;
}

/**
 * Renders a Mermaid diagram client-side. Works with Next.js static export —
 * the SVG is produced after hydration in the browser.
 */
export default function Mermaid({ chart, id }: { chart: string; id: string }) {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    ensureInit();
    const safeId = `mmd-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;
    mermaid
      .render(safeId, chart)
      .then(({ svg }) => active && setSvg(svg))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
        {chart}
      </pre>
    );
  }

  return (
    <div
      className="mermaid-diagram overflow-x-auto rounded-lg border border-border bg-surface-2/40 p-4 [&_svg]:h-auto [&_svg]:w-full [&_svg]:!max-w-[860px]"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
