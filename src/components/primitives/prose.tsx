import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Prose — long-form reading column, Concept Modern register.
 *
 * Pinned to `--prose-max` (640px) at 1.1rem / 1.7 line-height in muted ink
 * (DESIGN.md §5). `<strong>` lifts to full ink; `<em>` swaps to Instrument
 * Serif italic via the base layer. Links are underlined in hairline border
 * color and darken to full ink on hover.
 */
export function Prose({
  className,
  as: Component = "div",
  ...props
}: React.ComponentProps<"div"> & {
  as?: React.ElementType;
}) {
  return (
    <Component
      data-slot="prose"
      className={cn(
        "max-w-(--prose-max) text-[1.1rem] leading-[1.7] text-muted-foreground",
        "[&_strong]:font-medium [&_strong]:text-foreground",
        "[&_em]:font-serif [&_em]:italic [&_em]:text-foreground [&_em]:tracking-[-0.01em] [&_em]:text-[1.04em]",
        "[&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-[0.25em] [&_a]:transition-[text-decoration-color] hover:[&_a]:decoration-foreground",
        "[&_p]:mb-[1.2rem] [&_p:last-child]:mb-0",
        className
      )}
      {...props}
    />
  );
}
