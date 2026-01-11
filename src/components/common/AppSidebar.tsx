"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  LogOut,
  Podcast,
  RssIcon,
  Settings,
  User,
  Users,
  Wallet,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";

const items = [
  {
    title: "Dashbaord",
    url: "/",
    icon: LayoutDashboard,
  },

  {
    title: "Employee",
    url: "/employee",
    icon: Users,
    children: [
      {
        title: "Employee Database",
        url: "/employee",
      },
      {
        title: "Add New Employee",
        url: "/employee/add",
      },
      {
        title: "Performance Report",
        url: "/performance-report",
      },
      {
        title: "Performance History",
        url: "/performance-history",
      },
    ],
  },

  {
    title: "Admins",
    url: "/admins",
    icon: User,
  },
  {
    title: "Earnings",
    url: "/earnings",
    icon: Wallet,
  },
  {
    title: "Subscription",
    url: "/subscription",
    icon: Podcast,
  },

  {
    title: "Notice Board",
    url: "/notice-board",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

/* ================= HYDRATION-SAFE COMPONENTS ================= */

const HydrationSafeLink = ({
  href,
  className,
  children,
  isMounted,
  ...props
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  isMounted: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link href={href} className={className} {...props}>
      {isMounted ? children : <span suppressHydrationWarning>{children}</span>}
    </Link>
  );
};

const HydrationSafeButton = ({
  className,
  children,
  isMounted,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  isMounted: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={className} {...props}>
      {isMounted ? children : <span suppressHydrationWarning>{children}</span>}
    </button>
  );
};

/* ================= MAIN COMPONENT ================= */

export default function AppSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const { state } = useSidebar();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title],
    );
  };

  return (
    <Sidebar
      className="mt-0 ml-0 md:mt-5 md:ml-5 md:rounded-t-2xl"
      collapsible="icon"
      suppressHydrationWarning
    >
      {/* sidebar header */}
      <SidebarHeader className="flex flex-col items-center py-4 md:py-6">
        <div className="flex w-full flex-col items-center gap-2 md:gap-3">
          <div className="mt-3 flex items-center justify-center group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 md:mt-6">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="group-data-[collapsible=icon] group-data-[collapsible=icon] h-full w-full object-contain"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-base font-semibold">Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <SidebarMenuButton
                        className="h-12 text-base font-medium md:h-16 md:text-lg"
                        onClick={() => toggleExpanded(item.title)}
                      >
                        <div className="flex w-full items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 md:gap-4">
                          <item.icon className="h-6 w-6 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 md:h-7 md:w-7" />
                          <span className="flex-1 text-base font-medium md:text-lg">
                            {item.title}
                          </span>
                          {isMounted &&
                            state !== "collapsed" &&
                            (expandedItems.includes(item.title) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            ))}
                        </div>
                      </SidebarMenuButton>
                      {isMounted && expandedItems.includes(item.title) && state !== "collapsed" && (
                        <div className="mt-1 ml-4 space-y-1">
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton
                                asChild
                                className="h-10 text-sm font-medium md:h-12 md:text-base"
                                isActive={isActive(child.url)}
                              >
                                <HydrationSafeLink
                                  href={child.url}
                                  isMounted={isMounted}
                                  className={`flex items-center gap-3 md:gap-4 ${
                                    isActive(child.url)
                                      ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                                      : ""
                                  }`}
                                >
                                  <span className="text-sm font-medium md:text-base">
                                    {child.title}
                                  </span>
                                </HydrationSafeLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className="h-12 text-base font-medium md:h-16 md:text-lg"
                      isActive={isActive(item.url)}
                    >
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 md:gap-4 ${
                          isActive(item.url)
                            ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                            : ""
                        }`}
                      >
                        <item.icon className="h-6 w-6 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 md:h-7 md:w-7" />
                        <span className="text-base font-medium md:text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* sidebar footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-12 text-base font-medium md:h-16 md:text-lg">
              <Link
                href="#"
                className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 md:gap-4"
              >
                <LogOut className="h-6 w-6 text-red-600 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 md:h-7 md:w-7" />
                <span className="text-base font-medium text-red-500 md:text-lg">Log Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
