"use client";

import { relatedNodes, indexGraph } from "@/lib/knowledge-graph";
import type { KnowledgeGraph, KnowledgeNode } from "@/lib/knowledge-graph/types";

export function NodeInspector({
  node,
  graph,
}: {
  node: KnowledgeNode | null;
  graph: KnowledgeGraph;
}) {
  if (!node) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a node to inspect how it fits in the ecosystem.
      </p>
    );
  }

  const indexed = indexGraph(graph);
  const related = relatedNodes(indexed, node.id, 6);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          {node.type.replace(/_/g, " ")}
        </p>
        <h3 className="mt-1 font-semibold text-foreground">{node.title}</h3>
        {node.subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{node.subtitle}</p>
        ) : null}
      </div>
      {node.description ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {node.description}
        </p>
      ) : null}
      {node.narrativeRole ? (
        <div className="rounded-md bg-section px-3 py-2 text-sm text-foreground">
          <span className="font-medium text-muted-foreground">Why it matters: </span>
          {node.narrativeRole}
        </div>
      ) : null}
      {(node.topics?.length || node.languages?.length) ? (
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {node.topics?.map((t) => (
            <span
              key={t}
              className="rounded-full bg-card px-2 py-0.5 text-foreground ring-1 ring-border"
            >
              {t}
            </span>
          ))}
          {node.languages?.map((l) => (
            <span
              key={l}
              className="rounded-full bg-muted px-2 py-0.5 uppercase tracking-wide"
            >
              {l}
            </span>
          ))}
        </div>
      ) : null}
      {related.length > 0 ? (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Related in this model
          </p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {related.map((r) => (
              <li key={r.id}>
                <span className="text-foreground">{r.title}</span>
                <span className="text-muted-foreground"> — {r.type.replace(/_/g, " ")}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
