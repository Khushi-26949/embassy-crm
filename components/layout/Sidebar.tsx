'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crown, Palette, Settings } from 'lucide-react';
import { Avatar } from '@/components/ui';
import { mobileNavItems, navItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';

const CURRENT_USER = {
  name: 'Pooja Malhotra',
  role: 'Senior Sales Executive',
};

function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      title={label}
      className={cn(
        'group relative flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 lg:justify-start',
        isActive
          ? 'border-l-[3px] border-l-gold bg-crimson text-white'
          : 'border-l-[3px] border-l-transparent text-ink/60 hover:bg-crimson/5 hover:text-crimson dark:text-ivory/60 dark:hover:bg-crimson/10 dark:hover:text-ivory'
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="hidden lg:inline">{label}</span>
      <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-white opacity-0 shadow-card transition group-hover:opacity-100 md:group-hover:block lg:hidden">
        {label}
      </span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop & tablet sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-coolgrey bg-white transition-all duration-300 dark:border-night-border dark:bg-night-card',
          'md:flex md:w-16 lg:w-[260px]'
        )}
      >
        <div className="flex h-full flex-col px-3 py-5 lg:px-4">
          {/* Logo */}
          <div className="mb-4 flex items-center gap-3 lg:px-1">
            <Crown className="h-7 w-7 shrink-0 text-crimson" strokeWidth={1.75} />
            <div className="hidden min-w-0 lg:block">
              <p className="font-serif text-lg font-bold leading-tight text-crimson">
                The Embassy
              </p>
              <p className="font-sans text-xs text-gold">CRM Suite</p>
            </div>
          </div>

          <div className="mb-4 h-px bg-coolgrey" />

          {/* Nav */}
          <nav className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </nav>

          <div className="mt-4 hidden flex-col gap-1 lg:flex">
            <Link
              href="/style-guide"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
                pathname === '/style-guide'
                  ? 'bg-crimson/10 text-crimson dark:text-gold'
                  : 'text-ink/60 hover:bg-ivory hover:text-crimson dark:text-ivory/60 dark:hover:bg-night-surface'
              )}
            >
              <Palette className="h-4 w-4 shrink-0" />
              Style Guide
            </Link>
          </div>

          {/* Bottom user card — full on lg */}
          <div className="mt-4 hidden items-center gap-3 rounded-lg border border-coolgrey bg-ivory p-3 dark:border-night-border dark:bg-night-surface lg:flex">
            <Avatar name={CURRENT_USER.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {CURRENT_USER.name}
              </p>
              <p className="truncate text-xs text-ink/60">{CURRENT_USER.role}</p>
            </div>
            <button
              type="button"
              aria-label="Settings"
              className="rounded-md p-1.5 text-ink/60 transition hover:bg-white hover:text-crimson"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>

          {/* Collapsed user — tablet */}
          <div className="mt-4 flex justify-center lg:hidden">
            <button
              type="button"
              aria-label="User settings"
              className="rounded-lg p-2 transition hover:bg-ivory"
            >
              <Avatar name={CURRENT_USER.name} size="sm" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex h-16 items-stretch justify-around',
          'border-t border-coolgrey bg-white dark:border-night-border dark:bg-night-card md:hidden'
        )}
        aria-label="Mobile navigation"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition duration-150',
                isActive ? 'text-crimson' : 'text-ink/60'
              )}
            >
              {isActive ? (
                <span className="absolute top-1.5 h-1 w-1 rounded-full bg-gold" />
              ) : null}
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
