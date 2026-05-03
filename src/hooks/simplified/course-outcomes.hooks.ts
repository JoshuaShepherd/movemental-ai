import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseOutcomes,
  CourseOutcomesCreate,
  CourseOutcomesUpdate,
  CourseOutcomesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseOutcomesKeys = {
  all: ["courseOutcomes"] as const,
  lists: () => [...courseOutcomesKeys.all, "list"] as const,
  list: (filters?: CourseOutcomesFilters) => [...courseOutcomesKeys.lists(), filters] as const,
  details: () => [...courseOutcomesKeys.all, "detail"] as const,
  detail: (id: string) => [...courseOutcomesKeys.details(), id] as const,
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

export function useCourseOutcomesList(filters?: CourseOutcomesFilters) {
  return useQuery({
    queryKey: courseOutcomesKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseOutcomes[]>(`/api/simplified/course-outcomes${buildQueryString(filters)}`),
  });
}

export function useCourseOutcomes(id: string) {
  return useQuery({
    queryKey: courseOutcomesKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseOutcomes>(`/api/simplified/course-outcomes?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseOutcomesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseOutcomesCreate) =>
      fetchApi<CourseOutcomes>(`/api/simplified/course-outcomes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseOutcomesKeys.lists() });
    },
  });
}

export function useCourseOutcomesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseOutcomesUpdate & { id: string }) =>
      fetchApi<CourseOutcomes>(`/api/simplified/course-outcomes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseOutcomesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseOutcomesKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseOutcomesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-outcomes?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseOutcomesKeys.lists() });
    },
  });
}
