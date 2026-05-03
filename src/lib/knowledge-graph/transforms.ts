import type { EmergencePhase, KnowledgeEdge, KnowledgeGraph, KnowledgeNode } from "./types";

export function nodesVisibleThroughPhase(
  nodes: KnowledgeNode[],
  phase: EmergencePhase,
): KnowledgeNode[] {
  return nodes.filter((n) => {
    if (n.type === "leader") return true;
    const p = n.emergencePhase;
    if (p === undefined) return true;
    return p <= phase;
  });
}

export function edgesVisibleThroughPhase(
  edges: KnowledgeEdge[],
  visibleIds: Set<string>,
  phase: EmergencePhase,
): KnowledgeEdge[] {
  return edges.filter((e) => {
    if (!visibleIds.has(e.source) || !visibleIds.has(e.target)) return false;
    const p = e.emergencePhase;
    if (p === undefined) return true;
    return p <= phase;
  });
}

export function emergenceSubgraph(
  graph: KnowledgeGraph,
  phase: EmergencePhase,
): KnowledgeGraph {
  const nodes = nodesVisibleThroughPhase(graph.nodes, phase);
  const visibleIds = new Set(nodes.map((n) => n.id));
  const edges = edgesVisibleThroughPhase(graph.edges, visibleIds, phase);
  return { ...graph, nodes, edges };
}
