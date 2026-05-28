'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatInr, formatInrLakhs } from '@/lib/format';
import { getRevenueChartData } from '@/lib/overview-metrics';

const chartData = getRevenueChartData();

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
  name: string;
}

function RevenueTooltip({
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

export function RevenueChart() {
  return (
    <section className="rounded-xl bg-white dark:bg-night-card p-5 shadow-card w-full min-w-0 overflow-hidden">
      <h3 className="font-serif text-lg text-ink dark:text-ivory">Revenue Overview 2024</h3>
      <div className="mt-4 h-[320px] w-full min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" minWidth={1}>
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
            <Tooltip content={<RevenueTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual Revenue"
              stroke="#8B1A1A"
              strokeWidth={2}
              dot={{ fill: '#8B1A1A', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              name="Target"
              stroke="#C9A84C"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}