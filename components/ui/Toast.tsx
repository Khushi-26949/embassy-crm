'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, open, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, onClose, duration]);

  return (
    <div
      role="status"
      className={cn(
        'fixed bottom-20 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-coolgrey bg-white px-4 py-3 text-sm font-medium text-ink shadow-elevated transition-all duration-300 md:bottom-6',
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      )}
    >
      {message}
    </div>
  );
}
