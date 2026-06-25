import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Control-tower dark palette (Datadog/Grafana inspired)
        canvas: '#0a0e17',
        surface: '#111725',
        'surface-2': '#161d2e',
        border: '#1f2937',
        'border-soft': '#26304a',
        muted: '#7c8aa5',
        'text-soft': '#a9b6cf',
        brand: '#6366f1',
        'brand-soft': '#818cf8',
        accent: '#22d3ee',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.02)',
        glow: '0 0 0 1px rgba(99,102,241,0.4), 0 0 24px rgba(99,102,241,0.15)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08), transparent 60%)',
      },
    },
  },
  plugins: [],
};

export default config;
