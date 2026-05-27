export interface Activity {
  id: string;
  type:
    | 'Call'
    | 'Email'
    | 'Meeting'
    | 'ProposalSent'
    | 'Tasting'
    | 'NoteAdded'
    | 'StageChanged';
  description: string;
  doneBy: string;
  timestamp: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'Proposal' | 'Menu' | 'Contract' | 'Invoice' | 'Other';
  size: string;
  uploadedAt: string;
  url: string;
}

export interface Lead {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  eventType:
    | 'Wedding'
    | 'Corporate'
    | 'Birthday'
    | 'Anniversary'
    | 'Social'
    | 'Festival';
  eventDate: string;
  guestCount: number;
  budget: number;
  assignedTo: string;
  stage: 'Enquiry' | 'Tasting' | 'Proposal' | 'Confirmed';
  createdAt: string;
  lastContact: string;
  notes: string;
  priority: 'High' | 'Medium' | 'Low';
  documents: Document[];
  activities: Activity[];
}

export interface Event {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: string;
  endDate: string;
  venue: string;
  category: 'Wedding' | 'Corporate' | 'Social' | 'Festival' | 'Birthday';
  guestCount: number;
  revenue: number;
  status: 'Confirmed' | 'Tentative' | 'In Progress' | 'Completed';
  assignedTeam: string[];
  notes: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  since: string;
  totalEvents: number;
  totalSpent: number;
  avgEventSize: number;
  lastEventDate: string;
  preferredCuisine: string[];
  dietaryRestrictions: string[];
  venuePreferences: string[];
  budgetRange: { min: number; max: number };
  specialNotes: string;
  referredBy?: string;
  referrals: string[];
  relationshipManager: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  leadsAssigned: number;
  leadsConverted: number;
  revenue: number;
  target: number;
  avgDealSize: number;
}

export interface Notification {
  id: string;
  type:
    | 'NewLead'
    | 'EventTomorrow'
    | 'FollowUpDue'
    | 'ProposalViewed'
    | 'PaymentReceived';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface LeadSource {
  source: 'Referral' | 'Instagram' | 'Walk-in' | 'Google' | 'Exhibition';
  percentage: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}
