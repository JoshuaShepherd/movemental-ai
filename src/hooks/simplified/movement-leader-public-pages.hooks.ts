import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  MovementLeaderPublicPages,
  MovementLeaderPublicPagesCreate,
  MovementLeaderPublicPagesUpdate,
  MovementLeaderPublicPagesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const movementLeaderPublicPagesKeys = {
  all: ["movementLeaderPublicPages"] as const,
  lists: () => [...movementLeaderPublicPagesKeys.all, "list"] as const,
  list: (filters?: MovementLeaderPublicPagesFilters) => [...movementLeaderPublicPagesKeys.lists(), filters] as const,
  details: () => [...movementLeaderPublicPagesKeys.all, "detail"] as const,
  detail: (id: string) => [...movementLeaderPublicPagesKeys.details(), id] as const,
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

export function useMovementLeaderPublicPagesList(filters?: MovementLeaderPublicPagesFilters) {
  return useQuery({
    queryKey: movementLeaderPublicPagesKeys.list(filters),
    queryFn: () =>
      fetchApi<MovementLeaderPublicPages[]>(`/api/simplified/movement-leader-public-pages${buildQueryString(filters)}`),
  });
}

export function useMovementLeaderPublicPages(id: string) {
  return useQuery({
    queryKey: movementLeaderPublicPagesKeys.detail(id),
    queryFn: () =>
      fetchApi<MovementLeaderPublicPages>(`/api/simplified/movement-leader-public-pages?id=${id}`),
    enabled: !!id,
  });
}

export function useMovementLeaderPublicPagesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MovementLeaderPublicPagesCreate) =>
      fetchApi<MovementLeaderPublicPages>(`/api/simplified/movement-leader-public-pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderPublicPagesKeys.lists() });
    },
  });
}

export function useMovementLeaderPublicPagesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: MovementLeaderPublicPagesUpdate & { id: string }) =>
      fetchApi<MovementLeaderPublicPages>(`/api/simplified/movement-leader-public-pages`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: movementLeaderPublicPagesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movementLeaderPublicPagesKeys.detail(variables.id),
      });
    },
  });
}

export function useMovementLeaderPublicPagesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/movement-leader-public-pages?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderPublicPagesKeys.lists() });
    },
  });
}
