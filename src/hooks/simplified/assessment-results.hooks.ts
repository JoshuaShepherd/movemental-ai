import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AssessmentResults,
  AssessmentResultsCreate,
  AssessmentResultsUpdate,
  AssessmentResultsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const assessmentResultsKeys = {
  all: ["assessmentResults"] as const,
  lists: () => [...assessmentResultsKeys.all, "list"] as const,
  list: (filters?: AssessmentResultsFilters) => [...assessmentResultsKeys.lists(), filters] as const,
  details: () => [...assessmentResultsKeys.all, "detail"] as const,
  detail: (id: string) => [...assessmentResultsKeys.details(), id] as const,
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

export function useAssessmentResultsList(filters?: AssessmentResultsFilters) {
  return useQuery({
    queryKey: assessmentResultsKeys.list(filters),
    queryFn: () =>
      fetchApi<AssessmentResults[]>(`/api/simplified/assessment-results${buildQueryString(filters)}`),
  });
}

export function useAssessmentResults(id: string) {
  return useQuery({
    queryKey: assessmentResultsKeys.detail(id),
    queryFn: () =>
      fetchApi<AssessmentResults>(`/api/simplified/assessment-results?id=${id}`),
    enabled: !!id,
  });
}

export function useAssessmentResultsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssessmentResultsCreate) =>
      fetchApi<AssessmentResults>(`/api/simplified/assessment-results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentResultsKeys.lists() });
    },
  });
}

export function useAssessmentResultsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AssessmentResultsUpdate & { id: string }) =>
      fetchApi<AssessmentResults>(`/api/simplified/assessment-results`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentResultsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assessmentResultsKeys.detail(variables.id),
      });
    },
  });
}

export function useAssessmentResultsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/assessment-results?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentResultsKeys.lists() });
    },
  });
}
