import { format } from 'date-fns';
import { clients, events, leads, team } from './dummy-data';
import type { Client, Event } from './types';

export type ClientTab = 'overview' | 'history' | 'preferences' | 'referrals';

export function getClientById(id: string) {
  return clients.find((client) => client.id === id);
}

export function getClientEvents(client: Client) {
  return events
    .filter(
      (event) =>
        event.clientId === client.id || event.clientName === client.name
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRelationshipManager(name: string) {
  return team.find((member) => member.name === name);
}

export function getRecentClientActivities(client: Client, limit = 3) {
  const relatedLeads = leads.filter((lead) => lead.clientName === client.name);
  const activities = relatedLeads.flatMap((lead) =>
    lead.activities.map((activity) => ({
      ...activity,
      leadName: lead.clientName,
    }))
  );

  return activities
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, limit);
}

export function getReferralClients(client: Client) {
  return client.referrals
    .map((id) => clients.find((c) => c.id === id))
    .filter((c): c is Client => Boolean(c));
}

export function getReferrerClient(client: Client) {
  if (!client.referredBy) return null;
  return clients.find((c) => c.id === client.referredBy) ?? null;
}

export function getTotalReferralValue(client: Client) {
  return getReferralClients(client).reduce(
    (sum, referred) => sum + referred.totalSpent,
    0
  );
}

export function formatClientSince(since: string) {
  if (since === '—') return '—';
  return format(new Date(since), 'yyyy');
}

export function isHeritageClient(client: Client) {
  return client.totalEvents > 2;
}

export function getEventHistoryTotal(eventList: Event[]) {
  return eventList.reduce((sum, event) => sum + event.revenue, 0);
}
