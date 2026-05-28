'use client';

import { Search } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { team } from '@/lib/dummy-data';
import type { Lead } from '@/lib/types';
import {
  EMPTY_PIPELINE_FILTERS,
  type PipelineFiltersState,
} from '@/lib/pipeline-utils';
import { cn } from '@/lib/utils';

const EVENT_TYPES: Lead['eventType'][] = [
  'Wedding',
  'Corporate',
  'Birthday',
  'Anniversary',
  'Social',
  'Festival',
];

export interface PipelineFiltersProps {
  filters: PipelineFiltersState;
  onChange: (filters: PipelineFiltersState) => void;
}

const selectClassName = cn(
  'h-10 w-full rounded-md border border-coolgrey dark:border-night-border bg-white dark:bg-night-surface px-3 text-sm text-ink dark:text-ivory outline-none transition',
  'focus:border-crimson focus:ring-2 focus:ring-crimson/20'
);

export function PipelineFilters({ filters, onChange }: PipelineFiltersProps) {
  const update = (patch: Partial<PipelineFiltersState>) => {
    onChange({ ...filters, ...patch });
  };

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-coolgrey dark:border-night-border bg-white dark:bg-night-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
      <Input
        label="Search"
        placeholder="Name, email, phone..."
        value={filters.search}
        onChange={(e) => update({ search: e.target.value })}
        icon={<Search className="h-4 w-4" />}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Event Type
        </label>
        <select
          value={filters.eventType}
          onChange={(e) => update({ eventType: e.target.value })}
          className={selectClassName}
        >
          <option value="">All types</option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Assigned To
        </label>
        <select
          value={filters.assignedTo}
          onChange={(e) => update({ assignedTo: e.target.value })}
          className={selectClassName}
        >
          <option value="">All team</option>
          {team.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Event From
        </label>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => update({ dateFrom: e.target.value })}
          className={selectClassName}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Event To
        </label>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => update({ dateTo: e.target.value })}
          className={selectClassName}
        />
      </div>

      <div className="sm:col-span-2 lg:col-span-5 lg:flex lg:justify-end">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={() => onChange(EMPTY_PIPELINE_FILTERS)}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
