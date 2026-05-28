'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm dark:bg-black/60"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative flex max-h-[100dvh] w-full flex-col border-coolgrey dark:border-night-border bg-white dark:bg-night-card shadow-elevated',
          'animate-modal-in dark:border-night-border dark:bg-night-card',
          'h-full max-w-none rounded-none md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-lg',
          className
        )}
      >
        {title ? (
          <div className="shrink-0 border-b border-coolgrey dark:border-night-border px-5 py-4">
            <h2 className="font-serif text-xl text-ink dark:text-ivory">{title}</h2>
          </div>
        ) : null}
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
