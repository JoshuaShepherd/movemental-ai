import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  RemotionDrafts,
  RemotionDraftsCreate,
  RemotionDraftsUpdate,
  RemotionDraftsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const remotionDraftsKeys = {
  all: ["remotionDrafts"] as const,
  lists: () => [...remotionDraftsKeys.all, "list"] as const,
  list: (filters?: RemotionDraftsFilters) => [...remotionDraftsKeys.lists(), filters] as const,
  details: () => [...remotionDraftsKeys.all, "detail"] as const,
  detail: (id: string) => [...remotionDraftsKeys.details(), id] as const,
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

export function useRemotionDraftsList(filters?: RemotionDraftsFilters) {
  return useQuery({
    queryKey: remotionDraftsKeys.list(filters),
    queryFn: () =>
      fetchApi<RemotionDrafts[]>(`/api/simplified/remotion-drafts${buildQueryString(filters)}`),
  });
}

export function useRemotionDrafts(id: string) {
  return useQuery({
    queryKey: remotionDraftsKeys.detail(id),
    queryFn: () =>
      fetchApi<RemotionDrafts>(`/api/simplified/remotion-drafts?id=${id}`),
    enabled: !!id,
  });
}

export function useRemotionDraftsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RemotionDraftsCreate) =>
      fetchApi<RemotionDrafts>(`/api/simplified/remotion-drafts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: remotionDraftsKeys.lists() });
    },
  });
}

export function useRemotionDraftsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: RemotionDraftsUpdate & { id: string }) =>
      fetchApi<RemotionDrafts>(`/api/simplified/remotion-drafts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: remotionDraftsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: remotionDraftsKeys.detail(variables.id),
      });
    },
  });
}

export function useRemotionDraftsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/remotion-drafts?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: remotionDraftsKeys.lists() });
    },
  });
}
