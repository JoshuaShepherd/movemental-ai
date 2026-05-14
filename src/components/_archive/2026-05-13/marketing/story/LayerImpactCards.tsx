import { cn } from "@/lib/utils";

import { ImpactShapeIndicator } from "../ui/impact-shape-indicator";
import type {
  ImpactDimension,
  LayerImpactMap,
  SystemLayer,
} from "../ui/types";
import {
  DEFAULT_LAYER_IMPACT_MAP,
  IMPACT_DIMENSIONS,
  SYSTEM_LAYERS,
} from "../ui/types";

/**
 * LayerImpactCards — an alternative to the matrix that gives each
 * system layer its own card, showing the shape of its impact
 * across all five dimensions.
 *
 * Better for storytelling contexts where you want to narrate one
 * layer at a time, or for mobile-first layouts where the matrix
 * feels too dense.
 */

export interface LayerImpactCardsProps {
  layers?: SystemLayer[];
  dimensions?: ImpactDimension[];
  impactMap?: LayerImpactMap;
  /** Show only specific layers (useful for progressive disclosure). */
  visibleLayers?: SystemLayer["id"][];
  className?: string;
}

export function LayerImpactCards({
  layers = SYSTEM_LAYERS,
  dimensions = IMPACT_DIMENSIONS,
  impactMap = DEFAULT_LAYER_IMPACT_MAP,
  visibleLayers,
  className,
}: LayerImpactCardsProps) {
  const filtered = visibleLayers
    ? layers.filter((l) => visibleLayers.includes(l.id))
    : layers;

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
      {filtered.map((layer) => (
        <div key={layer.id} className="rounded-xl bg-card p-8">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Layer {String(layer.sequenceOrder).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
            {layer.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {layer.description}
          </p>

          {/* Impact signature — mini bars for each dimension */}
          <div className="mt-6 space-y-3">
            {dimensions.map((dim) => {
              const shape = impactMap[layer.id]?.[dim.id] ?? "minimal";
              return (
                <div key={dim.id} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-[0.65rem] font-medium text-muted-foreground truncate">
                    {dim.label}
                  </span>
                  <ImpactShapeIndicator shape={shape} className="flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
