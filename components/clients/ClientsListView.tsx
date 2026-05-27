'use client';

import Link from 'next/link';
import { clients } from '@/lib/dummy-data';
import { formatInr } from '@/lib/format';
import { isHeritageClient } from '@/lib/client-detail-utils';
import { Badge } from '@/components/ui';

export function ClientsListView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif text-2xl text-ink dark:text-ivory">Clients</h2>
        <p className="text-sm text-ink/60 dark:text-ivory/60">
          {clients.length} heritage & corporate clients
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/clients/${client.id}`}
            className="embassy-card-hover block p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg text-ink dark:text-ivory">
                  {client.name}
                </h3>
                {client.company ? (
                  <p className="text-sm text-ink/60 dark:text-ivory/60">{client.company}</p>
                ) : null}
              </div>
              {isHeritageClient(client) ? (
                <Badge variant="gold">Heritage</Badge>
              ) : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="text-ink/60 dark:text-ivory/60">
                {client.totalEvents} events
              </span>
              <span className="font-semibold text-gold">
                {formatInr(client.totalSpent)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
