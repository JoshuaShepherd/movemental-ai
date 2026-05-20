import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Vertical process timeline — column of nodes + optional spine between steps.
 */
export function Timeline({
  className,
  children,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="timeline"
      className={cn("[&>li:last-child_.timeline-spine]:hidden", className)}
      {...props}
    >
      {children}
    </ul>
  );
}

export function TimelineItem({
  className,
  title,
  meta,
  children,
  ...props
}: React.ComponentProps<"li"> & {
  title: string;
  meta?: string;
}) {
  return (
    <li
      data-slot="timeline-item"
      className={cn("grid grid-cols-[14px_1fr] gap-5 pb-2 last:pb-0", className)}
      {...props}
    >
      <div className="flex flex-col items-center pt-1.5">
        <span
          className="size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/15"
          aria-hidden
        />
        <span
          className="timeline-spine mt-2 w-px flex-1 min-h-[1.25rem] bg-primary/25"
          aria-hidden
        />
      </div>
      <div className="min-w-0 pb-8">
        {meta ? (
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            {meta}
          </p>
        ) : null}
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          {title}
        </h3>
        {children ? (
          <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        ) : null}
      </div>
    </li>
  );
}
