'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, Moon, Plus, Search, Sun } from 'lucide-react';
import { Avatar } from '@/components/ui';
import { useTheme } from '@/lib/theme-provider';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  pageTitle: string;
  unreadCount: number;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

const CURRENT_USER = {
  name: 'Pooja Malhotra',
  role: 'Senior Sales Executive',
};

export function Navbar({
  pageTitle,
  unreadCount,
  onOpenSearch,
  onOpenNotifications,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-coolgrey bg-white/80 px-4 backdrop-blur-md transition-colors duration-300 dark:border-night-border dark:bg-night-card/90 md:gap-4 md:px-6">
      <h1 className="min-w-0 font-serif text-xl text-ink dark:text-ivory md:shrink-0 md:text-[22px]">
        {pageTitle}
      </h1>

      <div className="hidden flex-1 justify-center md:flex">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex h-10 w-full max-w-md items-center gap-2 rounded-full border border-coolgrey bg-ivory px-4 text-left text-sm text-ink/50 transition hover:border-crimson/30 dark:border-night-border dark:bg-night-surface dark:text-ivory/50"
        >
          <Search className="h-4 w-4 shrink-0 text-ink/40 dark:text-ivory/40" />
          <span className="flex-1 truncate">
            Search clients, events, leads...
          </span>
          <kbd className="hidden rounded border border-coolgrey bg-white px-1.5 py-0.5 text-[10px] font-medium text-ink/50 dark:border-night-border dark:bg-night-card sm:inline">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-3">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search"
          className="rounded-full p-2 text-ink/60 transition-colors duration-150 hover:bg-ivory hover:text-crimson dark:text-ivory/60 dark:hover:bg-night-surface md:hidden"
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="rounded-full p-2 text-ink/60 transition-colors duration-150 hover:bg-ivory hover:text-crimson dark:text-ivory/60 dark:hover:bg-night-surface"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <button
          type="button"
          onClick={onOpenNotifications}
          aria-label="Notifications"
          className="relative rounded-full p-2 text-ink/70 transition-colors duration-150 hover:bg-ivory hover:text-crimson dark:text-ivory/70 dark:hover:bg-night-surface"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 ? (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          ) : null}
        </button>

        <button
          type="button"
          aria-label="Create new"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-crimson text-white shadow-card transition-all duration-200 hover:bg-crimson-dark active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" />
        </button>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen((o) => !o)}
            className="flex items-center gap-1 rounded-full p-0.5 transition hover:ring-2 hover:ring-crimson/20"
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            <Avatar name={CURRENT_USER.name} size="sm" />
            <ChevronDown
              className={cn(
                'hidden h-4 w-4 text-ink/50 transition dark:text-ivory/50 sm:block',
                userMenuOpen && 'rotate-180'
              )}
            />
          </button>

          {userMenuOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-coolgrey bg-white py-1 shadow-elevated dark:border-night-border dark:bg-night-card"
            >
              <div className="border-b border-coolgrey px-4 py-3 dark:border-night-border">
                <p className="text-sm font-medium text-ink dark:text-ivory">
                  {CURRENT_USER.name}
                </p>
                <p className="text-xs text-ink/60 dark:text-ivory/60">
                  {CURRENT_USER.role}
                </p>
              </div>
              <button
                type="button"
                role="menuitem"
                className="w-full px-4 py-2 text-left text-sm text-ink hover:bg-ivory dark:text-ivory dark:hover:bg-night-surface"
              >
                Profile
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full px-4 py-2 text-left text-sm text-ink hover:bg-ivory dark:text-ivory dark:hover:bg-night-surface"
              >
                Settings
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full px-4 py-2 text-left text-sm text-crimson hover:bg-ivory dark:hover:bg-night-surface"
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
