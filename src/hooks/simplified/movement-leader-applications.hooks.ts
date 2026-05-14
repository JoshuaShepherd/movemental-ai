import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  MovementLeaderApplications,
  MovementLeaderApplicationsCreate,
  MovementLeaderApplicationsUpdate,
  MovementLeaderApplicationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const movementLeaderApplicationsKeys = {
  all: ["movementLeaderApplications"] as const,
  lists: () => [...movementLeaderApplicationsKeys.all, "list"] as const,
  list: (filters?: MovementLeaderApplicationsFilters) => [...movementLeaderApplicationsKeys.lists(), filters] as const,
  details: () => [...movementLeaderApplicationsKeys.all, "detail"] as const,
  detail: (id: string) => [...movementLeaderApplicationsKeys.details(), id] as const,
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

export function useMovementLeaderApplicationsList(filters?: MovementLeaderApplicationsFilters) {
  return useQuery({
    queryKey: movementLeaderApplicationsKeys.list(filters),
    queryFn: () =>
      fetchApi<MovementLeaderApplications[]>(`/api/simplified/movement-leader-applications${buildQueryString(filters)}`),
  });
}

export function useMovementLeaderApplications(id: string) {
  return useQuery({
    queryKey: movementLeaderApplicationsKeys.detail(id),
    queryFn: () =>
      fetchApi<MovementLeaderApplications>(`/api/simplified/movement-leader-applications?id=${id}`),
    enabled: !!id,
  });
}

export function useMovementLeaderApplicationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MovementLeaderApplicationsCreate) =>
      fetchApi<MovementLeaderApplications>(`/api/simplified/movement-leader-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderApplicationsKeys.lists() });
    },
  });
}

export function useMovementLeaderApplicationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: MovementLeaderApplicationsUpdate & { id: string }) =>
      fetchApi<MovementLeaderApplications>(`/api/simplified/movement-leader-applications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: movementLeaderApplicationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movementLeaderApplicationsKeys.detail(variables.id),
      });
    },
  });
}

export function useMovementLeaderApplicationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/movement-leader-applications?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderApplicationsKeys.lists() });
    },
  });
}
