'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Inbox } from 'lucide-react';
import { Button, EmptyState } from '@/components/ui';
import { formatInr } from '@/lib/format';
import {
  STAGE_COLUMN_STYLES,
  sumLeadBudgets,
  type PipelineStage,
} from '@/lib/pipeline-utils';
import type { Lead } from '@/lib/types';
import { cn } from '@/lib/utils';
import { LeadCard } from './LeadCard';

export interface KanbanColumnProps {
  stage: PipelineStage;
  leads: Lead[];
  isDropTarget: boolean;
  onAddLead: (stage: PipelineStage) => void;
}

export function KanbanColumn({
  stage,
  leads,
  isDropTarget,
  onAddLead,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: stage,
    data: { type: 'column', stage },
  });

  const stageTotal = sumLeadBudgets(leads);
  const styles = STAGE_COLUMN_STYLES[stage];
  const leadIds = leads.map((lead) => lead.id);

  return (
    <div
      className={cn(
        'flex min-w-[280px] shrink-0 snap-start scroll-ml-4 flex-col rounded-xl border border-coolgrey bg-white dark:border-night-border dark:bg-night-card md:min-w-[280px] lg:min-w-0 lg:flex-1',
        isDropTarget && 'bg-crimson/5 ring-2 ring-crimson/40'
      )}
    >
      <div
        className={cn(
          'rounded-t-xl px-4 py-3',
          styles.header,
          styles.border,
          // Keep column headers visible when the pipeline board scrolls.
          'sticky top-0 z-10 bg-white dark:bg-night-card'
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-base font-semibold text-ink dark:text-ivory">
            {stage}
          </h3>
          <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-semibold text-ink dark:bg-night-surface dark:text-ivory">
            {leads.length}
          </span>
        </div>
        <p className="mt-1 text-xs font-medium text-ink/60 dark:text-ivory/60">
          {formatInr(stageTotal)}
        </p>
      </div>

      <div
        ref={setNodeRef}
        className="flex min-h-[500px] flex-1 flex-col bg-ivory p-3 dark:bg-night"
      >
        <SortableContext items={leadIds} strategy={verticalListSortingStrategy}>
          <div className="flex flex-1 flex-col gap-3">
            {leads.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title={`No leads in ${stage}`}
                action={
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddLead(stage)}
                  >
                    + Add Lead
                  </Button>
                }
                className="border-none bg-transparent shadow-none"
              />
            ) : (
              leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
            )}
          </div>
        </SortableContext>
      </div>

      <div className="border-t border-coolgrey bg-ivory px-3 py-3 dark:border-night-border dark:bg-night">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => onAddLead(stage)}
        >
          + Add Lead
        </Button>
      </div>
    </div>
  );
}
