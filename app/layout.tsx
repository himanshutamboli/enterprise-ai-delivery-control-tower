import type { Metadata, Viewport } from 'next';
import './globals.css';
import CommandPalette from '@/components/CommandPalette';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Allow zoom for accessibility; cap to avoid layout jumps on focus.
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Enterprise AI Delivery Control Tower',
  description:
    'AI TPM portfolio — an enterprise control tower for AI delivery: observability, QA governance, DevOps/DORA, and program health.',
  authors: [{ name: 'AI Technical Program Manager' }],
  keywords: [
    'AI TPM',
    'Technical Program Manager',
    'AI Observability',
    'LLMOps',
    'Multi-Agent Platform',
    'DORA metrics',
    'AI Product Management',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        {/* Global animated brand gradient referenced by all SVG icons (vibrant shimmer). */}
        <svg width="0" height="0" aria-hidden focusable="false" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818cf8">
                <animate attributeName="stop-color" values="#818cf8;#22d3ee;#a78bfa;#818cf8" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#22d3ee">
                <animate attributeName="stop-color" values="#22d3ee;#a78bfa;#818cf8;#22d3ee" dur="6s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
        </svg>
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
