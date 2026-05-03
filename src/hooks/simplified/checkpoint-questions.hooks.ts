import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CheckpointQuestions,
  CheckpointQuestionsCreate,
  CheckpointQuestionsUpdate,
  CheckpointQuestionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const checkpointQuestionsKeys = {
  all: ["checkpointQuestions"] as const,
  lists: () => [...checkpointQuestionsKeys.all, "list"] as const,
  list: (filters?: CheckpointQuestionsFilters) => [...checkpointQuestionsKeys.lists(), filters] as const,
  details: () => [...checkpointQuestionsKeys.all, "detail"] as const,
  detail: (id: string) => [...checkpointQuestionsKeys.details(), id] as const,
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

export function useCheckpointQuestionsList(filters?: CheckpointQuestionsFilters) {
  return useQuery({
    queryKey: checkpointQuestionsKeys.list(filters),
    queryFn: () =>
      fetchApi<CheckpointQuestions[]>(`/api/simplified/checkpoint-questions${buildQueryString(filters)}`),
  });
}

export function useCheckpointQuestions(id: string) {
  return useQuery({
    queryKey: checkpointQuestionsKeys.detail(id),
    queryFn: () =>
      fetchApi<CheckpointQuestions>(`/api/simplified/checkpoint-questions?id=${id}`),
    enabled: !!id,
  });
}

export function useCheckpointQuestionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CheckpointQuestionsCreate) =>
      fetchApi<CheckpointQuestions>(`/api/simplified/checkpoint-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: checkpointQuestionsKeys.lists() });
    },
  });
}

export function useCheckpointQuestionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CheckpointQuestionsUpdate & { id: string }) =>
      fetchApi<CheckpointQuestions>(`/api/simplified/checkpoint-questions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: checkpointQuestionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: checkpointQuestionsKeys.detail(variables.id),
      });
    },
  });
}

export function useCheckpointQuestionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/checkpoint-questions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: checkpointQuestionsKeys.lists() });
    },
  });
}
