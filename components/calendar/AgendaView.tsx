'use client';

import { CalendarX, Clock, IndianRupee, MapPin, Users } from 'lucide-react';
import { Badge, EmptyState } from '@/components/ui';
import { formatInr } from '@/lib/format';
import {
  CATEGORY_COLORS,
  formatAgendaDateHeader,
  formatEventTimeRange,
  getAgendaEventsForMonth,
  getStatusBadgeVariant,
} from '@/lib/calendar-utils';
import type { Event } from '@/lib/types';

export interface AgendaViewProps {
  currentDate: Date;
  onSelectEvent: (event: Event) => void;
}

export function AgendaView({ currentDate, onSelectEvent }: AgendaViewProps) {
  const groups = getAgendaEventsForMonth(currentDate);

  if (groups.length === 0) {
    return (
      <EmptyState
        icon={CalendarX}
        title="No events this period"
        description="Try navigating to another month or add a new event."
      />
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.date.toISOString()}>
          <h3 className="font-serif text-lg text-crimson">
            {formatAgendaDateHeader(group.date)}
          </h3>
          <ul className="mt-3 space-y-3">
            {group.events.map((event) => (
              <li key={event.id}>
                <button
                  type="button"
                  onClick={() => onSelectEvent(event)}
                  className="flex w-full flex-col gap-2 rounded-xl bg-white dark:bg-night-card p-4 text-left shadow-card transition hover:bg-ivory dark:bg-night sm:flex-row sm:items-start sm:justify-between"
                  style={{
                    borderLeft: `4px solid ${CATEGORY_COLORS[event.category]}`,
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink dark:text-ivory">{event.title}</p>
                    <p className="text-sm text-ink/60 dark:text-ivory/60">{event.clientName}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink/60 dark:text-ivory/60">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatEventTimeRange(event)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.venue}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink/70">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {event.guestCount} guests
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-gold">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {formatInr(event.revenue)}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={getStatusBadgeVariant(event.status)}
                    className="shrink-0 self-start"
                  >
                    {event.status}
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
