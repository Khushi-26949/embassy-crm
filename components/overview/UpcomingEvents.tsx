import Link from 'next/link';
import { format } from 'date-fns';
import { getUpcomingEvents, EVENT_CATEGORY_COLORS } from '@/lib/overview-metrics';

const upcomingEvents = getUpcomingEvents(5);

export function UpcomingEvents() {
  return (
    <section className="rounded-xl bg-white dark:bg-night-card p-5 shadow-card">
      <h3 className="font-serif text-lg text-ink dark:text-ivory">Upcoming Events</h3>

      <ul className="mt-4 divide-y divide-coolgrey/70">
        {upcomingEvents.map((event) => (
          <li
            key={event.id}
            className="flex flex-col gap-2 py-3 transition first:pt-0 last:pb-0 hover:bg-ivory dark:bg-night sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: EVENT_CATEGORY_COLORS[event.category] }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink dark:text-ivory">{event.title}</p>
                <p className="truncate text-xs text-ink/60 dark:text-ivory/60">{event.clientName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-5 sm:pl-0">
              <span className="text-xs text-ink/60 dark:text-ivory/60">
                {format(new Date(event.date), 'd MMM yyyy')}
              </span>
              <span className="rounded-full bg-ivory-dark px-2 py-0.5 text-xs text-ink/70">
                {event.guestCount} guests
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/calendar"
        className="mt-4 inline-block text-sm font-medium text-gold hover:underline"
      >
        View Calendar →
      </Link>
    </section>
  );
}
