import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseEnrollments,
  CourseEnrollmentsCreate,
  CourseEnrollmentsUpdate,
  CourseEnrollmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseEnrollmentsKeys = {
  all: ["courseEnrollments"] as const,
  lists: () => [...courseEnrollmentsKeys.all, "list"] as const,
  list: (filters?: CourseEnrollmentsFilters) => [...courseEnrollmentsKeys.lists(), filters] as const,
  details: () => [...courseEnrollmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...courseEnrollmentsKeys.details(), id] as const,
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

export function useCourseEnrollmentsList(filters?: CourseEnrollmentsFilters) {
  return useQuery({
    queryKey: courseEnrollmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseEnrollments[]>(`/api/simplified/course-enrollments${buildQueryString(filters)}`),
  });
}

export function useCourseEnrollments(id: string) {
  return useQuery({
    queryKey: courseEnrollmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseEnrollments>(`/api/simplified/course-enrollments?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseEnrollmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseEnrollmentsCreate) =>
      fetchApi<CourseEnrollments>(`/api/simplified/course-enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseEnrollmentsKeys.lists() });
    },
  });
}

export function useCourseEnrollmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseEnrollmentsUpdate & { id: string }) =>
      fetchApi<CourseEnrollments>(`/api/simplified/course-enrollments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseEnrollmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseEnrollmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseEnrollmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-enrollments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseEnrollmentsKeys.lists() });
    },
  });
}
