'use client';

import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  IndianRupee,
  Mail,
  Phone,
  UploadCloud,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Avatar, Badge, Button, Input } from '@/components/ui';
import { useToast } from '@/lib/toast-provider';
import { formatInr } from '@/lib/format';
import {
  ACTIVITY_CONFIG,
  ACTIVITY_TYPES,
  EVENT_TYPE_BADGE_COLORS,
  LEAD_STAGES,
  PRIORITY_BADGE_COLORS,
  getClientForLead,
  getLeadDaysInfo,
} from '@/lib/lead-detail-utils';
import type { Activity, Lead } from '@/lib/types';
import { cn } from '@/lib/utils';
import { DAYS_CHIP_STYLES } from '@/lib/pipeline-utils';

export interface LeadDetailViewProps {
  initialLead: Lead;
}

interface FollowUpReminder {
  date: string;
  time: string;
  type: 'Call' | 'Email' | 'Meeting';
}

export function LeadDetailView({ initialLead }: LeadDetailViewProps) {
  const [lead, setLead] = useState<Lead>(initialLead);
  const [notes, setNotes] = useState(lead.notes);
  const [editingInfo, setEditingInfo] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityType, setActivityType] = useState<Activity['type']>('Call');
  const [activityDate, setActivityDate] = useState('');
  const [activityNotes, setActivityNotes] = useState('');
  const [reminder, setReminder] = useState<FollowUpReminder | null>(null);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderType, setReminderType] = useState<FollowUpReminder['type']>('Call');
  const { showSuccess, showGold } = useToast();

  const client = useMemo(() => getClientForLead(lead), [lead]);
  const daysInfo = getLeadDaysInfo(lead.eventDate);
  const phoneHref = `tel:${lead.phone.replace(/\s/g, '')}`;

  const updateStage = (stage: Lead['stage']) => {
    setLead((prev) => ({
      ...prev,
      stage,
      activities: [
        {
          id: `ac_${Date.now()}`,
          type: 'StageChanged',
          description: `Stage updated to ${stage}.`,
          doneBy: prev.assignedTo,
          timestamp: new Date().toISOString(),
        },
        ...prev.activities,
      ],
    }));
    showGold(`✓ Lead moved to ${stage}`);
  };

  const saveNotes = () => {
    setLead((prev) => ({ ...prev, notes }));
    showSuccess('✓ Changes saved');
  };

  const addActivity = () => {
    if (!activityNotes.trim()) return;
    const newActivity: Activity = {
      id: `ac_${Date.now()}`,
      type: activityType,
      description: activityNotes.trim(),
      doneBy: lead.assignedTo,
      timestamp: activityDate
        ? new Date(activityDate).toISOString()
        : new Date().toISOString(),
    };
    setLead((prev) => ({
      ...prev,
      activities: [newActivity, ...prev.activities],
      lastContact: new Date().toISOString(),
    }));
    setActivityNotes('');
    setActivityDate('');
    setShowActivityForm(false);
    showSuccess('✓ Changes saved');
  };

  const saveReminder = () => {
    if (!reminderDate || !reminderTime) return;
    setReminder({ date: reminderDate, time: reminderTime, type: reminderType });
    showSuccess('✓ Changes saved');
  };

  const sortedActivities = [...lead.activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const selectClass =
    'h-10 w-full rounded-md border border-coolgrey bg-white px-3 text-sm text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/20';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <Link
            href="/leads"
            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-ink/60 hover:text-crimson"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div>
            <h2 className="font-serif text-[28px] leading-tight text-ink">
              {lead.clientName}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="gold">{lead.stage}</Badge>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                  PRIORITY_BADGE_COLORS[lead.priority]
                )}
              >
                {lead.priority}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={lead.stage}
            onChange={(e) => updateStage(e.target.value as Lead['stage'])}
            className={selectClass}
          >
            {LEAD_STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          <Button variant="secondary" onClick={() => setEditingInfo((v) => !v)}>
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <section className="rounded-xl bg-white p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg text-ink">{lead.clientName}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-semibold',
                      EVENT_TYPE_BADGE_COLORS[lead.eventType]
                    )}
                  >
                    {lead.eventType}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setEditingInfo((v) => !v)}>
                {editingInfo ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            {editingInfo ? (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  label="Client Name"
                  value={lead.clientName}
                  onChange={(e) =>
                    setLead((prev) => ({ ...prev, clientName: e.target.value }))
                  }
                />
                <Input
                  label="Phone"
                  value={lead.phone}
                  onChange={(e) =>
                    setLead((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
                <Input
                  label="Email"
                  value={lead.email}
                  onChange={(e) =>
                    setLead((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <Input
                  label="Budget"
                  type="number"
                  value={lead.budget}
                  onChange={(e) =>
                    setLead((prev) => ({
                      ...prev,
                      budget: Number(e.target.value),
                    }))
                  }
                />
                <Button variant="primary" onClick={() => setEditingInfo(false)}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-ink/70">
                    <Phone className="h-4 w-4" /> {lead.phone}
                  </span>
                  <a href={phoneHref} className="text-xs font-medium text-crimson hover:underline">
                    Call
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-ink/70">
                    <Mail className="h-4 w-4" /> {lead.email}
                  </span>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-xs font-medium text-crimson hover:underline"
                  >
                    Email
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-ink/70">
                  <CalendarDays className="h-4 w-4" />
                  {format(new Date(lead.eventDate), 'EEEE, d MMMM yyyy')}
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      DAYS_CHIP_STYLES[daysInfo.chip.variant]
                    )}
                  >
                    {daysInfo.days} days · {daysInfo.chip.label}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 text-ink/70">
                  <Users className="h-4 w-4" />
                  {lead.guestCount} guests
                </div>
                <div className="inline-flex items-center gap-2 font-semibold text-gold">
                  <IndianRupee className="h-4 w-4" />
                  {formatInr(lead.budget)}
                </div>
                {client ? (
                  <p className="text-ink/60">
                    Venue: {client.venuePreferences.join(', ')} · Cuisine:{' '}
                    {client.preferredCuisine.join(', ')}
                  </p>
                ) : null}
              </div>
            )}
          </section>

          <section className="rounded-xl bg-white p-5 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-serif text-lg text-ink">Activity Timeline</h3>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowActivityForm((v) => !v)}
              >
                Add Activity
              </Button>
            </div>

            {showActivityForm ? (
              <div className="mt-4 space-y-3 rounded-lg border border-coolgrey bg-ivory p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Type</label>
                    <select
                      value={activityType}
                      onChange={(e) =>
                        setActivityType(e.target.value as Activity['type'])
                      }
                      className={selectClass}
                    >
                      {ACTIVITY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Date"
                    type="datetime-local"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Notes</label>
                  <textarea
                    value={activityNotes}
                    onChange={(e) => setActivityNotes(e.target.value)}
                    rows={3}
                    className={cn(selectClass, 'h-auto py-2')}
                  />
                </div>
                <Button variant="primary" size="sm" onClick={addActivity}>
                  Save
                </Button>
              </div>
            ) : null}

            <ul className="relative mt-6 space-y-5 pl-4 before:absolute before:bottom-0 before:left-[7px] before:top-2 before:w-px before:bg-crimson/30">
              {sortedActivities.map((activity) => {
                const config = ACTIVITY_CONFIG[activity.type];
                const Icon = config.icon;
                return (
                  <li key={activity.id} className="relative flex gap-3">
                    <span
                      className={cn(
                        'absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full',
                        config.circleClass
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1 pl-6">
                      <p className="text-sm text-ink">{activity.description}</p>
                      <p className="mt-0.5 text-xs text-ink/50">
                        by {activity.doneBy} ·{' '}
                        {formatDistanceToNow(new Date(activity.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-card">
            <h3 className="font-serif text-lg text-ink">Notes</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-ink/70">{lead.notes}</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className={cn('mt-3', selectClass, 'h-auto py-2')}
            />
            <Button variant="primary" size="sm" className="mt-3" onClick={saveNotes}>
              Save
            </Button>
          </section>
        </div>

        <div className="space-y-6 xl:col-span-2">
          <section className="rounded-xl bg-white p-5 shadow-card">
            <h3 className="font-serif text-lg text-ink">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <a
                href={phoneHref}
                className="flex w-full items-center justify-center rounded-md bg-crimson px-4 py-2.5 text-sm font-medium text-white hover:bg-crimson-dark"
              >
                📞 Call Client
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="flex w-full items-center justify-center rounded-md border border-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold/10"
              >
                ✉️ Send Email
              </a>
              <Button variant="ghost" className="w-full">
                📅 Schedule Meeting
              </Button>
              <Button variant="ghost" className="w-full">
                📄 Send Proposal
              </Button>
              <Button
                variant="primary"
                className="w-full bg-[#10B981] hover:bg-[#0d9668]"
                onClick={() => updateStage('Confirmed')}
              >
                ✅ Mark as Won
              </Button>
              <Button
                variant="danger"
                className="w-full"
                onClick={() => {
                  setLead((prev) => ({
                    ...prev,
                    notes: `${prev.notes}\n[Marked as lost]`,
                  }));
                  showSuccess('✓ Changes saved');
                }}
              >
                ❌ Mark as Lost
              </Button>
            </div>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-card">
            <h3 className="font-serif text-lg text-ink">Next Follow-up</h3>
            {reminder ? (
              <p className="mt-2 rounded-lg bg-ivory p-3 text-sm text-ink/70">
                {reminder.type} on {reminder.date} at {reminder.time}
              </p>
            ) : (
              <p className="mt-2 text-sm text-ink/50">No reminder set.</p>
            )}
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Date"
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                />
                <Input
                  label="Time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Reminder type
                </label>
                <select
                  value={reminderType}
                  onChange={(e) =>
                    setReminderType(e.target.value as FollowUpReminder['type'])
                  }
                  className={selectClass}
                >
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Meeting">Meeting</option>
                </select>
              </div>
              <Button variant="primary" className="w-full" onClick={saveReminder}>
                Save Reminder
              </Button>
            </div>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg text-ink">Documents</h3>
              <Button variant="ghost" size="sm">
                + Upload
              </Button>
            </div>
            <ul className="mt-4 space-y-3">
              {lead.documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-coolgrey/70 p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <FileText className="h-5 w-5 shrink-0 text-crimson" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">{doc.name}</p>
                      <p className="text-xs text-ink/50">
                        {doc.type} · {doc.size}
                      </p>
                    </div>
                  </div>
                  <a
                    href={doc.url}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-crimson hover:bg-crimson/5"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-coolgrey bg-ivory px-4 py-8 text-center">
              <UploadCloud className="h-8 w-8 text-ink/30" />
              <p className="mt-2 text-sm text-ink/60">
                Drop files here or click to upload
              </p>
              <p className="mt-1 text-xs text-ink/40">
                Accepts: PDF, DOC, DOCX, JPG, PNG
              </p>
            </div>
          </section>

          {client ? (
            <section className="rounded-xl bg-white p-5 shadow-card">
              <h3 className="font-serif text-lg text-ink">Event Details</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {client.venuePreferences.map((venue) => (
                  <Badge key={venue} variant="info">
                    {venue}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {client.preferredCuisine.map((cuisine) => (
                  <span
                    key={cuisine}
                    className="rounded-full border border-crimson/30 px-2 py-0.5 text-xs text-crimson"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {client.dietaryRestrictions.length > 0 ? (
                  client.dietaryRestrictions.map((item) => (
                    <Badge key={item} variant="warning">
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-ink/50">No dietary restrictions noted.</span>
                )}
              </div>
              <p className="mt-3 text-sm text-ink/70">{client.specialNotes}</p>
              <p className="mt-2 text-sm font-medium text-gold">
                Budget range: {formatInr(client.budgetRange.min)} –{' '}
                {formatInr(client.budgetRange.max)}
              </p>
            </section>
          ) : null}
        </div>
      </div>

    </div>
  );
}
