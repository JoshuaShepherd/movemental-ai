import { isBlockingRequirement } from "@/lib/onboarding/state";
import { LEADER_ONBOARDING_STEPS } from "@/lib/onboarding/leader-onboarding";
import { ONBOARDING_TASKS } from "@/lib/onboarding/tasks";
import type { MovementLeaderRow } from "@/lib/movement-leaders/movement-leaders.server";

/** Payload slice from `buildOnboardingStatePayload` — enough to score blocking tasks. */
export type OrgOnboardingProgressInput = {
  organization: { onboarding_completed_at: string | null };
  tasks: Array<{ key: string; dbStatus: string | null }>;
  leaderPaymentsEnabled: boolean;
};

/**
 * Customer (organization) onboarding completion for the shell rail (0–100).
 * Returns `null` when onboarding is finished or there is nothing to show.
 */
export function computeOrgCustomerOnboardingProgressPercent(
  payload: OrgOnboardingProgressInput,
): number | null {
  if (payload.organization.onboarding_completed_at) return null;

  const blocking = ONBOARDING_TASKS.filter((def) =>
    isBlockingRequirement(def, payload.leaderPaymentsEnabled),
  );
  if (blocking.length === 0) return null;

  let done = 0;
  for (const def of blocking) {
    const t = payload.tasks.find((x) => x.key === def.key);
    const st = t?.dbStatus;
    if (st === "completed" || st === "skipped") done += 1;
  }

  if (done >= blocking.length) return null;

  return Math.round((done / blocking.length) * 100);
}

function reflectedUnderstandingDraft(leader: MovementLeaderRow): string {
  const raw = leader.movement_leader_data?.reflected_understanding;
  return typeof raw === "string" ? raw.trim() : "";
}

/**
 * Leader workspace onboarding completion (7 steps). Returns `null` when fully published.
 */
export function computeLeaderOnboardingProgressPercentSync(
  leader: MovementLeaderRow,
  signedVoiceCommitments: boolean,
): number | null {
  if (leader.public_page_published_at) return null;

  const ru = reflectedUnderstandingDraft(leader);
  const reflectStepSatisfied =
    Boolean(leader.reflected_understanding_endorsed_at) || ru.length === 0;

  const stepsComplete = [
    Boolean(leader.bio_short?.trim() && leader.bio_long?.trim()),
    Boolean(leader.photo_url?.trim()),
    Boolean((leader.personal_piece ?? "").trim().length >= 80),
    reflectStepSatisfied,
    signedVoiceCommitments,
    Boolean(leader.public_page_approved_at),
    Boolean(leader.public_page_published_at),
  ];

  const done = stepsComplete.filter(Boolean).length;
  const total = LEADER_ONBOARDING_STEPS.length;

  if (done >= total) return null;

  return Math.round((done / total) * 100);
}
