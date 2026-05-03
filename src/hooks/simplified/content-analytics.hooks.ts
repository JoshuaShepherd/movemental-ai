import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContentAnalytics,
  ContentAnalyticsCreate,
  ContentAnalyticsUpdate,
  ContentAnalyticsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contentAnalyticsKeys = {
  all: ["contentAnalytics"] as const,
  lists: () => [...contentAnalyticsKeys.all, "list"] as const,
  list: (filters?: ContentAnalyticsFilters) => [...contentAnalyticsKeys.lists(), filters] as const,
  details: () => [...contentAnalyticsKeys.all, "detail"] as const,
  detail: (id: string) => [...contentAnalyticsKeys.details(), id] as const,
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

export function useContentAnalyticsList(filters?: ContentAnalyticsFilters) {
  return useQuery({
    queryKey: contentAnalyticsKeys.list(filters),
    queryFn: () =>
      fetchApi<ContentAnalytics[]>(`/api/simplified/content-analytics${buildQueryString(filters)}`),
  });
}

export function useContentAnalytics(id: string) {
  return useQuery({
    queryKey: contentAnalyticsKeys.detail(id),
    queryFn: () =>
      fetchApi<ContentAnalytics>(`/api/simplified/content-analytics?id=${id}`),
    enabled: !!id,
  });
}

export function useContentAnalyticsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContentAnalyticsCreate) =>
      fetchApi<ContentAnalytics>(`/api/simplified/content-analytics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentAnalyticsKeys.lists() });
    },
  });
}

export function useContentAnalyticsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContentAnalyticsUpdate & { id: string }) =>
      fetchApi<ContentAnalytics>(`/api/simplified/content-analytics`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentAnalyticsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contentAnalyticsKeys.detail(variables.id),
      });
    },
  });
}

export function useContentAnalyticsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/content-analytics?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentAnalyticsKeys.lists() });
    },
  });
}
