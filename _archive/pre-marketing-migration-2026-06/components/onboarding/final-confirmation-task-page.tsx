"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingState } from "@/hooks/onboarding/use-onboarding-state";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";

export function FinalConfirmationTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { data } = useOnboardingState(slug || null);
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("final_confirmation");

  const cohort = data?.organization.cohort_start_date
    ? new Date(data.organization.cohort_start_date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "your cohort start date (set in the commitment step)";

  const nextHref = data?.organization.postOnboardingHref ?? "/sandboxlive";

  return (
    <OnboardingTaskShell
      taskKey="final_confirmation"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      afterCompleteHref={nextHref}
    >
      <div className="rounded-xl bg-section px-4 py-5 text-sm text-muted-foreground">
        <p className="text-foreground">
          Onboarding is done. The cohort work begins in your product workspace — we will send you there next.
        </p>
        <p className="mt-3">
          Your cohort kickoff is scheduled for <span className="font-medium text-foreground">{cohort}</span>. Day one
          lives in <span className="font-medium text-foreground">{nextHref}</span>.
        </p>
      </div>
    </OnboardingTaskShell>
  );
}
