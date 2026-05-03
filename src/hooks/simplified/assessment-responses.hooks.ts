import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AssessmentResponses,
  AssessmentResponsesCreate,
  AssessmentResponsesUpdate,
  AssessmentResponsesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const assessmentResponsesKeys = {
  all: ["assessmentResponses"] as const,
  lists: () => [...assessmentResponsesKeys.all, "list"] as const,
  list: (filters?: AssessmentResponsesFilters) => [...assessmentResponsesKeys.lists(), filters] as const,
  details: () => [...assessmentResponsesKeys.all, "detail"] as const,
  detail: (id: string) => [...assessmentResponsesKeys.details(), id] as const,
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

export function useAssessmentResponsesList(filters?: AssessmentResponsesFilters) {
  return useQuery({
    queryKey: assessmentResponsesKeys.list(filters),
    queryFn: () =>
      fetchApi<AssessmentResponses[]>(`/api/simplified/assessment-responses${buildQueryString(filters)}`),
  });
}

export function useAssessmentResponses(id: string) {
  return useQuery({
    queryKey: assessmentResponsesKeys.detail(id),
    queryFn: () =>
      fetchApi<AssessmentResponses>(`/api/simplified/assessment-responses?id=${id}`),
    enabled: !!id,
  });
}

export function useAssessmentResponsesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssessmentResponsesCreate) =>
      fetchApi<AssessmentResponses>(`/api/simplified/assessment-responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentResponsesKeys.lists() });
    },
  });
}

export function useAssessmentResponsesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AssessmentResponsesUpdate & { id: string }) =>
      fetchApi<AssessmentResponses>(`/api/simplified/assessment-responses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentResponsesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assessmentResponsesKeys.detail(variables.id),
      });
    },
  });
}

export function useAssessmentResponsesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/assessment-responses?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentResponsesKeys.lists() });
    },
  });
}
