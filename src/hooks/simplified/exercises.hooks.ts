import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Exercises,
  ExercisesCreate,
  ExercisesUpdate,
  ExercisesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const exercisesKeys = {
  all: ["exercises"] as const,
  lists: () => [...exercisesKeys.all, "list"] as const,
  list: (filters?: ExercisesFilters) => [...exercisesKeys.lists(), filters] as const,
  details: () => [...exercisesKeys.all, "detail"] as const,
  detail: (id: string) => [...exercisesKeys.details(), id] as const,
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

export function useExercisesList(filters?: ExercisesFilters) {
  return useQuery({
    queryKey: exercisesKeys.list(filters),
    queryFn: () =>
      fetchApi<Exercises[]>(`/api/simplified/exercises${buildQueryString(filters)}`),
  });
}

export function useExercises(id: string) {
  return useQuery({
    queryKey: exercisesKeys.detail(id),
    queryFn: () =>
      fetchApi<Exercises>(`/api/simplified/exercises?id=${id}`),
    enabled: !!id,
  });
}

export function useExercisesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExercisesCreate) =>
      fetchApi<Exercises>(`/api/simplified/exercises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exercisesKeys.lists() });
    },
  });
}

export function useExercisesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ExercisesUpdate & { id: string }) =>
      fetchApi<Exercises>(`/api/simplified/exercises`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: exercisesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: exercisesKeys.detail(variables.id),
      });
    },
  });
}

export function useExercisesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/exercises?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exercisesKeys.lists() });
    },
  });
}
