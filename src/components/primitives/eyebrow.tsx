import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Eyebrow — the editorial overline that sits above a Display heading.
 *
 * Concept Modern convention (DESIGN.md §5): uppercase, `0.09em` letter-spacing,
 * muted ink, with an optional 6px ink dot prefix (`withDot`) that mirrors the
 * `.label__dot` pattern from the source HTML.
 */
export function Eyebrow({
  className,
  withDot = false,
  inverse = false,
  as: Component = "p",
  children,
  ...props
}: React.ComponentProps<"p"> & {
  as?: React.ElementType;
  withDot?: boolean;
  /** Invert ink for placement inside `variant="midnight"` Sections — per DESIGN.md §3.6. */
  inverse?: boolean;
}) {
  return (
    <Component
      data-slot="eyebrow"
      className={cn(
        "inline-flex items-center gap-[0.55rem] text-[0.78rem] font-medium uppercase tracking-eyebrow",
        inverse ? "text-inverse-foreground/70" : "text-muted-foreground",
        className
      )}
      {...props}
    >
      {withDot ? (
        <span
          aria-hidden="true"
          className={cn(
            "inline-block size-1.5 rounded-full",
            inverse ? "bg-inverse-foreground/80" : "bg-foreground/80"
          )}
        />
      ) : null}
      {children}
    </Component>
  );
}
