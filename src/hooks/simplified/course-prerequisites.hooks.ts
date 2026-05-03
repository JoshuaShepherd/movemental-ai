import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CoursePrerequisites,
  CoursePrerequisitesCreate,
  CoursePrerequisitesUpdate,
  CoursePrerequisitesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const coursePrerequisitesKeys = {
  all: ["coursePrerequisites"] as const,
  lists: () => [...coursePrerequisitesKeys.all, "list"] as const,
  list: (filters?: CoursePrerequisitesFilters) => [...coursePrerequisitesKeys.lists(), filters] as const,
  details: () => [...coursePrerequisitesKeys.all, "detail"] as const,
  detail: (id: string) => [...coursePrerequisitesKeys.details(), id] as const,
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

export function useCoursePrerequisitesList(filters?: CoursePrerequisitesFilters) {
  return useQuery({
    queryKey: coursePrerequisitesKeys.list(filters),
    queryFn: () =>
      fetchApi<CoursePrerequisites[]>(`/api/simplified/course-prerequisites${buildQueryString(filters)}`),
  });
}

export function useCoursePrerequisites(id: string) {
  return useQuery({
    queryKey: coursePrerequisitesKeys.detail(id),
    queryFn: () =>
      fetchApi<CoursePrerequisites>(`/api/simplified/course-prerequisites?id=${id}`),
    enabled: !!id,
  });
}

export function useCoursePrerequisitesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CoursePrerequisitesCreate) =>
      fetchApi<CoursePrerequisites>(`/api/simplified/course-prerequisites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursePrerequisitesKeys.lists() });
    },
  });
}

export function useCoursePrerequisitesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CoursePrerequisitesUpdate & { id: string }) =>
      fetchApi<CoursePrerequisites>(`/api/simplified/course-prerequisites`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: coursePrerequisitesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: coursePrerequisitesKeys.detail(variables.id),
      });
    },
  });
}

export function useCoursePrerequisitesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-prerequisites?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursePrerequisitesKeys.lists() });
    },
  });
}
