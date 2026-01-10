"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(checked || false);

    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={internalChecked}
        disabled={disabled}
        className={cn(
          "peer focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          internalChecked ? "bg-primary" : "bg-input",
          className,
        )}
        onClick={() => {
          if (!disabled) {
            const newChecked = !internalChecked;
            if (checked === undefined) {
              setInternalChecked(newChecked);
            }
            onCheckedChange?.(newChecked);
          }
        }}
        {...props}
      >
        <span
          className={cn(
            "bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform",
            internalChecked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    );
  },
);
Switch.displayName = "Switch";

export { Switch };
