import * as React from "react";

import { cn } from "@/lib/utils";

type SectionVariant =
  /** Paper base — `--background`. */
  | "default"
  /** Alt band — `--section`, the warm tonal shift between default sections. */
  | "section"
  /** Deepest paper — `--elevated`. */
  | "elevated"
  /** Midnight hero band — `--inverse-surface` (deep ink + cream). */
  | "midnight"
  /** Alias of `default`, retained so existing `variant="editorial"` compiles. */
  | "editorial"
  /** Alias of `section`, retained for existing `variant="editorialAlt"` call sites. */
  | "editorialAlt";

type SectionSpacing = "sm" | "lg";

const variantClassName: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  section: "bg-section text-foreground",
  elevated: "bg-elevated text-foreground",
  midnight: "bg-inverse-surface text-inverse-foreground",
  editorial: "bg-background text-foreground",
  editorialAlt: "bg-section text-foreground",
};

const spacingClassName: Record<SectionSpacing, string> = {
  sm: "py-[var(--section-y-sm)]",
  lg: "py-[var(--section-y-lg)]",
};

/**
 * Section — vertical rhythm wrapper. Sets the tonal layer (DESIGN.md §3.1);
 * never reach for a border to separate sections — compose two `<Section>`
 * elements with contrasting variants and the boundary appears naturally via
 * hairline tonal shift ("Ghost Lift").
 *
 * `editorial` / `editorialAlt` are preserved as aliases for existing call
 * sites — the base ramp is now itself warm editorial, so they collapse to
 * `default` / `section`.
 */
export function Section({
  variant = "default",
  spacing = "sm",
  className,
  as: Component = "section",
  ...props
}: React.ComponentProps<"section"> & {
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  as?: React.ElementType;
}) {
  return (
    <Component
      data-slot="section"
      data-variant={variant}
      className={cn(
        "relative w-full",
        variantClassName[variant],
        spacingClassName[spacing],
        className
      )}
      {...props}
    />
  );
}
