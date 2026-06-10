/** Informational vs relational emphasis (fragmentation story field rail). */
export type IntelField = "info" | "rel";

/** Audience tabs — labels only; layouts stay stable per spec. */
export type IntelAudience = "leader" | "nonprofit" | "church" | "seminary";

/** Density for constellation / IDE thumb / scatter tile. */
export type IntelVariant = "full" | "thumb" | "tile";

export type IntelArtifactBaseProps = {
  field: IntelField;
  audience?: IntelAudience;
  variant?: IntelVariant;
  className?: string;
  /** Accessible name for the decorative illustration. */
  "aria-label"?: string;
  /** Nested inside another labeled component (e.g. product thumb) — hides inner a11y tree. */
  embedded?: boolean;
};

/** Slugs aligned 1:1 with `public/images/fragmentation-story/*.webp` basenames. */
export const NARRATIVE_INTEL_SLUGS = [
  "order-of-service-structured-units",
  "session-essential-structures-card",
  "formal-design-systems-split-flow",
  "book-fragments-of-form",
  "module-formal-systems-intro",
  "cover-principles-design-fragmentation",
  "cover-structural-fragments-investigation",
  "podcast-card-abstract-structures",
  "mobile-chat-skeleton-bubbles",
  "email-thread-multi-participant",
  "message-thread-staggered-fragments",
  "core-hub-to-fragment-nodes",
  "sketch-converge-diverge-flow",
  "stage-presentation-three-shapes",
  "doc-pdf-generic",
  "video-frame-timestamped",
  "notes-sticky-sketch",
  "crm-person-card",
  "node-single",
  "node-group",
] as const;

export type NarrativeIntelSlug = (typeof NARRATIVE_INTEL_SLUGS)[number];

export const OPERATIONAL_INTEL_SLUGS = [
  "intel-seo-surface",
  "intel-geo-entity",
  "intel-translation-stack",
  "intel-ecommerce-shelf",
  "intel-subscription-ledger",
  "intel-ai-agent-workpack",
] as const;

export type OperationalIntelSlug = (typeof OPERATIONAL_INTEL_SLUGS)[number];

export type IntelSlug = NarrativeIntelSlug | OperationalIntelSlug;
