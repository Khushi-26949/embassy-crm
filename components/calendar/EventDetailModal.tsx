'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Avatar, Badge, Button, Modal } from '@/components/ui';
import { formatInr } from '@/lib/format';
import {
  CATEGORY_COLORS,
  findLeadIdForEvent,
  formatEventTimeRange,
  getStatusBadgeVariant,
} from '@/lib/calendar-utils';
import type { Event } from '@/lib/types';
import { cn } from '@/lib/utils';

export interface EventDetailModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export function EventDetailModal({ event, open, onClose }: EventDetailModalProps) {
  if (!event) return null;

  const leadId = findLeadIdForEvent(event);
  const phoneHref = `tel:${event.clientPhone.replace(/\s/g, '')}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="max-h-[90vh] max-w-2xl overflow-y-auto"
    >
      <div className="-mt-2">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-coolgrey dark:border-night-border pb-4">
          <div>
            <h2 className="font-serif text-2xl text-ink dark:text-ivory">{event.title}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <span
                className="rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: CATEGORY_COLORS[event.category] }}
              >
                {event.category}
              </span>
              <Badge variant={getStatusBadgeVariant(event.status)}>
                {event.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Client
            </p>
            <p className="mt-1 font-medium text-ink dark:text-ivory">{event.clientName}</p>
            <p className="mt-1">
              <a href={phoneHref} className="text-crimson hover:underline">
                {event.clientPhone}
              </a>
            </p>
            <p className="mt-0.5">
              <a
                href={`mailto:${event.clientEmail}`}
                className="text-crimson hover:underline"
              >
                {event.clientEmail}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Date & Time
              </p>
              <p className="mt-1 text-ink dark:text-ivory">
                {format(new Date(event.date), 'EEEE, d MMMM yyyy')}
              </p>
              <p className="text-ink/70">{formatEventTimeRange(event)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Venue
              </p>
              <p className="mt-1 text-ink dark:text-ivory">{event.venue}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Guest Count
              </p>
              <p className="mt-1 text-ink dark:text-ivory">{event.guestCount} guests</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Revenue
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold text-gold">
                {formatInr(event.revenue)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Assigned Team
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              {event.assignedTeam.map((member) => (
                <div key={member} className="flex items-center gap-2">
                  <Avatar name={member} size="sm" />
                  <span className="text-sm text-ink dark:text-ivory">{member}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Notes
            </p>
            <p className="mt-1 rounded-lg bg-ivory dark:bg-night p-3 text-ink/80">{event.notes}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-coolgrey dark:border-night-border pt-4 sm:flex-row sm:flex-wrap">
          <Button variant="primary" size="md">
            Edit Event
          </Button>
          <a
            href={phoneHref}
            className="inline-flex h-10 items-center justify-center rounded-md border border-gold px-4 text-sm font-medium text-ink dark:text-ivory transition hover:bg-gold/10"
          >
            Call Client
          </a>
          {leadId ? (
            <Link
              href={`/leads/${leadId}`}
              className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-ink dark:text-ivory transition hover:bg-ink/5"
            >
              View Lead →
            </Link>
          ) : (
            <Button variant="ghost" size="md" disabled>
              View Lead →
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="md"
            className={cn('sm:ml-auto')}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
