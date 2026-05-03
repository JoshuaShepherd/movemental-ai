import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AssessmentCheckpoints,
  AssessmentCheckpointsCreate,
  AssessmentCheckpointsUpdate,
  AssessmentCheckpointsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const assessmentCheckpointsKeys = {
  all: ["assessmentCheckpoints"] as const,
  lists: () => [...assessmentCheckpointsKeys.all, "list"] as const,
  list: (filters?: AssessmentCheckpointsFilters) => [...assessmentCheckpointsKeys.lists(), filters] as const,
  details: () => [...assessmentCheckpointsKeys.all, "detail"] as const,
  detail: (id: string) => [...assessmentCheckpointsKeys.details(), id] as const,
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

export function useAssessmentCheckpointsList(filters?: AssessmentCheckpointsFilters) {
  return useQuery({
    queryKey: assessmentCheckpointsKeys.list(filters),
    queryFn: () =>
      fetchApi<AssessmentCheckpoints[]>(`/api/simplified/assessment-checkpoints${buildQueryString(filters)}`),
  });
}

export function useAssessmentCheckpoints(id: string) {
  return useQuery({
    queryKey: assessmentCheckpointsKeys.detail(id),
    queryFn: () =>
      fetchApi<AssessmentCheckpoints>(`/api/simplified/assessment-checkpoints?id=${id}`),
    enabled: !!id,
  });
}

export function useAssessmentCheckpointsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssessmentCheckpointsCreate) =>
      fetchApi<AssessmentCheckpoints>(`/api/simplified/assessment-checkpoints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentCheckpointsKeys.lists() });
    },
  });
}

export function useAssessmentCheckpointsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AssessmentCheckpointsUpdate & { id: string }) =>
      fetchApi<AssessmentCheckpoints>(`/api/simplified/assessment-checkpoints`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentCheckpointsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assessmentCheckpointsKeys.detail(variables.id),
      });
    },
  });
}

export function useAssessmentCheckpointsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/assessment-checkpoints?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentCheckpointsKeys.lists() });
    },
  });
}
