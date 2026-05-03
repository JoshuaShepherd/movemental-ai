import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Tonal context for marketing cards (DESIGN.md §3.1 ghost lift, site-theme `.card`).
 *
 * - `on-background` — card on `--background`; shadow appears on interaction only.
 * - `on-section` — card on `--section`; static `shadow-ambient` (editorial lift).
 * - `midnight` — inset surface on `--inverse-surface` bands.
 */
export type SurfaceCardTone = "on-background" | "on-section" | "midnight";

const toneClassName: Record<SurfaceCardTone, string> = {
  "on-background": "bg-card text-card-foreground",
  "on-section": "bg-card text-card-foreground shadow-ambient",
  midnight: "bg-inverse-foreground/6 text-inverse-foreground",
};

/**
 * Editorial marketing card: tonal stacking without decorative borders.
 * Prefer over ad-hoc `rounded-xl bg-section` blocks on the homepage and L4 sections.
 */
export function SurfaceCard({
  className,
  tone = "on-background",
  interactive,
  asChild,
  ...props
}: React.ComponentProps<"div"> & {
  tone?: SurfaceCardTone;
  /** Adds hover affordance for links and clickable surfaces. */
  interactive?: boolean;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="surface-card"
      data-tone={tone}
      className={cn(
        "flex flex-col gap-3 rounded-xl p-6 sm:gap-4 sm:p-8",
        toneClassName[tone],
        interactive &&
          tone === "on-background" &&
          "transition-[shadow,transform] duration-normal ease-out hover:-translate-y-0.5 hover:shadow-ambient",
        interactive &&
          tone === "on-section" &&
          "transition-[shadow,transform] duration-normal ease-out hover:-translate-y-0.5",
        interactive &&
          tone === "midnight" &&
          "transition-[color,transform] duration-normal ease-out hover:-translate-y-0.5 hover:bg-inverse-foreground/10",
        interactive &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        interactive &&
          tone !== "midnight" &&
          "focus-visible:ring-offset-background",
        interactive && tone === "midnight" && "focus-visible:ring-offset-inverse-surface",
        className
      )}
      {...props}
    />
  );
}
