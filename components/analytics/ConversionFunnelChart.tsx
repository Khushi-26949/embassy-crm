'use client';
import { Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import { leads } from '@/lib/dummy-data';

export function ConversionFunnelChart() {
  const funnelStages = [
    { name: 'Enquiry', value: leads.length, fill: '#8B1A1A' },
    { name: 'Tasting', value: leads.filter(l => ['Tasting','Proposal','Confirmed'].includes(l.stage)).length, fill: '#A52020' },
    { name: 'Proposal', value: leads.filter(l => ['Proposal','Confirmed'].includes(l.stage)).length, fill: '#C9A84C' },
    { name: 'Confirmed', value: leads.filter(l => l.stage === 'Confirmed').length, fill: '#A8892E' },
  ];

  const conversions = funnelStages.slice(1).map((stage, i) => ({
    from: funnelStages[i].name,
    to: stage.name,
    rate: funnelStages[i].value > 0 ? (stage.value / funnelStages[i].value) * 100 : 0,
  }));

  return (
    <section className="flex h-full flex-col rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-serif text-lg text-ink">Lead Conversion Funnel</h3>
      <div className="mt-4 h-[280px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={1}>
          <FunnelChart>
            <Tooltip formatter={(value, _name, item) => [`${value ?? 0} leads`, item?.payload?.name]} />
            <Funnel dataKey="value" data={funnelStages} isAnimationActive stroke="#FFFFFF">
              <LabelList position="right" fill="#1A1A1A" stroke="none" dataKey="name" fontSize={12} />
              <LabelList position="center" fill="#FFFFFF" stroke="none" dataKey="value" fontSize={12} />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-4 space-y-2 border-t border-coolgrey pt-4">
        {conversions.map((step) => (
          <li key={`${step.from}-${step.to}`} className="flex items-center justify-between text-xs text-ink/70">
            <span>{step.from} → {step.to}</span>
            <span className="font-semibold text-crimson">{step.rate.toFixed(0)}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ConversionFunnelChart;