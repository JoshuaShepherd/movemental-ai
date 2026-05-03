import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ExerciseCompletions,
  ExerciseCompletionsCreate,
  ExerciseCompletionsUpdate,
  ExerciseCompletionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const exerciseCompletionsKeys = {
  all: ["exerciseCompletions"] as const,
  lists: () => [...exerciseCompletionsKeys.all, "list"] as const,
  list: (filters?: ExerciseCompletionsFilters) => [...exerciseCompletionsKeys.lists(), filters] as const,
  details: () => [...exerciseCompletionsKeys.all, "detail"] as const,
  detail: (id: string) => [...exerciseCompletionsKeys.details(), id] as const,
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

export function useExerciseCompletionsList(filters?: ExerciseCompletionsFilters) {
  return useQuery({
    queryKey: exerciseCompletionsKeys.list(filters),
    queryFn: () =>
      fetchApi<ExerciseCompletions[]>(`/api/simplified/exercise-completions${buildQueryString(filters)}`),
  });
}

export function useExerciseCompletions(id: string) {
  return useQuery({
    queryKey: exerciseCompletionsKeys.detail(id),
    queryFn: () =>
      fetchApi<ExerciseCompletions>(`/api/simplified/exercise-completions?id=${id}`),
    enabled: !!id,
  });
}

export function useExerciseCompletionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExerciseCompletionsCreate) =>
      fetchApi<ExerciseCompletions>(`/api/simplified/exercise-completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exerciseCompletionsKeys.lists() });
    },
  });
}

export function useExerciseCompletionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ExerciseCompletionsUpdate & { id: string }) =>
      fetchApi<ExerciseCompletions>(`/api/simplified/exercise-completions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: exerciseCompletionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: exerciseCompletionsKeys.detail(variables.id),
      });
    },
  });
}

export function useExerciseCompletionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/exercise-completions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exerciseCompletionsKeys.lists() });
    },
  });
}
