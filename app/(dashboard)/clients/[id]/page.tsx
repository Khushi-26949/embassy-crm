import { notFound } from 'next/navigation';
import { ClientDetailView } from '@/components/clients/ClientDetailView';
import { getClientById } from '@/lib/client-detail-utils';

export default function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const client = getClientById(params.id);

  if (!client) {
    notFound();
  }

  return <ClientDetailView initialClient={client} />;
}
