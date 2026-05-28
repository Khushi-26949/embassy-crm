'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import {
  ArrowRight,
  CalendarDays,
  GripVertical,
  IndianRupee,
  Mail,
  Phone,
} from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Avatar } from '@/components/ui';
import { formatInr } from '@/lib/format';
import {
  DAYS_CHIP_STYLES,
  EVENT_TYPE_BADGE_COLORS,
  PRIORITY_BADGE_COLORS,
  getDaysChip,
  getDaysUntilEvent,
} from '@/lib/pipeline-utils';
import type { Lead } from '@/lib/types';
import { cn } from '@/lib/utils';

export interface LeadCardProps {
  lead: Lead;
}

function LeadCardContent({
  lead,
  isOverlay,
  dragHandle,
}: {
  lead: Lead;
  isOverlay?: boolean;
  dragHandle?: React.ReactNode;
}) {
  const daysRemaining = getDaysUntilEvent(lead.eventDate);
  const daysChip = getDaysChip(daysRemaining);

  return (
    <article
      className={cn(
        'group relative rounded-xl bg-white dark:bg-night-card p-4 shadow-card',
        isOverlay &&
          'rotate-2 scale-105 cursor-grabbing opacity-100 shadow-elevated ring-2 ring-crimson',
        !isOverlay && 'transition duration-200'
      )}
    >
      {dragHandle}

      <div className={dragHandle ? 'pr-6' : undefined}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h4 className="font-serif text-[15px] font-bold leading-snug text-ink dark:text-ivory">
            {lead.clientName}
          </h4>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              EVENT_TYPE_BADGE_COLORS[lead.eventType]
            )}
          >
            {lead.eventType}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-ink/60 dark:text-ivory/60">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <span>{format(new Date(lead.eventDate), 'd MMM yyyy')}</span>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-semibold',
              DAYS_CHIP_STYLES[daysChip.variant]
            )}
          >
            {daysChip.label}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-gold">
          <IndianRupee className="h-4 w-4" />
          <span>{formatInr(lead.budget)}</span>
        </div>

        <div className="mt-2">
          <span
            className={cn(
              'inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold',
              PRIORITY_BADGE_COLORS[lead.priority]
            )}
          >
            {lead.priority} Priority
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-coolgrey/60 pt-3">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar name={lead.assignedTo} size="sm" />
            <span className="truncate text-xs text-ink/70">{lead.assignedTo}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <a
              href={`tel:${lead.phone.replace(/\s/g, '')}`}
              className="rounded-md p-1.5 text-ink/50 transition hover:bg-crimson/5 hover:text-crimson"
              aria-label={`Call ${lead.clientName}`}
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
            <a
              href={`mailto:${lead.email}`}
              className="rounded-md p-1.5 text-ink/50 transition hover:bg-crimson/5 hover:text-crimson"
              aria-label={`Email ${lead.clientName}`}
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
            <Link
              href={`/leads/${lead.id}`}
              className="rounded-md p-1.5 text-ink/50 transition hover:bg-crimson/5 hover:text-crimson"
              aria-label={`View ${lead.clientName}`}
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function SortableLeadCard({ lead }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id,
    data: { type: 'lead', stage: lead.stage, lead },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandle = (
    <button
      type="button"
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label="Drag lead card"
      className="absolute right-3 top-3 rounded p-1 text-ink/30 opacity-0 transition hover:bg-ivory dark:bg-night hover:text-crimson group-hover:opacity-100 cursor-grab active:cursor-grabbing"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );

  return (
    <div ref={setNodeRef} style={style} className={cn(isDragging && 'opacity-40')}>
      <LeadCardContent lead={lead} dragHandle={dragHandle} />
    </div>
  );
}

export function LeadCard({ lead }: LeadCardProps) {
  return <SortableLeadCard lead={lead} />;
}

export function LeadCardOverlay({ lead }: LeadCardProps) {
  return <LeadCardContent lead={lead} isOverlay />;
}
