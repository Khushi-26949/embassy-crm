import { Card, CardContent } from '@/components/ui';

export interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <Card variant="base">
      <CardContent className="py-8">
        <h2 className="font-serif text-2xl text-ink dark:text-ivory">{title}</h2>
        <p className="mt-2 max-w-xl text-sm text-ink/70">{description}</p>
      </CardContent>
    </Card>
  );
}
