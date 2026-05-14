import { cn } from "@/lib/utils";

import type { ImpactDimension } from "../ui/types";
import { IMPACT_DIMENSIONS } from "../ui/types";

/**
 * ImpactDimensionCards — introduces the five axes of realized capacity.
 *
 * Each card names a dimension and explains what it actually means,
 * avoiding vague SaaS metrics language. This is the reader's first
 * encounter with the model, so clarity matters more than density.
 */

export interface ImpactDimensionCardsProps {
  /** Override the default dimensions if needed. */
  dimensions?: ImpactDimension[];
  className?: string;
}

export function ImpactDimensionCards({
  dimensions = IMPACT_DIMENSIONS,
  className,
}: ImpactDimensionCardsProps) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {dimensions.map((dim, i) => (
        <div
          key={dim.id}
          className={cn(
            "rounded-xl bg-card p-8",
            /* The last card in an odd set spans full on sm to avoid orphan */
            i === dimensions.length - 1 && dimensions.length % 2 !== 0
              ? "sm:col-span-2 lg:col-span-1"
              : ""
          )}
        >
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Dimension {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
            {dim.label}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {dim.description}
          </p>
        </div>
      ))}
    </div>
  );
}
