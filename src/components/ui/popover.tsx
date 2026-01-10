"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PopoverProps {
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
  return <div className="relative">{children}</div>;
};

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    className={cn(
      "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </button>
));
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-popover text-popover-foreground absolute z-50 w-72 rounded-md border p-4 shadow-md outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
