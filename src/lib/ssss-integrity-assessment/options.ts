/** Likert labels (1–5 internally, but UI uses 0-indexed positions). */
export const LIKERT_LABELS = [
  "Not at all true",
  "Slightly true",
  "Partly true",
  "Mostly true",
  "Fully true",
] as const;

export type LikertLabel = (typeof LIKERT_LABELS)[number];

/** Audience context — harvested from the deprecated dual-intelligence diagnostic. */
export type AudienceContextId =
  | "movement_leader"
  | "church_ministry"
  | "nonprofit_mission"
  | "institution_other";

export const AUDIENCE_CONTEXT_OPTIONS: ReadonlyArray<{
  id: AudienceContextId;
  label: string;
}> = [
  { id: "movement_leader", label: "Movement leader, author, or teacher" },
  { id: "church_ministry", label: "Church or ministry" },
  { id: "nonprofit_mission", label: "Nonprofit or mission-driven organization" },
  { id: "institution_other", label: "Institution, network, or seminary" },
];
