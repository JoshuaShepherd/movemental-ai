import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserMemory,
  UserMemoryCreate,
  UserMemoryUpdate,
  UserMemoryFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userMemoryKeys = {
  all: ["userMemory"] as const,
  lists: () => [...userMemoryKeys.all, "list"] as const,
  list: (filters?: UserMemoryFilters) => [...userMemoryKeys.lists(), filters] as const,
  details: () => [...userMemoryKeys.all, "detail"] as const,
  detail: (id: string) => [...userMemoryKeys.details(), id] as const,
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

export function useUserMemoryList(filters?: UserMemoryFilters) {
  return useQuery({
    queryKey: userMemoryKeys.list(filters),
    queryFn: () =>
      fetchApi<UserMemory[]>(`/api/simplified/user-memory${buildQueryString(filters)}`),
  });
}

export function useUserMemory(id: string) {
  return useQuery({
    queryKey: userMemoryKeys.detail(id),
    queryFn: () =>
      fetchApi<UserMemory>(`/api/simplified/user-memory?id=${id}`),
    enabled: !!id,
  });
}

export function useUserMemoryCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserMemoryCreate) =>
      fetchApi<UserMemory>(`/api/simplified/user-memory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userMemoryKeys.lists() });
    },
  });
}

export function useUserMemoryUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserMemoryUpdate & { id: string }) =>
      fetchApi<UserMemory>(`/api/simplified/user-memory`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userMemoryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userMemoryKeys.detail(variables.id),
      });
    },
  });
}

export function useUserMemoryDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-memory?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userMemoryKeys.lists() });
    },
  });
}
