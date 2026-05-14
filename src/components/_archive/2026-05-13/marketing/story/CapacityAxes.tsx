import { cn } from "@/lib/utils";

import type { ImpactDimension, ImpactDimensionId } from "../ui/types";
import { IMPACT_DIMENSIONS } from "../ui/types";

/**
 * CapacityAxes — a quiet radial diagram showing the five dimensions
 * as spokes from a center. Not a chart — a mental model.
 *
 * The point is to communicate that these dimensions are distinct axes
 * (not a funnel, not a pipeline) and that they interact.
 *
 * This renders as a pure CSS + SVG layout. No JavaScript animation needed.
 */

export interface CapacityAxesProps {
  dimensions?: ImpactDimension[];
  /** Optionally highlight one dimension to draw attention during narration. */
  highlight?: ImpactDimensionId;
  className?: string;
}

/* Position each label around the radial. 5 spokes, evenly distributed. */
const labelPositions: Record<
  ImpactDimensionId,
  { x: number; y: number; anchor: string }
> = {
  tam: { x: 50, y: 4, anchor: "text-anchor-middle" },
  formation: { x: 95, y: 38, anchor: "text-anchor-end" },
  credibility: { x: 80, y: 88, anchor: "text-anchor-end" },
  amplification: { x: 20, y: 88, anchor: "text-anchor-start" },
  revenue: { x: 5, y: 38, anchor: "text-anchor-start" },
};

/* Spoke endpoints (% of viewBox 100x100, center at 50,50) */
const spokeEnd: Record<ImpactDimensionId, { x: number; y: number }> = {
  tam: { x: 50, y: 14 },
  formation: { x: 84, y: 38 },
  credibility: { x: 71, y: 80 },
  amplification: { x: 29, y: 80 },
  revenue: { x: 16, y: 38 },
};

export function CapacityAxes({
  dimensions = IMPACT_DIMENSIONS,
  highlight,
  className,
}: CapacityAxesProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full"
        role="img"
        aria-label="Five dimensions of realized capacity arranged as radial spokes"
      >
        {/* Center dot */}
        <circle cx="50" cy="50" r="2" className="fill-primary" />

        {/* Spokes and endpoint dots */}
        {dimensions.map((dim) => {
          const end = spokeEnd[dim.id];
          const isHighlighted = highlight === dim.id;
          return (
            <g key={dim.id}>
              <line
                x1="50"
                y1="50"
                x2={end.x}
                y2={end.y}
                className={cn(
                  "stroke-1",
                  isHighlighted
                    ? "stroke-primary"
                    : "stroke-muted-foreground/20"
                )}
              />
              <circle
                cx={end.x}
                cy={end.y}
                r={isHighlighted ? 2.5 : 1.5}
                className={cn(
                  isHighlighted ? "fill-primary" : "fill-muted-foreground/40"
                )}
              />
            </g>
          );
        })}

        {/* Labels */}
        {dimensions.map((dim) => {
          const pos = labelPositions[dim.id];
          const isHighlighted = highlight === dim.id;
          return (
            <text
              key={dim.id}
              x={pos.x}
              y={pos.y}
              className={cn(
                "fill-current text-[3.2px] font-medium",
                isHighlighted
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              textAnchor={
                pos.anchor === "text-anchor-middle"
                  ? "middle"
                  : pos.anchor === "text-anchor-end"
                    ? "end"
                    : "start"
              }
              dominantBaseline="central"
            >
              {dim.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
