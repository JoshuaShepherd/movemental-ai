import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseBundles,
  CourseBundlesCreate,
  CourseBundlesUpdate,
  CourseBundlesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseBundlesKeys = {
  all: ["courseBundles"] as const,
  lists: () => [...courseBundlesKeys.all, "list"] as const,
  list: (filters?: CourseBundlesFilters) => [...courseBundlesKeys.lists(), filters] as const,
  details: () => [...courseBundlesKeys.all, "detail"] as const,
  detail: (id: string) => [...courseBundlesKeys.details(), id] as const,
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

export function useCourseBundlesList(filters?: CourseBundlesFilters) {
  return useQuery({
    queryKey: courseBundlesKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseBundles[]>(`/api/simplified/course-bundles${buildQueryString(filters)}`),
  });
}

export function useCourseBundles(id: string) {
  return useQuery({
    queryKey: courseBundlesKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseBundles>(`/api/simplified/course-bundles?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseBundlesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseBundlesCreate) =>
      fetchApi<CourseBundles>(`/api/simplified/course-bundles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseBundlesKeys.lists() });
    },
  });
}

export function useCourseBundlesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseBundlesUpdate & { id: string }) =>
      fetchApi<CourseBundles>(`/api/simplified/course-bundles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseBundlesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseBundlesKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseBundlesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-bundles?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseBundlesKeys.lists() });
    },
  });
}
