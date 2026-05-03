import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContentVersions,
  ContentVersionsCreate,
  ContentVersionsUpdate,
  ContentVersionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contentVersionsKeys = {
  all: ["contentVersions"] as const,
  lists: () => [...contentVersionsKeys.all, "list"] as const,
  list: (filters?: ContentVersionsFilters) => [...contentVersionsKeys.lists(), filters] as const,
  details: () => [...contentVersionsKeys.all, "detail"] as const,
  detail: (id: string) => [...contentVersionsKeys.details(), id] as const,
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

export function useContentVersionsList(filters?: ContentVersionsFilters) {
  return useQuery({
    queryKey: contentVersionsKeys.list(filters),
    queryFn: () =>
      fetchApi<ContentVersions[]>(`/api/simplified/content-versions${buildQueryString(filters)}`),
  });
}

export function useContentVersions(id: string) {
  return useQuery({
    queryKey: contentVersionsKeys.detail(id),
    queryFn: () =>
      fetchApi<ContentVersions>(`/api/simplified/content-versions?id=${id}`),
    enabled: !!id,
  });
}

export function useContentVersionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContentVersionsCreate) =>
      fetchApi<ContentVersions>(`/api/simplified/content-versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentVersionsKeys.lists() });
    },
  });
}

export function useContentVersionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContentVersionsUpdate & { id: string }) =>
      fetchApi<ContentVersions>(`/api/simplified/content-versions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentVersionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contentVersionsKeys.detail(variables.id),
      });
    },
  });
}

export function useContentVersionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/content-versions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentVersionsKeys.lists() });
    },
  });
}
