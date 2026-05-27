'use client';

import { useState } from 'react';
import { CalendarX } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { formatInr } from '@/lib/format';
import {
  CATEGORY_COLORS,
  getTimelineBarStyle,
  getTimelineEvents,
  getTimelineRange,
  type TimelineZoom,
} from '@/lib/calendar-utils';
import type { Event } from '@/lib/types';
import { cn } from '@/lib/utils';

export interface TimelineViewProps {
  currentDate: Date;
  onSelectEvent: (event: Event) => void;
}

export function TimelineView({ currentDate, onSelectEvent }: TimelineViewProps) {
  const [zoom, setZoom] = useState<TimelineZoom>('week');
  const { start, end, labels } = getTimelineRange(currentDate, zoom);
  const timelineEvents = getTimelineEvents(currentDate, zoom);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hoveredEvent = timelineEvents.find((event) => event.id === hoveredId);

  return (
    <div className="rounded-xl border border-coolgrey bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-serif text-lg text-ink">Timeline</h3>
        <div className="flex gap-1 rounded-lg border border-coolgrey p-1">
          {(['week', 'month'] as TimelineZoom[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setZoom(level)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium capitalize transition',
                zoom === level
                  ? 'bg-crimson text-white'
                  : 'text-ink/60 hover:bg-ivory'
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
          className="relative min-w-[720px]"
          style={{ minWidth: zoom === 'month' ? `${labels.length * 28}px` : '720px' }}
        >
          <div className="flex border-b border-coolgrey pb-2">
            {labels.map((tick) => (
              <div
                key={tick.date.toISOString()}
                className="flex-1 text-center text-[10px] text-ink/50"
              >
                {tick.label}
              </div>
            ))}
          </div>

          <div className="relative mt-4 min-h-[240px] space-y-3">
            {timelineEvents.length === 0 ? (
              <EmptyState
                icon={CalendarX}
                title="No events this period"
                className="border-none bg-transparent shadow-none"
              />
            ) : (
              timelineEvents.map((event, index) => {
                const barStyle = getTimelineBarStyle(event, start, end);

                return (
                  <div
                    key={event.id}
                    className="relative h-10"
                    style={{ marginTop: index === 0 ? 0 : 4 }}
                  >
                    <button
                      type="button"
                      title={`${event.title} · ${event.clientName}`}
                      onClick={() => onSelectEvent(event)}
                      onMouseEnter={() => setHoveredId(event.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="absolute top-1 h-8 truncate rounded-md px-2 text-left text-xs font-medium text-white transition hover:opacity-90"
                      style={{
                        ...barStyle,
                        backgroundColor: CATEGORY_COLORS[event.category],
                      }}
                    >
                      {event.title}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {hoveredEvent ? (
        <div className="mt-4 rounded-lg border border-crimson bg-white px-3 py-2 text-xs shadow-card">
          <p className="font-semibold text-ink">{hoveredEvent.title}</p>
          <p className="text-ink/60">{hoveredEvent.clientName}</p>
          <p className="mt-1 font-medium text-gold">
            {formatInr(hoveredEvent.revenue)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
