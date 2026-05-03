/**
 * Movemental knowledge-ecosystem graph model.
 *
 * Typed for multiple visualization modes (single leader, emergence timeline,
 * field-scale network, interpretive legibility) from one normalized graph.
 * Values are qualitative / structural — not fabricated analytics.
 */

export const ENTITY_TYPES = [
  "leader",
  "book",
  "article",
  "video",
  "audio",
  "transcript",
  "pathway",
  "course",
  "ai_layer",
  "topic",
  "language",
  "translation",
  "series",
  "concept",
  "publication",
  "organization",
] as const;

export type EntityType = (typeof ENTITY_TYPES)[number];

export const RELATIONSHIP_TYPES = [
  "authored_by",
  "derived_from",
  "transcript_of",
  "belongs_to_topic",
  "related_to",
  "references",
  "expands_on",
  "translated_into",
  "part_of_series",
  "included_in_pathway",
  "included_in_course",
  "connected_to_leader",
  "shares_concept_with",
  "coauthored_with",
  "recommended_with",
  "canonicalizes",
  "links_to",
] as const;

export type RelationshipType = (typeof RELATIONSHIP_TYPES)[number];

/** Zero-based emergence scene: corpus → … → translations */
export type EmergencePhase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const EMERGENCE_PHASE_LABELS = [
  "Scattered corpus",
  "Canonical structure",
  "Transcripts",
  "Core articles",
  "Pathways",
  "Courses",
  "AI interaction layer",
  "Translations",
] as const;

export type KnowledgeNode = {
  id: string;
  type: EntityType;
  title: string;
  subtitle?: string;
  /** Short, factual description for panels — no invented metrics */
  description?: string;
  /** Why this node matters in the system story */
  narrativeRole?: string;
  topics?: string[];
  languages?: string[];
  href?: string;
  /** When this node becomes visible in the emergence narrative */
  emergencePhase?: EmergencePhase;
  /** Optional grouping for field-scale cluster membership */
  clusterId?: string;
  /** Relative visual weight (1 = default) — qualitative, not analytics */
  weight?: number;
  meta?: Record<string, string | number | boolean | undefined>;
};

export type KnowledgeEdge = {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  label?: string;
  /** Optional phase when this edge is emphasized in emergence */
  emergencePhase?: EmergencePhase;
};

export type KnowledgeGraph = {
  id: string;
  title?: string;
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
};

export type IndexedGraph = {
  graph: KnowledgeGraph;
  nodeById: Map<string, KnowledgeNode>;
  edgesByNode: Map<string, KnowledgeEdge[]>;
};

export type LayoutPoint = { x: number; y: number; r?: number };

export type LeaderLayout = {
  positions: Map<string, LayoutPoint>;
  zones: { id: string; label: string; angleStart: number; angleEnd: number }[];
};
