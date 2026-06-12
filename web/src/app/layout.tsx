import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PR Shield - AI Code Review for Production Safety',
  description: 'Catch production-breaking changes before they reach your users. AI-powered GitHub PR review.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
