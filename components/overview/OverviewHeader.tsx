import { format } from 'date-fns';
import { Button } from '@/components/ui';
import { OVERVIEW_REFERENCE_DATE, OVERVIEW_USER } from '@/lib/overview-metrics';

export function OverviewHeader() {
  const formattedDate = format(OVERVIEW_REFERENCE_DATE, 'EEEE, d MMMM yyyy');

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h2 className="font-serif text-[28px] leading-tight text-ink">
          Good Morning, {OVERVIEW_USER.name.split(' ')[0]} 👋
        </h2>
        <p className="mt-1 text-sm text-ink/60">{formattedDate}</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <Button variant="primary" size="md" className="w-full sm:w-auto">
          + Add New Lead
        </Button>
        <Button variant="secondary" size="md" className="w-full sm:w-auto">
          + New Event
        </Button>
        <Button variant="ghost" size="md" className="w-full sm:w-auto">
          Generate Report
        </Button>
      </div>
    </div>
  );
}
