import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyArtifacts,
  SafetyArtifactsCreate,
  SafetyArtifactsUpdate,
  SafetyArtifactsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyArtifactsKeys = {
  all: ["safetyArtifacts"] as const,
  lists: () => [...safetyArtifactsKeys.all, "list"] as const,
  list: (filters?: SafetyArtifactsFilters) => [...safetyArtifactsKeys.lists(), filters] as const,
  details: () => [...safetyArtifactsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyArtifactsKeys.details(), id] as const,
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

export function useSafetyArtifactsList(filters?: SafetyArtifactsFilters) {
  return useQuery({
    queryKey: safetyArtifactsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyArtifacts[]>(`/api/simplified/safety-artifacts${buildQueryString(filters)}`),
  });
}

export function useSafetyArtifacts(id: string) {
  return useQuery({
    queryKey: safetyArtifactsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyArtifacts>(`/api/simplified/safety-artifacts?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyArtifactsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyArtifactsCreate) =>
      fetchApi<SafetyArtifacts>(`/api/simplified/safety-artifacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactsKeys.lists() });
    },
  });
}

export function useSafetyArtifactsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyArtifactsUpdate & { id: string }) =>
      fetchApi<SafetyArtifacts>(`/api/simplified/safety-artifacts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyArtifactsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyArtifactsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-artifacts?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactsKeys.lists() });
    },
  });
}
