export type OnboardingShellKind = "org" | "leader";

export function onboardingShellEditorialLabel(
  kind: OnboardingShellKind,
  progress: number,
): string {
  if (kind === "leader") {
    if (progress <= 25) return "Your reflection is being shaped";
    if (progress < 75) return "You're partway through your onboarding";
    return "You're nearly ready to publish.";
  }
  if (progress <= 25) return "Your path is being prepared";
  if (progress < 75) return "You're partway through";
  return "You're nearly ready to begin";
}
