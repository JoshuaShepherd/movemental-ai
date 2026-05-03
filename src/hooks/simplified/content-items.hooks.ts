import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContentItems,
  ContentItemsCreate,
  ContentItemsUpdate,
  ContentItemsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contentItemsKeys = {
  all: ["contentItems"] as const,
  lists: () => [...contentItemsKeys.all, "list"] as const,
  list: (filters?: ContentItemsFilters) => [...contentItemsKeys.lists(), filters] as const,
  details: () => [...contentItemsKeys.all, "detail"] as const,
  detail: (id: string) => [...contentItemsKeys.details(), id] as const,
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

export function useContentItemsList(filters?: ContentItemsFilters) {
  return useQuery({
    queryKey: contentItemsKeys.list(filters),
    queryFn: () =>
      fetchApi<ContentItems[]>(`/api/simplified/content-items${buildQueryString(filters)}`),
  });
}

export function useContentItems(id: string) {
  return useQuery({
    queryKey: contentItemsKeys.detail(id),
    queryFn: () =>
      fetchApi<ContentItems>(`/api/simplified/content-items?id=${id}`),
    enabled: !!id,
  });
}

export function useContentItemsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContentItemsCreate) =>
      fetchApi<ContentItems>(`/api/simplified/content-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentItemsKeys.lists() });
    },
  });
}

export function useContentItemsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContentItemsUpdate & { id: string }) =>
      fetchApi<ContentItems>(`/api/simplified/content-items`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentItemsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contentItemsKeys.detail(variables.id),
      });
    },
  });
}

export function useContentItemsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/content-items?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentItemsKeys.lists() });
    },
  });
}
