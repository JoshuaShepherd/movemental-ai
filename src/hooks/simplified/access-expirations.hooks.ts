import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AccessExpirations,
  AccessExpirationsCreate,
  AccessExpirationsUpdate,
  AccessExpirationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const accessExpirationsKeys = {
  all: ["accessExpirations"] as const,
  lists: () => [...accessExpirationsKeys.all, "list"] as const,
  list: (filters?: AccessExpirationsFilters) => [...accessExpirationsKeys.lists(), filters] as const,
  details: () => [...accessExpirationsKeys.all, "detail"] as const,
  detail: (id: string) => [...accessExpirationsKeys.details(), id] as const,
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

export function useAccessExpirationsList(filters?: AccessExpirationsFilters) {
  return useQuery({
    queryKey: accessExpirationsKeys.list(filters),
    queryFn: () =>
      fetchApi<AccessExpirations[]>(`/api/simplified/access-expirations${buildQueryString(filters)}`),
  });
}

export function useAccessExpirations(id: string) {
  return useQuery({
    queryKey: accessExpirationsKeys.detail(id),
    queryFn: () =>
      fetchApi<AccessExpirations>(`/api/simplified/access-expirations?id=${id}`),
    enabled: !!id,
  });
}

export function useAccessExpirationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AccessExpirationsCreate) =>
      fetchApi<AccessExpirations>(`/api/simplified/access-expirations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accessExpirationsKeys.lists() });
    },
  });
}

export function useAccessExpirationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AccessExpirationsUpdate & { id: string }) =>
      fetchApi<AccessExpirations>(`/api/simplified/access-expirations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: accessExpirationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: accessExpirationsKeys.detail(variables.id),
      });
    },
  });
}

export function useAccessExpirationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/access-expirations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accessExpirationsKeys.lists() });
    },
  });
}
