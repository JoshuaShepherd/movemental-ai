/**
 * SafeStart workspace manifest — the canonical mapping from human-readable
 * workspace slugs (e.g. "drafting") to the Stitch template ID that backs
 * each workspace fixture, plus display metadata for the sidebar, home
 * progress strip, and per-workspace header.
 *
 * SafeStart is the two-week engagement that ends with a ratified AI
 * Organizational Guidebook. The five workspaces below are the sequence the
 * engagement moves through. The Guidebook itself is a separate artifact
 * surface at `/safestart/guidebook` — it is not in this manifest because it
 * is not backed by a single Stitch fixture; it composes the five Guidebook
 * sections (Statement, Policy, Context, Rules, Response Plans) into one
 * editorial document.
 */

export type SafeStartWorkspaceSlug =
  | "drafting"
  | "review"
  | "editorial-comments"
  | "ratification"
  | "steady-state";

export interface SafeStartWorkspaceEntry {
  slug: SafeStartWorkspaceSlug;
  /** Display order (1-based) for the home progress strip. */
  order: number;
  /** Display name in nav, home strip, and header. */
  name: string;
  /** Brief one-liner shown in the sidebar/home. */
  description: string;
  /** Sentence describing what the workspace produces (used in the header lede). */
  produces: string;
  /** Stitch template ID under category="safety". `null` when no fixture exists. */
  templateId: string | null;
}

export const SAFESTART_WORKSPACES: readonly SafeStartWorkspaceEntry[] = [
  {
    slug: "drafting",
    order: 1,
    name: "Drafting",
    description:
      "Draft the AI Organizational Guidebook across all five sections.",
    produces:
      "A first-draft Guidebook covering Statement, Policy, Context, Rules, and Response Plans — written before async review opens.",
    templateId: "safestart_dashboard_drafting_async_review",
  },
  {
    slug: "review",
    order: 2,
    name: "Async review",
    description:
      "Open the Guidebook draft for asynchronous review by the whole team.",
    produces:
      "Every section of the Guidebook open for asynchronous review — comments collected before editorial reconciliation.",
    templateId: "safestart_dashboard_drafting_async_review",
  },
  {
    slug: "editorial-comments",
    order: 3,
    name: "Editorial comments",
    description:
      "Reconcile reviewer comments. Decide what changes the Guidebook adopts.",
    produces:
      "Comment reconciliation — every reviewer note marked as adopted, modified, or rejected, with rationale.",
    templateId: "safestart_dashboard_editorial_comment_view_1",
  },
  {
    slug: "ratification",
    order: 4,
    name: "Board ratification",
    description:
      "Present the reconciled Guidebook to the board. Record the ratification vote.",
    produces:
      "A ratified Guidebook — board vote recorded, version pinned, publication block populated.",
    templateId: "safestart_dashboard_ratification_phase",
  },
  {
    slug: "steady-state",
    order: 5,
    name: "Steady state",
    description:
      "After ratification: how the Guidebook lives in the organization.",
    produces:
      "Ongoing operations — review cadence, change-management process, and the Guidebook in steady-state organizational use.",
    templateId: "safestart_dashboard_editorial_steady_state",
  },
] as const;

const SLUG_INDEX: Record<SafeStartWorkspaceSlug, SafeStartWorkspaceEntry> =
  SAFESTART_WORKSPACES.reduce(
    (acc, entry) => {
      acc[entry.slug] = entry;
      return acc;
    },
    {} as Record<SafeStartWorkspaceSlug, SafeStartWorkspaceEntry>,
  );

export function getSafeStartWorkspace(
  slug: string,
): SafeStartWorkspaceEntry | undefined {
  return SLUG_INDEX[slug as SafeStartWorkspaceSlug];
}

export function getNextSafeStartWorkspace(
  slug: SafeStartWorkspaceSlug,
): SafeStartWorkspaceEntry | undefined {
  const idx = SAFESTART_WORKSPACES.findIndex((w) => w.slug === slug);
  if (idx < 0 || idx >= SAFESTART_WORKSPACES.length - 1) return undefined;
  return SAFESTART_WORKSPACES[idx + 1];
}

/**
 * AI Organizational Guidebook — the five-layer architecture from the Safety
 * field guide. Each section is backed by a row in `safety_artifacts` with
 * a matching `kind` value; versions live in `safety_artifact_versions`.
 */

export type GuidebookSectionSlug =
  | "statement"
  | "policy"
  | "context"
  | "rules"
  | "response-plans";

export interface GuidebookSectionEntry {
  slug: GuidebookSectionSlug;
  /** Matches `safety_artifacts.kind`. */
  artifactKind: string;
  /** Number rendered in italic amber beside the section title. */
  number: string;
  name: string;
  /** One-line description that sets the section's purpose. */
  description: string;
}

export const GUIDEBOOK_SECTIONS: readonly GuidebookSectionEntry[] = [
  {
    slug: "statement",
    artifactKind: "guidebook_statement",
    number: "01",
    name: "Statement",
    description:
      "The plain-language commitment your organization is making about AI — what AI is for, what it is not, and to whom you are accountable.",
  },
  {
    slug: "policy",
    artifactKind: "guidebook_policy",
    number: "02",
    name: "Policy",
    description:
      "The operational rules the Statement implies — what staff may do, what requires review, and what is refused outright.",
  },
  {
    slug: "context",
    artifactKind: "guidebook_context",
    number: "03",
    name: "Context",
    description:
      "The factual picture your AI assistants need to act inside your organization — mission, audiences, partners, constraints, sensitivities.",
  },
  {
    slug: "rules",
    artifactKind: "guidebook_rules",
    number: "04",
    name: "Rules",
    description:
      "The concrete, enforceable instructions — named refusals, escalation paths, data-handling boundaries. The Policy made literal.",
  },
  {
    slug: "response-plans",
    artifactKind: "guidebook_response_plans",
    number: "05",
    name: "Response plans",
    description:
      "What you do when something goes wrong — incident response, drift detection, periodic review, and end-of-life handling.",
  },
] as const;

const GUIDEBOOK_INDEX: Record<GuidebookSectionSlug, GuidebookSectionEntry> =
  GUIDEBOOK_SECTIONS.reduce(
    (acc, entry) => {
      acc[entry.slug] = entry;
      return acc;
    },
    {} as Record<GuidebookSectionSlug, GuidebookSectionEntry>,
  );

export function getGuidebookSection(
  slug: string,
): GuidebookSectionEntry | undefined {
  return GUIDEBOOK_INDEX[slug as GuidebookSectionSlug];
}

/**
 * Ratification multi-step flow — the six surfaces in the Stitch
 * `ratification-recording` subgroup. The Board Ratification workspace in
 * `SAFESTART_WORKSPACES` is the entry point; this manifest powers the
 * sub-flow at `/safestart/ratification/<step>` that walks through each
 * surface in order.
 */

export type RatificationStepSlug =
  | "preparation"
  | "recording-1"
  | "recording-2"
  | "revised-statement"
  | "signing"
  | "confirmation";

export interface RatificationStepEntry {
  slug: RatificationStepSlug;
  /** 1-based display order. */
  order: number;
  name: string;
  description: string;
  /** Lede paragraph describing what this step produces. */
  produces: string;
  /** Stitch template ID under category="safety". */
  templateId: string;
}

export const RATIFICATION_STEPS: readonly RatificationStepEntry[] = [
  {
    slug: "preparation",
    order: 1,
    name: "Preparation",
    description: "Prepare the Guidebook draft and ratification agenda before the board meeting.",
    produces:
      "A ratification-ready Guidebook draft, an agenda outline, and the documented scope of what the board is being asked to approve.",
    templateId: "safestart_dashboard_ratification_phase",
  },
  {
    slug: "recording-1",
    order: 2,
    name: "Recording — Part 1",
    description: "Open the ratification session. Record the opening reading and discussion.",
    produces:
      "A recorded record of the opening reading, framing, and initial board discussion of the Guidebook.",
    templateId: "board_ratification_recording_safestart_dashboard_1",
  },
  {
    slug: "recording-2",
    order: 3,
    name: "Recording — Part 2",
    description: "Continue the session. Record the section-by-section walkthrough and proposed revisions.",
    produces:
      "A continued record of the board working through the Guidebook section by section, with proposed revisions captured.",
    templateId: "board_ratification_recording_safestart_dashboard_2",
  },
  {
    slug: "revised-statement",
    order: 4,
    name: "Revised statement",
    description: "Apply the board's revisions to the Statement section before the formal vote.",
    produces:
      "An amended Statement section reflecting board revisions, ready for executive signing.",
    templateId: "safestart_dashboard_revised_statement_view_revised_statement",
  },
  {
    slug: "signing",
    order: 5,
    name: "Executive signing",
    description: "The executive signs the ratified Guidebook on behalf of the organization.",
    produces:
      "An executive signature on the ratified Guidebook — the formal organizational commitment.",
    templateId: "executive_signing_movemental_editorial",
  },
  {
    slug: "confirmation",
    order: 6,
    name: "Confirmation",
    description: "Confirm ratification. Capture the version pin, signatures, and publication block.",
    produces:
      "A ratification confirmation: version pinned, signatures captured, publication block populated. The Guidebook is now the live operating document.",
    templateId: "ratification_confirmation_movemental_editorial",
  },
] as const;

const RATIFICATION_INDEX: Record<RatificationStepSlug, RatificationStepEntry> =
  RATIFICATION_STEPS.reduce(
    (acc, entry) => {
      acc[entry.slug] = entry;
      return acc;
    },
    {} as Record<RatificationStepSlug, RatificationStepEntry>,
  );

export function getRatificationStep(
  slug: string,
): RatificationStepEntry | undefined {
  return RATIFICATION_INDEX[slug as RatificationStepSlug];
}

export function getNextRatificationStep(
  slug: RatificationStepSlug,
): RatificationStepEntry | undefined {
  const idx = RATIFICATION_STEPS.findIndex((s) => s.slug === slug);
  if (idx < 0 || idx >= RATIFICATION_STEPS.length - 1) return undefined;
  return RATIFICATION_STEPS[idx + 1];
}

export function getPreviousRatificationStep(
  slug: RatificationStepSlug,
): RatificationStepEntry | undefined {
  const idx = RATIFICATION_STEPS.findIndex((s) => s.slug === slug);
  if (idx <= 0) return undefined;
  return RATIFICATION_STEPS[idx - 1];
}
