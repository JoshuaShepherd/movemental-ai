import type { NarrativeIntelSlug } from "@/components/intel-artifacts/types";

import {
  type AudienceId,
  getScatterTilesForAudience,
  SCATTER_TILES,
  type ScatterTile,
} from "./fragmentation-story-content";

/**
 * Shared artifact registry that keeps the same fourteen tiles coherent across
 * the six stages on `/fragmentation-new`. Stage 1 uses `phase` to run a
 * three-wave reveal; the carry-forward strip between Stage 1 and Stage 2 uses
 * the same ids to say "these don't disappear, they re-compose."
 */

export type ArtifactPhase = 1 | 2 | 3;

export type ArtifactKind = "informational" | "relational" | "both";

export type ArtifactId = (typeof ARTIFACT_IDS)[number];

/** Stable ids keyed off the scatter-tile keys so the two stay in lock-step. */
export const ARTIFACT_IDS = [
  "book",
  "hub",
  "coverP",
  "coverS",
  "email",
  "split",
  "thread",
  "chat",
  "module",
  "order",
  "podcast",
  "session",
  "sketch",
  "stage",
] as const;

type ArtifactMetaEntry = {
  slug: NarrativeIntelSlug;
  phase: ArtifactPhase;
  kind: ArtifactKind;
  /** Short human label used in continuity captions / a11y. */
  label: string;
};

/**
 * Phase groupings were chosen for **meaning**, not symmetry:
 *
 * - Phase 1 — "At first, it held together."  Canonical, structured, authored —
 *   the artifacts you still think are doing the heaviest lifting.
 * - Phase 2 — "Then it spread."  The same intelligence arriving through more
 *   channels than any one person can keep aligned.
 * - Phase 3 — "Now it looks like this."  The long tail — sessions, sketches,
 *   stages — where the work actually happens and nothing points home.
 */
export const ARTIFACT_META: Record<ArtifactId, ArtifactMetaEntry> = {
  book: {
    slug: "book-fragments-of-form",
    phase: 1,
    kind: "informational",
    label: "Book — Fragments of Form",
  },
  hub: {
    slug: "core-hub-to-fragment-nodes",
    phase: 1,
    kind: "both",
    label: "Hub — core to fragment",
  },
  // Raster `cover-principles-design-fragmentation.webp` may carry placeholder byline copy; replace via Stitch when shipping final art.
  coverP: {
    slug: "cover-principles-design-fragmentation",
    phase: 1,
    kind: "informational",
    label: "Cover — principles of design",
  },
  coverS: {
    slug: "cover-structural-fragments-investigation",
    phase: 1,
    kind: "informational",
    label: "Cover — structural fragments",
  },
  email: {
    slug: "email-thread-multi-participant",
    phase: 2,
    kind: "relational",
    label: "Email thread",
  },
  split: {
    slug: "formal-design-systems-split-flow",
    phase: 2,
    kind: "informational",
    label: "Design systems — split flow",
  },
  thread: {
    slug: "message-thread-staggered-fragments",
    phase: 2,
    kind: "relational",
    label: "Message thread — staggered",
  },
  chat: {
    slug: "mobile-chat-skeleton-bubbles",
    phase: 2,
    kind: "relational",
    label: "Mobile chat",
  },
  module: {
    slug: "module-formal-systems-intro",
    phase: 2,
    kind: "informational",
    label: "Course module",
  },
  order: {
    slug: "order-of-service-structured-units",
    phase: 3,
    kind: "informational",
    label: "Order of service",
  },
  podcast: {
    slug: "podcast-card-abstract-structures",
    phase: 3,
    kind: "both",
    label: "Podcast card",
  },
  session: {
    slug: "session-essential-structures-card",
    phase: 3,
    kind: "informational",
    label: "Session card",
  },
  sketch: {
    slug: "sketch-converge-diverge-flow",
    phase: 3,
    kind: "both",
    label: "Sketch — converge / diverge",
  },
  stage: {
    slug: "stage-presentation-three-shapes",
    phase: 3,
    kind: "informational",
    label: "Stage — three shapes",
  },
};

/** Ordered list of ids, Phase 1 → 2 → 3 (for the carry-forward strip). */
export const ARTIFACT_IDS_BY_PHASE: Record<ArtifactPhase, ArtifactId[]> = {
  1: ARTIFACT_IDS.filter((id) => ARTIFACT_META[id].phase === 1),
  2: ARTIFACT_IDS.filter((id) => ARTIFACT_META[id].phase === 2),
  3: ARTIFACT_IDS.filter((id) => ARTIFACT_META[id].phase === 3),
};

export const PHASE_CAPTIONS: Record<ArtifactPhase, string> = {
  1: "At first, it held together.",
  2: "Then it spread.",
  3: "Now it looks like this.",
};

export type ScatterFrameEntry = {
  id: ArtifactId;
  tile: ScatterTile;
  phase: ArtifactPhase;
  kind: ArtifactKind;
};

/** Per-audience permutation of scatter tiles, keyed by stable id. */
export function getScatterFrame(audience: AudienceId): ScatterFrameEntry[] {
  const perm = getScatterTilesForAudience(audience);
  // `SCATTER_TILES[i].key` matches `ARTIFACT_IDS[i]`; we recover the id by tile.key.
  return perm.map((tile) => {
    const id = tile.key as ArtifactId;
    const meta = ARTIFACT_META[id];
    return { id, tile, phase: meta.phase, kind: meta.kind };
  });
}

/** Sanity-check helper — lets callers assert a scatter slug maps into the registry. */
export function getIdForSlug(slug: NarrativeIntelSlug): ArtifactId | undefined {
  for (const id of ARTIFACT_IDS) {
    if (ARTIFACT_META[id].slug === slug) return id;
  }
  const fallback = SCATTER_TILES.find((t) => t.slug === slug);
  return fallback ? (fallback.key as ArtifactId) : undefined;
}

/** Accessible description for raster story previews (matches carry-forward / scatter labels). */
export function getFragmentationStoryAltForSlug(slug: NarrativeIntelSlug): string {
  const id = getIdForSlug(slug);
  if (id) return `${ARTIFACT_META[id].label} — editorial preview.`;
  return slug
    .split("-")
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}
