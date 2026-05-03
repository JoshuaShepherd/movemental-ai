import type {
  IndexedGraph,
  KnowledgeEdge,
  KnowledgeGraph,
  KnowledgeNode,
} from "./types";

export function indexGraph(graph: KnowledgeGraph): IndexedGraph {
  const nodeById = new Map<string, KnowledgeNode>();
  for (const n of graph.nodes) {
    nodeById.set(n.id, n);
  }
  const edgesByNode = new Map<string, KnowledgeEdge[]>();
  for (const e of graph.edges) {
    const push = (id: string) => {
      const list = edgesByNode.get(id) ?? [];
      list.push(e);
      edgesByNode.set(id, list);
    };
    push(e.source);
    push(e.target);
  }
  return { graph, nodeById, edgesByNode };
}

export function relatedNodes(
  indexed: IndexedGraph,
  nodeId: string,
  limit = 8,
): KnowledgeNode[] {
  const edges = indexed.edgesByNode.get(nodeId) ?? [];
  const out: KnowledgeNode[] = [];
  const seen = new Set<string>([nodeId]);
  for (const e of edges) {
    const other = e.source === nodeId ? e.target : e.source;
    if (seen.has(other)) continue;
    const n = indexed.nodeById.get(other);
    if (!n) continue;
    seen.add(other);
    out.push(n);
    if (out.length >= limit) break;
  }
  return out;
}
