import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  LessonProgress,
  LessonProgressCreate,
  LessonProgressUpdate,
  LessonProgressFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const lessonProgressKeys = {
  all: ["lessonProgress"] as const,
  lists: () => [...lessonProgressKeys.all, "list"] as const,
  list: (filters?: LessonProgressFilters) => [...lessonProgressKeys.lists(), filters] as const,
  details: () => [...lessonProgressKeys.all, "detail"] as const,
  detail: (id: string) => [...lessonProgressKeys.details(), id] as const,
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

export function useLessonProgressList(filters?: LessonProgressFilters) {
  return useQuery({
    queryKey: lessonProgressKeys.list(filters),
    queryFn: () =>
      fetchApi<LessonProgress[]>(`/api/simplified/lesson-progress${buildQueryString(filters)}`),
  });
}

export function useLessonProgress(id: string) {
  return useQuery({
    queryKey: lessonProgressKeys.detail(id),
    queryFn: () =>
      fetchApi<LessonProgress>(`/api/simplified/lesson-progress?id=${id}`),
    enabled: !!id,
  });
}

export function useLessonProgressCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LessonProgressCreate) =>
      fetchApi<LessonProgress>(`/api/simplified/lesson-progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonProgressKeys.lists() });
    },
  });
}

export function useLessonProgressUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: LessonProgressUpdate & { id: string }) =>
      fetchApi<LessonProgress>(`/api/simplified/lesson-progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: lessonProgressKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: lessonProgressKeys.detail(variables.id),
      });
    },
  });
}

export function useLessonProgressDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/lesson-progress?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonProgressKeys.lists() });
    },
  });
}
