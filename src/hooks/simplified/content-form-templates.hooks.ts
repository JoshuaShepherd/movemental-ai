import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContentFormTemplates,
  ContentFormTemplatesCreate,
  ContentFormTemplatesUpdate,
  ContentFormTemplatesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contentFormTemplatesKeys = {
  all: ["contentFormTemplates"] as const,
  lists: () => [...contentFormTemplatesKeys.all, "list"] as const,
  list: (filters?: ContentFormTemplatesFilters) => [...contentFormTemplatesKeys.lists(), filters] as const,
  details: () => [...contentFormTemplatesKeys.all, "detail"] as const,
  detail: (id: string) => [...contentFormTemplatesKeys.details(), id] as const,
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

export function useContentFormTemplatesList(filters?: ContentFormTemplatesFilters) {
  return useQuery({
    queryKey: contentFormTemplatesKeys.list(filters),
    queryFn: () =>
      fetchApi<ContentFormTemplates[]>(`/api/simplified/content-form-templates${buildQueryString(filters)}`),
  });
}

export function useContentFormTemplates(id: string) {
  return useQuery({
    queryKey: contentFormTemplatesKeys.detail(id),
    queryFn: () =>
      fetchApi<ContentFormTemplates>(`/api/simplified/content-form-templates?id=${id}`),
    enabled: !!id,
  });
}

export function useContentFormTemplatesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContentFormTemplatesCreate) =>
      fetchApi<ContentFormTemplates>(`/api/simplified/content-form-templates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentFormTemplatesKeys.lists() });
    },
  });
}

export function useContentFormTemplatesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContentFormTemplatesUpdate & { id: string }) =>
      fetchApi<ContentFormTemplates>(`/api/simplified/content-form-templates`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentFormTemplatesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contentFormTemplatesKeys.detail(variables.id),
      });
    },
  });
}

export function useContentFormTemplatesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/content-form-templates?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentFormTemplatesKeys.lists() });
    },
  });
}
