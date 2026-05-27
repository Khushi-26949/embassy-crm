'use client';

import { ThemeProvider } from '@/lib/theme-provider';
import { ToastProvider } from '@/lib/toast-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
