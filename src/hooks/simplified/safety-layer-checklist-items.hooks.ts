import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyLayerChecklistItems,
  SafetyLayerChecklistItemsCreate,
  SafetyLayerChecklistItemsUpdate,
  SafetyLayerChecklistItemsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyLayerChecklistItemsKeys = {
  all: ["safetyLayerChecklistItems"] as const,
  lists: () => [...safetyLayerChecklistItemsKeys.all, "list"] as const,
  list: (filters?: SafetyLayerChecklistItemsFilters) => [...safetyLayerChecklistItemsKeys.lists(), filters] as const,
  details: () => [...safetyLayerChecklistItemsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyLayerChecklistItemsKeys.details(), id] as const,
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

export function useSafetyLayerChecklistItemsList(filters?: SafetyLayerChecklistItemsFilters) {
  return useQuery({
    queryKey: safetyLayerChecklistItemsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyLayerChecklistItems[]>(`/api/simplified/safety-layer-checklist-items${buildQueryString(filters)}`),
  });
}

export function useSafetyLayerChecklistItems(id: string) {
  return useQuery({
    queryKey: safetyLayerChecklistItemsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyLayerChecklistItems>(`/api/simplified/safety-layer-checklist-items?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyLayerChecklistItemsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyLayerChecklistItemsCreate) =>
      fetchApi<SafetyLayerChecklistItems>(`/api/simplified/safety-layer-checklist-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyLayerChecklistItemsKeys.lists() });
    },
  });
}

export function useSafetyLayerChecklistItemsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyLayerChecklistItemsUpdate & { id: string }) =>
      fetchApi<SafetyLayerChecklistItems>(`/api/simplified/safety-layer-checklist-items`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyLayerChecklistItemsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyLayerChecklistItemsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyLayerChecklistItemsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-layer-checklist-items?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyLayerChecklistItemsKeys.lists() });
    },
  });
}
