/**
 * Scenius v3 graph topology — mirrors `scripts/generate-scenius-network-v3-html.py`
 * (generateGraphData, seedNodePositions, filter/hover helpers) for the home D3 graph.
 */

import type { SimulationNodeDatum } from "d3";

import {
  strengthMeetsThreshold,
  type AudienceCredentialStrength,
  type AudienceSegment,
  type VoiceAudienceCredentials,
  getVoiceAudienceCredentials,
} from "./voice-audience-credentials";
import { MOVEMENT_VOICES, type VoiceGraphVoice } from "./voices-graph-data";

/** Same fixed seed as v3 static `APP_JS` for deterministic extras. */
export const SCIENIUS_V3_SEED = 0xc0010203;

export const TARGET_TOTAL_NODES = 100;

export const TOPIC_SLUGS_FOR_EXTRAS = [
  "church",
  "nonprofit",
  "institution",
] as const;

export type SceniusTopicSlug = (typeof TOPIC_SLUGS_FOR_EXTRAS)[number];

const SEG_MAP: Record<SceniusTopicSlug, AudienceSegment> = {
  church: "churches",
  nonprofit: "nonprofits",
  institution: "institutions",
};

const STRENGTH_RANK: Record<AudienceCredentialStrength, number> = {
  none: 0,
  light: 1,
  moderate: 2,
  strong: 3,
};

export function strengthRank(s: AudienceCredentialStrength | undefined): number {
  if (!s) return 0;
  return STRENGTH_RANK[s] ?? 0;
}

/** v3 `_topics_for_row` — topic chips for leader grouping / extras. */
export function topicsForCredentials(
  cred: VoiceAudienceCredentials | undefined,
): SceniusTopicSlug[] {
  if (!cred || cred.researchPending) return ["church"];
  const chips: SceniusTopicSlug[] = [];
  const segs = cred.segments;
  for (const slug of TOPIC_SLUGS_FOR_EXTRAS) {
    const segKey = SEG_MAP[slug];
    const tier = strengthRank(segs[segKey]);
    if (tier >= STRENGTH_RANK.moderate) chips.push(slug);
  }
  if (chips.length > 0) return chips;
  const order: AudienceSegment[] = ["churches", "nonprofits", "institutions"];
  let bestK: AudienceSegment | null = null;
  let bestR = -1;
  for (const k of order) {
    const r = strengthRank(segs[k]);
    if (r > bestR) {
      bestR = r;
      bestK = k;
    }
  }
  const inv: Record<AudienceSegment, SceniusTopicSlug> = {
    churches: "church",
    nonprofits: "nonprofit",
    institutions: "institution",
  };
  return [bestK ? inv[bestK] : "church"];
}

export interface SceniusV3AudienceCredentialsPayload {
  segments: Partial<Record<AudienceSegment, AudienceCredentialStrength>>;
  summaries: Partial<Record<AudienceSegment, string>>;
}

export interface SceniusV3GraphNode extends SimulationNodeDatum {
  id: string;
  name: string;
  role: string;
  /** Empty string for field / capacity nodes. */
  imageUrl: string;
  topics: string[];
  researchPending: boolean;
  audienceCredentials: SceniusV3AudienceCredentialsPayload;
  radius: number;
}

export interface SceniusV3GraphLink {
  source: string | SceniusV3GraphNode;
  target: string | SceniusV3GraphNode;
  value: number;
}

export function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildLeadersFromMovementVoices(): SceniusV3GraphNode[] {
  return MOVEMENT_VOICES.map((v: VoiceGraphVoice) => {
    const cred = getVoiceAudienceCredentials(v.id);
    const researchPending = Boolean(cred?.researchPending);
    const segments = { ...(cred?.segments ?? {}) };
    const summaries = { ...(cred?.summaryBySegment ?? {}) };
    return {
      id: v.id,
      name: v.name,
      role: v.title,
      imageUrl: v.imageSrc,
      topics: topicsForCredentials(cred),
      researchPending,
      audienceCredentials: { segments, summaries },
      radius: 20,
    };
  });
}

export function buildCompleteGraphLinks(
  nodes: SceniusV3GraphNode[],
): SceniusV3GraphLink[] {
  const links: SceniusV3GraphLink[] = [];
  const n = nodes.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      links.push({
        source: nodes[i].id,
        target: nodes[j].id,
        value: 1,
      });
    }
  }
  return links;
}

export function generateGraphData(
  leaders: SceniusV3GraphNode[],
): { nodes: SceniusV3GraphNode[]; links: SceniusV3GraphLink[] } {
  const rng = mulberry32(SCIENIUS_V3_SEED >>> 0);
  const nodes = leaders.map((l) => ({ ...l }));
  const extraCount = Math.max(0, TARGET_TOTAL_NODES - leaders.length);
  const ti = TOPIC_SLUGS_FOR_EXTRAS.length;
  for (let i = 0; i < extraCount; i++) {
    const topicSlug =
      TOPIC_SLUGS_FOR_EXTRAS[Math.floor(rng() * ti)] ?? "church";
    nodes.push({
      id: `extra-${i}`,
      name: "",
      role: "",
      imageUrl: "",
      topics: [topicSlug],
      researchPending: false,
      audienceCredentials: { segments: {}, summaries: {} },
      radius: 8 + rng() * 8,
    });
  }
  const links = buildCompleteGraphLinks(nodes);
  return { nodes, links };
}

/**
 * Elliptical golden spiral + deterministic jitter — same as v3 `seedNodePositions`.
 */
export function seedNodePositions(
  nodes: SceniusV3GraphNode[],
  width: number,
  height: number,
): void {
  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.49;
  const ry = height * 0.44;
  const n = nodes.length;
  const golden = 2.39996322972865332;
  const jitterRng = mulberry32((SCIENIUS_V3_SEED ^ 0x85ebca6b) >>> 0);
  for (let i = 0; i < n; i++) {
    const d = nodes[i];
    const angle = i * golden + (jitterRng() - 0.5) * 0.62;
    const t = Math.sqrt((i + 0.5) / n);
    const hubPull = d.imageUrl ? 0.68 : 1.06;
    const radial = t * hubPull * (0.86 + jitterRng() * 0.26);
    d.x = cx + Math.cos(angle) * rx * radial;
    d.y = cy + Math.sin(angle) * ry * radial;
  }
}

export function isPortraitNode(n: SceniusV3GraphNode | undefined): boolean {
  return Boolean(n?.imageUrl);
}

export function matchesAudienceFilters(
  d: SceniusV3GraphNode,
  activeAudienceFilters: ReadonlySet<AudienceSegment>,
): boolean {
  if (activeAudienceFilters.size === 0) return true;
  if (!d.imageUrl) return false;
  if (d.researchPending) return true;
  const cred = d.audienceCredentials;
  if (!cred?.segments) return false;
  const segs = cred.segments;
  for (const seg of activeAudienceFilters) {
    if (strengthMeetsThreshold(segs[seg])) return true;
  }
  return false;
}

export function linkHighlightsPortraitHover(
  l: SceniusV3GraphLink,
  hoveredPortraitId: string | null,
): boolean {
  if (!hoveredPortraitId) return false;
  const a = l.source as SceniusV3GraphNode;
  const b = l.target as SceniusV3GraphNode;
  if (!a || !b || typeof a === "string" || typeof b === "string") return false;
  if (!isPortraitNode(a) || !isPortraitNode(b)) return false;
  return a.id === hoveredPortraitId || b.id === hoveredPortraitId;
}

export const OPACITY_EXTRA_IDLE = 0.42;
export const OPACITY_EXTRA_HOVER = 0.1;
export const OPACITY_EXTRA_FILTER = 0.2;
export const OPACITY_PORTRAIT_DIM_FILTER = 0.32;
