import type { ComponentType } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Send,
  UtensilsCrossed,
} from 'lucide-react';
import type { Activity } from '@/lib/types';
import { getRecentActivities } from '@/lib/overview-metrics';

const activities = getRecentActivities(6);

const activityIcons: Record<
  Activity['type'],
  ComponentType<{ className?: string }>
> = {
  Call: Phone,
  Email: Mail,
  Meeting: Calendar,
  ProposalSent: Send,
  Tasting: UtensilsCrossed,
  NoteAdded: MessageSquare,
  StageChanged: FileText,
};

export function ActivityFeed() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-serif text-lg text-ink">Recent Activity</h3>

      <ul className="relative mt-4 space-y-4 pl-4 before:absolute before:bottom-0 before:left-[7px] before:top-2 before:w-px before:bg-crimson/30">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];

          return (
            <li key={activity.id} className="relative flex gap-3">
              <span className="absolute -left-4 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-crimson" />
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory text-crimson">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink">{activity.description}</p>
                <p className="mt-0.5 text-xs text-ink/50">
                  by {activity.doneBy} ·{' '}
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
