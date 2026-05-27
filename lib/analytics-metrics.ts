import {
  events,
  leadSources,
  leads,
  monthlyRevenue2024,
  team,
} from './dummy-data';
import type { Event, Lead } from './types';

export type AnalyticsDateRange =
  | 'this-month'
  | 'q3'
  | 'this-year'
  | 'custom';

const MONTH_ORDER = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

const Q3_MONTHS = new Set(['Jul', 'Aug', 'Sep']);

const EVENT_CATEGORY_FILLS: Record<Event['category'], string> = {
  Wedding: '#8B1A1A',
  Corporate: '#C9A84C',
  Social: '#3B82F6',
  Festival: '#10B981',
  Birthday: '#8B5CF6',
};

const EVENT_CATEGORIES: Event['category'][] = [
  'Wedding',
  'Corporate',
  'Social',
  'Festival',
  'Birthday',
];

/** KPI total revenue by selected range */
function getTotalRevenueForRange(range: AnalyticsDateRange): number {
  switch (range) {
    case 'this-month':
      // Current month snapshot: Dec 2024 (last entry in monthlyRevenue2024)
      return monthlyRevenue2024[monthlyRevenue2024.length - 1]?.revenue ?? 0;
    case 'q3':
      return monthlyRevenue2024
        .filter((entry) => Q3_MONTHS.has(entry.month))
        .reduce((sum, entry) => sum + entry.revenue, 0);
    case 'this-year':
    case 'custom':
    default:
      return monthlyRevenue2024.reduce((sum, entry) => sum + entry.revenue, 0);
  }
}

/** Revenue vs target chart months by range */
function getMonthsForRevenueChart(range: AnalyticsDateRange) {
  switch (range) {
    case 'q3':
      return monthlyRevenue2024.filter((entry) => Q3_MONTHS.has(entry.month));
    case 'this-month':
    case 'this-year':
    case 'custom':
    default:
      return monthlyRevenue2024;
  }
}

function getStaticLeadKpis() {
  const totalLeadBudget = leads.reduce((sum, lead) => sum + lead.budget, 0);
  const confirmedCount = leads.filter((lead) => lead.stage === 'Confirmed').length;

  return {
    avgDealSize: leads.length > 0 ? totalLeadBudget / leads.length : 0,
    pipelineValue: totalLeadBudget,
    winRate: leads.length > 0 ? (confirmedCount / leads.length) * 100 : 0,
  };
}

export function getAnalyticsKpis(range: AnalyticsDateRange) {
  const { avgDealSize, pipelineValue, winRate } = getStaticLeadKpis();

  return {
    totalRevenueYtd: getTotalRevenueForRange(range),
    avgDealSize,
    pipelineValue,
    winRate,
  };
}

export function getRevenueVsTargetData(range: AnalyticsDateRange) {
  return getMonthsForRevenueChart(range).map((entry) => ({
    month: entry.month,
    actual: entry.revenue,
    target: Math.round(entry.revenue * 1.08),
  }));
}

export function getConversionFunnelData() {
  const enquiry = leads.filter((l) => l.stage === 'Enquiry').length;
  const tasting = leads.filter((l) => l.stage === 'Tasting').length;
  const proposal = leads.filter((l) => l.stage === 'Proposal').length;
  const confirmed = leads.filter((l) => l.stage === 'Confirmed').length;

  return [
    {
      stage: 'Enquiry',
      value: enquiry + tasting + proposal + confirmed,
    },
    {
      stage: 'Tasting',
      value: tasting + proposal + confirmed,
    },
    {
      stage: 'Proposal',
      value: proposal + confirmed,
    },
    {
      stage: 'Confirmed',
      value: confirmed,
    },
  ];
}

export function getLeadSourcesAnalytics() {
  return leadSources.map((source, index) => ({
    name: source.source,
    value: source.percentage,
    count: Math.round((leads.length * source.percentage) / 100),
    revenue: Math.round(
      (leads.reduce((sum, l) => sum + l.budget, 0) * source.percentage) / 100
    ),
    color: ['#8B1A1A', '#C9A84C', '#3B82F6', '#10B981', '#8B5CF6'][index],
  }));
}

export function getEventCategoryBreakdown(_range: AnalyticsDateRange) {
  const breakdown = EVENT_CATEGORIES.map((category) => {
    const categoryEvents = events.filter((event) => event.category === category);
    return {
      category,
      count: categoryEvents.length,
      revenue: categoryEvents.reduce((sum, event) => sum + event.revenue, 0),
      fill: EVENT_CATEGORY_FILLS[category],
    };
  });

  const hasData = breakdown.some((row) => row.count > 0 && row.revenue > 0);
  if (hasData) {
    return breakdown;
  }

  // Fallback demo data — never show empty/zero bars
  return [
    { category: 'Wedding' as const, count: 8, revenue: 12000000, fill: '#8B1A1A' },
    { category: 'Corporate' as const, count: 5, revenue: 8000000, fill: '#C9A84C' },
    { category: 'Social' as const, count: 3, revenue: 3000000, fill: '#3B82F6' },
    { category: 'Festival' as const, count: 2, revenue: 2000000, fill: '#10B981' },
    { category: 'Birthday' as const, count: 2, revenue: 1500000, fill: '#8B5CF6' },
  ];
}

export function getTeamPerformanceRows() {
  return [...team]
    .map((member) => ({
      ...member,
      targetPercent:
        member.target > 0 ? (member.revenue / member.target) * 100 : 0,
      avgDealSize:
        member.leadsConverted > 0
          ? member.revenue / member.leadsConverted
          : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .map((member, index) => ({ ...member, rank: index + 1 }));
}

export function getLeadTrendData(range: AnalyticsDateRange) {
  const NEW_LEADS_PER_MONTH = [2, 3, 4, 3, 5, 4, 3, 4, 5, 6, 8, 10] as const;
  const CONVERSIONS_PER_MONTH = [1, 2, 3, 2, 3, 3, 2, 3, 4, 4, 6, 7] as const;

  const months =
    range === 'q3'
      ? ['Jul', 'Aug', 'Sep']
      : range === 'this-month'
        ? [...MONTH_ORDER]
        : [...MONTH_ORDER];

  return months.map((monthLabel) => {
    const monthIndex = MONTH_ORDER.indexOf(
      monthLabel as (typeof MONTH_ORDER)[number]
    );

    return {
      month: monthLabel,
      newLeads: NEW_LEADS_PER_MONTH[monthIndex],
      conversions: CONVERSIONS_PER_MONTH[monthIndex],
    };
  });
}

export function getTargetBadgeVariant(targetPercent: number) {
  if (targetPercent >= 100) return 'green' as const;
  if (targetPercent >= 80) return 'gold' as const;
  return 'red' as const;
}
