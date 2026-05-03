import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  WorkspaceLiveblocksSnapshots,
  WorkspaceLiveblocksSnapshotsCreate,
  WorkspaceLiveblocksSnapshotsUpdate,
  WorkspaceLiveblocksSnapshotsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const workspaceLiveblocksSnapshotsKeys = {
  all: ["workspaceLiveblocksSnapshots"] as const,
  lists: () => [...workspaceLiveblocksSnapshotsKeys.all, "list"] as const,
  list: (filters?: WorkspaceLiveblocksSnapshotsFilters) => [...workspaceLiveblocksSnapshotsKeys.lists(), filters] as const,
  details: () => [...workspaceLiveblocksSnapshotsKeys.all, "detail"] as const,
  detail: (id: string) => [...workspaceLiveblocksSnapshotsKeys.details(), id] as const,
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

export function useWorkspaceLiveblocksSnapshotsList(filters?: WorkspaceLiveblocksSnapshotsFilters) {
  return useQuery({
    queryKey: workspaceLiveblocksSnapshotsKeys.list(filters),
    queryFn: () =>
      fetchApi<WorkspaceLiveblocksSnapshots[]>(`/api/simplified/workspace-liveblocks-snapshots${buildQueryString(filters)}`),
  });
}

export function useWorkspaceLiveblocksSnapshots(id: string) {
  return useQuery({
    queryKey: workspaceLiveblocksSnapshotsKeys.detail(id),
    queryFn: () =>
      fetchApi<WorkspaceLiveblocksSnapshots>(`/api/simplified/workspace-liveblocks-snapshots?id=${id}`),
    enabled: !!id,
  });
}

export function useWorkspaceLiveblocksSnapshotsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkspaceLiveblocksSnapshotsCreate) =>
      fetchApi<WorkspaceLiveblocksSnapshots>(`/api/simplified/workspace-liveblocks-snapshots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceLiveblocksSnapshotsKeys.lists() });
    },
  });
}

export function useWorkspaceLiveblocksSnapshotsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WorkspaceLiveblocksSnapshotsUpdate & { id: string }) =>
      fetchApi<WorkspaceLiveblocksSnapshots>(`/api/simplified/workspace-liveblocks-snapshots`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: workspaceLiveblocksSnapshotsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: workspaceLiveblocksSnapshotsKeys.detail(variables.id),
      });
    },
  });
}

export function useWorkspaceLiveblocksSnapshotsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/workspace-liveblocks-snapshots?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceLiveblocksSnapshotsKeys.lists() });
    },
  });
}
