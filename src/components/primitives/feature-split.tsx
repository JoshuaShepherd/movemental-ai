import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Hero-split style layout from DESIGN.md §14.3 / `site-theme.css` `.hero-split`.
 * Narrow intro column + wide content column on large screens; stacks on small.
 */
export function FeatureSplit({
  className,
  intro,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slot="feature-split"
      className={cn(
        "grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start lg:gap-16",
        className
      )}
      {...props}
    >
      <div className="space-y-4">{intro}</div>
      <div>{children}</div>
    </div>
  );
}
