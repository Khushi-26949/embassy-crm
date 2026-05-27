import {
  events,
  leadSources,
  leads,
  monthlyRevenue2024,
  team,
} from './dummy-data';
import type { Activity, Event } from './types';

export const OVERVIEW_REFERENCE_DATE = new Date('2025-01-07T09:00:00+05:30');

export const OVERVIEW_USER = team[0];

const PIPELINE_STAGES = ['Enquiry', 'Tasting', 'Proposal', 'Confirmed'] as const;

export const EVENT_CATEGORY_COLORS: Record<Event['category'], string> = {
  Wedding: '#8B1A1A',
  Corporate: '#C9A84C',
  Social: '#3B82F6',
  Festival: '#10B981',
  Birthday: '#8B5CF6',
};

export const LEAD_SOURCE_CHART_COLORS = [
  '#8B1A1A',
  '#C9A84C',
  '#3B82F6',
  '#10B981',
  '#8B5CF6',
];

function getMonthRevenue(monthLabel: string) {
  return monthlyRevenue2024.find((m) => m.month === monthLabel)?.revenue ?? 0;
}

function isSameCalendarMonth(date: Date, reference: Date) {
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth()
  );
}

function isWithinDays(date: Date, reference: Date, days: number) {
  const diffMs = reference.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
}

export function getOverviewKpis() {
  const reportingMonthLabel = 'Dec';
  const previousMonthLabel = 'Nov';

  const totalRevenue = getMonthRevenue(reportingMonthLabel);
  const previousRevenue = getMonthRevenue(previousMonthLabel);
  const revenueTrendPercent =
    previousRevenue > 0
      ? ((totalRevenue - previousRevenue) / previousRevenue) * 100
      : 0;

  const activeLeads = leads.filter((lead) => lead.stage !== 'Confirmed').length;
  const leadsAddedThisWeek = leads.filter((lead) =>
    isWithinDays(new Date(lead.createdAt), OVERVIEW_REFERENCE_DATE, 7)
  ).length;

  const eventsThisMonth = events.filter((event) =>
    isSameCalendarMonth(new Date(event.date), OVERVIEW_REFERENCE_DATE)
  );
  const upcomingThisMonth = eventsThisMonth.filter(
    (event) => new Date(event.date) > OVERVIEW_REFERENCE_DATE
  );

  const totalAssigned = team.reduce((sum, member) => sum + member.leadsAssigned, 0);
  const totalConverted = team.reduce((sum, member) => sum + member.leadsConverted, 0);
  const conversionRate =
    totalAssigned > 0 ? (totalConverted / totalAssigned) * 100 : 0;

  const confirmedLeads = leads.filter((lead) => lead.stage === 'Confirmed').length;
  const leadConversionRate =
    leads.length > 0 ? (confirmedLeads / leads.length) * 100 : 0;
  const conversionTrendPercent = conversionRate - leadConversionRate;

  return {
    totalRevenue,
    revenueTrendPercent,
    activeLeads,
    leadsAddedThisWeek,
    eventsThisMonthCount: eventsThisMonth.length,
    upcomingEventsCount: upcomingThisMonth.length,
    conversionRate,
    conversionTrendPercent,
  };
}

export function getRevenueChartData() {
  return monthlyRevenue2024.map((entry) => ({
    month: entry.month,
    actual: entry.revenue,
    target: Math.round(entry.revenue * 1.08),
  }));
}

export function getPipelineSummary() {
  const stages = PIPELINE_STAGES.map((stage) => {
    const stageLeads = leads.filter((lead) => lead.stage === stage);
    return {
      stage,
      count: stageLeads.length,
      value: stageLeads.reduce((sum, lead) => sum + lead.budget, 0),
    };
  });

  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return {
    stages,
    maxCount,
    totalValue: stages.reduce((sum, s) => sum + s.value, 0),
  };
}

export function getUpcomingEvents(limit = 5) {
  return events
    .filter((event) => new Date(event.date) >= OVERVIEW_REFERENCE_DATE)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function getRecentActivities(limit = 6) {
  const allActivities: (Activity & { clientName: string })[] = leads.flatMap(
    (lead) =>
      lead.activities.map((activity) => ({
        ...activity,
        clientName: lead.clientName,
      }))
  );

  return allActivities
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, limit);
}

export function getLeadSourceChartData() {
  const totalLeads = leads.length;

  return leadSources.map((source, index) => ({
    name: source.source,
    percentage: source.percentage,
    value: Math.round((source.percentage / 100) * totalLeads),
    fill: LEAD_SOURCE_CHART_COLORS[index % LEAD_SOURCE_CHART_COLORS.length],
  }));
}

export function getTopPerformers() {
  return [...team]
    .sort((a, b) => b.revenue - a.revenue)
    .map((member) => ({
      ...member,
      targetPercent: member.target > 0 ? (member.revenue / member.target) * 100 : 0,
    }));
}

export function getTargetBarColor(targetPercent: number) {
  if (targetPercent >= 100) return 'bg-[#10B981]';
  if (targetPercent >= 80) return 'bg-gold';
  return 'bg-crimson';
}
