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
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
