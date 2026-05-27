import { Crown } from 'lucide-react';
import { Avatar } from '@/components/ui';
import { formatInr } from '@/lib/format';
import { getTargetBarColor, getTopPerformers } from '@/lib/overview-metrics';

const performers = getTopPerformers();

export function TopPerformers() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-serif text-lg text-ink">Team Performance</h3>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[320px] text-sm">
          <thead>
            <tr className="border-b border-coolgrey text-left text-xs text-ink/50">
              <th className="pb-2 pr-2 font-medium">Rank</th>
              <th className="pb-2 pr-2 font-medium">Member</th>
              <th className="pb-2 pr-2 font-medium">Closed</th>
              <th className="pb-2 pr-2 font-medium">Revenue</th>
              <th className="pb-2 font-medium">Target</th>
            </tr>
          </thead>
          <tbody>
            {performers.map((member, index) => {
              const rank = index + 1;
              const barColor = getTargetBarColor(member.targetPercent);

              return (
                <tr key={member.id} className="border-b border-coolgrey/60 last:border-0">
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-1">
                      {rank === 1 ? (
                        <Crown className="h-4 w-4 text-gold" strokeWidth={1.75} />
                      ) : null}
                      <span className="text-ink/70">{rank}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-2">
                      <Avatar name={member.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{member.name}</p>
                        <p className="truncate text-xs text-ink/50">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-2 text-ink">{member.leadsConverted}</td>
                  <td className="py-3 pr-2 text-ink">{formatInr(member.revenue)}</td>
                  <td className="py-3">
                    <div className="flex min-w-[88px] flex-col gap-1">
                      <span className="text-xs font-medium text-ink">
                        {Math.round(member.targetPercent)}%
                      </span>
                      <div className="h-1.5 overflow-hidden rounded-full bg-coolgrey">
                        <div
                          className={`h-full rounded-full ${barColor}`}
                          style={{
                            width: `${Math.min(member.targetPercent, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
