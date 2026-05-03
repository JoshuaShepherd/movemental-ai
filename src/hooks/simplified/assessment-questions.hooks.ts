import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AssessmentQuestions,
  AssessmentQuestionsCreate,
  AssessmentQuestionsUpdate,
  AssessmentQuestionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const assessmentQuestionsKeys = {
  all: ["assessmentQuestions"] as const,
  lists: () => [...assessmentQuestionsKeys.all, "list"] as const,
  list: (filters?: AssessmentQuestionsFilters) => [...assessmentQuestionsKeys.lists(), filters] as const,
  details: () => [...assessmentQuestionsKeys.all, "detail"] as const,
  detail: (id: string) => [...assessmentQuestionsKeys.details(), id] as const,
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

export function useAssessmentQuestionsList(filters?: AssessmentQuestionsFilters) {
  return useQuery({
    queryKey: assessmentQuestionsKeys.list(filters),
    queryFn: () =>
      fetchApi<AssessmentQuestions[]>(`/api/simplified/assessment-questions${buildQueryString(filters)}`),
  });
}

export function useAssessmentQuestions(id: string) {
  return useQuery({
    queryKey: assessmentQuestionsKeys.detail(id),
    queryFn: () =>
      fetchApi<AssessmentQuestions>(`/api/simplified/assessment-questions?id=${id}`),
    enabled: !!id,
  });
}

export function useAssessmentQuestionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssessmentQuestionsCreate) =>
      fetchApi<AssessmentQuestions>(`/api/simplified/assessment-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentQuestionsKeys.lists() });
    },
  });
}

export function useAssessmentQuestionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AssessmentQuestionsUpdate & { id: string }) =>
      fetchApi<AssessmentQuestions>(`/api/simplified/assessment-questions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentQuestionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assessmentQuestionsKeys.detail(variables.id),
      });
    },
  });
}

export function useAssessmentQuestionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/assessment-questions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentQuestionsKeys.lists() });
    },
  });
}
