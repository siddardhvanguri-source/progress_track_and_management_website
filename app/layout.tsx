import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'WorkPulse — Employee & Project Operations Platform',
  description:
    'All-in-one work intelligence platform for tracking employee presence, project milestones, blockers, leave management, and team performance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans min-h-screen antialiased bg-[hsl(210_13%_10%)] text-[hsl(210_40%_96%)]">
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}

