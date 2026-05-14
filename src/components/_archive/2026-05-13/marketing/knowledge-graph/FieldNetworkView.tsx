"use client";

import * as React from "react";
import type Sigma from "sigma";

import { knowledgeGraphToSigma } from "@/lib/knowledge-graph/sigmaGraph";
import type { KnowledgeGraph, KnowledgeNode } from "@/lib/knowledge-graph/types";

import { Button } from "@/components/ui/button";
import { GraphDetailPanel } from "./GraphDetailPanel";

function readTokenColor(varName: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return v || fallback;
}

/**
 * Field-scale graph: Sigma.js + Graphology (WebGL), lifecycle `kill()` on unmount.
 * @see https://www.sigmajs.org/docs/advanced/lifecycle
 */
export function FieldNetworkView({ graph }: { graph: KnowledgeGraph }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const sigmaRef = React.useRef<Sigma | null>(null);
  const [detail, setDetail] = React.useState<KnowledgeNode | null>(null);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const ro = new ResizeObserver(() => {
      sigmaRef.current?.resize();
      sigmaRef.current?.refresh();
    });
    ro.observe(container);

    void import("sigma").then(({ default: SigmaCtor }) => {
      if (cancelled || !containerRef.current) return;

      const g = knowledgeGraphToSigma(graph);
      const labelInk = readTokenColor("--foreground", "#19150f");

      const sigma = new SigmaCtor(g, containerRef.current, {
        renderLabels: true,
        renderEdgeLabels: false,
        labelDensity: 0.06,
        labelSize: 11,
        labelWeight: "500",
        labelFont: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
        labelColor: { color: labelInk },
        hideEdgesOnMove: true,
        hideLabelsOnMove: true,
        zIndex: true,
        minCameraRatio: 0.12,
        maxCameraRatio: 4,
        enableEdgeEvents: true,
        nodeReducer: (_node, data) => {
          const isLeader = data.nodeType === "leader";
          return {
            ...data,
            label: isLeader ? "" : data.label,
            zIndex: isLeader ? 0 : 1,
          };
        },
      });

      if (cancelled) {
        sigma.kill();
        return;
      }

      sigmaRef.current = sigma;

      const nodeById = new Map(graph.nodes.map((n) => [n.id, n]));

      const onEnter = ({ node }: { node: string }) => {
        setDetail(nodeById.get(node) ?? null);
      };
      const onLeave = () => setDetail(null);

      sigma.on("enterNode", onEnter);
      sigma.on("leaveNode", onLeave);

      sigma.resize();
      sigma.refresh();
    });

    return () => {
      cancelled = true;
      ro.disconnect();
      const sigma = sigmaRef.current;
      if (sigma) {
        sigma.kill();
        sigmaRef.current = null;
      }
    };
  }, [graph]);

  const resetView = () => {
    void sigmaRef.current?.getCamera().animatedReset({ duration: 400 });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" onClick={resetView}>
            Reset view
          </Button>
          <p className="text-xs text-muted-foreground lg:ml-auto lg:self-center">
            Drag to pan, scroll to zoom. Leader glyphs stay small; shared concepts
            read as backbone.
          </p>
        </div>
        <div className="relative w-full rounded-md border border-border bg-card">
          <div
            ref={containerRef}
            className="h-[min(520px,70vh)] w-full min-h-[360px]"
            role="presentation"
          />
        </div>
      </div>
      <GraphDetailPanel title="Hover detail" node={detail} graph={graph} />
    </div>
  );
}
