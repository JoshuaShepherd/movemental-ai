import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  OnboardingTasks,
  OnboardingTasksCreate,
  OnboardingTasksUpdate,
  OnboardingTasksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const onboardingTasksKeys = {
  all: ["onboardingTasks"] as const,
  lists: () => [...onboardingTasksKeys.all, "list"] as const,
  list: (filters?: OnboardingTasksFilters) => [...onboardingTasksKeys.lists(), filters] as const,
  details: () => [...onboardingTasksKeys.all, "detail"] as const,
  detail: (id: string) => [...onboardingTasksKeys.details(), id] as const,
};

// ---- Fetch Helpers ----

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error?.message ?? "Request failed");
  }
  return json.data;
}

// ---- Hooks ----

export function useOnboardingTasksList(filters?: OnboardingTasksFilters) {
  return useQuery({
    queryKey: onboardingTasksKeys.list(filters),
    queryFn: () =>
      fetchApi<OnboardingTasks[]>(`/api/simplified/onboarding-tasks${buildQueryString(filters)}`),
  });
}

export function useOnboardingTasks(id: string) {
  return useQuery({
    queryKey: onboardingTasksKeys.detail(id),
    queryFn: () =>
      fetchApi<OnboardingTasks>(`/api/simplified/onboarding-tasks?id=${id}`),
    enabled: !!id,
  });
}

export function useOnboardingTasksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OnboardingTasksCreate) =>
      fetchApi<OnboardingTasks>(`/api/simplified/onboarding-tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingTasksKeys.lists() });
    },
  });
}

export function useOnboardingTasksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: OnboardingTasksUpdate & { id: string }) =>
      fetchApi<OnboardingTasks>(`/api/simplified/onboarding-tasks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: onboardingTasksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: onboardingTasksKeys.detail(variables.id),
      });
    },
  });
}

export function useOnboardingTasksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/onboarding-tasks?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingTasksKeys.lists() });
    },
  });
}
