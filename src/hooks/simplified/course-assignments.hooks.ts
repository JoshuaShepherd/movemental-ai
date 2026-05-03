import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseAssignments,
  CourseAssignmentsCreate,
  CourseAssignmentsUpdate,
  CourseAssignmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseAssignmentsKeys = {
  all: ["courseAssignments"] as const,
  lists: () => [...courseAssignmentsKeys.all, "list"] as const,
  list: (filters?: CourseAssignmentsFilters) => [...courseAssignmentsKeys.lists(), filters] as const,
  details: () => [...courseAssignmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...courseAssignmentsKeys.details(), id] as const,
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

export function useCourseAssignmentsList(filters?: CourseAssignmentsFilters) {
  return useQuery({
    queryKey: courseAssignmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseAssignments[]>(`/api/simplified/course-assignments${buildQueryString(filters)}`),
  });
}

export function useCourseAssignments(id: string) {
  return useQuery({
    queryKey: courseAssignmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseAssignments>(`/api/simplified/course-assignments?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseAssignmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseAssignmentsCreate) =>
      fetchApi<CourseAssignments>(`/api/simplified/course-assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseAssignmentsKeys.lists() });
    },
  });
}

export function useCourseAssignmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseAssignmentsUpdate & { id: string }) =>
      fetchApi<CourseAssignments>(`/api/simplified/course-assignments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseAssignmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseAssignmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseAssignmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-assignments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseAssignmentsKeys.lists() });
    },
  });
}
