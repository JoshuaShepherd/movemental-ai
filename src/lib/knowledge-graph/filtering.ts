import type { EntityType, KnowledgeGraph, KnowledgeNode } from "./types";

export type KnowledgeGraphFilters = {
  entityTypes: Set<EntityType>;
  topics: Set<string>;
  languages: Set<string>;
};

export const defaultKnowledgeGraphFilters = (): KnowledgeGraphFilters => ({
  entityTypes: new Set(),
  topics: new Set(),
  languages: new Set(),
});

export function filterGraph(
  graph: KnowledgeGraph,
  filters: KnowledgeGraphFilters,
): KnowledgeGraph {
  const typeOk = (n: KnowledgeNode) =>
    filters.entityTypes.size === 0 || filters.entityTypes.has(n.type);
  const topicOk = (n: KnowledgeNode) => {
    if (filters.topics.size === 0) return true;
    const t = n.topics ?? [];
    return t.some((x) => filters.topics.has(x));
  };
  const langOk = (n: KnowledgeNode) => {
    if (filters.languages.size === 0) return true;
    const l = n.languages ?? [];
    return l.some((x) => filters.languages.has(x));
  };

  const nodes = graph.nodes.filter(
    (n) => typeOk(n) && topicOk(n) && langOk(n),
  );
  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges = graph.edges.filter(
    (e) => nodeIds.has(e.source) && nodeIds.has(e.target),
  );
  return { ...graph, nodes, edges };
}

export function collectTopics(graph: KnowledgeGraph): string[] {
  const s = new Set<string>();
  for (const n of graph.nodes) {
    for (const t of n.topics ?? []) s.add(t);
  }
  return [...s].sort((a, b) => a.localeCompare(b));
}

export function collectLanguages(graph: KnowledgeGraph): string[] {
  const s = new Set<string>();
  for (const n of graph.nodes) {
    for (const l of n.languages ?? []) s.add(l);
  }
  return [...s].sort((a, b) => a.localeCompare(b));
}

export function collectEntityTypes(graph: KnowledgeGraph): EntityType[] {
  const s = new Set<EntityType>();
  for (const n of graph.nodes) s.add(n.type);
  return [...s];
}
