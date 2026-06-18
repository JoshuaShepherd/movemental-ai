import { SAFETY_CHARTER_DRAFTS } from "@/lib/agent-room/data/safety-charter-drafts";

/** Canonical five Guidebook layers — one `safety_artifacts` row each. */
export const GUIDEBOOK_LAYER_TAXONOMY = [
  {
    layerOrder: 1,
    kind: "statement",
    slug: "statement",
    title: "Statement",
    deck: "What we believe about AI in our mission.",
    draftKey: "statement" as const,
  },
  {
    layerOrder: 2,
    kind: "policy",
    slug: "policy",
    title: "Policy",
    deck: "What staff may do, what requires review, and what we refuse.",
    draftKey: "policy" as const,
  },
  {
    layerOrder: 3,
    kind: "context",
    slug: "context",
    title: "Context",
    deck: "The factual picture assistants need to act inside our organization.",
    draftKey: "context" as const,
  },
  {
    layerOrder: 4,
    kind: "rules",
    slug: "rules",
    title: "Rules",
    deck: "Named refusals, escalation paths, and enforceable boundaries.",
    draftKey: "rules" as const,
  },
  {
    layerOrder: 5,
    kind: "response_plans",
    slug: "response-plans",
    title: "Response Plans",
    deck: "What we do when something goes wrong.",
    draftKey: "responsePlans" as const,
  },
] as const;

export type GuidebookLayerKind = (typeof GUIDEBOOK_LAYER_TAXONOMY)[number]["kind"];

export function seedBodyMdForLayer(draftKey: (typeof GUIDEBOOK_LAYER_TAXONOMY)[number]["draftKey"]): string {
  return SAFETY_CHARTER_DRAFTS[draftKey] ?? "";
}

/** Checklist templates per layer (Field Guide completeness card). */
export const LAYER_CHECKLIST_TEMPLATES: Record<GuidebookLayerKind, readonly string[]> = {
  statement: [
    "Mission alignment clause",
    "Posture statement",
    "Category-of-care clause",
    "Theological/ethical grounding",
    "Scope clause",
    "Review cadence",
    "Senior-leadership signatures",
    "Board ratification",
  ],
  policy: [
    "Permitted use cases defined",
    "Review-required workflows",
    "Prohibited uses named",
    "Data-handling boundaries",
    "Third-party tool policy",
    "Staff acknowledgment process",
  ],
  context: [
    "Mission and audiences documented",
    "Partner and vendor landscape",
    "Sensitivity map",
    "Terminology glossary",
    "Constraints and non-negotiables",
  ],
  rules: [
    "Named refusals listed",
    "Escalation paths defined",
    "Human-in-the-loop triggers",
    "Logging and audit expectations",
    "Incident notification chain",
  ],
  response_plans: [
    "Incident response runbook",
    "Drift detection cadence",
    "Periodic review schedule",
    "End-of-life / deprecation handling",
    "Communication templates",
  ],
};

export const ROLLOUT_ARTIFACT_TEMPLATES = [
  { kind: "board_packet" as const, title: "Board packet" },
  { kind: "staff_announcement" as const, title: "Staff announcement" },
  { kind: "constituent_message" as const, title: "Constituent message" },
  { kind: "faq" as const, title: "FAQ" },
  { kind: "incident_briefing" as const, title: "Incident briefing" },
  { kind: "pre_engagement_framework" as const, title: "Pre-engagement framework" },
] as const;

export const DEFAULT_SAFETY_ROLES = [
  "lead_decider",
  "contributor",
  "senior_leader",
  "board_member",
  "staff",
  "new_hire",
] as const;

export const DEFAULT_SAFETY_AREAS = [
  "statement",
  "policy",
  "context",
  "rules",
  "response_plans",
  "comments",
  "exports",
] as const;
