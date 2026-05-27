import * as React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'success' | 'warning' | 'info' | 'danger' | 'gold';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-gold/15 text-ink border-gold/40',
  warning: 'bg-[#F59E0B]/15 text-ink border-[#F59E0B]/30',
  info: 'bg-[#3B82F6]/12 text-ink border-[#3B82F6]/25',
  danger: 'bg-crimson/12 text-crimson border-crimson/25',
  gold: 'bg-gold/20 text-ink border-gold/50 shadow-gold',
};

export function Badge({ className, variant = 'info', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

