import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Assessments,
  AssessmentsCreate,
  AssessmentsUpdate,
  AssessmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const assessmentsKeys = {
  all: ["assessments"] as const,
  lists: () => [...assessmentsKeys.all, "list"] as const,
  list: (filters?: AssessmentsFilters) => [...assessmentsKeys.lists(), filters] as const,
  details: () => [...assessmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...assessmentsKeys.details(), id] as const,
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

export function useAssessmentsList(filters?: AssessmentsFilters) {
  return useQuery({
    queryKey: assessmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<Assessments[]>(`/api/simplified/assessments${buildQueryString(filters)}`),
  });
}

export function useAssessments(id: string) {
  return useQuery({
    queryKey: assessmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<Assessments>(`/api/simplified/assessments?id=${id}`),
    enabled: !!id,
  });
}

export function useAssessmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssessmentsCreate) =>
      fetchApi<Assessments>(`/api/simplified/assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.lists() });
    },
  });
}

export function useAssessmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AssessmentsUpdate & { id: string }) =>
      fetchApi<Assessments>(`/api/simplified/assessments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assessmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useAssessmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/assessments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.lists() });
    },
  });
}
