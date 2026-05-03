import { cn } from "@/lib/utils";

/**
 * StoryCallout — an editorial aside that interrupts the vertical flow
 * to make a single narrative point. Used for "this is not a percentage
 * model" or "order of operations matters" moments.
 *
 * Renders on bg-card with generous padding — the ghost-lift pattern
 * from DESIGN.md. No border, no shadow, just tonal contrast.
 */

export interface StoryCalloutProps {
  children: React.ReactNode;
  /** Variant controls tonal weight. */
  variant?: "default" | "midnight";
  className?: string;
}

export function StoryCallout({
  children,
  variant = "default",
  className,
}: StoryCalloutProps) {
  return (
    <aside
      data-slot="story-callout"
      className={cn(
        "rounded-xl px-8 py-8 sm:px-10 sm:py-10",
        variant === "midnight"
          ? "bg-inverse-surface text-inverse-foreground"
          : "bg-card text-foreground",
        className
      )}
    >
      <div className="max-w-(--prose-max)">{children}</div>
    </aside>
  );
}
