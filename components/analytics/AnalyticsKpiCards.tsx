import { formatInr } from '@/lib/format';
import type { AnalyticsDateRange } from '@/lib/analytics-metrics';
import { getAnalyticsKpis } from '@/lib/analytics-metrics';

export interface AnalyticsKpiCardsProps {
  range: AnalyticsDateRange;
}

export function AnalyticsKpiCards({ range }: AnalyticsKpiCardsProps) {
  const kpis = getAnalyticsKpis(range);

  const cards = [
    {
      title: 'Total Revenue YTD',
      value: formatInr(kpis.totalRevenueYtd),
    },
    {
      title: 'Avg Deal Size',
      value: formatInr(Math.round(kpis.avgDealSize)),
    },
    {
      title: 'Pipeline Value',
      value: formatInr(kpis.pipelineValue),
    },
    {
      title: 'Win Rate',
      value: `${Math.round(kpis.winRate)}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.title}
          className="embassy-card-hover p-5"
        >
          <p className="text-sm text-ink/60">{card.title}</p>
          <p className="mt-2 font-serif text-2xl font-semibold text-ink">
            {card.value}
          </p>
        </article>
      ))}
    </div>
  );
}
