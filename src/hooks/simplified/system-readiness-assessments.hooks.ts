import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  SystemReadinessAssessments,
  SystemReadinessAssessmentsCreate,
  SystemReadinessAssessmentsUpdate,
  SystemReadinessAssessmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

export const systemReadinessAssessmentsKeys = {
  all: ["systemReadinessAssessments"] as const,
  lists: () => [...systemReadinessAssessmentsKeys.all, "list"] as const,
  list: (filters?: SystemReadinessAssessmentsFilters) =>
    [...systemReadinessAssessmentsKeys.lists(), filters] as const,
  details: () => [...systemReadinessAssessmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...systemReadinessAssessmentsKeys.details(), id] as const,
};

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error?.message ?? "Request failed");
  }
  return json.data;
}

export function useSystemReadinessAssessmentsList(filters?: SystemReadinessAssessmentsFilters) {
  return useQuery({
    queryKey: systemReadinessAssessmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<SystemReadinessAssessments[]>(
        `/api/simplified/system-readiness-assessments${buildQueryString(filters)}`,
      ),
  });
}

export function useSystemReadinessAssessments(id: string) {
  return useQuery({
    queryKey: systemReadinessAssessmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<SystemReadinessAssessments>(`/api/simplified/system-readiness-assessments?id=${id}`),
    enabled: !!id,
  });
}

export function useSystemReadinessAssessmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SystemReadinessAssessmentsCreate) =>
      fetchApi<SystemReadinessAssessments>(`/api/simplified/system-readiness-assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemReadinessAssessmentsKeys.lists() });
    },
  });
}

export function useSystemReadinessAssessmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SystemReadinessAssessmentsUpdate & { id: string }) =>
      fetchApi<SystemReadinessAssessments>(`/api/simplified/system-readiness-assessments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: systemReadinessAssessmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: systemReadinessAssessmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useSystemReadinessAssessmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/system-readiness-assessments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemReadinessAssessmentsKeys.lists() });
    },
  });
}
