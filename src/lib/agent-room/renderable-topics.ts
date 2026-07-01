/**
 * Renderable topics — SSOT for speak-and-show (G4/G5/D4).
 *
 * Referenced by: move-classifier hints, host prompt sync, client safety net,
 * and orchestration docs (must name this module when enumerating topics).
 */
import type { ComponentId } from "./stream-chunk";

/** Topics where the host must render the canonical sheet, not re-author facts in prose. */
export const RENDERABLE_TOPIC_IDS = [
  "about",
  "pricing",
  "contact",
  "path",
  "founders",
  "faq",
  "safety",
  "safety_flow",
  "leader",
] as const;

export type RenderableTopicId = (typeof RENDERABLE_TOPIC_IDS)[number];

/** Engine `ComponentId` for each renderable topic (`show_*` tool target). */
export const RENDERABLE_TOPIC_COMPONENT: Record<RenderableTopicId, ComponentId> = {
  about: "about",
  pricing: "pricing",
  contact: "contact",
  path: "path",
  founders: "founders",
  faq: "faq",
  safety: "safety",
  safety_flow: "safetyFlow",
  leader: "leader",
};

/** Chip labels → render component when expanded drawer uses speak-and-show (G4). */
export const OPENING_CHIP_RENDER_COMPONENT: Partial<Record<string, ComponentId>> = {
  "About Movemental": "about",
  "What does it cost?": "pricing",
  "Get in touch": "contact",
};

const TOPIC_PATTERNS: ReadonlyArray<{ topic: RenderableTopicId; re: RegExp }> = [
  { topic: "pricing", re: /\b(cost|price|pricing|afford|how much|tier|plan)\b/i },
  { topic: "about", re: /\b(what(?:'s| is) movemental|about movemental|tell me about movemental|do you do)\b/i },
  { topic: "contact", re: /\b(contact|talk to|get in touch|reach|email you|speak to)\b/i },
  { topic: "path", re: /\b(path|whole path|how.*work|stages?|journey|sandbox|training|technology)\b/i },
  { topic: "founders", re: /\b(founders?|who (is )?behind|who runs|team)\b/i },
  { topic: "faq", re: /\b(faq|philosophy|stance on ai|common question)\b/i },
  { topic: "safety", re: /\b(safety|charter|handbook|ratif)\b/i },
  { topic: "safety_flow", re: /\b(get a clear|where (do i|should i) start|map (it|where)|assess|next step)\b/i },
  { topic: "leader", re: /\b(leader profile|this leader|who is [a-z]+)\b/i },
];

/** Infer a renderable topic from visitor text (user message or chip utterance). */
export function inferRenderableTopic(text: string): RenderableTopicId | null {
  const t = text.trim();
  if (!t) return null;
  for (const { topic, re } of TOPIC_PATTERNS) {
    if (re.test(t)) return topic;
  }
  return null;
}

export function renderableTopicToComponent(topic: RenderableTopicId): ComponentId {
  return RENDERABLE_TOPIC_COMPONENT[topic];
}

/** Quantitative / contact facts that must live on the sheet, not in thread prose (G4). */
export function containsReauthoredFacts(prose: string): boolean {
  return /[$@]|\b\d{2,}\b/.test(prose);
}
