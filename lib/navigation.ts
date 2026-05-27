import {
  BarChart3,
  Building2,
  CalendarDays,
  KanbanSquare,
  LayoutDashboard,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Show in mobile bottom navigation (max 5) */
  mobileNav?: boolean;
}

export const navItems: NavItem[] = [
  { label: 'Overview', href: '/overview', icon: LayoutDashboard, mobileNav: true },
  { label: 'Pipeline', href: '/pipeline', icon: KanbanSquare, mobileNav: true },
  { label: 'Leads', href: '/leads', icon: Users, mobileNav: true },
  { label: 'Calendar', href: '/calendar', icon: CalendarDays, mobileNav: true },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Clients', href: '/clients', icon: Building2, mobileNav: true },
];

export const mobileNavItems = navItems.filter((item) => item.mobileNav);

export function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/style-guide')) return 'Style Guide';
  const match = navItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  return match?.label ?? 'Overview';
}
