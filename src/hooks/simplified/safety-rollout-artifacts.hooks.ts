import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyRolloutArtifacts,
  SafetyRolloutArtifactsCreate,
  SafetyRolloutArtifactsUpdate,
  SafetyRolloutArtifactsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyRolloutArtifactsKeys = {
  all: ["safetyRolloutArtifacts"] as const,
  lists: () => [...safetyRolloutArtifactsKeys.all, "list"] as const,
  list: (filters?: SafetyRolloutArtifactsFilters) => [...safetyRolloutArtifactsKeys.lists(), filters] as const,
  details: () => [...safetyRolloutArtifactsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyRolloutArtifactsKeys.details(), id] as const,
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

export function useSafetyRolloutArtifactsList(filters?: SafetyRolloutArtifactsFilters) {
  return useQuery({
    queryKey: safetyRolloutArtifactsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyRolloutArtifacts[]>(`/api/simplified/safety-rollout-artifacts${buildQueryString(filters)}`),
  });
}

export function useSafetyRolloutArtifacts(id: string) {
  return useQuery({
    queryKey: safetyRolloutArtifactsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyRolloutArtifacts>(`/api/simplified/safety-rollout-artifacts?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyRolloutArtifactsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyRolloutArtifactsCreate) =>
      fetchApi<SafetyRolloutArtifacts>(`/api/simplified/safety-rollout-artifacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyRolloutArtifactsKeys.lists() });
    },
  });
}

export function useSafetyRolloutArtifactsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyRolloutArtifactsUpdate & { id: string }) =>
      fetchApi<SafetyRolloutArtifacts>(`/api/simplified/safety-rollout-artifacts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyRolloutArtifactsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyRolloutArtifactsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyRolloutArtifactsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-rollout-artifacts?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyRolloutArtifactsKeys.lists() });
    },
  });
}
