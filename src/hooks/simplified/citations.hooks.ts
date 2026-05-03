import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Citations,
  CitationsCreate,
  CitationsUpdate,
  CitationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const citationsKeys = {
  all: ["citations"] as const,
  lists: () => [...citationsKeys.all, "list"] as const,
  list: (filters?: CitationsFilters) => [...citationsKeys.lists(), filters] as const,
  details: () => [...citationsKeys.all, "detail"] as const,
  detail: (id: string) => [...citationsKeys.details(), id] as const,
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

export function useCitationsList(filters?: CitationsFilters) {
  return useQuery({
    queryKey: citationsKeys.list(filters),
    queryFn: () =>
      fetchApi<Citations[]>(`/api/simplified/citations${buildQueryString(filters)}`),
  });
}

export function useCitations(id: string) {
  return useQuery({
    queryKey: citationsKeys.detail(id),
    queryFn: () =>
      fetchApi<Citations>(`/api/simplified/citations?id=${id}`),
    enabled: !!id,
  });
}

export function useCitationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CitationsCreate) =>
      fetchApi<Citations>(`/api/simplified/citations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: citationsKeys.lists() });
    },
  });
}

export function useCitationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CitationsUpdate & { id: string }) =>
      fetchApi<Citations>(`/api/simplified/citations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: citationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: citationsKeys.detail(variables.id),
      });
    },
  });
}

export function useCitationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/citations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: citationsKeys.lists() });
    },
  });
}
