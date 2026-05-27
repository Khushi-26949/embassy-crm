'use client';

import { usePageLoading } from '@/lib/use-page-loading';
import { OverviewPageSkeleton } from '@/components/shared/OverviewPageSkeleton';
import { ActivityFeed } from './ActivityFeed';
import { KpiCards } from './KpiCards';
import { LeadSourcesChart } from './LeadSourcesChart';
import { OverviewHeader } from './OverviewHeader';
import { PipelineSummary } from './PipelineSummary';
import { RevenueChart } from './RevenueChart';
import { TopPerformers } from './TopPerformers';
import { UpcomingEvents } from './UpcomingEvents';

export function OverviewDashboard() {
  const loading = usePageLoading(1000);

  if (loading) {
    return <OverviewPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <OverviewHeader />
      <KpiCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RevenueChart />
        </div>
        <div className="xl:col-span-2">
          <PipelineSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-11">
        <div className="lg:col-span-6">
          <UpcomingEvents />
        </div>
        <div className="lg:col-span-5">
          <ActivityFeed />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LeadSourcesChart />
        <TopPerformers />
      </div>
    </div>
  );
}
