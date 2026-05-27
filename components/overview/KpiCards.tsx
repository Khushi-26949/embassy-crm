import {
  CalendarDays,
  IndianRupee,
  TrendingUp,
  Users,
} from 'lucide-react';
import { formatInr, formatPercent } from '@/lib/format';
import { getOverviewKpis } from '@/lib/overview-metrics';
import { cn } from '@/lib/utils';

const kpis = getOverviewKpis();

const cards = [
  {
    title: 'Total Revenue',
    value: formatInr(kpis.totalRevenue),
    sub: `${formatPercent(kpis.revenueTrendPercent)} vs last month`,
    icon: IndianRupee,
    iconWrap: 'bg-gold/15 text-gold',
    accent: 'text-gold',
  },
  {
    title: 'Active Leads',
    value: String(kpis.activeLeads),
    sub: `+${kpis.leadsAddedThisWeek} this week`,
    icon: Users,
    iconWrap: 'bg-crimson/10 text-crimson',
    accent: 'text-crimson',
  },
  {
    title: 'Events This Month',
    value: String(kpis.eventsThisMonthCount),
    sub: `${kpis.upcomingEventsCount} upcoming`,
    icon: CalendarDays,
    iconWrap: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    accent: 'text-[#3B82F6]',
  },
  {
    title: 'Conversion Rate',
    value: `${Math.round(kpis.conversionRate)}%`,
    sub: `${formatPercent(kpis.conversionTrendPercent)}`,
    icon: TrendingUp,
    iconWrap: 'bg-[#10B981]/10 text-[#10B981]',
    accent: 'text-[#10B981]',
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.title}
            className="embassy-card-hover p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-ink/60">{card.title}</p>
                <p className="mt-2 font-serif text-2xl font-semibold text-ink">
                  {card.value}
                </p>
                <p className={cn('mt-1 text-xs font-medium', card.accent)}>
                  {card.sub}
                </p>
              </div>
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full',
                  card.iconWrap
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
