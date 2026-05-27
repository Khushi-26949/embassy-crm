'use client';

import { useState } from 'react';
import { AnalyticsPageSkeleton } from '@/components/shared/AnalyticsPageSkeleton';
import { usePageLoading } from '@/lib/use-page-loading';
import { FileDown } from 'lucide-react';
import type { AnalyticsDateRange } from '@/lib/analytics-metrics';
import { cn } from '@/lib/utils';
import { AnalyticsKpiCards } from './AnalyticsKpiCards';
import { ConversionFunnelChart } from './ConversionFunnelChart';
import { EventCategoryChart } from './EventCategoryChart';
import { LeadSourcesAnalyticsChart } from './LeadSourcesAnalyticsChart';
import { LeadTrendAreaChart } from './LeadTrendAreaChart';
import { RevenueVsTargetChart } from './RevenueVsTargetChart';
import { TeamPerformanceTable } from './TeamPerformanceTable';

const DATE_RANGES: { id: AnalyticsDateRange; label: string }[] = [
  { id: 'this-month', label: 'This Month' },
  { id: 'q3', label: 'Q3' },
  { id: 'this-year', label: 'This Year' },
  { id: 'custom', label: 'Custom' },
];

export function AnalyticsView() {
  const [range, setRange] = useState<AnalyticsDateRange>('this-year');
  const loading = usePageLoading(1000);

  if (loading) {
    return <AnalyticsPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-serif text-2xl text-ink">Analytics & Insights</h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-1 rounded-lg border border-coolgrey bg-white p-1">
            {DATE_RANGES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRange(item.id)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-medium transition',
                  range === item.id
                    ? 'bg-crimson text-white'
                    : 'text-ink/60 hover:bg-ivory hover:text-crimson'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-gold px-4 py-2 text-sm font-medium text-gold transition hover:bg-gold/10"
          >
            <FileDown className="h-4 w-4" />
            Export PDF
          </button>
        </div>

        {range === 'custom' && (
          <div
            className="mt-3 flex items-center gap-3 rounded-lg border border-coolgrey bg-ivory p-3"
          >
            <label className="text-sm text-ink/60">From:</label>
            <input
              type="month"
              defaultValue="2024-01"
              className="rounded-lg border border-coolgrey bg-white px-3 py-1.5 text-sm outline-none focus:border-crimson"
            />
            <label className="text-sm text-ink/60">To:</label>
            <input
              type="month"
              defaultValue="2024-12"
              className="rounded-lg border border-coolgrey bg-white px-3 py-1.5 text-sm outline-none focus:border-crimson"
            />
            <button
              type="button"
              className="rounded-lg bg-crimson px-4 py-1.5 text-sm text-white transition hover:bg-crimson-dark"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      <AnalyticsKpiCards range={range} />

      <RevenueVsTargetChart range={range} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ConversionFunnelChart  />
        <LeadSourcesAnalyticsChart />
      </div>

      <EventCategoryChart range={range} />

      <TeamPerformanceTable />

      <LeadTrendAreaChart range={range} />
    </div>
  );
}
