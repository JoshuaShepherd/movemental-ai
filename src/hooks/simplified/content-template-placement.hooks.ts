import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContentTemplatePlacement,
  ContentTemplatePlacementCreate,
  ContentTemplatePlacementUpdate,
  ContentTemplatePlacementFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contentTemplatePlacementKeys = {
  all: ["contentTemplatePlacement"] as const,
  lists: () => [...contentTemplatePlacementKeys.all, "list"] as const,
  list: (filters?: ContentTemplatePlacementFilters) => [...contentTemplatePlacementKeys.lists(), filters] as const,
  details: () => [...contentTemplatePlacementKeys.all, "detail"] as const,
  detail: (id: string) => [...contentTemplatePlacementKeys.details(), id] as const,
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

export function useContentTemplatePlacementList(filters?: ContentTemplatePlacementFilters) {
  return useQuery({
    queryKey: contentTemplatePlacementKeys.list(filters),
    queryFn: () =>
      fetchApi<ContentTemplatePlacement[]>(`/api/simplified/content-template-placement${buildQueryString(filters)}`),
  });
}

export function useContentTemplatePlacement(id: string) {
  return useQuery({
    queryKey: contentTemplatePlacementKeys.detail(id),
    queryFn: () =>
      fetchApi<ContentTemplatePlacement>(`/api/simplified/content-template-placement?id=${id}`),
    enabled: !!id,
  });
}

export function useContentTemplatePlacementCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContentTemplatePlacementCreate) =>
      fetchApi<ContentTemplatePlacement>(`/api/simplified/content-template-placement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentTemplatePlacementKeys.lists() });
    },
  });
}

export function useContentTemplatePlacementUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContentTemplatePlacementUpdate & { id: string }) =>
      fetchApi<ContentTemplatePlacement>(`/api/simplified/content-template-placement`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentTemplatePlacementKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contentTemplatePlacementKeys.detail(variables.id),
      });
    },
  });
}

export function useContentTemplatePlacementDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/content-template-placement?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentTemplatePlacementKeys.lists() });
    },
  });
}
