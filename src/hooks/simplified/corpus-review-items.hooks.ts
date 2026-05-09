import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CorpusReviewItems,
  CorpusReviewItemsCreate,
  CorpusReviewItemsUpdate,
  CorpusReviewItemsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const corpusReviewItemsKeys = {
  all: ["corpusReviewItems"] as const,
  lists: () => [...corpusReviewItemsKeys.all, "list"] as const,
  list: (filters?: CorpusReviewItemsFilters) => [...corpusReviewItemsKeys.lists(), filters] as const,
  details: () => [...corpusReviewItemsKeys.all, "detail"] as const,
  detail: (id: string) => [...corpusReviewItemsKeys.details(), id] as const,
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

export function useCorpusReviewItemsList(filters?: CorpusReviewItemsFilters) {
  return useQuery({
    queryKey: corpusReviewItemsKeys.list(filters),
    queryFn: () =>
      fetchApi<CorpusReviewItems[]>(`/api/simplified/corpus-review-items${buildQueryString(filters)}`),
  });
}

export function useCorpusReviewItems(id: string) {
  return useQuery({
    queryKey: corpusReviewItemsKeys.detail(id),
    queryFn: () =>
      fetchApi<CorpusReviewItems>(`/api/simplified/corpus-review-items?id=${id}`),
    enabled: !!id,
  });
}

export function useCorpusReviewItemsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CorpusReviewItemsCreate) =>
      fetchApi<CorpusReviewItems>(`/api/simplified/corpus-review-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: corpusReviewItemsKeys.lists() });
    },
  });
}

export function useCorpusReviewItemsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CorpusReviewItemsUpdate & { id: string }) =>
      fetchApi<CorpusReviewItems>(`/api/simplified/corpus-review-items`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: corpusReviewItemsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: corpusReviewItemsKeys.detail(variables.id),
      });
    },
  });
}

export function useCorpusReviewItemsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/corpus-review-items?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: corpusReviewItemsKeys.lists() });
    },
  });
}
