import * as React from "react";

import { cn } from "@/lib/utils";

type DisplaySize = "lg" | "md" | "sm";

/**
 * Display — hero-scale heading in the Concept Modern register.
 *
 * Weight is 500 (not 700); hierarchy comes from scale + `-0.028em` tracking.
 * Wrap emphasised words in `<em>` — the base layer swaps them to Newsreader
 * italic at ~1.04em optical compensation automatically.
 *
 * Sizes use fluid `clamp` so the proportions hold from phone to wide desktop.
 */
const sizeClassName: Record<DisplaySize, string> = {
  lg: "text-[clamp(2.6rem,6.4vw,5.5rem)] leading-[1.02]",
  md: "text-[clamp(2.3rem,5.2vw,4.2rem)] leading-[1.05]",
  sm: "text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.1]",
};

export function Display({
  size = "lg",
  className,
  as: Component = "h1",
  ...props
}: React.ComponentProps<"h1"> & {
  size?: DisplaySize;
  as?: React.ElementType;
}) {
  return (
    <Component
      data-slot="display"
      className={cn(
        "font-sans font-medium tracking-display text-balance text-foreground",
        sizeClassName[size],
        className
      )}
      {...props}
    />
  );
}
