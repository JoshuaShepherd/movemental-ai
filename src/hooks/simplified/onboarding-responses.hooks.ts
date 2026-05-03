import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  OnboardingResponses,
  OnboardingResponsesCreate,
  OnboardingResponsesUpdate,
  OnboardingResponsesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const onboardingResponsesKeys = {
  all: ["onboardingResponses"] as const,
  lists: () => [...onboardingResponsesKeys.all, "list"] as const,
  list: (filters?: OnboardingResponsesFilters) => [...onboardingResponsesKeys.lists(), filters] as const,
  details: () => [...onboardingResponsesKeys.all, "detail"] as const,
  detail: (id: string) => [...onboardingResponsesKeys.details(), id] as const,
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

export function useOnboardingResponsesList(filters?: OnboardingResponsesFilters) {
  return useQuery({
    queryKey: onboardingResponsesKeys.list(filters),
    queryFn: () =>
      fetchApi<OnboardingResponses[]>(`/api/simplified/onboarding-responses${buildQueryString(filters)}`),
  });
}

export function useOnboardingResponses(id: string) {
  return useQuery({
    queryKey: onboardingResponsesKeys.detail(id),
    queryFn: () =>
      fetchApi<OnboardingResponses>(`/api/simplified/onboarding-responses?id=${id}`),
    enabled: !!id,
  });
}

export function useOnboardingResponsesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OnboardingResponsesCreate) =>
      fetchApi<OnboardingResponses>(`/api/simplified/onboarding-responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponsesKeys.lists() });
    },
  });
}

export function useOnboardingResponsesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: OnboardingResponsesUpdate & { id: string }) =>
      fetchApi<OnboardingResponses>(`/api/simplified/onboarding-responses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: onboardingResponsesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: onboardingResponsesKeys.detail(variables.id),
      });
    },
  });
}

export function useOnboardingResponsesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/onboarding-responses?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponsesKeys.lists() });
    },
  });
}
