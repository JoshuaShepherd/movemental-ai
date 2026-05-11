import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyArtifactVersions,
  SafetyArtifactVersionsCreate,
  SafetyArtifactVersionsUpdate,
  SafetyArtifactVersionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyArtifactVersionsKeys = {
  all: ["safetyArtifactVersions"] as const,
  lists: () => [...safetyArtifactVersionsKeys.all, "list"] as const,
  list: (filters?: SafetyArtifactVersionsFilters) => [...safetyArtifactVersionsKeys.lists(), filters] as const,
  details: () => [...safetyArtifactVersionsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyArtifactVersionsKeys.details(), id] as const,
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

export function useSafetyArtifactVersionsList(filters?: SafetyArtifactVersionsFilters) {
  return useQuery({
    queryKey: safetyArtifactVersionsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyArtifactVersions[]>(`/api/simplified/safety-artifact-versions${buildQueryString(filters)}`),
  });
}

export function useSafetyArtifactVersions(id: string) {
  return useQuery({
    queryKey: safetyArtifactVersionsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyArtifactVersions>(`/api/simplified/safety-artifact-versions?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyArtifactVersionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyArtifactVersionsCreate) =>
      fetchApi<SafetyArtifactVersions>(`/api/simplified/safety-artifact-versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactVersionsKeys.lists() });
    },
  });
}

export function useSafetyArtifactVersionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyArtifactVersionsUpdate & { id: string }) =>
      fetchApi<SafetyArtifactVersions>(`/api/simplified/safety-artifact-versions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactVersionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyArtifactVersionsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyArtifactVersionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-artifact-versions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactVersionsKeys.lists() });
    },
  });
}
