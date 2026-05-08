import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CorpusBindings,
  CorpusBindingsCreate,
  CorpusBindingsUpdate,
  CorpusBindingsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const corpusBindingsKeys = {
  all: ["corpusBindings"] as const,
  lists: () => [...corpusBindingsKeys.all, "list"] as const,
  list: (filters?: CorpusBindingsFilters) => [...corpusBindingsKeys.lists(), filters] as const,
  details: () => [...corpusBindingsKeys.all, "detail"] as const,
  detail: (id: string) => [...corpusBindingsKeys.details(), id] as const,
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

export function useCorpusBindingsList(filters?: CorpusBindingsFilters) {
  return useQuery({
    queryKey: corpusBindingsKeys.list(filters),
    queryFn: () =>
      fetchApi<CorpusBindings[]>(`/api/simplified/corpus-bindings${buildQueryString(filters)}`),
  });
}

export function useCorpusBindings(id: string) {
  return useQuery({
    queryKey: corpusBindingsKeys.detail(id),
    queryFn: () =>
      fetchApi<CorpusBindings>(`/api/simplified/corpus-bindings?id=${id}`),
    enabled: !!id,
  });
}

export function useCorpusBindingsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CorpusBindingsCreate) =>
      fetchApi<CorpusBindings>(`/api/simplified/corpus-bindings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: corpusBindingsKeys.lists() });
    },
  });
}

export function useCorpusBindingsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CorpusBindingsUpdate & { id: string }) =>
      fetchApi<CorpusBindings>(`/api/simplified/corpus-bindings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: corpusBindingsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: corpusBindingsKeys.detail(variables.id),
      });
    },
  });
}

export function useCorpusBindingsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/corpus-bindings?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: corpusBindingsKeys.lists() });
    },
  });
}
