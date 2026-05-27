'use client';

import { X } from 'lucide-react';
import type { Notification } from '@/lib/types';
import { cn } from '@/lib/utils';

export interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function typeLabel(type: Notification['type']) {
  const labels: Record<Notification['type'], string> = {
    NewLead: 'New Lead',
    EventTomorrow: 'Event Tomorrow',
    FollowUpDue: 'Follow-up',
    ProposalViewed: 'Proposal Viewed',
    PaymentReceived: 'Payment',
  };
  return labels[type];
}

export function NotificationPanel({
  open,
  onClose,
  notifications,
  onMarkRead,
  onMarkAllRead,
}: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <button
        type="button"
        aria-label="Close notifications"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-coolgrey bg-white shadow-elevated transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-coolgrey px-5 py-4">
          <div>
            <h2 className="font-serif text-xl text-ink">Notifications</h2>
            <p className="text-xs text-ink/60">
              {unreadCount} unread
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-md p-2 text-ink/60 hover:bg-ivory hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 border-b border-coolgrey px-5 py-2">
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-xs font-medium text-crimson hover:underline"
          >
            Mark all read
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={cn(
                'border-b border-coolgrey/70 px-5 py-4 transition',
                !notification.read && 'bg-crimson/5'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {typeLabel(notification.type)}
                  </p>
                  <p className="mt-1 text-sm text-ink">{notification.message}</p>
                  <p className="mt-2 text-xs text-ink/50">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
                {!notification.read ? (
                  <button
                    type="button"
                    onClick={() => onMarkRead(notification.id)}
                    className="shrink-0 text-xs font-medium text-crimson hover:underline"
                  >
                    Mark read
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
