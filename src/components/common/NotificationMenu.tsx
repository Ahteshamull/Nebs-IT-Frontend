"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useNotifications } from "@/context/notification-context";
import { Clock } from "lucide-react";

export default function NotificationMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { getRecent, markRead, markAllRead } = useNotifications();
  const ref = useRef<HTMLDivElement | null>(null);
  const items = getRecent(3);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className="absolute right-0 z-50 mt-2 w-[320px]">
      <div className="bg-card border-border rounded-lg border p-2 shadow-md">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="text-sm font-medium">Notifications</div>
          <button
            onClick={() => {
              markAllRead();
            }}
            className="text-muted-foreground rounded-sm border border-transparent px-2 py-1 text-xs hover:underline dark:border-[#F4B057]"
          >
            Read all
          </button>
        </div>

        <div className="mt-1 divide-y">
          {items.map((it) => (
            <div
              key={it.id}
              className={`flex items-start gap-2 px-3 py-2 ${it.read ? "opacity-60" : ""}`}
            >
              <div className="text-muted-foreground pt-1">
                <Clock className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{it.title}</div>
                <div className="text-muted-foreground text-xs">{it.body}</div>
              </div>
              <div className="pl-2">
                {!it.read && (
                  <button
                    onClick={() => markRead(it.id)}
                    className="text-primary text-xs hover:underline"
                  >
                    Mark
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-2">
          <Link
            href="/notifications"
            className="bg-primary block rounded-md px-3 py-2 text-center text-sm text-white"
          >
            All notifications
          </Link>
        </div>
      </div>
    </div>
  );
}
