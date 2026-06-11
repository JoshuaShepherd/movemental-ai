import { SAFETY_CHARTER_DRAFTS } from "@/lib/agent-room/data/safety-charter-drafts";

/** Five charter layers seeded on Safety dashboard provision. */
export const SAFETY_ARTIFACT_SEEDS = [
  { slug: "statement", title: "Statement", kind: "statement", draftKey: "statement" as const },
  { slug: "policy", title: "Policy", kind: "policy", draftKey: "policy" as const },
  { slug: "context", title: "Context", kind: "context", draftKey: "context" as const },
  { slug: "rules", title: "Rules", kind: "rules", draftKey: "rules" as const },
  {
    slug: "response-plans",
    title: "Response Plans",
    kind: "response_plans",
    draftKey: "responsePlans" as const,
  },
] as const;

export function seedBodyMd(draftKey: (typeof SAFETY_ARTIFACT_SEEDS)[number]["draftKey"]): string {
  return SAFETY_CHARTER_DRAFTS[draftKey] ?? "";
}
