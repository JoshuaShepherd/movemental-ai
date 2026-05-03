import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserVocation,
  UserVocationCreate,
  UserVocationUpdate,
  UserVocationFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userVocationKeys = {
  all: ["userVocation"] as const,
  lists: () => [...userVocationKeys.all, "list"] as const,
  list: (filters?: UserVocationFilters) => [...userVocationKeys.lists(), filters] as const,
  details: () => [...userVocationKeys.all, "detail"] as const,
  detail: (id: string) => [...userVocationKeys.details(), id] as const,
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

export function useUserVocationList(filters?: UserVocationFilters) {
  return useQuery({
    queryKey: userVocationKeys.list(filters),
    queryFn: () =>
      fetchApi<UserVocation[]>(`/api/simplified/user-vocation${buildQueryString(filters)}`),
  });
}

export function useUserVocation(id: string) {
  return useQuery({
    queryKey: userVocationKeys.detail(id),
    queryFn: () =>
      fetchApi<UserVocation>(`/api/simplified/user-vocation?id=${id}`),
    enabled: !!id,
  });
}

export function useUserVocationCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserVocationCreate) =>
      fetchApi<UserVocation>(`/api/simplified/user-vocation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userVocationKeys.lists() });
    },
  });
}

export function useUserVocationUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserVocationUpdate & { id: string }) =>
      fetchApi<UserVocation>(`/api/simplified/user-vocation`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userVocationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userVocationKeys.detail(variables.id),
      });
    },
  });
}

export function useUserVocationDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-vocation?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userVocationKeys.lists() });
    },
  });
}
