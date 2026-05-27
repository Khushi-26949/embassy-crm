'use client';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { leadSources } from '@/lib/dummy-data';
import { leads } from '@/lib/dummy-data';
import { formatInr } from '@/lib/format';

const COLORS = [
  '#8B1A1A',
  '#C9A84C',
  '#3B82F6',
  '#10B981',
  '#8B5CF6',
];

export function LeadSourcesAnalyticsChart() {
  const data = leadSources.map((source, index) => ({
    name: source.source,
    value: source.percentage,
    count: Math.round(leads.length * 
           source.percentage / 100),
    revenue: Math.round(
      leads.reduce((sum, l) => sum + l.budget, 0) 
      * source.percentage / 100
    ),
    color: COLORS[index % COLORS.length],
  }));

  return (
    <section className="flex h-full flex-col 
      rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-serif text-lg text-ink">
        Lead Sources
      </h3>

      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${value}%`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-2 space-y-2">
        {data.map((item) => (
          <li
            key={item.name}
            className="flex items-center 
            justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 
                rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-ink">
                {item.name}
              </span>
            </div>
            <span className="text-ink/60">
              {item.count} · {item.value}% · 
              {formatInr(item.revenue)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LeadSourcesAnalyticsChart;
