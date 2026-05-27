import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns';
import { events, leads } from './dummy-data';
import type { Event } from './types';

export const CATEGORY_COLORS: Record<Event['category'], string> = {
  Wedding: '#8B1A1A',
  Corporate: '#C9A84C',
  Social: '#3B82F6',
  Festival: '#10B981',
  Birthday: '#8B5CF6',
};

export const CATEGORY_LEGEND = Object.entries(CATEGORY_COLORS).map(
  ([label, color]) => ({ label, color })
);

export type CalendarViewMode = 'month' | 'agenda' | 'timeline';
export type TimelineZoom = 'week' | 'month';

export function getAllEvents() {
  return [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getEventsForDay(day: Date, eventList = getAllEvents()) {
  return eventList.filter((event) => isSameDay(new Date(event.date), day));
}

export function getEventsInMonth(monthDate: Date, eventList = getAllEvents()) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  return eventList.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= start && eventDate <= end;
  });
}

export function getMonthGridDays(monthDate: Date) {
  const monthStart = startOfMonth(monthDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const monthEnd = endOfMonth(monthDate);
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: gridStart, end: gridEnd });
}

export function formatMonthYear(date: Date) {
  return format(date, 'MMMM yyyy');
}

export function formatAgendaDateHeader(date: Date) {
  return format(date, 'EEEE, d MMMM yyyy');
}

export function formatEventTimeRange(event: Event) {
  const start = new Date(event.date);
  const end = new Date(event.endDate);
  return `${format(start, 'h:mm a')} – ${format(end, 'h:mm a')}`;
}

export function getStatusBadgeVariant(
  status: Event['status']
): 'success' | 'warning' | 'info' | 'gold' {
  switch (status) {
    case 'Confirmed':
      return 'success';
    case 'Tentative':
      return 'warning';
    case 'In Progress':
      return 'info';
    default:
      return 'gold';
  }
}

export function findLeadIdForEvent(event: Event) {
  const match = leads.find((lead) => lead.clientName === event.clientName);
  return match?.id ?? null;
}

export function groupEventsByDate(eventList: Event[]) {
  const groups = new Map<string, Event[]>();

  eventList.forEach((event) => {
    const key = format(new Date(event.date), 'yyyy-MM-dd');
    const existing = groups.get(key) ?? [];
    existing.push(event);
    groups.set(key, existing);
  });

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, dayEvents]) => ({
      date: new Date(key),
      events: dayEvents.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    }));
}

export function getTimelineRange(
  currentDate: Date,
  zoom: TimelineZoom
): { start: Date; end: Date; labels: { date: Date; label: string }[] } {
  if (zoom === 'week') {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    const end = endOfWeek(currentDate, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start, end });
    return {
      start,
      end,
      labels: days.map((date) => ({
        date,
        label: format(date, 'EEE d'),
      })),
    };
  }

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  return {
    start,
    end,
    labels: days.map((date) => ({
      date,
      label: format(date, 'd'),
    })),
  };
}

export function getTimelineEvents(currentDate: Date, zoom: TimelineZoom) {
  const { start, end } = getTimelineRange(currentDate, zoom);
  return getAllEvents().filter((event) => {
    const eventStart = new Date(event.date);
    const eventEnd = new Date(event.endDate);
    return eventEnd >= start && eventStart <= end;
  });
}

export function getTimelineBarStyle(
  event: Event,
  rangeStart: Date,
  rangeEnd: Date
) {
  const totalMs = rangeEnd.getTime() - rangeStart.getTime() || 1;
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.endDate);
  const visibleStart = eventStart < rangeStart ? rangeStart : eventStart;
  const visibleEnd = eventEnd > rangeEnd ? rangeEnd : eventEnd;

  const left =
    ((visibleStart.getTime() - rangeStart.getTime()) / totalMs) * 100;
  const width =
    ((visibleEnd.getTime() - visibleStart.getTime()) / totalMs) * 100;

  return {
    left: `${Math.max(0, left)}%`,
    width: `${Math.max(2, width)}%`,
    minWidth: '24px',
  };
}

export function getAgendaEventsForMonth(monthDate: Date) {
  return groupEventsByDate(getEventsInMonth(monthDate));
}

export { isSameMonth, isToday, addMonths, subMonths };
