import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SearchAnalytics,
  SearchAnalyticsCreate,
  SearchAnalyticsUpdate,
  SearchAnalyticsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const searchAnalyticsKeys = {
  all: ["searchAnalytics"] as const,
  lists: () => [...searchAnalyticsKeys.all, "list"] as const,
  list: (filters?: SearchAnalyticsFilters) => [...searchAnalyticsKeys.lists(), filters] as const,
  details: () => [...searchAnalyticsKeys.all, "detail"] as const,
  detail: (id: string) => [...searchAnalyticsKeys.details(), id] as const,
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

export function useSearchAnalyticsList(filters?: SearchAnalyticsFilters) {
  return useQuery({
    queryKey: searchAnalyticsKeys.list(filters),
    queryFn: () =>
      fetchApi<SearchAnalytics[]>(`/api/simplified/search-analytics${buildQueryString(filters)}`),
  });
}

export function useSearchAnalytics(id: string) {
  return useQuery({
    queryKey: searchAnalyticsKeys.detail(id),
    queryFn: () =>
      fetchApi<SearchAnalytics>(`/api/simplified/search-analytics?id=${id}`),
    enabled: !!id,
  });
}

export function useSearchAnalyticsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SearchAnalyticsCreate) =>
      fetchApi<SearchAnalytics>(`/api/simplified/search-analytics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: searchAnalyticsKeys.lists() });
    },
  });
}

export function useSearchAnalyticsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SearchAnalyticsUpdate & { id: string }) =>
      fetchApi<SearchAnalytics>(`/api/simplified/search-analytics`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: searchAnalyticsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: searchAnalyticsKeys.detail(variables.id),
      });
    },
  });
}

export function useSearchAnalyticsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/search-analytics?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: searchAnalyticsKeys.lists() });
    },
  });
}
