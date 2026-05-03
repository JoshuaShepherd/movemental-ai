import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseLessons,
  CourseLessonsCreate,
  CourseLessonsUpdate,
  CourseLessonsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseLessonsKeys = {
  all: ["courseLessons"] as const,
  lists: () => [...courseLessonsKeys.all, "list"] as const,
  list: (filters?: CourseLessonsFilters) => [...courseLessonsKeys.lists(), filters] as const,
  details: () => [...courseLessonsKeys.all, "detail"] as const,
  detail: (id: string) => [...courseLessonsKeys.details(), id] as const,
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

export function useCourseLessonsList(filters?: CourseLessonsFilters) {
  return useQuery({
    queryKey: courseLessonsKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseLessons[]>(`/api/simplified/course-lessons${buildQueryString(filters)}`),
  });
}

export function useCourseLessons(id: string) {
  return useQuery({
    queryKey: courseLessonsKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseLessons>(`/api/simplified/course-lessons?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseLessonsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseLessonsCreate) =>
      fetchApi<CourseLessons>(`/api/simplified/course-lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseLessonsKeys.lists() });
    },
  });
}

export function useCourseLessonsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseLessonsUpdate & { id: string }) =>
      fetchApi<CourseLessons>(`/api/simplified/course-lessons`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseLessonsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseLessonsKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseLessonsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-lessons?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseLessonsKeys.lists() });
    },
  });
}
