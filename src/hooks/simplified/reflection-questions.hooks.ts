import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ReflectionQuestions,
  ReflectionQuestionsCreate,
  ReflectionQuestionsUpdate,
  ReflectionQuestionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const reflectionQuestionsKeys = {
  all: ["reflectionQuestions"] as const,
  lists: () => [...reflectionQuestionsKeys.all, "list"] as const,
  list: (filters?: ReflectionQuestionsFilters) => [...reflectionQuestionsKeys.lists(), filters] as const,
  details: () => [...reflectionQuestionsKeys.all, "detail"] as const,
  detail: (id: string) => [...reflectionQuestionsKeys.details(), id] as const,
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

export function useReflectionQuestionsList(filters?: ReflectionQuestionsFilters) {
  return useQuery({
    queryKey: reflectionQuestionsKeys.list(filters),
    queryFn: () =>
      fetchApi<ReflectionQuestions[]>(`/api/simplified/reflection-questions${buildQueryString(filters)}`),
  });
}

export function useReflectionQuestions(id: string) {
  return useQuery({
    queryKey: reflectionQuestionsKeys.detail(id),
    queryFn: () =>
      fetchApi<ReflectionQuestions>(`/api/simplified/reflection-questions?id=${id}`),
    enabled: !!id,
  });
}

export function useReflectionQuestionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReflectionQuestionsCreate) =>
      fetchApi<ReflectionQuestions>(`/api/simplified/reflection-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reflectionQuestionsKeys.lists() });
    },
  });
}

export function useReflectionQuestionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ReflectionQuestionsUpdate & { id: string }) =>
      fetchApi<ReflectionQuestions>(`/api/simplified/reflection-questions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reflectionQuestionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: reflectionQuestionsKeys.detail(variables.id),
      });
    },
  });
}

export function useReflectionQuestionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/reflection-questions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reflectionQuestionsKeys.lists() });
    },
  });
}
