'use client';

import { format } from 'date-fns';
import {
  CATEGORY_COLORS,
  getEventsForDay,
  getMonthGridDays,
  isSameMonth,
  isToday,
} from '@/lib/calendar-utils';
import type { Event } from '@/lib/types';
import { cn } from '@/lib/utils';

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export interface MonthViewProps {
  currentDate: Date;
  onSelectEvent: (event: Event) => void;
  onSelectDay: (day: Date, dayEvents: Event[]) => void;
}

export function MonthView({
  currentDate,
  onSelectEvent,
  onSelectDay,
}: MonthViewProps) {
  const days = getMonthGridDays(currentDate);

  return (
    <div className="overflow-hidden rounded-xl border border-coolgrey bg-white shadow-card">
      <div className="grid grid-cols-7 border-b border-coolgrey bg-ivory">
        {DAY_HEADERS.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className="py-2 text-center text-xs font-medium text-ink/50"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const inMonth = isSameMonth(day, currentDate);
          const today = isToday(day);
          const visible = dayEvents.slice(0, 3);
          const overflow = dayEvents.length - visible.length;

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelectDay(day, dayEvents)}
              className={cn(
                'min-h-[100px] border-b border-r border-coolgrey/70 p-2 text-left transition hover:bg-ivory/80',
                !inMonth && 'bg-ivory/40'
              )}
            >
              <span
                className={cn(
                  'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm',
                  today && 'bg-crimson font-semibold text-white',
                  !today && inMonth && 'text-ink',
                  !today && !inMonth && 'text-ink/40'
                )}
              >
                {format(day, 'd')}
              </span>

              <div className="mt-1 space-y-1">
                {visible.map((event) => (
                  <span
                    key={event.id}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(event);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        onSelectEvent(event);
                      }
                    }}
                    className="block w-full truncate rounded px-1.5 py-0.5 text-left text-[10px] font-medium text-white"
                    style={{ backgroundColor: CATEGORY_COLORS[event.category] }}
                  >
                    {event.title}
                  </span>
                ))}
                {overflow > 0 ? (
                  <span className="block text-[10px] text-ink/50">
                    + {overflow} more
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
