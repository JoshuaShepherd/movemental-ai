import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * KPI / stats strip (DESIGN.md — editorial data, no chart chrome).
 * Use for short numerals + labels on `bg-background` or `bg-section` bands.
 */
export function StatStrip({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-strip"
      className={cn(
        "grid grid-cols-2 gap-8 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-between lg:gap-x-16 lg:gap-y-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatItem({
  className,
  value,
  valueClassName,
  label,
  labelClassName,
  hint,
  hintClassName,
  ...props
}: React.ComponentProps<"div"> & {
  value: React.ReactNode;
  label: string;
  /** Merges onto the value line (e.g. hero-scale numerals on marketing pages). */
  valueClassName?: string;
  labelClassName?: string;
  hint?: string;
  hintClassName?: string;
}) {
  return (
    <div
      data-slot="stat-item"
      className={cn("min-w-0 text-left", className)}
      {...props}
    >
      <p
        className={cn(
          "text-3xl font-semibold tracking-tight text-primary sm:text-4xl",
          valueClassName
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-1 text-sm font-medium text-foreground",
          labelClassName
        )}
      >
        {label}
      </p>
      {hint ? (
        <p
          className={cn(
            "mt-1 text-xs leading-relaxed text-muted-foreground",
            hintClassName
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
