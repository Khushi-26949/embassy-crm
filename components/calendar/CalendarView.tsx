'use client';

import { useState } from 'react';
import { addMonths, formatMonthYear, subMonths } from '@/lib/calendar-utils';
import type { CalendarViewMode } from '@/lib/calendar-utils';
import type { Event } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { AgendaView } from './AgendaView';
import { CategoryLegend } from './CategoryLegend';
import { EventDetailModal } from './EventDetailModal';
import { MonthView } from './MonthView';
import { TimelineView } from './TimelineView';

const VIEW_OPTIONS: { id: CalendarViewMode; label: string }[] = [
  { id: 'month', label: 'Month' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'timeline', label: 'Timeline' },
];

const DEFAULT_DATE = new Date('2025-01-15T12:00:00');

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(DEFAULT_DATE);
  const [view, setView] = useState<CalendarViewMode>('month');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openEvent = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSelectDay = (_day: Date, dayEvents: Event[]) => {
    if (dayEvents.length > 0) {
      openEvent(dayEvents[0]);
    }
  };

  const goToday = () => setCurrentDate(new Date('2025-01-07T12:00:00'));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h2 className="font-serif text-2xl text-ink dark:text-ivory">Event Calendar</h2>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between xl:flex-1 xl:justify-end">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentDate((d) => subMonths(d, 1))}
              className="rounded-md border border-coolgrey dark:border-night-border px-3 py-2 text-sm text-ink dark:text-ivory hover:bg-ivory dark:bg-night"
              aria-label="Previous month"
            >
              ‹ Prev
            </button>
            <span className="min-w-[140px] text-center font-medium text-ink dark:text-ivory">
              {formatMonthYear(currentDate)}
            </span>
            <button
              type="button"
              onClick={() => setCurrentDate((d) => addMonths(d, 1))}
              className="rounded-md border border-coolgrey dark:border-night-border px-3 py-2 text-sm text-ink dark:text-ivory hover:bg-ivory dark:bg-night"
              aria-label="Next month"
            >
              Next ›
            </button>
            <button
              type="button"
              onClick={goToday}
              className="rounded-md border border-coolgrey dark:border-night-border px-3 py-2 text-sm font-medium text-crimson hover:bg-crimson/5"
            >
              Today
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full border border-coolgrey dark:border-night-border bg-white dark:bg-night-card p-1">
              {VIEW_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setView(option.id)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium transition',
                    view === option.id
                      ? 'bg-crimson text-white'
                      : 'text-ink/60 dark:text-ivory/60 hover:text-crimson'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button variant="primary" size="md">
              + New Event
            </Button>
          </div>
        </div>
      </div>

      <CategoryLegend />

      {view === 'month' ? (
        <MonthView
          currentDate={currentDate}
          onSelectEvent={openEvent}
          onSelectDay={handleSelectDay}
        />
      ) : null}

      {view === 'agenda' ? (
        <AgendaView currentDate={currentDate} onSelectEvent={openEvent} />
      ) : null}

      {view === 'timeline' ? (
        <TimelineView currentDate={currentDate} onSelectEvent={openEvent} />
      ) : null}

      <EventDetailModal
        event={selectedEvent}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
}
