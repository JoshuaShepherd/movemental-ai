import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ArchiveQuotes,
  ArchiveQuotesCreate,
  ArchiveQuotesUpdate,
  ArchiveQuotesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const archiveQuotesKeys = {
  all: ["archiveQuotes"] as const,
  lists: () => [...archiveQuotesKeys.all, "list"] as const,
  list: (filters?: ArchiveQuotesFilters) => [...archiveQuotesKeys.lists(), filters] as const,
  details: () => [...archiveQuotesKeys.all, "detail"] as const,
  detail: (id: string) => [...archiveQuotesKeys.details(), id] as const,
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

export function useArchiveQuotesList(filters?: ArchiveQuotesFilters) {
  return useQuery({
    queryKey: archiveQuotesKeys.list(filters),
    queryFn: () =>
      fetchApi<ArchiveQuotes[]>(`/api/simplified/archive-quotes${buildQueryString(filters)}`),
  });
}

export function useArchiveQuotes(id: string) {
  return useQuery({
    queryKey: archiveQuotesKeys.detail(id),
    queryFn: () =>
      fetchApi<ArchiveQuotes>(`/api/simplified/archive-quotes?id=${id}`),
    enabled: !!id,
  });
}

export function useArchiveQuotesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ArchiveQuotesCreate) =>
      fetchApi<ArchiveQuotes>(`/api/simplified/archive-quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveQuotesKeys.lists() });
    },
  });
}

export function useArchiveQuotesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ArchiveQuotesUpdate & { id: string }) =>
      fetchApi<ArchiveQuotes>(`/api/simplified/archive-quotes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: archiveQuotesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: archiveQuotesKeys.detail(variables.id),
      });
    },
  });
}

export function useArchiveQuotesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/archive-quotes?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveQuotesKeys.lists() });
    },
  });
}
