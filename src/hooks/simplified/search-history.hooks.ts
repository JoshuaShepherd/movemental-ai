import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SearchHistory,
  SearchHistoryCreate,
  SearchHistoryUpdate,
  SearchHistoryFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const searchHistoryKeys = {
  all: ["searchHistory"] as const,
  lists: () => [...searchHistoryKeys.all, "list"] as const,
  list: (filters?: SearchHistoryFilters) => [...searchHistoryKeys.lists(), filters] as const,
  details: () => [...searchHistoryKeys.all, "detail"] as const,
  detail: (id: string) => [...searchHistoryKeys.details(), id] as const,
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

export function useSearchHistoryList(filters?: SearchHistoryFilters) {
  return useQuery({
    queryKey: searchHistoryKeys.list(filters),
    queryFn: () =>
      fetchApi<SearchHistory[]>(`/api/simplified/search-history${buildQueryString(filters)}`),
  });
}

export function useSearchHistory(id: string) {
  return useQuery({
    queryKey: searchHistoryKeys.detail(id),
    queryFn: () =>
      fetchApi<SearchHistory>(`/api/simplified/search-history?id=${id}`),
    enabled: !!id,
  });
}

export function useSearchHistoryCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SearchHistoryCreate) =>
      fetchApi<SearchHistory>(`/api/simplified/search-history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: searchHistoryKeys.lists() });
    },
  });
}

export function useSearchHistoryUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SearchHistoryUpdate & { id: string }) =>
      fetchApi<SearchHistory>(`/api/simplified/search-history`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: searchHistoryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: searchHistoryKeys.detail(variables.id),
      });
    },
  });
}

export function useSearchHistoryDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/search-history?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: searchHistoryKeys.lists() });
    },
  });
}
