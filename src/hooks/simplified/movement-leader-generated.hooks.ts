import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  MovementLeaderGenerated,
  MovementLeaderGeneratedCreate,
  MovementLeaderGeneratedUpdate,
  MovementLeaderGeneratedFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const movementLeaderGeneratedKeys = {
  all: ["movementLeaderGenerated"] as const,
  lists: () => [...movementLeaderGeneratedKeys.all, "list"] as const,
  list: (filters?: MovementLeaderGeneratedFilters) => [...movementLeaderGeneratedKeys.lists(), filters] as const,
  details: () => [...movementLeaderGeneratedKeys.all, "detail"] as const,
  detail: (id: string) => [...movementLeaderGeneratedKeys.details(), id] as const,
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

export function useMovementLeaderGeneratedList(filters?: MovementLeaderGeneratedFilters) {
  return useQuery({
    queryKey: movementLeaderGeneratedKeys.list(filters),
    queryFn: () =>
      fetchApi<MovementLeaderGenerated[]>(`/api/simplified/movement-leader-generated${buildQueryString(filters)}`),
  });
}

export function useMovementLeaderGenerated(id: string) {
  return useQuery({
    queryKey: movementLeaderGeneratedKeys.detail(id),
    queryFn: () =>
      fetchApi<MovementLeaderGenerated>(`/api/simplified/movement-leader-generated?id=${id}`),
    enabled: !!id,
  });
}

export function useMovementLeaderGeneratedCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MovementLeaderGeneratedCreate) =>
      fetchApi<MovementLeaderGenerated>(`/api/simplified/movement-leader-generated`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderGeneratedKeys.lists() });
    },
  });
}

export function useMovementLeaderGeneratedUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: MovementLeaderGeneratedUpdate & { id: string }) =>
      fetchApi<MovementLeaderGenerated>(`/api/simplified/movement-leader-generated`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: movementLeaderGeneratedKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movementLeaderGeneratedKeys.detail(variables.id),
      });
    },
  });
}

export function useMovementLeaderGeneratedDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/movement-leader-generated?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderGeneratedKeys.lists() });
    },
  });
}
