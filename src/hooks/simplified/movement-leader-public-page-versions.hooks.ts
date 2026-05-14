import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  MovementLeaderPublicPageVersions,
  MovementLeaderPublicPageVersionsCreate,
  MovementLeaderPublicPageVersionsUpdate,
  MovementLeaderPublicPageVersionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const movementLeaderPublicPageVersionsKeys = {
  all: ["movementLeaderPublicPageVersions"] as const,
  lists: () => [...movementLeaderPublicPageVersionsKeys.all, "list"] as const,
  list: (filters?: MovementLeaderPublicPageVersionsFilters) => [...movementLeaderPublicPageVersionsKeys.lists(), filters] as const,
  details: () => [...movementLeaderPublicPageVersionsKeys.all, "detail"] as const,
  detail: (id: string) => [...movementLeaderPublicPageVersionsKeys.details(), id] as const,
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

export function useMovementLeaderPublicPageVersionsList(filters?: MovementLeaderPublicPageVersionsFilters) {
  return useQuery({
    queryKey: movementLeaderPublicPageVersionsKeys.list(filters),
    queryFn: () =>
      fetchApi<MovementLeaderPublicPageVersions[]>(`/api/simplified/movement-leader-public-page-versions${buildQueryString(filters)}`),
  });
}

export function useMovementLeaderPublicPageVersions(id: string) {
  return useQuery({
    queryKey: movementLeaderPublicPageVersionsKeys.detail(id),
    queryFn: () =>
      fetchApi<MovementLeaderPublicPageVersions>(`/api/simplified/movement-leader-public-page-versions?id=${id}`),
    enabled: !!id,
  });
}

export function useMovementLeaderPublicPageVersionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MovementLeaderPublicPageVersionsCreate) =>
      fetchApi<MovementLeaderPublicPageVersions>(`/api/simplified/movement-leader-public-page-versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderPublicPageVersionsKeys.lists() });
    },
  });
}

export function useMovementLeaderPublicPageVersionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: MovementLeaderPublicPageVersionsUpdate & { id: string }) =>
      fetchApi<MovementLeaderPublicPageVersions>(`/api/simplified/movement-leader-public-page-versions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: movementLeaderPublicPageVersionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movementLeaderPublicPageVersionsKeys.detail(variables.id),
      });
    },
  });
}

export function useMovementLeaderPublicPageVersionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/movement-leader-public-page-versions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementLeaderPublicPageVersionsKeys.lists() });
    },
  });
}
