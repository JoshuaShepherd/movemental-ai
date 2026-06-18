"use client";

import type { MapRead, Stage } from "@/lib/agent-room/data/map-q";
import { ReadbackPathSpine, stageToIndex } from "./readback-path-spine";

export interface ReadbackRailProps {
  mapRead: MapRead | null;
  hereStage: Stage;
  className?: string;
  variant?: "default" | "hero";
}

/** Vertical path spine — shared by readback and safety readback hero rail. */
export function ReadbackRail({
  mapRead,
  hereStage,
  className,
  variant = "default",
}: ReadbackRailProps) {
  return (
    <ReadbackPathSpine
      hereStageIndex={stageToIndex(hereStage)}
      mapRead={mapRead}
      variant={variant}
      className={className}
    />
  );
}
