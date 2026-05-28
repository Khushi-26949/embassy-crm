import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
          >
            {label}
          </label>
        ) : null}

        <div className="relative">
          {icon ? (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/60 dark:text-ivory/60">
              {icon}
            </span>
          ) : null}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              'h-10 w-full rounded-md border bg-white dark:bg-night-surface px-3 text-sm text-ink dark:text-ivory outline-none transition dark:border-night-border',
              'placeholder:text-ink/40',
              'focus:border-crimson focus:ring-2 focus:ring-crimson/20',
              'disabled:bg-ivory-dark disabled:text-ink/60 dark:text-ivory/60',
              icon ? 'pl-10' : '',
              error ? 'border-crimson focus:border-crimson' : 'border-coolgrey dark:border-night-border',
              className
            )}
            {...props}
          />
        </div>

        {error ? <p className="mt-1.5 text-xs text-crimson">{error}</p> : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

