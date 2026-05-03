import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContentTemplates,
  ContentTemplatesCreate,
  ContentTemplatesUpdate,
  ContentTemplatesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contentTemplatesKeys = {
  all: ["contentTemplates"] as const,
  lists: () => [...contentTemplatesKeys.all, "list"] as const,
  list: (filters?: ContentTemplatesFilters) => [...contentTemplatesKeys.lists(), filters] as const,
  details: () => [...contentTemplatesKeys.all, "detail"] as const,
  detail: (id: string) => [...contentTemplatesKeys.details(), id] as const,
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

export function useContentTemplatesList(filters?: ContentTemplatesFilters) {
  return useQuery({
    queryKey: contentTemplatesKeys.list(filters),
    queryFn: () =>
      fetchApi<ContentTemplates[]>(`/api/simplified/content-templates${buildQueryString(filters)}`),
  });
}

export function useContentTemplates(id: string) {
  return useQuery({
    queryKey: contentTemplatesKeys.detail(id),
    queryFn: () =>
      fetchApi<ContentTemplates>(`/api/simplified/content-templates?id=${id}`),
    enabled: !!id,
  });
}

export function useContentTemplatesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContentTemplatesCreate) =>
      fetchApi<ContentTemplates>(`/api/simplified/content-templates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentTemplatesKeys.lists() });
    },
  });
}

export function useContentTemplatesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContentTemplatesUpdate & { id: string }) =>
      fetchApi<ContentTemplates>(`/api/simplified/content-templates`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentTemplatesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contentTemplatesKeys.detail(variables.id),
      });
    },
  });
}

export function useContentTemplatesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/content-templates?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentTemplatesKeys.lists() });
    },
  });
}
