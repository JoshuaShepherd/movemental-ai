"use client";

import type { EntityType } from "@/lib/knowledge-graph/types";

import { entityFillClass } from "./entity-styles";

const LEGEND: { type: EntityType; copy: string }[] = [
  { type: "leader", copy: "Authorship center" },
  { type: "book", copy: "Canonical anchors" },
  { type: "article", copy: "Discoverable surfaces" },
  { type: "pathway", copy: "Synthesis & journeys" },
  { type: "course", copy: "Formation rhythm" },
  { type: "video", copy: "Teaching media" },
  { type: "transcript", copy: "Legibility extensions" },
  { type: "ai_layer", copy: "Grounded interaction" },
  { type: "translation", copy: "Reach multiplier" },
];

export function VisualizationLegend() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
      {LEGEND.map(({ type, copy }) => (
        <li key={type} className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <circle
              cx="7"
              cy="7"
              r="5"
              className={entityFillClass(type)}
              stroke="currentColor"
              strokeOpacity={0.15}
            />
          </svg>
          <span>{copy}</span>
        </li>
      ))}
    </ul>
  );
}
