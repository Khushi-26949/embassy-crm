'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Avatar, Badge } from '@/components/ui';
import { formatInr } from '@/lib/format';
import {
  type ClientTab,
  formatClientSince,
  getClientEvents,
  getEventHistoryTotal,
  getRecentClientActivities,
  getReferralClients,
  getReferrerClient,
  getRelationshipManager,
  getTotalReferralValue,
  isHeritageClient,
} from '@/lib/client-detail-utils';
import type { Client, Event } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ACTIVITY_CONFIG } from '@/lib/lead-detail-utils';

export interface ClientDetailViewProps {
  initialClient: Client;
}

type SortKey = 'date' | 'revenue';
type SortDir = 'asc' | 'desc';

const TABS: { id: ClientTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'history', label: 'Event History' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'referrals', label: 'Referrals' },
];

function ClientReferralCard({ client }: { client: Client }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-coolgrey bg-white p-3">
      <div className="flex items-center gap-3">
        <Avatar name={client.name} size="md" />
        <div>
          <p className="font-medium text-ink">{client.name}</p>
          <p className="text-xs text-gold">{formatInr(client.totalSpent)}</p>
        </div>
      </div>
      <Link
        href={`/clients/${client.id}`}
        className="text-xs font-medium text-crimson hover:underline"
      >
        View Profile
      </Link>
    </div>
  );
}

export function ClientDetailView({ initialClient }: ClientDetailViewProps) {
  const [client] = useState(initialClient);
  const [tab, setTab] = useState<ClientTab>('overview');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const eventHistory = useMemo(() => getClientEvents(client), [client]);
  const manager = useMemo(
    () => getRelationshipManager(client.relationshipManager),
    [client]
  );
  const recentActivities = useMemo(
    () => getRecentClientActivities(client),
    [client]
  );
  const referrer = useMemo(() => getReferrerClient(client), [client]);
  const referredClients = useMemo(() => getReferralClients(client), [client]);
  const referralValue = useMemo(() => getTotalReferralValue(client), [client]);

  const sortedEvents = useMemo(() => {
    const copy = [...eventHistory];
    copy.sort((a, b) => {
      if (sortKey === 'date') {
        const diff =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        return sortDir === 'asc' ? diff : -diff;
      }
      return sortDir === 'asc' ? a.revenue - b.revenue : b.revenue - a.revenue;
    });
    return copy;
  }, [eventHistory, sortKey, sortDir]);

  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / PAGE_SIZE));
  const pagedEvents = sortedEvents.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const historyTotal = getEventHistoryTotal(eventHistory);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const budgetSpan = client.budgetRange.max - client.budgetRange.min || 1;
  const budgetMarker =
    ((client.totalSpent - client.budgetRange.min) / budgetSpan) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-crimson font-serif text-2xl font-bold text-white">
          {client.name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="font-serif text-[32px] leading-tight text-ink">
            {client.name}
          </h2>
          <p className="text-sm text-ink/60">
            Since {formatClientSince(client.since)}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {isHeritageClient(client) ? (
              <Badge variant="gold">Heritage Client</Badge>
            ) : null}
            <p className="font-serif text-xl font-semibold text-gold">
              Total Spent: {formatInr(client.totalSpent)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Events', value: String(client.totalEvents) },
          { label: 'Total Spent', value: formatInr(client.totalSpent) },
          { label: 'Avg Event Size', value: `${client.avgEventSize} guests` },
          { label: 'Last Event Date', value: client.lastEventDate },
        ].map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl bg-white p-4 shadow-card"
          >
            <p className="text-xs text-ink/50">{stat.label}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 rounded-lg border border-coolgrey bg-white p-1">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium transition',
              tab === item.id
                ? 'bg-crimson text-white'
                : 'text-ink/60 hover:bg-ivory'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-5 shadow-card">
            <h3 className="font-serif text-lg text-ink">Contact Details</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="text-ink/50">Phone</dt>
                <dd>
                  <a href={`tel:${client.phone}`} className="text-crimson hover:underline">
                    {client.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ink/50">Email</dt>
                <dd>
                  <a
                    href={`mailto:${client.email}`}
                    className="text-crimson hover:underline"
                  >
                    {client.email}
                  </a>
                </dd>
              </div>
              {client.company ? (
                <div>
                  <dt className="text-ink/50">Company</dt>
                  <dd className="text-ink">{client.company}</dd>
                </div>
              ) : null}
            </dl>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-card">
            <h3 className="font-serif text-lg text-ink">Relationship Manager</h3>
            {manager ? (
              <div className="mt-3 flex items-center gap-3">
                <Avatar name={manager.name} size="md" />
                <div>
                  <p className="font-medium text-ink">{manager.name}</p>
                  <p className="text-sm text-ink/60">{manager.role}</p>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-ink/60">
                {client.relationshipManager}
              </p>
            )}
          </section>

          <section className="rounded-xl bg-white p-5 shadow-card lg:col-span-2">
            <h3 className="font-serif text-lg text-ink">Recent Activity</h3>
            <ul className="mt-3 space-y-3">
              {recentActivities.map((activity) => {
                const config = ACTIVITY_CONFIG[activity.type];
                const Icon = config.icon;
                return (
                  <li
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg bg-ivory p-3"
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        config.circleClass
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm text-ink">{activity.description}</p>
                      <p className="text-xs text-ink/50">
                        {activity.leadName} · by {activity.doneBy}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      ) : null}

      {tab === 'history' ? (
        <section className="rounded-xl bg-white p-5 shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-coolgrey text-left text-xs text-ink/50">
                  <th className="py-2 font-semibold">Event Name</th>
                  <th className="py-2 font-semibold">
                    <button type="button" onClick={() => toggleSort('date')}>
                      Date {sortKey === 'date' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </button>
                  </th>
                  <th className="py-2 font-semibold">Type</th>
                  <th className="py-2 font-semibold">Guests</th>
                  <th className="py-2 font-semibold">
                    <button type="button" onClick={() => toggleSort('revenue')}>
                      Revenue{' '}
                      {sortKey === 'revenue' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </button>
                  </th>
                  <th className="py-2 font-semibold">Status</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {pagedEvents.map((event) => (
                  <EventHistoryRow
                    key={event.id}
                    event={event}
                    expanded={expandedId === event.id}
                    onToggle={() =>
                      setExpandedId((id) => (id === event.id ? null : event.id))
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-coolgrey pt-4">
            <p className="font-semibold text-gold">
              Total revenue: {formatInr(historyTotal)}
            </p>
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded border border-coolgrey px-3 py-1 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="py-1">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded border border-coolgrey px-3 py-1 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {tab === 'preferences' ? (
        <section className="space-y-6 rounded-xl bg-white p-5 shadow-card">
          <div>
            <h3 className="font-serif text-lg text-ink">Cuisine Preferences</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {client.preferredCuisine.map((cuisine) => (
                <span
                  key={cuisine}
                  className="rounded-full border border-crimson px-3 py-1 text-xs font-medium text-crimson"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-lg text-ink">Dietary Restrictions</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {client.dietaryRestrictions.length > 0 ? (
                client.dietaryRestrictions.map((item) => (
                  <Badge key={item} variant="warning">
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-ink/50">None specified</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-lg text-ink">Venue Preferences</h3>
            <ul className="mt-2 space-y-2">
              {client.venuePreferences.map((venue) => (
                <li key={venue} className="flex items-center gap-2 text-sm text-ink">
                  <MapPin className="h-4 w-4 text-crimson" />
                  {venue}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg text-ink">Budget Range</h3>
            <div className="mt-3">
              <div className="relative h-3 overflow-hidden rounded-full bg-coolgrey">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold/40 to-gold"
                  style={{
                    left: '0%',
                    width: `${Math.min(100, Math.max(8, budgetMarker))}%`,
                  }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-ink/60">
                <span>{formatInr(client.budgetRange.min)}</span>
                <span>{formatInr(client.budgetRange.max)}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-lg text-ink">Special Notes</h3>
            <p className="mt-2 rounded-lg bg-ivory p-4 text-sm text-ink/80">
              {client.specialNotes}
            </p>
          </div>
        </section>
      ) : null}

      {tab === 'referrals' ? (
        <section className="space-y-6">
          {referrer ? (
            <div>
              <h3 className="font-serif text-lg text-ink">Referred by</h3>
              <div className="mt-3">
                <ClientReferralCard client={referrer} />
              </div>
            </div>
          ) : null}

          <div>
            <h3 className="font-serif text-lg text-ink">Clients Referred</h3>
            <div className="mt-3 space-y-3">
              {referredClients.length > 0 ? (
                referredClients.map((referred) => (
                  <ClientReferralCard key={referred.id} client={referred} />
                ))
              ) : (
                <p className="text-sm text-ink/50">No referrals yet.</p>
              )}
            </div>
          </div>

          <p className="rounded-lg bg-gold/10 px-4 py-3 text-sm font-semibold text-gold">
            Total referral value: {formatInr(referralValue)}
          </p>

          <div className="rounded-xl border border-coolgrey bg-white p-6 shadow-card">
            <h3 className="mb-4 font-serif text-lg text-ink">Referral Tree</h3>
            <div className="flex flex-col items-center">
              <div className="rounded-lg border-2 border-crimson bg-crimson/5 px-4 py-2 text-center">
                <p className="font-medium text-ink">{client.name}</p>
              </div>
              {referrer || referredClients.length > 0 ? (
                <div className="my-2 h-6 w-px bg-coolgrey" />
              ) : null}
              <div className="flex flex-wrap justify-center gap-6">
                {referrer ? (
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs text-ink/50">Referred by</span>
                    <div className="rounded-lg border border-gold bg-gold/5 px-3 py-2 text-sm">
                      {referrer.name}
                    </div>
                  </div>
                ) : null}
                {referredClients.map((referred) => (
                  <div key={referred.id} className="flex flex-col items-center">
                    <span className="mb-1 text-xs text-ink/50">Referred</span>
                    <div className="rounded-lg border border-coolgrey bg-ivory px-3 py-2 text-sm">
                      {referred.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function EventHistoryRow({
  event,
  expanded,
  onToggle,
}: {
  event: Event;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        className="cursor-pointer border-b border-coolgrey/60 hover:bg-ivory/60"
        onClick={onToggle}
      >
        <td className="py-3 font-medium text-ink">{event.title}</td>
        <td className="py-3 text-ink/70">
          {format(new Date(event.date), 'd MMM yyyy')}
        </td>
        <td className="py-3">{event.category}</td>
        <td className="py-3">{event.guestCount}</td>
        <td className="py-3 font-medium text-gold">{formatInr(event.revenue)}</td>
        <td className="py-3">
          <Badge variant="info">{event.status}</Badge>
        </td>
        <td className="py-3 text-ink/40">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </td>
      </tr>
      {expanded ? (
        <tr className="bg-ivory/40">
          <td colSpan={7} className="px-4 py-3 text-sm text-ink/70">
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="mt-1">
              <strong>Team:</strong> {event.assignedTeam.join(', ')}
            </p>
            <p className="mt-1">
              <strong>Notes:</strong> {event.notes}
            </p>
          </td>
        </tr>
      ) : null}
    </>
  );
}
