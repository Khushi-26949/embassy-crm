'use client';

import { useMemo, useState } from 'react';
import { Avatar } from '@/components/ui';
import { formatInr } from '@/lib/format';
import {
  getTargetBadgeVariant,
  getTeamPerformanceRows,
} from '@/lib/analytics-metrics';
import { cn } from '@/lib/utils';

type SortKey =
  | 'rank'
  | 'name'
  | 'leadsAssigned'
  | 'leadsConverted'
  | 'revenue'
  | 'avgDealSize'
  | 'targetPercent';

type SortDirection = 'asc' | 'desc';

const PAGE_SIZE = 10;

const badgeStyles = {
  green: 'bg-green-100 text-green-700',
  gold: 'bg-gold/15 text-[#A8892E]',
  red: 'bg-crimson/10 text-crimson',
};

export function TeamPerformanceTable() {
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const data = getTeamPerformanceRows();
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      const numA = Number(aVal);
      const numB = Number(bVal);
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    });
    return sorted;
  }, [sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return '↕';
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  return (
    <section className="rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-serif text-lg text-ink">Team Performance</h3>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[900px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-ivory-dark text-left text-xs text-ink/60">
              {(
                [
                  ['rank', 'Rank'],
                  ['name', 'Sales Person'],
                  ['leadsAssigned', 'Leads Assigned'],
                  ['leadsConverted', 'Converted'],
                  ['revenue', 'Revenue Generated'],
                  ['avgDealSize', 'Avg Deal Size'],
                  ['targetPercent', 'Target Achievement'],
                ] as const
              ).map(([key, label]) => (
                <th
                  key={key}
                  className={cn(
                    'border-b border-coolgrey px-3 py-3 font-semibold',
                    key === 'rank' &&
                      'sticky left-0 z-10 bg-ivory-dark dark:bg-night-surface'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(key)}
                    className="inline-flex items-center gap-1 hover:text-ink"
                  >
                    {label}
                    <span className="text-[10px]">{sortIndicator(key)}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((member) => {
              const badge = getTargetBadgeVariant(member.targetPercent);
              const isTop = member.rank === 1;

              return (
                <tr
                  key={member.id}
                  className={cn(
                    'border-b border-coolgrey/60 transition hover:bg-ivory/60',
                    isTop && 'border-l-4 border-l-gold bg-gold/5'
                  )}
                >
                  <td
                    className={cn(
                      'px-3 py-3 text-ink/70 dark:text-ivory/70',
                      isTop ? 'bg-gold/5' : 'bg-white dark:bg-night-card',
                      'sticky left-0 z-10'
                    )}
                  >
                    {member.rank}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={member.name} size="sm" />
                      <div>
                        <p className="font-medium text-ink">{member.name}</p>
                        <p className="text-xs text-ink/50">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">{member.leadsAssigned}</td>
                  <td className="px-3 py-3">{member.leadsConverted}</td>
                  <td className="px-3 py-3">{formatInr(member.revenue)}</td>
                  <td className="px-3 py-3">{formatInr(Math.round(member.avgDealSize))}</td>
                  <td className="px-3 py-3">
                    <div className="flex min-w-[120px] flex-col gap-1">
                      <span
                        className={cn(
                          'inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-semibold',
                          badgeStyles[badge]
                        )}
                      >
                        {Math.round(member.targetPercent)}%
                      </span>
                      <div className="h-1.5 overflow-hidden rounded-full bg-coolgrey">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            badge === 'green' && 'bg-[#10B981]',
                            badge === 'gold' && 'bg-gold',
                            badge === 'red' && 'bg-crimson'
                          )}
                          style={{
                            width: `${Math.min(member.targetPercent, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-ink/60">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md border border-coolgrey px-3 py-1.5 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border border-coolgrey px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
