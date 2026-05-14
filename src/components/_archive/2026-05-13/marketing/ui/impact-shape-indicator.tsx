import { cn } from "@/lib/utils";

import type { ImpactShape } from "./types";
import { IMPACT_SHAPE_META } from "./types";

/**
 * Visual indicator for impact shape. Uses tonal weight (not color)
 * to communicate intensity — consistent with the editorial design system.
 *
 * Renders as a small filled bar whose opacity and width encode the
 * qualitative strength. No numbers, no fake percentages.
 */

const shapeStyles: Record<ImpactShape, { bar: string; width: string }> = {
  "primary-driver": { bar: "bg-primary", width: "w-full" },
  "strong-amplifier": { bar: "bg-primary/60", width: "w-4/5" },
  enabler: { bar: "bg-muted-foreground/40", width: "w-3/5" },
  indirect: { bar: "bg-muted-foreground/25", width: "w-2/5" },
  minimal: { bar: "bg-muted-foreground/10", width: "w-1/5" },
};

export interface ImpactShapeIndicatorProps {
  shape: ImpactShape;
  /** Show the text label alongside the bar. */
  showLabel?: boolean;
  className?: string;
}

export function ImpactShapeIndicator({
  shape,
  showLabel = false,
  className,
}: ImpactShapeIndicatorProps) {
  const styles = shapeStyles[shape];
  const meta = IMPACT_SHAPE_META[shape];

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        className="h-1.5 rounded-full bg-elevated overflow-hidden"
        title={meta.description}
        role="img"
        aria-label={`${meta.label}: ${meta.description}`}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all",
            styles.bar,
            styles.width
          )}
        />
      </div>
      {showLabel && (
        <span className="text-[0.65rem] font-medium text-muted-foreground">
          {meta.label}
        </span>
      )}
    </div>
  );
}
