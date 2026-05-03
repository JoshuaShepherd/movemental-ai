import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserNeighborhoodContext,
  UserNeighborhoodContextCreate,
  UserNeighborhoodContextUpdate,
  UserNeighborhoodContextFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userNeighborhoodContextKeys = {
  all: ["userNeighborhoodContext"] as const,
  lists: () => [...userNeighborhoodContextKeys.all, "list"] as const,
  list: (filters?: UserNeighborhoodContextFilters) => [...userNeighborhoodContextKeys.lists(), filters] as const,
  details: () => [...userNeighborhoodContextKeys.all, "detail"] as const,
  detail: (id: string) => [...userNeighborhoodContextKeys.details(), id] as const,
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

export function useUserNeighborhoodContextList(filters?: UserNeighborhoodContextFilters) {
  return useQuery({
    queryKey: userNeighborhoodContextKeys.list(filters),
    queryFn: () =>
      fetchApi<UserNeighborhoodContext[]>(`/api/simplified/user-neighborhood-context${buildQueryString(filters)}`),
  });
}

export function useUserNeighborhoodContext(id: string) {
  return useQuery({
    queryKey: userNeighborhoodContextKeys.detail(id),
    queryFn: () =>
      fetchApi<UserNeighborhoodContext>(`/api/simplified/user-neighborhood-context?id=${id}`),
    enabled: !!id,
  });
}

export function useUserNeighborhoodContextCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserNeighborhoodContextCreate) =>
      fetchApi<UserNeighborhoodContext>(`/api/simplified/user-neighborhood-context`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userNeighborhoodContextKeys.lists() });
    },
  });
}

export function useUserNeighborhoodContextUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserNeighborhoodContextUpdate & { id: string }) =>
      fetchApi<UserNeighborhoodContext>(`/api/simplified/user-neighborhood-context`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userNeighborhoodContextKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userNeighborhoodContextKeys.detail(variables.id),
      });
    },
  });
}

export function useUserNeighborhoodContextDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-neighborhood-context?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userNeighborhoodContextKeys.lists() });
    },
  });
}
