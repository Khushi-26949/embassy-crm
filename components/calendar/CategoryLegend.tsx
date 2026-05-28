import { CATEGORY_LEGEND } from '@/lib/calendar-utils';

export function CategoryLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-coolgrey dark:border-night-border bg-white dark:bg-night-card px-4 py-3 shadow-card">
      {CATEGORY_LEGEND.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-sm text-ink dark:text-ivory">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
