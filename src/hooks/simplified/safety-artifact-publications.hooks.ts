import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyArtifactPublications,
  SafetyArtifactPublicationsCreate,
  SafetyArtifactPublicationsUpdate,
  SafetyArtifactPublicationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyArtifactPublicationsKeys = {
  all: ["safetyArtifactPublications"] as const,
  lists: () => [...safetyArtifactPublicationsKeys.all, "list"] as const,
  list: (filters?: SafetyArtifactPublicationsFilters) => [...safetyArtifactPublicationsKeys.lists(), filters] as const,
  details: () => [...safetyArtifactPublicationsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyArtifactPublicationsKeys.details(), id] as const,
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

export function useSafetyArtifactPublicationsList(filters?: SafetyArtifactPublicationsFilters) {
  return useQuery({
    queryKey: safetyArtifactPublicationsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyArtifactPublications[]>(`/api/simplified/safety-artifact-publications${buildQueryString(filters)}`),
  });
}

export function useSafetyArtifactPublications(id: string) {
  return useQuery({
    queryKey: safetyArtifactPublicationsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyArtifactPublications>(`/api/simplified/safety-artifact-publications?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyArtifactPublicationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyArtifactPublicationsCreate) =>
      fetchApi<SafetyArtifactPublications>(`/api/simplified/safety-artifact-publications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactPublicationsKeys.lists() });
    },
  });
}

export function useSafetyArtifactPublicationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyArtifactPublicationsUpdate & { id: string }) =>
      fetchApi<SafetyArtifactPublications>(`/api/simplified/safety-artifact-publications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactPublicationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyArtifactPublicationsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyArtifactPublicationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-artifact-publications?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactPublicationsKeys.lists() });
    },
  });
}
