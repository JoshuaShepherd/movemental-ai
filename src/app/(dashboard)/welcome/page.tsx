"use client";

import { OnboardingChecklist } from "@/components/onboarding/onboarding-checklist";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingState } from "@/hooks/onboarding/use-onboarding-state";

export default function WelcomePage() {
  const organizationSlug = useDashboardOrganizationSlug();
  const { data, isLoading, isError, error } = useOnboardingState(organizationSlug || null);

  if (isLoading || !data) {
    return isError ? (
      <p className="text-sm text-muted-foreground">{error?.message ?? "Could not load onboarding."}</p>
    ) : (
      <div className="h-40 animate-pulse rounded-xl bg-card" aria-hidden />
    );
  }

  return (
    <div className="pb-16 pt-2">
      <OnboardingChecklist data={data} variant="full" />
    </div>
  );
}
