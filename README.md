# 🏛️ The Embassy Catering — CRM & Analytics Dashboard

> **Premium frontend CRM built for The Embassy Catering (Est. 1948)**  
> A luxury multi-cuisine caterer's complete sales operations platform — lead tracking, event management, and business intelligence in one refined interface.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6B6B?style=flat-square)](https://recharts.org/)
[![dnd-kit](https://img.shields.io/badge/@dnd--kit-6.x-purple?style=flat-square)](https://dndkit.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

---

## 📌 About the Project

The Embassy Catering has served luxury events since 1948. This CRM dashboard was built as a **Frontend Development Task for Digital Byte Solutions** to deliver a visually premium, fully responsive sales platform for their field sales team.

The system covers the complete lead-to-event lifecycle — from first enquiry through tasting, proposal, and confirmation — with rich analytics and client intelligence built in.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧩 **Kanban Sales Pipeline** | Drag-and-drop lead cards across Enquiry → Tasting → Proposal → Confirmed with `@dnd-kit/core` |
| 📊 **Analytics Dashboard** | Revenue vs Target, Conversion Funnel, Lead Sources, Team Performance — 4 Recharts chart types |
| 📅 **Event Calendar** | Month, Agenda, and Timeline views with color-coded event categories |
| 🧾 **Lead Detail Page** | Activity timeline, document attachments, next actions, client info |
| 🧑‍💼 **Client 360° Profile** | Full event history, preferences, referral tracking per client |
| 🔎 **Global Search** | ⌘K command palette — search leads, events, clients instantly |
| 📱 **Mobile Responsive** | Mobile-first design — bottom nav, scroll-snap Kanban, adaptive layouts |
| 🌙 **Dark Mode** | Full dark mode with localStorage persistence |
| 🎨 **Design Token System** | Brand colors, typography, spacing — all in `/tokens/design-tokens.ts` |
| 📦 **Component Library** | Button, Card, Input, Table, Modal, Badge, Avatar, Skeleton, Toast |

---

## 🗂️ Pages

| # | Page | Route | Key Components |
|---|---|---|---|
| 1 | Overview Dashboard | `/overview` | KPI cards, Revenue chart, Pipeline summary, Activity feed, Lead sources donut |
| 2 | Sales Pipeline | `/pipeline` | Kanban board, Lead cards, Add lead modal, Stage filters, Toast on drag |
| 3 | Lead Detail | `/leads/[id]` | Activity timeline, Document list, Quick actions, Follow-up scheduler |
| 4 | Event Calendar | `/calendar` | Month view, Agenda view, Timeline view, Event detail modal |
| 5 | Analytics Dashboard | `/analytics` | Bar chart, Funnel chart, Pie chart, Area chart, Team performance table |
| 6 | Client Profile | `/clients/[id]` | 360° tabs, Event history, Preferences, Referral tracking |

---

## 🎨 Brand Design System

### Color Palette

| Color Name | Hex | Usage |
|---|---|---|
| Heritage Crimson | `#8B1A1A` | Primary CTAs, active states, navigation highlights |
| Estate Gold | `#C9A84C` | Accents, highlights, success states, revenue metrics |
| Ink Black | `#1A1A1A` | Primary text, headings, dark UI elements |
| Ivory Parchment | `#FAF7F2` | Light backgrounds, cards, secondary surfaces |
| Cool Grey | `#E5E5E5` | Borders, dividers, disabled states |
| Pure White | `#FFFFFF` | Primary card backgrounds, modals, overlays |

### Typography

| Role | Font | Weights |
|---|---|---|
| Headings / Display | Playfair Display | 400, 600, 700 |
| Body / Labels / Data | Inter | 400, 500, 600 |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.x | Framework, routing, SSR |
| TypeScript | 5.x | Type-safe components and data |
| Tailwind CSS | 4.x | Utility styling with Embassy design tokens |
| Recharts | 2.x | Line, Bar, Pie, Funnel chart visualizations |
| @dnd-kit/core | 6.x | Accessible drag-and-drop Kanban |
| Lucide React | latest | Icon system throughout the UI |
| date-fns | latest | Calendar date formatting and calculations |

---

## 📦 Component Library (`/components/ui/`)

| Component | Variants |
|---|---|
| `Button` | primary, secondary, ghost, danger — sm / md / lg |
| `Card` | base, hoverable, elevated |
| `Input` | text, search, textarea — with label and error state |
| `Table` | sortable headers, striped rows, responsive |
| `Modal` | backdrop blur, smooth animation |
| `Badge` | success, warning, info, danger, gold |
| `Avatar` | initials fallback, multiple sizes |
| `Skeleton` | text, card, circle loading states |
| `Toast` | success, error, info with auto-dismiss |

---

## 📁 Project Structure

```
embassy-crm/
├── app/
│   ├── (dashboard)/
│   │   ├── overview/
│   │   ├── pipeline/
│   │   ├── leads/[id]/
│   │   ├── calendar/
│   │   ├── analytics/
│   │   └── clients/[id]/
│   └── style-guide/
├── components/
│   ├── ui/              # Reusable component library
│   ├── layout/          # Sidebar, Navbar, NotificationPanel
│   ├── pipeline/        # Kanban, LeadCard, AddLeadModal
│   ├── calendar/        # MonthView, AgendaView, TimelineView
│   ├── analytics/       # Charts, TeamPerformanceTable
│   └── overview/        # Dashboard sections
├── lib/
│   ├── dummy-data.ts
│   ├── types.ts
│   ├── analytics-metrics.ts
│   └── format.ts
└── tokens/
    ├── design-tokens.ts
    └── style-guide.md
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/Khushi-26949/embassy-crm.git
cd embassy-crm
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✅ Deliverables Checklist

- ✅ 6 fully designed responsive pages (desktop + tablet + mobile)
- ✅ Component library with 9 components (`/components/ui/`)
- ✅ Fully coded frontend with realistic Indian dummy data
- ✅ Design tokens file (`/tokens/design-tokens.ts`)
- ✅ Style guide (`/tokens/style-guide.md` + `/style-guide` page)

---

## 💡 Why This Project Stands Out

- **Heritage brand aesthetic** — Playfair Display + Heritage Crimson palette reflects Embassy's 75-year luxury identity
- **Real drag-and-drop** — `@dnd-kit` Kanban with live stage updates and toast feedback, not a mock
- **4 chart types** — Line, Bar, Pie, Funnel all implemented with ₹ Indian number formatting
- **3 calendar views** — Month grid, Agenda list, Timeline horizontal — all functional
- **Mobile-first** — Bottom nav, scroll-snap Kanban, fully tested on 375px viewport
- **Production-grade code** — TypeScript throughout, zero build errors, clean folder structure

---

*Built with ❤️ for Digital Byte Solutions Frontend Task*