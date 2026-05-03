import type { EmergencePhase, KnowledgeEdge, KnowledgeGraph, KnowledgeNode } from "./types";

const leaderId = "ldr-1";

function node(
  partial: Omit<KnowledgeNode, "id"> & { id: string },
): KnowledgeNode {
  return partial;
}

function edge(
  id: string,
  source: string,
  target: string,
  type: KnowledgeEdge["type"],
  emergencePhase?: EmergencePhase,
): KnowledgeEdge {
  return { id, source, target, type, emergencePhase };
}

/**
 * Rich single-leader graph for D3 / emergence demos.
 */
function buildSampleLeaderKnowledgeGraph(): KnowledgeGraph {
  const nodes: KnowledgeNode[] = [
    node({
      id: leaderId,
      type: "leader",
      title: "Movement leader",
      subtitle: "Illustrative composite",
      description:
        "A leader whose public work spans books, teaching media, articles, and formation products.",
      narrativeRole:
        "The gravitational center — not because algorithms say so, but because authorship and responsibility live here.",
      emergencePhase: 0,
    }),
    node({
      id: "book-1",
      type: "book",
      title: "The Forgotten Ways",
      description: "Canonical long-form argument that other surfaces can cite.",
      topics: ["movement", "ecclesiology"],
      languages: ["en"],
      narrativeRole: "Anchor object — stable spine for the ecosystem.",
      emergencePhase: 1,
    }),
    node({
      id: "book-2",
      type: "book",
      title: "Untamed",
      description: "Second major work extending the same thematic spine.",
      topics: ["formation"],
      languages: ["en"],
      emergencePhase: 1,
    }),
    node({
      id: "pub-ct",
      type: "publication",
      title: "Christianity Today essay",
      description: "Editorial surface that points back to books and pathways.",
      topics: ["culture"],
      languages: ["en"],
      emergencePhase: 3,
    }),
    node({
      id: "art-1",
      type: "article",
      title: "On missional discipleship",
      topics: ["discipleship", "movement"],
      languages: ["en"],
      narrativeRole: "Discoverable entry ramp for search and social.",
      emergencePhase: 3,
    }),
    node({
      id: "art-2",
      type: "article",
      title: "Leadership and liminality",
      topics: ["leadership"],
      languages: ["en"],
      emergencePhase: 3,
    }),
    node({
      id: "vid-1",
      type: "video",
      title: "Conference keynote",
      topics: ["movement"],
      languages: ["en"],
      narrativeRole: "High-trust teaching artifact with long half-life.",
      emergencePhase: 0,
    }),
    node({
      id: "aud-1",
      type: "audio",
      title: "Podcast season",
      topics: ["formation"],
      languages: ["en"],
      emergencePhase: 0,
    }),
    node({
      id: "tr-1",
      type: "transcript",
      title: "Keynote transcript",
      description: "Verbatim text aligned to the video artifact.",
      topics: ["movement"],
      languages: ["en"],
      narrativeRole: "Makes spoken teaching quotable, searchable, and model-addressable.",
      emergencePhase: 2,
    }),
    node({
      id: "tr-2",
      type: "transcript",
      title: "Podcast transcripts",
      topics: ["formation"],
      languages: ["en"],
      emergencePhase: 2,
    }),
    node({
      id: "path-1",
      type: "pathway",
      title: "Formation pathway",
      description: "Curated journey across articles, media, and practices.",
      topics: ["formation", "discipleship"],
      languages: ["en"],
      narrativeRole: "Synthesis layer — ideas arranged for human progression.",
      emergencePhase: 4,
    }),
    node({
      id: "crs-1",
      type: "course",
      title: "Eight-week intensive",
      topics: ["formation"],
      languages: ["en"],
      narrativeRole: "Rhythm, practice, and cohort — formation with scaffolding.",
      emergencePhase: 5,
    }),
    node({
      id: "ai-1",
      type: "ai_layer",
      title: "Grounded assistant",
      description: "Answers from the corpus with citations — not generic chat.",
      narrativeRole: "Interaction layer: access, not replacement.",
      emergencePhase: 6,
    }),
    node({
      id: "lang-es",
      type: "language",
      title: "Spanish",
      narrativeRole: "Parallel readership without forking the underlying spine.",
      emergencePhase: 7,
    }),
    node({
      id: "trn-es-1",
      type: "translation",
      title: "Spanish edition — The Forgotten Ways",
      languages: ["es"],
      topics: ["movement"],
      narrativeRole: "Multiplier — same argument, new readers.",
      emergencePhase: 7,
    }),
    node({
      id: "topic-mov",
      type: "topic",
      title: "Movement",
      narrativeRole: "Thematic handle that ties disparate artifacts together.",
      emergencePhase: 1,
    }),
    node({
      id: "concept-ap",
      type: "concept",
      title: "Apostolic genius",
      narrativeRole: "Conceptual through-line that recurs across formats.",
      emergencePhase: 1,
    }),
    node({
      id: "series-1",
      type: "series",
      title: "Teaching series — APEST",
      narrativeRole: "Bundles media into a recognizable arc.",
      emergencePhase: 0,
    }),
    node({
      id: "org-1",
      type: "organization",
      title: "Publisher partner",
      narrativeRole: "Institutional context for certain publications.",
      emergencePhase: 1,
    }),
  ];

  const edges: KnowledgeEdge[] = [
    edge("e-book1", leaderId, "book-1", "authored_by", 1),
    edge("e-book2", leaderId, "book-2", "authored_by", 1),
    edge("e-pub", leaderId, "pub-ct", "authored_by", 3),
    edge("e-art1", leaderId, "art-1", "authored_by", 3),
    edge("e-art2", leaderId, "art-2", "authored_by", 3),
    edge("e-vid", leaderId, "vid-1", "authored_by", 0),
    edge("e-aud", leaderId, "aud-1", "authored_by", 0),
    edge("e-tr1", "tr-1", "vid-1", "transcript_of", 2),
    edge("e-tr2", "tr-2", "aud-1", "transcript_of", 2),
    edge("e-path", leaderId, "path-1", "connected_to_leader", 4),
    edge("e-crs", leaderId, "crs-1", "connected_to_leader", 5),
    edge("e-ai", "ai-1", leaderId, "connected_to_leader", 6),
    edge("e-t1", "art-1", "topic-mov", "belongs_to_topic", 3),
    edge("e-t2", "book-1", "topic-mov", "belongs_to_topic", 1),
    edge("e-c1", "book-1", "concept-ap", "references", 1),
    edge("e-c2", "path-1", "concept-ap", "expands_on", 4),
    edge("e-ser", "vid-1", "series-1", "part_of_series", 0),
    edge("e-incp", "art-1", "path-1", "included_in_pathway", 4),
    edge("e-incc", "path-1", "crs-1", "included_in_course", 5),
    edge("e-trn", "trn-es-1", "book-1", "translated_into", 7),
    edge("e-lang", "trn-es-1", "lang-es", "related_to", 7),
    edge("e-org", "book-1", "org-1", "related_to", 1),
  ];

  return {
    id: "sample-leader",
    title: "Illustrative leader ecosystem",
    nodes,
    edges,
  };
}

let sampleLeaderKnowledgeGraphMemo: KnowledgeGraph | undefined;

/** Stable singleton — avoids client remount loops when parent re-renders. */
export function sampleLeaderKnowledgeGraph(): KnowledgeGraph {
  sampleLeaderKnowledgeGraphMemo ??= buildSampleLeaderKnowledgeGraph();
  return sampleLeaderKnowledgeGraphMemo;
}

/**
 * Synthetic field graph: 100 leaders + shared concepts + sparse membership edges.
 * Numbers label nodes only for orientation — not performance claims.
 */
function buildSampleFieldKnowledgeGraph(): KnowledgeGraph {
  const nodes: KnowledgeNode[] = [];
  const edges: KnowledgeEdge[] = [];

  const topics: KnowledgeNode[] = [
    node({
      id: "fld-topic-mission",
      type: "topic",
      title: "Mission",
      weight: 2,
    }),
    node({
      id: "fld-topic-form",
      type: "topic",
      title: "Formation",
      weight: 2,
    }),
    node({
      id: "fld-topic-lead",
      type: "topic",
      title: "Leadership",
      weight: 2,
    }),
    node({
      id: "fld-concept-apest",
      type: "concept",
      title: "APEST / fivefold",
      weight: 3,
    }),
    node({
      id: "fld-concept-inc",
      type: "concept",
      title: "Incarnational fidelity",
      weight: 2,
    }),
  ];
  nodes.push(...topics);

  for (let i = 0; i < 100; i++) {
    const id = `fld-leader-${i}`;
    nodes.push(
      node({
        id,
        type: "leader",
        title: `Leader ${i + 1}`,
        clusterId: `c${i % 7}`,
        topics:
          i % 5 === 0
            ? ["Mission", "Formation"]
            : i % 4 === 0
              ? ["Leadership"]
              : ["Mission"],
        weight: 1,
      }),
    );
    if (i % 3 === 0) {
      edges.push(edge(`fld-e-m-${i}`, id, "fld-topic-mission", "belongs_to_topic"));
    }
    if (i % 4 === 0) {
      edges.push(edge(`fld-e-f-${i}`, id, "fld-topic-form", "belongs_to_topic"));
    }
    if (i % 6 === 0) {
      edges.push(edge(`fld-e-l-${i}`, id, "fld-topic-lead", "belongs_to_topic"));
    }
    if (i % 7 === 0) {
      edges.push(edge(`fld-e-a-${i}`, id, "fld-concept-apest", "related_to"));
    }
    if (i % 9 === 0) {
      edges.push(edge(`fld-e-i-${i}`, id, "fld-concept-inc", "related_to"));
    }
    const j = i + 3 < 100 ? i + 3 : i - 5;
    if (j >= 0 && j < 100 && j !== i && i % 11 === 0) {
      edges.push(
        edge(`fld-co-${i}`, id, `fld-leader-${j}`, "shares_concept_with"),
      );
    }
  }

  return {
    id: "sample-field",
    title: "Illustrative 100-leader field",
    nodes,
    edges,
  };
}

let sampleFieldKnowledgeGraphMemo: KnowledgeGraph | undefined;

/** Stable singleton — keeps Sigma mount stable across re-renders. */
export function sampleFieldKnowledgeGraph(): KnowledgeGraph {
  sampleFieldKnowledgeGraphMemo ??= buildSampleFieldKnowledgeGraph();
  return sampleFieldKnowledgeGraphMemo;
}
