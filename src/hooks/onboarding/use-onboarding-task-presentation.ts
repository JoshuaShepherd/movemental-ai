"use client";

import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { taskDefinitionByKey } from "@/lib/onboarding/tasks";

import { useOnboardingState } from "./use-onboarding-state";

/** Onboarding task title/description from API (persona-aware) with catalog fallback before hydration. */
export function useOnboardingTaskPresentation(taskKey: string) {
  const slug = useDashboardOrganizationSlug();
  const { data } = useOnboardingState(slug || null);
  const def = taskDefinitionByKey(taskKey);
  const fromApi = data?.tasks.find((t) => t.key === taskKey);

  return {
    title: fromApi?.title ?? def?.title ?? "",
    description: fromApi?.description ?? def?.description ?? "",
    estimatedMinutes: def?.estimatedMinutes ?? 0,
    /** Defaults to movement_leader before onboarding state hydrates. */
    dashboardPersona: data?.dashboardPersona ?? "movement_leader",
  };
}
