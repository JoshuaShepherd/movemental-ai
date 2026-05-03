import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  PageViews,
  PageViewsCreate,
  PageViewsUpdate,
  PageViewsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const pageViewsKeys = {
  all: ["pageViews"] as const,
  lists: () => [...pageViewsKeys.all, "list"] as const,
  list: (filters?: PageViewsFilters) => [...pageViewsKeys.lists(), filters] as const,
  details: () => [...pageViewsKeys.all, "detail"] as const,
  detail: (id: string) => [...pageViewsKeys.details(), id] as const,
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

export function usePageViewsList(filters?: PageViewsFilters) {
  return useQuery({
    queryKey: pageViewsKeys.list(filters),
    queryFn: () =>
      fetchApi<PageViews[]>(`/api/simplified/page-views${buildQueryString(filters)}`),
  });
}

export function usePageViews(id: string) {
  return useQuery({
    queryKey: pageViewsKeys.detail(id),
    queryFn: () =>
      fetchApi<PageViews>(`/api/simplified/page-views?id=${id}`),
    enabled: !!id,
  });
}

export function usePageViewsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PageViewsCreate) =>
      fetchApi<PageViews>(`/api/simplified/page-views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageViewsKeys.lists() });
    },
  });
}

export function usePageViewsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PageViewsUpdate & { id: string }) =>
      fetchApi<PageViews>(`/api/simplified/page-views`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: pageViewsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: pageViewsKeys.detail(variables.id),
      });
    },
  });
}

export function usePageViewsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/page-views?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageViewsKeys.lists() });
    },
  });
}
