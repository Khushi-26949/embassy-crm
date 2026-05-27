'use client';

import Link from 'next/link';
import { leads } from '@/lib/dummy-data';
import { formatInr } from '@/lib/format';
import {
  EVENT_TYPE_BADGE_COLORS,
  PRIORITY_BADGE_COLORS,
} from '@/lib/lead-detail-utils';
import { cn } from '@/lib/utils';

export function LeadsListView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif text-2xl text-ink dark:text-ivory">Leads</h2>
        <p className="text-sm text-ink/60 dark:text-ivory/60">{leads.length} total leads</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-coolgrey bg-white shadow-card dark:border-night-border dark:bg-night-card">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-coolgrey bg-ivory-dark text-left text-xs text-ink/60 dark:border-night-border dark:bg-night-surface dark:text-ivory/60">
              <th className="sticky left-0 z-10 bg-ivory-dark px-4 py-3 font-semibold dark:bg-night-surface">
                Client
              </th>
              <th className="px-4 py-3 font-semibold">Event</th>
              <th className="px-4 py-3 font-semibold">Stage</th>
              <th className="px-4 py-3 font-semibold">Budget</th>
              <th className="px-4 py-3 font-semibold">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-coolgrey/60 hover:bg-ivory/60 dark:border-night-border dark:hover:bg-night-surface"
              >
                <td className="sticky left-0 z-10 bg-white px-4 py-3 dark:bg-night-card">
                  <Link
                    href={`/leads/${lead.id}`}
                    className="font-medium text-crimson hover:underline"
                  >
                    {lead.clientName}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-semibold',
                      EVENT_TYPE_BADGE_COLORS[lead.eventType]
                    )}
                  >
                    {lead.eventType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-semibold',
                      PRIORITY_BADGE_COLORS[lead.priority]
                    )}
                  >
                    {lead.stage}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-gold">{formatInr(lead.budget)}</td>
                <td className="px-4 py-3 text-ink/70 dark:text-ivory/70">
                  {lead.assignedTo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
