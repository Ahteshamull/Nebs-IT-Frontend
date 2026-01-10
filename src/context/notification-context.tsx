"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type NotificationItem = {
  id: string;
  title: string;
  body?: string;
  createdAt: number;
  read?: boolean;
};

type NotificationContextType = {
  notifications: NotificationItem[];
  getRecent: (n?: number) => NotificationItem[];
  markRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (n: Omit<NotificationItem, "id" | "createdAt">) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

function useInternalNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const now = Date.now();
    return [
      {
        id: "n1",
        title: "New sign-up",
        body: "A new user signed up.",
        createdAt: now - 1000 * 60 * 60 * 2,
        read: false,
      },
      {
        id: "n2",
        title: "Server report",
        body: "Daily report is ready.",
        createdAt: now - 1000 * 60 * 60 * 6,
        read: false,
      },
      {
        id: "n3",
        title: "Payment received",
        body: "$120 received.",
        createdAt: now - 1000 * 60 * 60 * 24,
        read: true,
      },
      {
        id: "n4",
        title: "Reminder",
        body: "Meeting at 3PM.",
        createdAt: now - 1000 * 60 * 60 * 48,
        read: true,
      },
      {
        id: "n5",
        title: "Alert",
        body: "High memory usage.",
        createdAt: now - 1000 * 60 * 15,
        read: false,
      },
      {
        id: "n6",
        title: "New message",
        body: "You have a new message from John.",
        createdAt: now - 1000 * 60 * 60 * 3,
        read: false,
      },
      {
        id: "n7",
        title: "System update",
        body: "System will be updated tonight.",
        createdAt: now - 1000 * 60 * 60 * 12,
        read: false,
      },
      {
        id: "n8",
        title: "Backup complete",
        body: "Database backup completed successfully.",
        createdAt: now - 1000 * 60 * 60 * 36,
        read: true,
      },
      {
        id: "n9",
        title: "New comment",
        body: "Someone commented on your post.",
        createdAt: now - 1000 * 60 * 60 * 72,
        read: true,
      },
      {
        id: "n10",
        title: "Security alert",
        body: "New login from unknown device.",
        createdAt: now - 1000 * 60 * 30,
        read: false,
      },
      {
        id: "n11",
        title: "Task completed",
        body: "Your export task is complete.",
        createdAt: now - 1000 * 60 * 60 * 4,
        read: false,
      },
      {
        id: "n12",
        title: "Weekly summary",
        body: "Your weekly activity summary is ready.",
        createdAt: now - 1000 * 60 * 60 * 168,
        read: true,
      },
      {
        id: "n13",
        title: "New follower",
        body: "Sarah started following you.",
        createdAt: now - 1000 * 60 * 60 * 8,
        read: false,
      },
      {
        id: "n14",
        title: "Price alert",
        body: "Price dropped for items in your wishlist.",
        createdAt: now - 1000 * 60 * 60 * 20,
        read: false,
      },
      {
        id: "n15",
        title: "Subscription renewal",
        body: "Your subscription will renew in 3 days.",
        createdAt: now - 1000 * 60 * 60 * 96,
        read: true,
      },
      {
        id: "n16",
        title: "New feature",
        body: "Check out our new dashboard feature.",
        createdAt: now - 1000 * 60 * 45,
        read: false,
      },
      {
        id: "n17",
        title: "Maintenance notice",
        body: "Scheduled maintenance on Sunday.",
        createdAt: now - 1000 * 60 * 60 * 10,
        read: false,
      },
      {
        id: "n18",
        title: "Report generated",
        body: "Monthly analytics report is available.",
        createdAt: now - 1000 * 60 * 60 * 720,
        read: true,
      },
      {
        id: "n19",
        title: "Team invitation",
        body: "You've been invited to join a team.",
        createdAt: now - 1000 * 60 * 60 * 5,
        read: false,
      },
      {
        id: "n20",
        title: "Storage warning",
        body: "You're running low on storage space.",
        createdAt: now - 1000 * 60 * 60 * 144,
        read: true,
      },
      {
        id: "n21",
        title: "Password changed",
        body: "Your password was changed successfully.",
        createdAt: now - 1000 * 60 * 60 * 240,
        read: true,
      },
      {
        id: "n22",
        title: "New review",
        body: "Someone left a review on your profile.",
        createdAt: now - 1000 * 60 * 60 * 7,
        read: false,
      },
      {
        id: "n23",
        title: "API limit",
        body: "You've reached 80% of your API limit.",
        createdAt: now - 1000 * 60 * 60 * 18,
        read: false,
      },
      {
        id: "n24",
        title: "Event reminder",
        body: "Webinar starts in 1 hour.",
        createdAt: now - 1000 * 60 * 50,
        read: false,
      },
      {
        id: "n25",
        title: "Download ready",
        body: "Your requested file is ready to download.",
        createdAt: now - 1000 * 60 * 60 * 9,
        read: false,
      },
    ];
  });

  const getRecent = (n = 3) => {
    return [...notifications].sort((a, b) => b.createdAt - a.createdAt).slice(0, n);
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((p) => (p.id === id ? { ...p, read: true } : p)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((p) => ({ ...p, read: true })));
  };

  const addNotification = (n: Omit<NotificationItem, "id" | "createdAt">) => {
    const item: NotificationItem = {
      id: `n${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
      ...n,
    };
    setNotifications((prev) => [item, ...prev]);
  };

  return { notifications, getRecent, markRead, markAllRead, addNotification };
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const api = useInternalNotifications();

  const value = useMemo(() => api, [api.notifications]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}

export default NotificationProvider;
