'use client';

import { useState } from 'react';
import {
  CalendarDays,
  IndianRupee,
  Mail,
  Phone,
  Search,
  Users,
} from 'lucide-react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Modal,
} from '@/components/ui';
import { designTokens } from '@/tokens/design-tokens';
import { cn } from '@/lib/utils';

const brandColors = [
  { name: 'Heritage Crimson', hex: designTokens.colors.heritageCrimson.hex },
  { name: 'Estate Gold', hex: designTokens.colors.estateGold.hex },
  { name: 'Ink Black', hex: designTokens.colors.inkBlack.hex },
  { name: 'Ivory Parchment', hex: designTokens.colors.ivoryParchment.hex },
  { name: 'Cool Grey', hex: designTokens.colors.coolGrey.hex },
  { name: 'Pure White', hex: designTokens.colors.pureWhite.hex },
];

export function StyleGuideView() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    window.setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-3xl text-ink dark:text-ivory">
          The Embassy CRM — Visual Style Guide
        </h2>
        <p className="mt-2 text-sm text-ink/60 dark:text-ivory/60">
          Interactive reference for colors, typography, and UI components.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="font-serif text-xl text-ink dark:text-ivory">Color Palette</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brandColors.map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => copyHex(color.hex)}
              className="embassy-card-hover overflow-hidden text-left"
            >
              <div className="h-20 w-full" style={{ backgroundColor: color.hex }} />
              <div className="p-3">
                <p className="text-xs font-medium text-ink dark:text-ivory">{color.name}</p>
                <p className="text-xs text-ink/50 dark:text-ivory/50">{color.hex}</p>
                {copied === color.hex ? (
                  <p className="mt-1 text-[10px] text-gold">Copied!</p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl text-ink dark:text-ivory">Typography</h3>
        <Card>
          <CardContent className="space-y-4 py-6">
            <div>
              <p className="text-xs text-ink/50">Playfair Display — Headings</p>
              <p className="font-serif text-4xl text-ink dark:text-ivory">
                The Embassy Catering
              </p>
            </div>
            <div>
              <p className="text-xs text-ink/50">Inter — Body</p>
              <p className="font-sans text-base text-ink dark:text-ivory">
                Premium multi-cuisine catering CRM for luxury events since 1948.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(designTokens.typography.sizes).map(([key, size]) => (
                <div key={key} className="rounded-lg bg-ivory dark:bg-night p-3 dark:bg-night-surface">
                  <p style={{ fontSize: size }} className="text-ink dark:text-ivory">
                    {key} · {size}px
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl text-ink dark:text-ivory">Buttons</h3>
        <Card>
          <CardContent className="flex flex-wrap gap-3 py-6">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl text-ink dark:text-ivory">Badges</h3>
        <Card>
          <CardContent className="flex flex-wrap gap-2 py-6">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="gold">Gold</Badge>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl text-ink dark:text-ivory">Cards</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card variant="base">
            <CardContent className="py-6">Base card</CardContent>
          </Card>
          <Card variant="hoverable">
            <CardContent className="py-6">Hoverable card</CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="py-6">Elevated card</CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl text-ink dark:text-ivory">Input States</h3>
        <Card>
          <CardContent className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2">
            <Input label="Normal" placeholder="Enter text" />
            <Input label="With icon" icon={<Search className="h-4 w-4" />} placeholder="Search" />
            <Input label="Error" error="This field is required" defaultValue="Invalid" />
            <Input label="Disabled" disabled defaultValue="Disabled field" />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl text-ink dark:text-ivory">Modal</h3>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open Modal Preview
        </Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Modal Preview">
          <p className="text-sm text-ink/70 dark:text-ivory/70">
            Embassy modals use scale and opacity animation with backdrop blur.
          </p>
          <Button variant="ghost" className="mt-4" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl text-ink dark:text-ivory">Icon Usage</h3>
        <Card>
          <CardContent className="flex flex-wrap gap-6 py-6">
            {[
              { icon: Phone, label: 'Phone' },
              { icon: Mail, label: 'Email' },
              { icon: CalendarDays, label: 'Calendar' },
              { icon: Users, label: 'Users' },
              { icon: IndianRupee, label: 'Revenue' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border border-coolgrey dark:border-night-border px-4 py-3'
                )}
              >
                <Icon className="h-5 w-5 text-crimson" />
                <span className="text-xs text-ink/60 dark:text-ivory/60">{label}</span>
              </div>
            ))}
            <Avatar name="Pooja Malhotra" size="lg" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
