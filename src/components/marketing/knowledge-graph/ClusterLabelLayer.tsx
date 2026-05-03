"use client";

import type { LeaderLayout } from "@/lib/knowledge-graph/types";

import { cn } from "@/lib/utils";

export function ClusterLabelLayer({
  layout,
  width,
  height,
  visible,
}: {
  layout: LeaderLayout;
  width: number;
  height: number;
  visible: boolean;
}) {
  if (!visible) return null;
  const vw = Math.max(1, width);
  const vh = Math.max(1, height);
  const cx = vw / 2;
  const cy = vh / 2;
  const r = Math.min(vw, vh) * 0.52;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-muted-foreground transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      {layout.zones.map((z) => {
        const mx = cx + Math.cos((z.angleStart + z.angleEnd) / 2) * r * 0.92;
        const my = cy + Math.sin((z.angleStart + z.angleEnd) / 2) * r * 0.92;
        return (
          <text
            key={z.id}
            x={mx}
            y={my}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px] font-medium uppercase tracking-[0.12em]"
          >
            {z.label}
          </text>
        );
      })}
    </svg>
  );
}
