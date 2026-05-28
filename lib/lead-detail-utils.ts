import type { ComponentType } from 'react';
import {
  FileText,
  Mail,
  Phone,
  StickyNote,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { clients } from './dummy-data';
import type { Activity, Lead } from './types';
import { getDaysChip, getDaysUntilEvent } from './pipeline-utils';
import { EVENT_TYPE_BADGE_COLORS, PRIORITY_BADGE_COLORS } from './pipeline-utils';

export const LEAD_STAGES: Lead['stage'][] = [
  'Enquiry',
  'Tasting',
  'Proposal',
  'Confirmed',
];

export const ACTIVITY_TYPES: Activity['type'][] = [
  'Call',
  'Email',
  'Meeting',
  'ProposalSent',
  'Tasting',
  'NoteAdded',
];

export const ACTIVITY_CONFIG: Record<
  Activity['type'],
  {
    icon: ComponentType<{ className?: string }>;
    circleClass: string;
  }
> = {
  Call: { icon: Phone, circleClass: 'bg-blue-100 text-blue-600' },
  Email: { icon: Mail, circleClass: 'bg-green-100 text-green-700' },
  Meeting: { icon: Users, circleClass: 'bg-purple-100 text-purple-700' },
  ProposalSent: { icon: FileText, circleClass: 'bg-gold/20 text-[#A8892E]' },
  Tasting: { icon: UtensilsCrossed, circleClass: 'bg-crimson/10 text-crimson' },
  NoteAdded: { icon: StickyNote, circleClass: 'bg-coolgrey text-ink/60 dark:text-ivory/60' },
  StageChanged: { icon: FileText, circleClass: 'bg-gold/20 text-[#A8892E]' },
};

export function getClientForLead(lead: Lead) {
  return clients.find(
    (client) =>
      client.name === lead.clientName ||
      client.email.toLowerCase() === lead.email.toLowerCase()
  );
}

export function getLeadDaysInfo(eventDate: string) {
  const days = getDaysUntilEvent(eventDate);
  const chip = getDaysChip(days);
  return { days, chip };
}

export { EVENT_TYPE_BADGE_COLORS, PRIORITY_BADGE_COLORS };
