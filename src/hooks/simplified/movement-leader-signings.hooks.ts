import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  MovementLeaderSignings,
  MovementLeaderSigningsCreate,
  MovementLeaderSigningsUpdate,
  MovementLeaderSigningsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const movementLeaderSigningsKeys = {
  all: ["movementLeaderSignings"] as const,
  lists: () => [...movementLeaderSigningsKeys.all, "list"] as const,
  list: (filters?: MovementLeaderSigningsFilters) => [...movementLeaderSigningsKeys.lists(), filters] as const,
  details: () => [...movementLeaderSigningsKeys.all, "detail"] as const,
  detail: (id: string) => [...movementLeaderSigningsKeys.details(), id] as const,
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

export function useMovementLeaderSigningsList(filters?: MovementLeaderSigningsFilters) {
  return useQuery({
    queryKey: movementLeaderSigningsKeys.list(filters),
    queryFn: () =>
      fetchApi<MovementLeaderSignings[]>(`/api/simplified/movement-leader-signings${buildQueryString(filters)}`),
  });
}

export function useMovementLeaderSignings(id: string) {
  return useQuery({
    queryKey: movementLeaderSigningsKeys.detail(id),
    queryFn: () =>
      fetchApi<MovementLeaderSignings>(`/api/simplified/movement-leader-signings?id=${id}`),
    enabled: !!id,
  });
}

export function useMovementLeaderSigningsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MovementLeaderSigningsCreate) =>
      fetchApi<MovementLeaderSignings>(`/api/simplified/movement-leader-signings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderSigningsKeys.lists() });
    },
  });
}

export function useMovementLeaderSigningsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: MovementLeaderSigningsUpdate & { id: string }) =>
      fetchApi<MovementLeaderSignings>(`/api/simplified/movement-leader-signings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: movementLeaderSigningsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movementLeaderSigningsKeys.detail(variables.id),
      });
    },
  });
}

export function useMovementLeaderSigningsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/movement-leader-signings?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderSigningsKeys.lists() });
    },
  });
}
