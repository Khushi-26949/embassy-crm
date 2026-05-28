'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'gold' | 'error';

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
  showSuccess: (message: string) => void;
  showGold: (message: string) => void;
  showError: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  success: 'border-green-600/30 bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-300',
  gold: 'border-gold/40 bg-gold/10 text-ink dark:text-ivory dark:bg-gold/15 dark:text-[#FAF7F2]',
  error: 'border-crimson/30 bg-crimson/10 text-crimson dark:bg-crimson/20 dark:text-red-300',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), 3000);
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      showToast,
      showSuccess: (message: string) => showToast(message, 'success'),
      showGold: (message: string) => showToast(message, 'gold'),
      showError: (message: string) => showToast(message, 'error'),
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[200] flex w-[min(100%,360px)] flex-col gap-2 md:top-20">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={cn(
              'pointer-events-auto animate-toast-in rounded-lg border px-4 py-3 text-sm font-medium shadow-elevated',
              variantStyles[toast.variant]
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
