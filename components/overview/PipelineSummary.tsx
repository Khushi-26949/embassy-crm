import Link from 'next/link';
import { formatInr } from '@/lib/format';
import { getPipelineSummary } from '@/lib/overview-metrics';

const pipeline = getPipelineSummary();

export function PipelineSummary() {
  return (
    <section className="flex h-full flex-col rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-serif text-lg text-ink">Pipeline Health</h3>

      <ul className="mt-4 flex flex-1 flex-col gap-4">
        {pipeline.stages.map((stage) => {
          const widthPercent = (stage.count / pipeline.maxCount) * 100;

          return (
            <li key={stage.stage}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-ink">{stage.stage}</span>
                <span className="rounded-full bg-crimson/10 px-2 py-0.5 text-xs font-semibold text-crimson">
                  {stage.count}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-coolgrey">
                <div
                  className="h-full rounded-full bg-crimson transition-all duration-300"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-ink/50">{formatInr(stage.value)}</p>
            </li>
          );
        })}
      </ul>

      <Link
        href="/pipeline"
        className="mt-4 text-sm font-medium text-gold hover:underline"
      >
        View Full Pipeline →
      </Link>
    </section>
  );
}
