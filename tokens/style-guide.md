# The Embassy CRM — Design System Style Guide

## Brand Overview

The Embassy Catering has served India's most discerning hosts since 1948 — a 75-year legacy of luxury multi-cuisine catering for weddings, corporate galas, and private celebrations. The CRM design system reflects that heritage: refined typography, generous whitespace, and a restrained palette of Heritage Crimson and Estate Gold against Ivory Parchment. Every interface element should feel premium, trustworthy, and timeless — never cluttered or generic.

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Heritage Crimson | `#8B1A1A` | Primary CTAs, active states, navigation highlights |
| Estate Gold | `#C9A84C` | Accents, highlights, success states, revenue metrics |
| Ink Black | `#1A1A1A` | Primary text, headings, dark UI elements |
| Ivory Parchment | `#FAF7F2` | Light backgrounds, cards, secondary surfaces |
| Cool Grey | `#E5E5E5` | Borders, dividers, disabled states |
| Pure White | `#FFFFFF` | Primary card backgrounds, modals, overlays |

## Typography

**Display & Headings:** Playfair Display — use for page titles, section headings, KPI labels, and any text that conveys prestige or brand identity.

**Body & Data:** Inter — use for body copy, form labels, table data, navigation items, and all functional UI text.

**Size Scale:** xs (12px) for captions and metadata · sm (14px) for labels and secondary text · base (16px) for body · lg–xl for subheadings · 2xl–4xl for page titles and hero metrics.

**Weight Rules:** normal (400) for body text · medium (500) for labels and nav items · semibold (600) for subheadings and table headers · bold (700) for primary headings and KPI values only.

## Component Guidelines

### Buttons

- **Primary (Heritage Crimson):** main CTAs only — e.g. "Create Lead", "Send Proposal", "Confirm Booking"
- **Secondary (Estate Gold border):** secondary actions — e.g. "Export", "Schedule Tasting", "View Details"
- **Ghost:** tertiary/cancel actions — e.g. "Cancel", "Back", "Dismiss"
- **Danger:** destructive actions — e.g. "Delete Lead", "Cancel Event"

### Badges

- **Success (Gold):** confirmed bookings, completed events, payment received
- **Warning:** tentative status, follow-up due, pending approvals
- **Info:** enquiry stage, new leads, informational tags
- **Danger:** overdue follow-ups, cancelled events, high-priority alerts
- **Gold:** revenue metrics, premium tier clients, featured items

### Cards

Use Pure White backgrounds on Ivory Parchment pages. Default cards use the `card` shadow; elevated cards (modals, featured KPIs) use `elevated`. Hoverable cards lift with a subtle shadow transition on hover — never change background color on hover. Maintain 16–24px internal padding.

## Spacing & Layout

Follow a generous whitespace principle: minimum 24px between major sections, 16px between related elements within a section. Use the base-4 spacing scale (4, 8, 12, 16, 24, 32, 48, 64px). Dashboard layouts use a 12-column grid with 24px gutters. Sidebar navigation is fixed at 260px; main content area has 32px padding.

## Do's and Don'ts

✅ Do: Use Playfair Display for all headings

✅ Do: Maintain generous whitespace (min 24px between sections)

✅ Do: Use Heritage Crimson ONLY for primary CTAs and active states

❌ Don't: Use crimson for decorative elements

❌ Don't: Mix serif and sans in same text block

❌ Don't: Use Estate Gold as background color
