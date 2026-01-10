"use client";

import { useState } from "react";
import { MessageSquare, Bell, User, Moon, Sun, Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import NotificationMenu from "./NotificationMenu";

const Navbar = () => {
  const { setTheme } = useTheme();
  const { toggleSidebar, state } = useSidebar();
  const sidebarOpen = state === "expanded";
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      {/* Yellow top bar */}
      <div
        className="bg-background fixed top-0 left-0 z-50 h-3 w-full md:h-5"
        suppressHydrationWarning
      ></div>

      {/* Main navbar */}
      <div
        suppressHydrationWarning
        className={`bg-sidebar fixed top-3 right-0 z-40 mx-2 h-[68px] rounded-lg rounded-t-none shadow-md transition-all duration-300 md:top-5 md:mx-5 md:h-[84px] ${sidebarOpen ? "md:left-77" : "md:left-22"}`}
      >
        <div className="ml-2 flex h-full w-full items-center justify-between px-2 md:ml-5 md:px-4">
          {/* Left Section */}
          <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-6">
            <button
              onClick={toggleSidebar}
              className="flex flex-shrink-0 items-center justify-center"
            >
              <Menu
                className="h-6 w-6 text-gray-900 md:h-8 md:w-8 dark:text-white"
                strokeWidth={2}
              />
            </button>
            <div className="flex min-w-0 flex-col">
              <h1 className="truncate text-base leading-tight font-bold text-gray-900 md:text-xl dark:text-white">
                Welcome, DS
              </h1>
              <p className="-mt-1 hidden text-xs font-semibold text-gray-900 sm:block md:text-sm dark:text-white">
                Have a nice day!
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="mr-2 flex shrink-0 items-center gap-1.5 pr-0 md:gap-3 md:pr-2">
            {/* Theme Toggle */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="relative flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-900 bg-transparent hover:bg-white/10 md:h-[52px] md:w-[52px] dark:border-white">
                  <Sun
                    className="h-5 w-5 scale-100 rotate-0 text-gray-900 transition-all md:h-6 md:w-6 dark:scale-0 dark:-rotate-90 dark:text-white"
                    strokeWidth={2}
                  />
                  <Moon
                    className="absolute h-5 w-5 scale-0 rotate-90 text-gray-900 transition-all md:h-6 md:w-6 dark:scale-100 dark:rotate-0 dark:text-white"
                    strokeWidth={2}
                  />
                  <span className="sr-only">Toggle theme</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom" sideOffset={8} className="z-[60]">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <Link href="/chats" className="flex-shrink-0">
              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-gray-900 bg-transparent hover:bg-white/10 md:h-[52px] md:w-[52px] dark:border-white">
                <MessageSquare
                  className="h-5 w-5 text-gray-900 md:h-6 md:w-6 dark:text-white"
                  strokeWidth={2}
                />
              </div>
            </Link>

            {/* Notifications */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowNotifications((s) => !s)}
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-gray-900 bg-transparent hover:bg-white/10 md:h-[52px] md:w-[52px] dark:border-white"
              >
                <Bell
                  className="h-5 w-5 text-gray-900 md:h-6 md:w-6 dark:text-white"
                  strokeWidth={2}
                />
                <div className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 md:top-2 md:right-2 md:h-4 md:w-4">
                  <span className="text-xs font-normal text-white">.</span>
                </div>
              </button>
              <NotificationMenu
                open={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* Profile */}

            <div className="flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-900 bg-transparent md:h-[52px] md:w-[52px] dark:border-white">
              <Link href="/profile">
                <User
                  className="h-5 w-5 text-gray-900 md:h-6 md:w-6 dark:text-white"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-[71px] py-15 md:h-[89px]"></div>
    </>
  );
};

export default Navbar;
