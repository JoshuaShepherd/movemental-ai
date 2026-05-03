import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseSalesPages,
  CourseSalesPagesCreate,
  CourseSalesPagesUpdate,
  CourseSalesPagesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseSalesPagesKeys = {
  all: ["courseSalesPages"] as const,
  lists: () => [...courseSalesPagesKeys.all, "list"] as const,
  list: (filters?: CourseSalesPagesFilters) => [...courseSalesPagesKeys.lists(), filters] as const,
  details: () => [...courseSalesPagesKeys.all, "detail"] as const,
  detail: (id: string) => [...courseSalesPagesKeys.details(), id] as const,
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

export function useCourseSalesPagesList(filters?: CourseSalesPagesFilters) {
  return useQuery({
    queryKey: courseSalesPagesKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseSalesPages[]>(`/api/simplified/course-sales-pages${buildQueryString(filters)}`),
  });
}

export function useCourseSalesPages(id: string) {
  return useQuery({
    queryKey: courseSalesPagesKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseSalesPages>(`/api/simplified/course-sales-pages?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseSalesPagesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseSalesPagesCreate) =>
      fetchApi<CourseSalesPages>(`/api/simplified/course-sales-pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseSalesPagesKeys.lists() });
    },
  });
}

export function useCourseSalesPagesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseSalesPagesUpdate & { id: string }) =>
      fetchApi<CourseSalesPages>(`/api/simplified/course-sales-pages`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseSalesPagesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseSalesPagesKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseSalesPagesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-sales-pages?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseSalesPagesKeys.lists() });
    },
  });
}
