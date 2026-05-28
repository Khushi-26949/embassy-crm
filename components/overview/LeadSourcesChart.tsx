'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { getLeadSourceChartData } from '@/lib/overview-metrics';

const chartData = getLeadSourceChartData();

function SourceTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: (typeof chartData)[number] }[];
}) {
  if (!active || !payload?.[0]) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-lg border border-coolgrey dark:border-night-border bg-white dark:bg-night-card px-3 py-2 text-xs shadow-card">
      <p className="font-medium text-ink dark:text-ivory">{item.name}</p>
      <p className="text-ink/60 dark:text-ivory/60">
        {item.value} leads · {item.percentage}%
      </p>
    </div>
  );
}

export function LeadSourcesChart() {
  return (
    <section className="rounded-xl bg-white dark:bg-night-card p-5 shadow-card w-full min-w-0 overflow-hidden">
      <h3 className="font-serif text-lg text-ink dark:text-ivory">Lead Sources</h3>

      <div className="mt-2 h-[220px] w-full min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" minWidth={1}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<SourceTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-2 space-y-2">
        {chartData.map((source) => (
          <li
            key={source.name}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: source.fill }}
              />
              <span className="truncate text-ink dark:text-ivory">{source.name}</span>
            </div>
            <span className="shrink-0 text-xs text-ink/60 dark:text-ivory/60">
              {source.value} · {source.percentage}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}