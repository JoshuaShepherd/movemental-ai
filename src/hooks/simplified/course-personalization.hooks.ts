import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CoursePersonalization,
  CoursePersonalizationCreate,
  CoursePersonalizationUpdate,
  CoursePersonalizationFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const coursePersonalizationKeys = {
  all: ["coursePersonalization"] as const,
  lists: () => [...coursePersonalizationKeys.all, "list"] as const,
  list: (filters?: CoursePersonalizationFilters) => [...coursePersonalizationKeys.lists(), filters] as const,
  details: () => [...coursePersonalizationKeys.all, "detail"] as const,
  detail: (id: string) => [...coursePersonalizationKeys.details(), id] as const,
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

export function useCoursePersonalizationList(filters?: CoursePersonalizationFilters) {
  return useQuery({
    queryKey: coursePersonalizationKeys.list(filters),
    queryFn: () =>
      fetchApi<CoursePersonalization[]>(`/api/simplified/course-personalization${buildQueryString(filters)}`),
  });
}

export function useCoursePersonalization(id: string) {
  return useQuery({
    queryKey: coursePersonalizationKeys.detail(id),
    queryFn: () =>
      fetchApi<CoursePersonalization>(`/api/simplified/course-personalization?id=${id}`),
    enabled: !!id,
  });
}

export function useCoursePersonalizationCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CoursePersonalizationCreate) =>
      fetchApi<CoursePersonalization>(`/api/simplified/course-personalization`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursePersonalizationKeys.lists() });
    },
  });
}

export function useCoursePersonalizationUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CoursePersonalizationUpdate & { id: string }) =>
      fetchApi<CoursePersonalization>(`/api/simplified/course-personalization`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: coursePersonalizationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: coursePersonalizationKeys.detail(variables.id),
      });
    },
  });
}

export function useCoursePersonalizationDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-personalization?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursePersonalizationKeys.lists() });
    },
  });
}
