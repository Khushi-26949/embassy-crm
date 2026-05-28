'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatInr, formatInrLakhs } from '@/lib/format';
import type { AnalyticsDateRange } from '@/lib/analytics-metrics';
import { getEventCategoryBreakdown } from '@/lib/analytics-metrics';

export interface EventCategoryChartProps {
  range: AnalyticsDateRange;
}

export function EventCategoryChart({ range }: EventCategoryChartProps) {
  const data = getEventCategoryBreakdown(range);

  return (
    <section className="rounded-xl bg-white dark:bg-night-card p-5 shadow-card w-full min-w-0 overflow-hidden">
      <h3 className="font-serif text-lg text-ink dark:text-ivory">Revenue by Event Category</h3>
      <div className="mt-4 h-[320px] w-full min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" minWidth={1}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid stroke="#E5E5E5" strokeDasharray="3 3" />
            <XAxis
              xAxisId="count"
              type="number"
              orientation="bottom"
              tick={{ fill: '#1A1A1A', fontSize: 11 }}
              axisLine={{ stroke: '#E5E5E5' }}
              tickLine={false}
              label={{ value: 'Events', position: 'insideBottom', offset: -4, fontSize: 11 }}
            />
            <XAxis
              xAxisId="revenue"
              type="number"
              orientation="top"
              tickFormatter={(v) => formatInrLakhs(Number(v))}
              tick={{ fill: '#1A1A1A', fontSize: 11 }}
              axisLine={{ stroke: '#E5E5E5' }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={88}
              tick={{ fill: '#1A1A1A', fontSize: 12 }}
              axisLine={{ stroke: '#E5E5E5' }}
              tickLine={false}
            />
            <Tooltip
              formatter={(value, name) =>
                name === 'revenue' ? formatInr(Number(value ?? 0)) : value
              }
            />
            <Legend />
            <Bar
              xAxisId="count"
              dataKey="count"
              name="Event Count"
              radius={[0, 4, 4, 0]}
            >
              {data.map((entry) => (
                <Cell key={`count-${entry.category}`} fill={entry.fill} />
              ))}
            </Bar>
            <Bar
              xAxisId="revenue"
              dataKey="revenue"
              name="Revenue"
              radius={[0, 4, 4, 0]}
              fillOpacity={0.85}
            >
              {data.map((entry) => (
                <Cell key={`rev-${entry.category}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}