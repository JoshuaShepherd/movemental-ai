/**
 * Shared types for the Movemental capacity-expansion story.
 *
 * These types model the narrative structure — not a data pipeline.
 * They exist so that every story component agrees on what a "dimension"
 * or "layer" is, without each component inventing its own vocabulary.
 */

/* ------------------------------------------------------------------ */
/* Impact dimensions — the axes along which a leader's realized        */
/* capacity expands when Movemental is in place.                       */
/* ------------------------------------------------------------------ */

export type ImpactDimensionId =
  | "tam"
  | "formation"
  | "credibility"
  | "amplification"
  | "revenue";

export interface ImpactDimension {
  id: ImpactDimensionId;
  label: string;
  /** One sentence: what this dimension actually means for a leader. */
  description: string;
}

export const IMPACT_DIMENSIONS: ImpactDimension[] = [
  {
    id: "tam",
    label: "Total Addressable Mission",
    description:
      "The set of people your work can actually reach — not followers, but the audience your ideas could realistically serve.",
  },
  {
    id: "formation",
    label: "Formation Capacity",
    description:
      "The depth and durability of change your system can produce — not impressions, but transformation that sticks.",
  },
  {
    id: "credibility",
    label: "Online Credibility",
    description:
      "Whether search engines, AI models, and informed readers treat you as a primary source — not just a name.",
  },
  {
    id: "amplification",
    label: "Amplification & Discoverability",
    description:
      "How effectively your ideas surface in the channels that matter — organic search, citations, recommendations, and word of mouth.",
  },
  {
    id: "revenue",
    label: "Revenue",
    description:
      "Sustainable income generated from the work itself — courses, memberships, and partnerships — not donations or speaking fees alone.",
  },
];

/* ------------------------------------------------------------------ */
/* System layers — the infrastructure components that Movemental       */
/* builds and connects for each leader.                                */
/* ------------------------------------------------------------------ */

export type SystemLayerId =
  | "books"
  | "media"
  | "transcripts"
  | "articles"
  | "pathways"
  | "courses"
  | "ai"
  | "translations";

export interface SystemLayer {
  id: SystemLayerId;
  label: string;
  /** What this layer actually is. */
  description: string;
  /** Rough position in the recommended build order (1 = first). */
  sequenceOrder: number;
}

export const SYSTEM_LAYERS: SystemLayer[] = [
  {
    id: "books",
    label: "Books",
    description:
      "The corpus — structured, searchable, and connected to every downstream surface.",
    sequenceOrder: 1,
  },
  {
    id: "media",
    label: "Media Archives",
    description:
      "Talks, interviews, and video organized by theme and linked to the written corpus.",
    sequenceOrder: 2,
  },
  {
    id: "transcripts",
    label: "Transcripts",
    description:
      "Spoken content made textual — searchable, citable, and available for AI grounding.",
    sequenceOrder: 3,
  },
  {
    id: "articles",
    label: "Core Articles",
    description:
      "Evergreen, SEO-architected pieces that serve as canonical entry points into the leader's thinking.",
    sequenceOrder: 4,
  },
  {
    id: "pathways",
    label: "Pathways",
    description:
      "Curated learning sequences that guide people from first encounter to deep formation.",
    sequenceOrder: 5,
  },
  {
    id: "courses",
    label: "Courses",
    description:
      "Structured, time-bound formation experiences with community, assessment, and support.",
    sequenceOrder: 6,
  },
  {
    id: "ai",
    label: "AI",
    description:
      "A grounded AI layer that speaks from the leader's corpus — not the open internet.",
    sequenceOrder: 7,
  },
  {
    id: "translations",
    label: "Translations",
    description:
      "The entire system rendered in additional languages — multiplying reach without diluting voice.",
    sequenceOrder: 8,
  },
];

/* ------------------------------------------------------------------ */
/* Impact shapes — qualitative descriptors that communicate the        */
/* *character* of a layer's effect on a dimension.                     */
/*                                                                     */
/* These replace percentages. The story is that each layer affects      */
/* each dimension differently — not by a precise amount.               */
/* ------------------------------------------------------------------ */

export type ImpactShape =
  | "primary-driver"
  | "strong-amplifier"
  | "enabler"
  | "indirect"
  | "minimal";

export const IMPACT_SHAPE_META: Record<
  ImpactShape,
  { label: string; description: string }
> = {
  "primary-driver": {
    label: "Primary driver",
    description: "This layer is a direct, structural cause of expansion in this dimension.",
  },
  "strong-amplifier": {
    label: "Strong amplifier",
    description: "Not the origin, but a significant multiplier of what other layers produce.",
  },
  enabler: {
    label: "Enabler",
    description: "Creates the conditions for other layers to affect this dimension.",
  },
  indirect: {
    label: "Indirect",
    description: "Contributes, but through second-order effects rather than direct causation.",
  },
  minimal: {
    label: "Minimal",
    description: "Little measurable effect on this dimension by itself.",
  },
};

/* ------------------------------------------------------------------ */
/* The matrix: how each layer shapes each dimension.                   */
/*                                                                     */
/* This is the editorial assertion at the heart of the story.          */
/* It encodes Movemental's point of view about what matters.           */
/* ------------------------------------------------------------------ */

export type LayerImpactMap = Record<SystemLayerId, Record<ImpactDimensionId, ImpactShape>>;

export const DEFAULT_LAYER_IMPACT_MAP: LayerImpactMap = {
  books: {
    tam: "enabler",
    formation: "primary-driver",
    credibility: "primary-driver",
    amplification: "enabler",
    revenue: "indirect",
  },
  media: {
    tam: "strong-amplifier",
    formation: "enabler",
    credibility: "strong-amplifier",
    amplification: "strong-amplifier",
    revenue: "indirect",
  },
  transcripts: {
    tam: "enabler",
    formation: "indirect",
    credibility: "strong-amplifier",
    amplification: "primary-driver",
    revenue: "minimal",
  },
  articles: {
    tam: "primary-driver",
    formation: "enabler",
    credibility: "primary-driver",
    amplification: "primary-driver",
    revenue: "enabler",
  },
  pathways: {
    tam: "enabler",
    formation: "primary-driver",
    credibility: "enabler",
    amplification: "enabler",
    revenue: "strong-amplifier",
  },
  courses: {
    tam: "indirect",
    formation: "primary-driver",
    credibility: "enabler",
    amplification: "indirect",
    revenue: "primary-driver",
  },
  ai: {
    tam: "strong-amplifier",
    formation: "strong-amplifier",
    credibility: "enabler",
    amplification: "strong-amplifier",
    revenue: "enabler",
  },
  translations: {
    tam: "primary-driver",
    formation: "strong-amplifier",
    credibility: "strong-amplifier",
    amplification: "primary-driver",
    revenue: "strong-amplifier",
  },
};
