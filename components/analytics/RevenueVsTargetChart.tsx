'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatInr, formatInrLakhs } from '@/lib/format';
import type { AnalyticsDateRange } from '@/lib/analytics-metrics';
import { getRevenueVsTargetData } from '@/lib/analytics-metrics';

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
  name: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-crimson bg-white dark:bg-night-card px-3 py-2 shadow-card">
      <p className="mb-1 text-xs font-semibold text-ink dark:text-ivory">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {formatInr(entry.value)}
        </p>
      ))}
    </div>
  );
}

export interface RevenueVsTargetChartProps {
  range: AnalyticsDateRange;
}

export function RevenueVsTargetChart({ range }: RevenueVsTargetChartProps) {
  const data = getRevenueVsTargetData(range);

  return (
    <section className="rounded-xl bg-white dark:bg-night-card p-5 shadow-card w-full min-w-0 overflow-hidden">
      <h3 className="font-serif text-lg text-ink dark:text-ivory">Monthly Revenue vs Target</h3>
      <div className="mt-4 h-[350px] w-full min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" minWidth={1}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#E5E5E5" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#1A1A1A', fontSize: 12 }}
              axisLine={{ stroke: '#E5E5E5' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => formatInrLakhs(Number(v))}
              tick={{ fill: '#1A1A1A', fontSize: 12 }}
              axisLine={{ stroke: '#E5E5E5' }}
              tickLine={false}
              width={56}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Bar
              dataKey="actual"
              name="Actual Revenue"
              fill="#8B1A1A"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="target"
              name="Target"
              fill="#C9A84C"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}