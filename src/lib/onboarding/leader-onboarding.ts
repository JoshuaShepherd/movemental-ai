/** Leader-only onboarding under `/onboarding/leader/:step` (separate from org checklist). */

export const LEADER_ONBOARDING_STEPS = [
  "confirm-bio",
  "upload-headshot",
  "personal-piece",
  "review-reflected-understanding",
  "sign-commitments",
  "review-public-page",
  "publish",
] as const;

export type LeaderOnboardingStep = (typeof LEADER_ONBOARDING_STEPS)[number];

export const LEADER_ONBOARDING_STEP_SET = new Set<string>(LEADER_ONBOARDING_STEPS);

export function isLeaderOnboardingStep(step: string): step is LeaderOnboardingStep {
  return LEADER_ONBOARDING_STEP_SET.has(step);
}

export function leaderOnboardingHref(step: LeaderOnboardingStep): string {
  return `/onboarding/leader/${step}`;
}

/** Next step route, or `null` when `current` is last — caller should use `/leader` or similar. */
export function nextLeaderOnboardingHref(current: LeaderOnboardingStep): string | null {
  const i = LEADER_ONBOARDING_STEPS.indexOf(current);
  if (i < 0 || i >= LEADER_ONBOARDING_STEPS.length - 1) return null;
  return leaderOnboardingHref(LEADER_ONBOARDING_STEPS[i + 1]!);
}
