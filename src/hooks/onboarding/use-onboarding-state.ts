"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function onboardingStateQueryKey(organizationSlug: string | null) {
  return ["onboarding-state", organizationSlug ?? "default"] as const;
}

export function useOnboardingState(organizationSlug: string | null) {
  const slug = organizationSlug?.trim() || null;
  const qs = slug ? `?org=${encodeURIComponent(slug)}` : "";
  return useQuery({
    queryKey: onboardingStateQueryKey(slug),
    queryFn: async () => {
      const res = await fetch(`/api/onboarding/state${qs}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: { message?: string } }).error?.message ?? "Failed to load onboarding.");
      }
      return (await res.json()) as {
        success: boolean;
        data: OnboardingStateResponse;
      };
    },
    select: (r) => r.data,
  });
}

export type OnboardingStateResponse = {
  userFirstName: string | null;
  organization: {
    id: string;
    name: string;
    slug: string;
    onboarding_completed_at: string | null;
    onboarding_started_at: string | null;
    cohort_start_date: string | null;
  };
  tasks: Array<{
    key: string;
    phase: string;
    title: string;
    description: string;
    estimatedMinutes: number;
    route: string;
    requirement: string;
    requiresMovementalPrep: boolean;
    dbStatus: string | null;
    uiStatus: string;
    completedAt: string | null;
  }>;
  phaseSummaries: Array<{ phase: string; completed: number; total: number; available: number }>;
  remainingMinutes: number;
  commitmentRemainingMinutes: number;
  leaderPaymentsEnabled: boolean;
  memberships: Array<{ organizationId: string; name: string; slug: string }>;
  activeSlug: string;
};

export function useCompleteOnboardingTask(organizationSlug: string | null) {
  const qc = useQueryClient();
  const slug = organizationSlug?.trim() || null;
  return useMutation({
    mutationFn: async (input: { taskKey: string; metadata?: Record<string, unknown> }) => {
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskKey: input.taskKey,
          metadata: input.metadata,
          organizationSlug: slug ?? undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: { message?: string } }).error?.message ?? "Could not update task.");
      }
      return res.json();
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: onboardingStateQueryKey(slug) });
    },
  });
}
