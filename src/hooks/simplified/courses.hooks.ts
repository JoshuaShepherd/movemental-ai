import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Courses,
  CoursesCreate,
  CoursesUpdate,
  CoursesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const coursesKeys = {
  all: ["courses"] as const,
  lists: () => [...coursesKeys.all, "list"] as const,
  list: (filters?: CoursesFilters) => [...coursesKeys.lists(), filters] as const,
  details: () => [...coursesKeys.all, "detail"] as const,
  detail: (id: string) => [...coursesKeys.details(), id] as const,
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

export function useCoursesList(filters?: CoursesFilters) {
  return useQuery({
    queryKey: coursesKeys.list(filters),
    queryFn: () =>
      fetchApi<Courses[]>(`/api/simplified/courses${buildQueryString(filters)}`),
  });
}

export function useCourses(id: string) {
  return useQuery({
    queryKey: coursesKeys.detail(id),
    queryFn: () =>
      fetchApi<Courses>(`/api/simplified/courses?id=${id}`),
    enabled: !!id,
  });
}

export function useCoursesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CoursesCreate) =>
      fetchApi<Courses>(`/api/simplified/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
    },
  });
}

export function useCoursesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CoursesUpdate & { id: string }) =>
      fetchApi<Courses>(`/api/simplified/courses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: coursesKeys.detail(variables.id),
      });
    },
  });
}

export function useCoursesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/courses?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
    },
  });
}
