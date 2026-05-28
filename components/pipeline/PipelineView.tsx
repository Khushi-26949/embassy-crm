'use client';

import { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { Button } from '@/components/ui';
import { PipelinePageSkeleton } from '@/components/shared/PipelinePageSkeleton';
import { leads as initialLeads } from '@/lib/dummy-data';
import { useToast } from '@/lib/toast-provider';
import { usePageLoading } from '@/lib/use-page-loading';
import { formatInr } from '@/lib/format';
import {
  EMPTY_PIPELINE_FILTERS,
  PIPELINE_STAGES,
  filterPipelineLeads,
  isPipelineStage,
  sumLeadBudgets,
  type PipelineFiltersState,
  type PipelineStage,
} from '@/lib/pipeline-utils';
import type { Lead } from '@/lib/types';
import { AddLeadModal, type AddLeadFormValues } from './AddLeadModal';
import { KanbanColumn } from './KanbanColumn';
import { LeadCard, LeadCardOverlay } from './LeadCard';
import { PipelineFilters } from './PipelineFilters';

export function PipelineView() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filters, setFilters] = useState<PipelineFiltersState>(
    EMPTY_PIPELINE_FILTERS
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<PipelineStage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState<PipelineStage>('Enquiry');
  const loading = usePageLoading(1000);
  const { showSuccess, showGold } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const filteredLeads = useMemo(
    () => filterPipelineLeads(leads, filters),
    [leads, filters]
  );

  const totalPipelineValue = useMemo(
    () => sumLeadBudgets(filteredLeads),
    [filteredLeads]
  );

  const leadsByStage = useMemo(() => {
    const grouped = PIPELINE_STAGES.reduce(
      (acc, stage) => {
        acc[stage] = [];
        return acc;
      },
      {} as Record<PipelineStage, Lead[]>
    );

    filteredLeads.forEach((lead) => {
      grouped[lead.stage].push(lead);
    });

    return grouped;
  }, [filteredLeads]);

  const activeLead = activeId
    ? leads.find((lead) => lead.id === activeId) ?? null
    : null;

  const openAddModal = (stage: PipelineStage = 'Enquiry') => {
    setModalStage(stage);
    setModalOpen(true);
  };

  const resolveTargetStage = (
    overId: string | number,
    leadList: Lead[]
  ): PipelineStage | null => {
    const id = String(overId);
    if (isPipelineStage(id)) return id;

    const overLead = leadList.find((lead) => lead.id === id);
    return overLead?.stage ?? null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const stage = event.over
      ? resolveTargetStage(event.over.id, leads)
      : null;
    setOverColumn(stage);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverColumn(null);

    if (!over) return;

    const targetStage = resolveTargetStage(over.id, leads);
    if (!targetStage) return;

    const movedLead = leads.find((lead) => lead.id === active.id);
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === active.id ? { ...lead, stage: targetStage } : lead
      )
    );
    if (movedLead && movedLead.stage !== targetStage) {
      showGold(`✓ Lead moved to ${targetStage}`);
    }
  };

  const handleAddLead = (values: AddLeadFormValues) => {
    const now = new Date().toISOString();
    const phone = values.phone.startsWith('+91')
      ? values.phone
      : `+91 ${values.phone.replace(/^\+91\s?/, '')}`;

    const newLead: Lead = {
      id: `ld_${Date.now()}`,
      clientName: values.clientName.trim(),
      phone,
      email: values.email.trim(),
      eventType: values.eventType,
      eventDate: values.eventDate,
      guestCount: Number(values.guestCount) || 0,
      budget: Number(values.budget),
      assignedTo: values.assignedTo,
      stage: values.stage,
      createdAt: now,
      lastContact: now,
      notes: values.notes.trim(),
      priority: values.priority,
      documents: [],
      activities: [
        {
          id: `ac_${Date.now()}`,
          type: 'NoteAdded',
          description: 'Lead created from pipeline board.',
          doneBy: values.assignedTo,
          timestamp: now,
        },
      ],
    };

    setLeads((prev) => [...prev, newLead]);
    setModalOpen(false);
    showSuccess('✓ Lead added successfully');
  };

  if (loading) {
    return <PipelinePageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-ink dark:text-ivory">Sales Pipeline</h2>
          <p className="mt-1 text-sm text-ink/60 dark:text-ivory/60">
            Total pipeline value:{' '}
            <span className="font-semibold text-gold">
              {formatInr(totalPipelineValue)}
            </span>
          </p>
        </div>
        <Button variant="primary" onClick={() => openAddModal('Enquiry')}>
          + Add Lead
        </Button>
      </div>

      <PipelineFilters filters={filters} onChange={setFilters} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveId(null);
          setOverColumn(null);
        }}
      >
        <div className="-mx-4 flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scroll-snap-type:x_mandatory] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:[scroll-snap-type:none] lg:grid-cols-4">
          {PIPELINE_STAGES.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              leads={leadsByStage[stage]}
              isDropTarget={overColumn === stage && Boolean(activeId)}
              onAddLead={openAddModal}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeLead ? <LeadCardOverlay lead={activeLead} /> : null}
        </DragOverlay>
      </DndContext>

      <AddLeadModal
        open={modalOpen}
        defaultStage={modalStage}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddLead}
      />

    </div>
  );
}
