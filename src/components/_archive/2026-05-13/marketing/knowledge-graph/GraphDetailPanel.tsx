"use client";

import type { KnowledgeGraph, KnowledgeNode } from "@/lib/knowledge-graph/types";

import { NodeInspector } from "./NodeInspector";

export function GraphDetailPanel({
  node,
  graph,
  title = "Detail",
}: {
  node: KnowledgeNode | null;
  graph: KnowledgeGraph;
  title?: string;
}) {
  return (
    <aside
      className="rounded-md border border-border bg-card p-5 shadow-ambient"
      aria-label={title}
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
        {title}
      </p>
      <NodeInspector node={node} graph={graph} />
    </aside>
  );
}
