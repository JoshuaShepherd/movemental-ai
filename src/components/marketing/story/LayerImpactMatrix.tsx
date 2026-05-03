import { cn } from "@/lib/utils";

import { ImpactShapeIndicator } from "../ui/impact-shape-indicator";
import type { ImpactDimension, LayerImpactMap, SystemLayer } from "../ui/types";
import {
  DEFAULT_LAYER_IMPACT_MAP,
  IMPACT_DIMENSIONS,
  SYSTEM_LAYERS,
} from "../ui/types";

/**
 * LayerImpactMatrix — the dense visual that shows how each system layer
 * affects each impact dimension differently.
 *
 * This is the core "not a simple percentage model" evidence. Each cell
 * is a qualitative shape indicator, not a number. The reader should see
 * immediately that the matrix is not uniform — each layer has a distinct
 * signature across the five dimensions.
 *
 * On mobile, the matrix scrolls horizontally. The first column (layer names)
 * is sticky so the reader never loses context.
 */

export interface LayerImpactMatrixProps {
  layers?: SystemLayer[];
  dimensions?: ImpactDimension[];
  impactMap?: LayerImpactMap;
  className?: string;
}

export function LayerImpactMatrix({
  layers = SYSTEM_LAYERS,
  dimensions = IMPACT_DIMENSIONS,
  impactMap = DEFAULT_LAYER_IMPACT_MAP,
  className,
}: LayerImpactMatrixProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile scroll hint */}
      <p className="mb-3 text-[0.7rem] text-muted-foreground sm:hidden">
        Scroll horizontally to see all dimensions →
      </p>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-section pb-4 pr-6 text-left text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Layer
              </th>
              {dimensions.map((dim) => (
                <th
                  key={dim.id}
                  className="pb-4 px-3 text-left text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground"
                >
                  {dim.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {layers.map((layer, i) => (
              <tr
                key={layer.id}
                className={cn(
                  i % 2 === 0 ? "bg-section" : "bg-section/50"
                )}
              >
                <td className="sticky left-0 z-10 py-4 pr-6 text-sm font-semibold text-foreground bg-inherit">
                  {layer.label}
                </td>
                {dimensions.map((dim) => {
                  const shape = impactMap[layer.id]?.[dim.id] ?? "minimal";
                  return (
                    <td key={dim.id} className="py-4 px-3">
                      <ImpactShapeIndicator shape={shape} showLabel />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
