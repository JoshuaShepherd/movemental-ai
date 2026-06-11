import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";

/**
 * Per-task title/description overrides for implementation_org onboarding.
 * Movement-leader tenants always use catalog copy from `tasks.ts`.
 */
const IMPLEMENTATION_ORG_TASK_COPY: Partial<
  Record<string, { title?: string; description?: string }>
> = {
  sign_agreement: {
    description:
      "Sign the implementation Memorandum of Understanding in the dashboard (typed electronic signature when you reach that step). Your signed agreements register updates automatically. Engagement (MSA / SOW) may still follow separately per your Movemental lead. Mark this step complete once the MOU is signed and any separate engagement steps your lead requires are satisfied.",
  },
  confirm_payment: {
    description:
      "Confirm that invoice or shared-checkout payment is arranged per your Statement of Work so procurement and finance stay aligned before kickoff.",
  },
  choose_cohort: {
    description:
      "Pick the cohort start date your executive team can sustain across programs, camps, and central operations. Adjust later with Movemental if board or seasonal constraints change.",
  },
  organization_profile: {
    description:
      "Legal name, domains, primary and escalation contacts, and time zone across your operating sites. This anchors inventory, policy scope, and handoffs between operations, programs, and development, keep it aligned with how your board expects accountability.",
  },
  orientation: {
    description:
      "Short orientation on what Movemental delivers for organizations: governance-ready artifacts, facilitated sequences, and inspectable AI use, without replacing formation leadership or donor relationships.",
  },
  corpus_review: {
    title: "Review your source & policy materials",
    description:
      "Books, policies, board decks, and operational documents we compiled for your workspace. Approve, flag omissions, and add material so assistants and templates stay grounded in what your organization actually publishes.",
  },
  affiliates_review: {
    description:
      "Camp partners, networks, vendors, and affiliations that shape policy boundaries and communications. Confirm what belongs so external references stay accurate for donors and programs.",
  },
  themes_review: {
    description:
      "Cross-cutting themes we see in your documents and communications. Correct or extend them so downstream drafting respects your operational and programmatic lanes.",
  },
  agent_test: {
    description:
      "Exercise your AI workspace with realistic governance and operations prompts, then note gaps before approval. Keep donor lists and youth-identifiable data out of unmanaged tools.",
  },
  platform_tour: {
    description:
      "Walk through your dashboard: program templates (Safety & Sandbox), onboarding status, and where Movemental expects operational owners to record completion.",
  },
  cohort_prep: {
    description:
      "Light prep before your facilitated sequence, who joins from programs, development, and operations, and what board-ready outputs you want by the end.",
  },
  final_confirmation: {
    description:
      "Confirm operational readiness: owners named, inventory current, and leadership aligned with the board-facing stance before marking onboarding complete.",
  },
  images_upload: {
    description:
      "Upload logos, site imagery, and leader headshots needed for board packets, templates, and public surfaces.",
  },
  brand_guidelines: {
    description:
      "Voice, terminology, and visual notes so assisted drafting matches how you speak to donors, families, and partners, without bypassing program approval for formation content.",
  },
};

export function presentOnboardingTaskForPersona(
  persona: DashboardPersona,
  taskKey: string,
  catalogTitle: string,
  catalogDescription: string,
): { title: string; description: string } {
  if (persona !== "implementation_org") {
    return { title: catalogTitle, description: catalogDescription };
  }
  const row = IMPLEMENTATION_ORG_TASK_COPY[taskKey];
  if (!row) return { title: catalogTitle, description: catalogDescription };
  return {
    title: row.title ?? catalogTitle,
    description: row.description ?? catalogDescription,
  };
}

export function implementationOrgPlaceholderBody(): { primary: string; secondary: string } {
  return {
    primary:
      "Complete this step with your Movemental contact, especially where it touches operational inventory, vendor records, or cross-team approvals.",
    secondary:
      "When the underlying work is finished, mark complete here so your executive team keeps one audit trail.",
  };
}

export function movementLeaderPlaceholderBody(): { primary: string; secondary: string } {
  return {
    primary:
      "This step's full UI is still shipping. Complete the work with your Movemental contact if needed, then mark complete here.",
    secondary: "",
  };
}
