"use client";

import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useOnboardingState } from "@/hooks/onboarding/use-onboarding-state";
import {
  implementationOrgPlaceholderBody,
  movementLeaderPlaceholderBody,
} from "@/lib/onboarding/onboarding-persona-present";
import { taskDefinitionByKey } from "@/lib/onboarding/tasks";

export function PlaceholderOnboardingStep({ taskKey }: { taskKey: string }) {
  const slug = useDashboardOrganizationSlug();
  const { data } = useOnboardingState(slug || null);
  const persona = data?.dashboardPersona ?? "movement_leader";
  const def = taskDefinitionByKey(taskKey);

  const impl = implementationOrgPlaceholderBody();
  const leader = movementLeaderPlaceholderBody();

  return (
    <OnboardingTaskShell
      taskKey={taskKey}
      title={def?.title ?? "Onboarding step"}
      description={
        def?.description ??
        "Complete this step with guidance from your Movemental contact, then mark it complete here."
      }
      estimatedMinutes={def?.estimatedMinutes ?? 5}
    >
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <p>
          {!def
            ? `No task definition matched “${taskKey}”. Tell Movemental support so we can fix the checklist wiring—meanwhile you can mark complete if the underlying work is done.`
            : persona === "implementation_org"
              ? impl.primary
              : leader.primary}
        </p>
        {def && persona === "implementation_org" && impl.secondary ? <p>{impl.secondary}</p> : null}
      </div>
    </OnboardingTaskShell>
  );
}
