import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  MovementLeaders,
  MovementLeadersCreate,
  MovementLeadersUpdate,
  MovementLeadersFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const movementLeadersKeys = {
  all: ["movementLeaders"] as const,
  lists: () => [...movementLeadersKeys.all, "list"] as const,
  list: (filters?: MovementLeadersFilters) => [...movementLeadersKeys.lists(), filters] as const,
  details: () => [...movementLeadersKeys.all, "detail"] as const,
  detail: (id: string) => [...movementLeadersKeys.details(), id] as const,
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

export function useMovementLeadersList(filters?: MovementLeadersFilters) {
  return useQuery({
    queryKey: movementLeadersKeys.list(filters),
    queryFn: () =>
      fetchApi<MovementLeaders[]>(`/api/simplified/movement-leaders${buildQueryString(filters)}`),
  });
}

export function useMovementLeaders(id: string) {
  return useQuery({
    queryKey: movementLeadersKeys.detail(id),
    queryFn: () =>
      fetchApi<MovementLeaders>(`/api/simplified/movement-leaders?id=${id}`),
    enabled: !!id,
  });
}

export function useMovementLeadersCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MovementLeadersCreate) =>
      fetchApi<MovementLeaders>(`/api/simplified/movement-leaders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeadersKeys.lists() });
    },
  });
}

export function useMovementLeadersUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: MovementLeadersUpdate & { id: string }) =>
      fetchApi<MovementLeaders>(`/api/simplified/movement-leaders`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: movementLeadersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movementLeadersKeys.detail(variables.id),
      });
    },
  });
}

export function useMovementLeadersDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/movement-leaders?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeadersKeys.lists() });
    },
  });
}
