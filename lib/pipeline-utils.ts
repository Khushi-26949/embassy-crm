import type { Lead } from './types';

export const PIPELINE_STAGES = [
  'Enquiry',
  'Tasting',
  'Proposal',
  'Confirmed',
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export const STAGE_COLUMN_STYLES: Record<
  PipelineStage,
  { header: string; border: string }
> = {
  Enquiry: {
    header: 'bg-blue-50',
    border: 'border-t-[3px] border-t-blue-500',
  },
  Tasting: {
    header: 'bg-amber-50',
    border: 'border-t-[3px] border-t-amber-500',
  },
  Proposal: {
    header: 'bg-purple-50',
    border: 'border-t-[3px] border-t-purple-500',
  },
  Confirmed: {
    header: 'bg-green-50',
    border: 'border-t-[3px] border-t-[#C9A84C]',
  },
};

export const EVENT_TYPE_BADGE_COLORS: Record<Lead['eventType'], string> = {
  Wedding: 'bg-crimson/10 text-crimson',
  Corporate: 'bg-gold/15 text-[#A8892E]',
  Birthday: 'bg-purple-100 text-purple-700',
  Anniversary: 'bg-pink-100 text-pink-700',
  Social: 'bg-blue-100 text-blue-700',
  Festival: 'bg-green-100 text-green-700',
};

export const PRIORITY_BADGE_COLORS: Record<Lead['priority'], string> = {
  High: 'bg-crimson/10 text-crimson',
  Medium: 'bg-gold/15 text-[#A8892E]',
  Low: 'bg-green-100 text-green-700',
};

export type DaysChipVariant = 'urgent' | 'soon' | 'upcoming';

export function getDaysUntilEvent(eventDate: string, reference = new Date()) {
  const event = new Date(eventDate);
  const ref = new Date(reference);
  ref.setHours(0, 0, 0, 0);
  event.setHours(0, 0, 0, 0);
  return Math.ceil((event.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24));
}

export function getDaysChip(daysRemaining: number): {
  label: string;
  variant: DaysChipVariant;
} {
  if (daysRemaining < 7) {
    return { label: 'URGENT', variant: 'urgent' };
  }
  if (daysRemaining < 30) {
    return { label: 'Soon', variant: 'soon' };
  }
  return { label: 'Upcoming', variant: 'upcoming' };
}

export const DAYS_CHIP_STYLES: Record<DaysChipVariant, string> = {
  urgent: 'bg-red-100 text-red-700',
  soon: 'bg-amber-100 text-amber-800',
  upcoming: 'bg-green-100 text-green-700',
};

export function sumLeadBudgets(leadList: Lead[]) {
  return leadList.reduce((sum, lead) => sum + lead.budget, 0);
}

export function isPipelineStage(value: string): value is PipelineStage {
  return PIPELINE_STAGES.includes(value as PipelineStage);
}

export interface PipelineFiltersState {
  search: string;
  eventType: string;
  assignedTo: string;
  dateFrom: string;
  dateTo: string;
}

export const EMPTY_PIPELINE_FILTERS: PipelineFiltersState = {
  search: '',
  eventType: '',
  assignedTo: '',
  dateFrom: '',
  dateTo: '',
};

export function filterPipelineLeads(
  leadList: Lead[],
  filters: PipelineFiltersState
) {
  const query = filters.search.trim().toLowerCase();

  return leadList.filter((lead) => {
    if (query) {
      const matchesSearch =
        lead.clientName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    if (filters.eventType && lead.eventType !== filters.eventType) {
      return false;
    }

    if (filters.assignedTo && lead.assignedTo !== filters.assignedTo) {
      return false;
    }

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      if (new Date(lead.eventDate) < from) return false;
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59, 999);
      if (new Date(lead.eventDate) > to) return false;
    }

    return true;
  });
}
