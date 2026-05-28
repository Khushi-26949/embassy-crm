'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { notifications as initialNotifications } from '@/lib/dummy-data';
import { getPageTitle } from '@/lib/navigation';
import type { Notification } from '@/lib/types';
import { GlobalSearchModal } from './GlobalSearchModal';
import { Navbar } from './Navbar';
import { NotificationPanel } from './NotificationPanel';
import { Sidebar } from './Sidebar';

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-ivory dark:bg-night transition-colors duration-300">
      <Sidebar />

      <div className="flex min-h-screen flex-col transition-all duration-300 md:ml-16 lg:ml-[260px] pb-16 md:pb-0">
        <Navbar
          pageTitle={pageTitle}
          unreadCount={unreadCount}
          onOpenSearch={openSearch}
          onOpenNotifications={() => setNotificationsOpen(true)}
        />

        <main className="page-transition flex-1 p-4 lg:p-6">{children}</main>
      </div>

      <NotificationPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={markRead}
        onMarkAllRead={markAllRead}
      />

      <GlobalSearchModal open={searchOpen} onClose={closeSearch} />
    </div>
  );
}
