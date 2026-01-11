"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/components/common/theme-provider";
import NotificationProvider from "@/context/notification-context";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReduxProvider from "@/redux/ReduxProvider";

const AppSidebar = dynamic(() => import("@/components/common/AppSidebar"), { ssr: false });

export default function ClientRootLayout({
  children,
  defaultOpen,
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
}) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <NotificationProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />

            <SidebarInset className="ml-5 px-5">
              <Navbar />
              <div className="">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
