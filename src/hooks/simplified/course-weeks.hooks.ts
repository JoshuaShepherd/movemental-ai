import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseWeeks,
  CourseWeeksCreate,
  CourseWeeksUpdate,
  CourseWeeksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseWeeksKeys = {
  all: ["courseWeeks"] as const,
  lists: () => [...courseWeeksKeys.all, "list"] as const,
  list: (filters?: CourseWeeksFilters) => [...courseWeeksKeys.lists(), filters] as const,
  details: () => [...courseWeeksKeys.all, "detail"] as const,
  detail: (id: string) => [...courseWeeksKeys.details(), id] as const,
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

export function useCourseWeeksList(filters?: CourseWeeksFilters) {
  return useQuery({
    queryKey: courseWeeksKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseWeeks[]>(`/api/simplified/course-weeks${buildQueryString(filters)}`),
  });
}

export function useCourseWeeks(id: string) {
  return useQuery({
    queryKey: courseWeeksKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseWeeks>(`/api/simplified/course-weeks?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseWeeksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseWeeksCreate) =>
      fetchApi<CourseWeeks>(`/api/simplified/course-weeks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseWeeksKeys.lists() });
    },
  });
}

export function useCourseWeeksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseWeeksUpdate & { id: string }) =>
      fetchApi<CourseWeeks>(`/api/simplified/course-weeks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseWeeksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseWeeksKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseWeeksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-weeks?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseWeeksKeys.lists() });
    },
  });
}
