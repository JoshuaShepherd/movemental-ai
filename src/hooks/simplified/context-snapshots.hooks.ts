import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContextSnapshots,
  ContextSnapshotsCreate,
  ContextSnapshotsUpdate,
  ContextSnapshotsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contextSnapshotsKeys = {
  all: ["contextSnapshots"] as const,
  lists: () => [...contextSnapshotsKeys.all, "list"] as const,
  list: (filters?: ContextSnapshotsFilters) => [...contextSnapshotsKeys.lists(), filters] as const,
  details: () => [...contextSnapshotsKeys.all, "detail"] as const,
  detail: (id: string) => [...contextSnapshotsKeys.details(), id] as const,
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

export function useContextSnapshotsList(filters?: ContextSnapshotsFilters) {
  return useQuery({
    queryKey: contextSnapshotsKeys.list(filters),
    queryFn: () =>
      fetchApi<ContextSnapshots[]>(`/api/simplified/context-snapshots${buildQueryString(filters)}`),
  });
}

export function useContextSnapshots(id: string) {
  return useQuery({
    queryKey: contextSnapshotsKeys.detail(id),
    queryFn: () =>
      fetchApi<ContextSnapshots>(`/api/simplified/context-snapshots?id=${id}`),
    enabled: !!id,
  });
}

export function useContextSnapshotsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContextSnapshotsCreate) =>
      fetchApi<ContextSnapshots>(`/api/simplified/context-snapshots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contextSnapshotsKeys.lists() });
    },
  });
}

export function useContextSnapshotsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContextSnapshotsUpdate & { id: string }) =>
      fetchApi<ContextSnapshots>(`/api/simplified/context-snapshots`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contextSnapshotsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contextSnapshotsKeys.detail(variables.id),
      });
    },
  });
}

export function useContextSnapshotsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/context-snapshots?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contextSnapshotsKeys.lists() });
    },
  });
}
