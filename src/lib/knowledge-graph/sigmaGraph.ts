import { UndirectedGraph } from "graphology";

import type { KnowledgeGraph, KnowledgeNode } from "./types";

export type SigmaNodeAttrs = {
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
  nodeType: KnowledgeNode["type"];
};

/**
 * Builds a Graphology graph for Sigma.js from a field-scale {@link KnowledgeGraph}.
 * Follows sigma’s expectation of `x`, `y`, `size`, `color` on nodes.
 *
 * @see https://www.sigmajs.org/docs/ — lifecycle, WebGL rendering
 */
export function knowledgeGraphToSigma(graph: KnowledgeGraph): UndirectedGraph {
  const g = new UndirectedGraph();

  const leaders = graph.nodes.filter((n) => n.type === "leader");
  const topics = graph.nodes.filter((n) => n.type === "topic" || n.type === "concept");

  const golden = Math.PI * (3 - Math.sqrt(5));

  leaders.forEach((n, i) => {
    const t = i * golden;
    const r = 0.42 * Math.sqrt(i + 1);
    const x = 0.5 + Math.cos(t) * r;
    const y = 0.5 + Math.sin(t) * r;
    g.addNode(n.id, sigmaAttrsForNode(n, x, y, 3, "#19150f"));
  });

  topics.forEach((n, i) => {
    const a = (i / Math.max(1, topics.length)) * Math.PI * 2;
    const r = 0.12;
    const x = 0.5 + Math.cos(a) * r;
    const y = 0.5 + Math.sin(a) * r;
    g.addNode(n.id, sigmaAttrsForNode(n, x, y, 9, "#6b6660"));
  });

  for (const e of graph.edges) {
    if (!g.hasNode(e.source) || !g.hasNode(e.target)) continue;
    if (g.hasEdge(e.source, e.target)) continue;
    try {
      g.addEdge(e.source, e.target, {
        size: 1.2,
        color: "rgba(25, 21, 15, 0.18)",
      });
    } catch {
      /* ignore parallel adds */
    }
  }

  return g;
}

function sigmaAttrsForNode(
  n: KnowledgeNode,
  x: number,
  y: number,
  baseSize: number,
  color: string,
): SigmaNodeAttrs {
  const size = baseSize * (1 + (n.weight ?? 0) * 0.08);
  return {
    label: n.title,
    x,
    y,
    size,
    color,
    nodeType: n.type,
  };
}
