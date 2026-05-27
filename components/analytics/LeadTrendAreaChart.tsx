'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { AnalyticsDateRange } from '@/lib/analytics-metrics';
import { getLeadTrendData } from '@/lib/analytics-metrics';

export interface LeadTrendAreaChartProps {
  range: AnalyticsDateRange;
}

export function LeadTrendAreaChart({ range }: LeadTrendAreaChartProps) {
  const data = getLeadTrendData(range);

  return (
    <section className="rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-serif text-lg text-ink">
        Lead Acquisition & Conversion Trends
      </h3>
      <div className="mt-4 h-[320px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={1}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#E5E5E5" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#1A1A1A', fontSize: 12 }}
              axisLine={{ stroke: '#E5E5E5' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#1A1A1A', fontSize: 12 }}
              axisLine={{ stroke: '#E5E5E5' }}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="newLeads"
              name="New Leads"
              stroke="#8B1A1A"
              fill="#8B1A1A"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="conversions"
              name="Conversions"
              stroke="#C9A84C"
              fill="#C9A84C"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}