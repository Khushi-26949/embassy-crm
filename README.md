# 🏛️ Embassy Catering CRM Dashboard

A premium sales CRM for Embassy Catering, built in Next.js with modern analytics, calendar, and pipeline management.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.5.3-skyblue?logo=tailwindcss)](https://tailwindcss.com/) [![Recharts](https://img.shields.io/badge/Recharts-2.8.0-orange?logo=Recharts)](https://recharts.org/) [![Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel)](https://vercel.com/)

---

## ✨ About

Embassy Catering is a luxury multi-cuisine caterer established in 1948. This CRM dashboard was designed as a frontend task for Digital Byte Solutions to showcase a polished sales operations experience for lead, event, and client management.

Built for modern event teams, the project brings sophisticated analytics, a flexible sales pipeline, and client insights into a refined interface.

---

## 🚀 Features

- 🧩 **Kanban Pipeline** — Drag-and-drop lead movement with `@dnd-kit` for fluid deal progression.
- 📈 **Analytics** — Four Recharts chart types deliver revenue, funnel, category, and trend insights.
- 📅 **Calendar** — Month, Agenda, and Timeline views make event planning visible and easy.
- 🧾 **Lead Management** — Activity timeline and lead detail workflows keep every opportunity tracked.
- 🧑‍💼 **Client 360° Profile** — Full referral tracking and event history for every relationship.
- 🔎 **Global Search** — Command palette access for quick navigation and discovery.
- 📱 **Mobile Responsive** — Adaptive layout with bottom navigation for phone-first usability.
- 🌙 **Dark Mode** — Persistent theme toggle that respects user preference.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.x | Framework, routing, and React rendering |
| TypeScript | 5.x | Type-safe UI and data flow |
| Tailwind CSS | 4.x | Utility styling and responsive layout |
| Recharts | 2.x | Interactive dashboard visualizations |
| dnd-kit | 6.x | Accessible drag-and-drop interactions |
| Vercel | — | Deployment and preview hosting |

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Overview Dashboard | `/dashboard/overview` | KPI summary, revenue chart, and trend cards |
| Analytics | `/dashboard/analytics` | Sales analytics charts and performance overview |
| Calendar | `/dashboard/calendar` | Event scheduling in month, agenda, and timeline views |
| Clients | `/dashboard/clients` | Client directory and 360° profile pages |
| Leads | `/dashboard/leads` | Lead pipeline and detail management |
| Pipeline | `/dashboard/pipeline` | Kanban board for active deals and stages |
| Style Guide | `/dashboard/style-guide` | Design tokens, color system, and component examples |

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Midnight Black | `#0F172A` | Primary dark background |
| Ivory White | `#F8FAFC` | Cards, surfaces, and page background |
| Gold Accent | `#D9A94E` | CTAs, highlights, badges |
| Slate Blue | `#4F46E5` | Primary actions and links |
| Warm Grey | `#64748B` | Secondary text and borders |

---

## 🧱 Project Structure

```text
app/
  dashboard/
    analytics/
    calendar/
    clients/
    leads/
    overview/
    pipeline/
    style-guide/
components/
  analytics/
  calendar/
  clients/
  dashboard/
  leads/
  overview/
  pipeline/
  providers/
  shared/
  style-guide/
  ui/
lib/
  analytics-metrics.ts
  calendar-utils.ts
  dummy-data.ts
  format.ts
  lead-detail-utils.ts
  navigation.ts
  overview-metrics.ts
  pipeline-utils.ts
  theme-provider.tsx
  toast-provider.tsx
  types.ts
  utils.ts
tokens/
  design-tokens.ts
  style-guide.md
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/Khushi-26949/embassy-crm.git
cd embassy-crm
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

---

## 🧩 Component Library

- `Button`
- `Card`
- `Modal`
- `Badge`
- `Table`
- `Avatar`
- `Input`
- `Skeleton`
- `Toast`

---

## 💡 Why This Project Stands Out

- Clean, product-ready dashboard architecture built for a real sales workflow.
- Strong visual hierarchy with responsive, mobile-first design.
- Reusable component system and token-based styling.
- Modern charting + actionable analytics for event sales teams.
- Smooth drag-and-drop and command palette interactions.
