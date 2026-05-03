import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContentCategories,
  ContentCategoriesCreate,
  ContentCategoriesUpdate,
  ContentCategoriesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contentCategoriesKeys = {
  all: ["contentCategories"] as const,
  lists: () => [...contentCategoriesKeys.all, "list"] as const,
  list: (filters?: ContentCategoriesFilters) => [...contentCategoriesKeys.lists(), filters] as const,
  details: () => [...contentCategoriesKeys.all, "detail"] as const,
  detail: (id: string) => [...contentCategoriesKeys.details(), id] as const,
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

export function useContentCategoriesList(filters?: ContentCategoriesFilters) {
  return useQuery({
    queryKey: contentCategoriesKeys.list(filters),
    queryFn: () =>
      fetchApi<ContentCategories[]>(`/api/simplified/content-categories${buildQueryString(filters)}`),
  });
}

export function useContentCategories(id: string) {
  return useQuery({
    queryKey: contentCategoriesKeys.detail(id),
    queryFn: () =>
      fetchApi<ContentCategories>(`/api/simplified/content-categories?id=${id}`),
    enabled: !!id,
  });
}

export function useContentCategoriesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContentCategoriesCreate) =>
      fetchApi<ContentCategories>(`/api/simplified/content-categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentCategoriesKeys.lists() });
    },
  });
}

export function useContentCategoriesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContentCategoriesUpdate & { id: string }) =>
      fetchApi<ContentCategories>(`/api/simplified/content-categories`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentCategoriesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contentCategoriesKeys.detail(variables.id),
      });
    },
  });
}

export function useContentCategoriesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/content-categories?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentCategoriesKeys.lists() });
    },
  });
}
