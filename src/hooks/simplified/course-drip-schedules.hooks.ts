import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseDripSchedules,
  CourseDripSchedulesCreate,
  CourseDripSchedulesUpdate,
  CourseDripSchedulesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseDripSchedulesKeys = {
  all: ["courseDripSchedules"] as const,
  lists: () => [...courseDripSchedulesKeys.all, "list"] as const,
  list: (filters?: CourseDripSchedulesFilters) => [...courseDripSchedulesKeys.lists(), filters] as const,
  details: () => [...courseDripSchedulesKeys.all, "detail"] as const,
  detail: (id: string) => [...courseDripSchedulesKeys.details(), id] as const,
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

export function useCourseDripSchedulesList(filters?: CourseDripSchedulesFilters) {
  return useQuery({
    queryKey: courseDripSchedulesKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseDripSchedules[]>(`/api/simplified/course-drip-schedules${buildQueryString(filters)}`),
  });
}

export function useCourseDripSchedules(id: string) {
  return useQuery({
    queryKey: courseDripSchedulesKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseDripSchedules>(`/api/simplified/course-drip-schedules?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseDripSchedulesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseDripSchedulesCreate) =>
      fetchApi<CourseDripSchedules>(`/api/simplified/course-drip-schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseDripSchedulesKeys.lists() });
    },
  });
}

export function useCourseDripSchedulesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseDripSchedulesUpdate & { id: string }) =>
      fetchApi<CourseDripSchedules>(`/api/simplified/course-drip-schedules`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseDripSchedulesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseDripSchedulesKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseDripSchedulesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-drip-schedules?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseDripSchedulesKeys.lists() });
    },
  });
}
