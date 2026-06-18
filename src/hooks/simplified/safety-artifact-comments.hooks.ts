import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyArtifactComments,
  SafetyArtifactCommentsCreate,
  SafetyArtifactCommentsUpdate,
  SafetyArtifactCommentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyArtifactCommentsKeys = {
  all: ["safetyArtifactComments"] as const,
  lists: () => [...safetyArtifactCommentsKeys.all, "list"] as const,
  list: (filters?: SafetyArtifactCommentsFilters) => [...safetyArtifactCommentsKeys.lists(), filters] as const,
  details: () => [...safetyArtifactCommentsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyArtifactCommentsKeys.details(), id] as const,
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

export function useSafetyArtifactCommentsList(filters?: SafetyArtifactCommentsFilters) {
  return useQuery({
    queryKey: safetyArtifactCommentsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyArtifactComments[]>(`/api/simplified/safety-artifact-comments${buildQueryString(filters)}`),
  });
}

export function useSafetyArtifactComments(id: string) {
  return useQuery({
    queryKey: safetyArtifactCommentsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyArtifactComments>(`/api/simplified/safety-artifact-comments?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyArtifactCommentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyArtifactCommentsCreate) =>
      fetchApi<SafetyArtifactComments>(`/api/simplified/safety-artifact-comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactCommentsKeys.lists() });
    },
  });
}

export function useSafetyArtifactCommentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyArtifactCommentsUpdate & { id: string }) =>
      fetchApi<SafetyArtifactComments>(`/api/simplified/safety-artifact-comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactCommentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyArtifactCommentsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyArtifactCommentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-artifact-comments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyArtifactCommentsKeys.lists() });
    },
  });
}
