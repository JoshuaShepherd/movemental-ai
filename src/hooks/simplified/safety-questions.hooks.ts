import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyQuestions,
  SafetyQuestionsCreate,
  SafetyQuestionsUpdate,
  SafetyQuestionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyQuestionsKeys = {
  all: ["safetyQuestions"] as const,
  lists: () => [...safetyQuestionsKeys.all, "list"] as const,
  list: (filters?: SafetyQuestionsFilters) => [...safetyQuestionsKeys.lists(), filters] as const,
  details: () => [...safetyQuestionsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyQuestionsKeys.details(), id] as const,
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

export function useSafetyQuestionsList(filters?: SafetyQuestionsFilters) {
  return useQuery({
    queryKey: safetyQuestionsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyQuestions[]>(`/api/simplified/safety-questions${buildQueryString(filters)}`),
  });
}

export function useSafetyQuestions(id: string) {
  return useQuery({
    queryKey: safetyQuestionsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyQuestions>(`/api/simplified/safety-questions?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyQuestionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyQuestionsCreate) =>
      fetchApi<SafetyQuestions>(`/api/simplified/safety-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyQuestionsKeys.lists() });
    },
  });
}

export function useSafetyQuestionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyQuestionsUpdate & { id: string }) =>
      fetchApi<SafetyQuestions>(`/api/simplified/safety-questions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyQuestionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyQuestionsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyQuestionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-questions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyQuestionsKeys.lists() });
    },
  });
}
