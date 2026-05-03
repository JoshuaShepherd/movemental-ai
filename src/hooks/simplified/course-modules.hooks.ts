import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseModules,
  CourseModulesCreate,
  CourseModulesUpdate,
  CourseModulesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseModulesKeys = {
  all: ["courseModules"] as const,
  lists: () => [...courseModulesKeys.all, "list"] as const,
  list: (filters?: CourseModulesFilters) => [...courseModulesKeys.lists(), filters] as const,
  details: () => [...courseModulesKeys.all, "detail"] as const,
  detail: (id: string) => [...courseModulesKeys.details(), id] as const,
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

export function useCourseModulesList(filters?: CourseModulesFilters) {
  return useQuery({
    queryKey: courseModulesKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseModules[]>(`/api/simplified/course-modules${buildQueryString(filters)}`),
  });
}

export function useCourseModules(id: string) {
  return useQuery({
    queryKey: courseModulesKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseModules>(`/api/simplified/course-modules?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseModulesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseModulesCreate) =>
      fetchApi<CourseModules>(`/api/simplified/course-modules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseModulesKeys.lists() });
    },
  });
}

export function useCourseModulesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseModulesUpdate & { id: string }) =>
      fetchApi<CourseModules>(`/api/simplified/course-modules`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseModulesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseModulesKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseModulesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-modules?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseModulesKeys.lists() });
    },
  });
}
