import { notFound } from 'next/navigation';
import { LeadDetailView } from '@/components/leads/LeadDetailView';
import { leads } from '@/lib/dummy-data';

export default function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const lead = leads.find((item) => item.id === params.id);

  if (!lead) {
    notFound();
  }

  return <LeadDetailView initialLead={lead} />;
}
