"use client";

import * as React from "react";

import { useElementSize } from "@/hooks/use-element-size";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  emergenceScenes,
  emergenceSubgraph,
  layoutLeaderOrbit,
} from "@/lib/knowledge-graph";
import type { EmergencePhase, KnowledgeGraph } from "@/lib/knowledge-graph/types";

import { entityFillClass } from "./entity-styles";
import { NarrativeStepOverlay } from "./NarrativeStepOverlay";

export function EcosystemEmergenceView({ graph }: { graph: KnowledgeGraph }) {
  const { ref, width, height } = useElementSize<HTMLDivElement>();
  const [phase, setPhase] = React.useState<EmergencePhase>(0);
  const reduced = usePrefersReducedMotion();
  const scenes = React.useMemo(() => emergenceScenes(), []);

  const sub = React.useMemo(
    () => emergenceSubgraph(graph, phase),
    [graph, phase],
  );
  const layout = React.useMemo(
    () => layoutLeaderOrbit(sub, width, height),
    [sub, width, height],
  );

  const scene = scenes[phase];
  const vbW = Math.max(1, width);
  const vbH = Math.max(1, height);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <ol className="order-2 space-y-2 text-sm lg:order-none">
        {scenes.map((s, i) => {
          const active = i === phase;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setPhase(i as EmergencePhase)}
                className={
                  active
                    ? "w-full rounded-md border border-primary bg-card px-3 py-2 text-left text-foreground shadow-ambient"
                    : "w-full rounded-md border border-transparent px-3 py-2 text-left text-muted-foreground hover:bg-section"
                }
              >
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  {i + 1}
                </span>
                <span className="mt-1 block font-medium">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="order-1 space-y-4 lg:order-none">
        <div
          ref={ref}
          className="relative aspect-5/4 w-full min-h-[min(260px,38svh)] max-h-[min(520px,68svh)] overflow-hidden rounded-md bg-section p-4"
        >
          <svg
            viewBox={`0 0 ${vbW} ${vbH}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full text-border"
            role="img"
            aria-label="Ecosystem emergence diagram"
          >
            {sub.edges.map((e) => {
              const a = layout.positions.get(e.source);
              const b = layout.positions.get(e.target);
              if (!a || !b) return null;
              return (
                <line
                  key={e.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="currentColor"
                  strokeOpacity={0.2}
                  strokeWidth={1}
                />
              );
            })}
            {sub.nodes.map((n) => {
              const p = layout.positions.get(n.id);
              if (!p) return null;
              const r = p.r ?? 6;
              return (
                <circle
                  key={n.id}
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  className={`${entityFillClass(n.type)} stroke-border`}
                  strokeWidth={1}
                  style={{
                    transition: reduced ? undefined : "opacity 0.45s ease",
                    opacity: 1,
                  }}
                />
              );
            })}
          </svg>
          <NarrativeStepOverlay
            title={scene.title}
            lede={scene.lede}
            callout={scene.callout}
            active
            reducedMotion={reduced}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Phase
          </span>
          <input
            type="range"
            min={0}
            max={7}
            value={phase}
            onChange={(e) =>
              setPhase(Number(e.target.value) as EmergencePhase)
            }
            className="w-full max-w-md accent-primary"
            aria-valuetext={scene.title}
          />
        </div>
      </div>
    </div>
  );
}
