'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Modal } from '@/components/ui';
import { team } from '@/lib/dummy-data';
import {
  PIPELINE_STAGES,
  type PipelineStage,
} from '@/lib/pipeline-utils';
import type { Lead } from '@/lib/types';
import { cn } from '@/lib/utils';

export interface AddLeadFormValues {
  clientName: string;
  phone: string;
  email: string;
  eventType: Lead['eventType'];
  eventDate: string;
  budget: string;
  guestCount: string;
  priority: Lead['priority'];
  assignedTo: string;
  stage: PipelineStage;
  notes: string;
}

export interface AddLeadModalProps {
  open: boolean;
  defaultStage: PipelineStage;
  onClose: () => void;
  onSubmit: (values: AddLeadFormValues) => void;
}

const EVENT_TYPES: Lead['eventType'][] = [
  'Wedding',
  'Corporate',
  'Birthday',
  'Anniversary',
  'Social',
  'Festival',
];

const selectClassName = cn(
  'h-10 w-full rounded-md border border-coolgrey bg-white px-3 text-sm text-ink outline-none transition',
  'focus:border-crimson focus:ring-2 focus:ring-crimson/20'
);

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

function emptyForm(stage: PipelineStage): AddLeadFormValues {
  return {
    clientName: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    eventDate: '',
    budget: '',
    guestCount: '',
    priority: 'Medium',
    assignedTo: team[0]?.name ?? '',
    stage,
    notes: '',
  };
}

export function AddLeadModal({
  open,
  defaultStage,
  onClose,
  onSubmit,
}: AddLeadModalProps) {
  const [form, setForm] = useState<AddLeadFormValues>(emptyForm(defaultStage));
  const [errors, setErrors] = useState<Partial<Record<keyof AddLeadFormValues, string>>>({});

  useEffect(() => {
    if (open) {
      setForm(emptyForm(defaultStage));
      setErrors({});
    }
  }, [open, defaultStage]);

  const update = (patch: Partial<AddLeadFormValues>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      (Object.keys(patch) as (keyof AddLeadFormValues)[]).forEach((key) => {
        delete next[key];
      });
      return next;
    });
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof AddLeadFormValues, string>> = {};

    if (!form.clientName.trim()) nextErrors.clientName = 'Client name is required';
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required';
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email';
    }
    if (!form.eventDate) nextErrors.eventDate = 'Event date is required';
    if (!form.budget.trim() || Number(form.budget) <= 0) {
      nextErrors.budget = 'Expected budget is required';
    }
    if (!form.assignedTo) nextErrors.assignedTo = 'Assign a team member';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Lead"
      className="max-h-[90vh] max-w-2xl overflow-y-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Client Name *"
            value={form.clientName}
            onChange={(e) => update({ clientName: e.target.value })}
            error={errors.clientName}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Phone *
            </label>
            <div className="flex">
              <span className="inline-flex h-10 items-center rounded-l-md border border-r-0 border-coolgrey bg-ivory px-3 text-sm text-ink/60">
                +91
              </span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update({ phone: e.target.value })}
                className={cn(
                  selectClassName,
                  'rounded-l-none',
                  errors.phone && 'border-crimson'
                )}
                placeholder="98765 43210"
              />
            </div>
            {errors.phone ? (
              <p className="mt-1.5 text-xs text-crimson">{errors.phone}</p>
            ) : null}
          </div>
        </div>

        <Input
          label="Email *"
          type="email"
          value={form.email}
          onChange={(e) => update({ email: e.target.value })}
          error={errors.email}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Event Type *
            </label>
            <select
              value={form.eventType}
              onChange={(e) =>
                update({ eventType: e.target.value as Lead['eventType'] })
              }
              className={selectClassName}
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Event Date *"
            type="date"
            min={getTodayString()}
            value={form.eventDate}
            onChange={(e) => update({ eventDate: e.target.value })}
            error={errors.eventDate}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Expected Budget *
            </label>
            <div className="flex">
              <span className="inline-flex h-10 items-center rounded-l-md border border-r-0 border-coolgrey bg-ivory px-3 text-sm text-gold">
                ₹
              </span>
              <input
                type="number"
                min={0}
                value={form.budget}
                onChange={(e) => update({ budget: e.target.value })}
                className={cn(
                  selectClassName,
                  'rounded-l-none',
                  errors.budget && 'border-crimson'
                )}
              />
            </div>
            {errors.budget ? (
              <p className="mt-1.5 text-xs text-crimson">{errors.budget}</p>
            ) : null}
          </div>
          <Input
            label="Guest Count"
            type="number"
            min={0}
            value={form.guestCount}
            onChange={(e) => update({ guestCount: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Priority
            </label>
            <select
              value={form.priority}
              onChange={(e) =>
                update({ priority: e.target.value as Lead['priority'] })
              }
              className={selectClassName}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Assigned To *
            </label>
            <select
              value={form.assignedTo}
              onChange={(e) => update({ assignedTo: e.target.value })}
              className={cn(selectClassName, errors.assignedTo && 'border-crimson')}
            >
              {team.map((member) => (
                <option key={member.id} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
            {errors.assignedTo ? (
              <p className="mt-1.5 text-xs text-crimson">{errors.assignedTo}</p>
            ) : null}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Stage
            </label>
            <select
              value={form.stage}
              onChange={(e) =>
                update({ stage: e.target.value as PipelineStage })
              }
              className={selectClassName}
            >
              {PIPELINE_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => update({ notes: e.target.value })}
            rows={3}
            className={cn(selectClassName, 'h-auto py-2')}
            placeholder="Optional notes..."
          />
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Lead
          </Button>
        </div>
      </form>
    </Modal>
  );
}
