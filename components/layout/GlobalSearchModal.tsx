'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Building2, CalendarDays, Search, SearchX, Users, X } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { clients, events, leads } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

export interface GlobalSearchModalProps {
  open: boolean;
  onClose: () => void;
}

type SearchGroup = 'Leads' | 'Events' | 'Clients';

interface SearchResult {
  id: string;
  group: SearchGroup;
  title: string;
  subtitle: string;
  href: string;
}

function buildResults(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const leadResults: SearchResult[] = leads
    .filter(
      (lead) =>
        lead.clientName.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.eventType.toLowerCase().includes(q) ||
        lead.stage.toLowerCase().includes(q)
    )
    .slice(0, 6)
    .map((lead) => ({
      id: lead.id,
      group: 'Leads',
      title: lead.clientName,
      subtitle: `${lead.eventType} · ${lead.stage} · ₹${lead.budget.toLocaleString('en-IN')}`,
      href: `/leads/${lead.id}`,
    }));

  const eventResults: SearchResult[] = events
    .filter(
      (event) =>
        event.title.toLowerCase().includes(q) ||
        event.clientName.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q)
    )
    .slice(0, 6)
    .map((event) => ({
      id: event.id,
      group: 'Events',
      title: event.title,
      subtitle: `${event.clientName} · ${event.venue}`,
      href: '/calendar',
    }));

  const clientResults: SearchResult[] = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(q) ||
        client.email.toLowerCase().includes(q) ||
        (client.company?.toLowerCase().includes(q) ?? false)
    )
    .slice(0, 6)
    .map((client) => ({
      id: client.id,
      group: 'Clients',
      title: client.name,
      subtitle: client.company ?? client.email,
      href: `/clients/${client.id}`,
    }));

  return [...leadResults, ...eventResults, ...clientResults];
}

const groupIcons: Record<SearchGroup, React.ComponentType<{ className?: string }>> = {
  Leads: Users,
  Events: CalendarDays,
  Clients: Building2,
};

export function GlobalSearchModal({ open, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => buildResults(query), [query]);
  const grouped = useMemo(() => {
    const groups: Record<SearchGroup, SearchResult[]> = {
      Leads: [],
      Events: [],
      Clients: [],
    };
    results.forEach((r) => groups[r.group].push(r));
    return groups;
  }, [results]);

  const flatResults = results;

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const selectResult = useCallback(
    (result: SearchResult) => {
      router.push(result.href);
      onClose();
    },
    [router, onClose]
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (flatResults.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % flatResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flatResults.length) % flatResults.length);
      } else if (e.key === 'Enter' && flatResults[activeIndex]) {
        e.preventDefault();
        selectResult(flatResults[activeIndex]);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, flatResults, activeIndex, onClose, selectResult]);

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-ink/40 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative mx-auto mt-16 w-full max-w-2xl px-4">
        <div className="overflow-hidden rounded-xl border border-coolgrey dark:border-night-border bg-white dark:bg-night-card shadow-elevated">
          <div className="flex items-center gap-3 border-b border-coolgrey dark:border-night-border px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-ink/40" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clients, events, leads..."
              className="flex-1 bg-transparent text-sm text-ink dark:text-ivory outline-none placeholder:text-ink/40"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-ink/50 hover:bg-ivory dark:bg-night hover:text-ink dark:text-ivory"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {query.trim() === '' ? (
              <p className="px-3 py-8 text-center text-sm text-ink/50">
                Type to search across leads, events, and clients
              </p>
            ) : results.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title={`No results found for '${query}'`}
                className="mx-2 border-none bg-transparent shadow-none"
              />
            ) : (
              (['Leads', 'Events', 'Clients'] as SearchGroup[]).map((group) => {
                const items = grouped[group];
                if (items.length === 0) return null;
                const Icon = groupIcons[group];

                return (
                  <div key={group} className="mb-2">
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
                      {group}
                    </p>
                    <ul>
                      {items.map((item) => {
                        runningIndex += 1;
                        const index = runningIndex;
                        const isActive = index === activeIndex;

                        return (
                          <li key={`${group}-${item.id}`}>
                            <button
                              type="button"
                              onClick={() => selectResult(item)}
                              className={cn(
                                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition',
                                isActive ? 'bg-crimson/10 text-crimson' : 'hover:bg-ivory dark:bg-night'
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0 opacity-60" />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{item.title}</p>
                                <p className="truncate text-xs text-ink/60 dark:text-ivory/60">{item.subtitle}</p>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t border-coolgrey dark:border-night-border px-4 py-2 text-xs text-ink/40">
            <span className="hidden sm:inline">↑↓ navigate · Enter select · </span>ESC close
          </div>
        </div>
      </div>
    </div>
  );
}
