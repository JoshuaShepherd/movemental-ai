import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Affiliates,
  AffiliatesCreate,
  AffiliatesUpdate,
  AffiliatesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const affiliatesKeys = {
  all: ["affiliates"] as const,
  lists: () => [...affiliatesKeys.all, "list"] as const,
  list: (filters?: AffiliatesFilters) => [...affiliatesKeys.lists(), filters] as const,
  details: () => [...affiliatesKeys.all, "detail"] as const,
  detail: (id: string) => [...affiliatesKeys.details(), id] as const,
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

export function useAffiliatesList(filters?: AffiliatesFilters) {
  return useQuery({
    queryKey: affiliatesKeys.list(filters),
    queryFn: () =>
      fetchApi<Affiliates[]>(`/api/simplified/affiliates${buildQueryString(filters)}`),
  });
}

export function useAffiliates(id: string) {
  return useQuery({
    queryKey: affiliatesKeys.detail(id),
    queryFn: () =>
      fetchApi<Affiliates>(`/api/simplified/affiliates?id=${id}`),
    enabled: !!id,
  });
}

export function useAffiliatesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AffiliatesCreate) =>
      fetchApi<Affiliates>(`/api/simplified/affiliates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliatesKeys.lists() });
    },
  });
}

export function useAffiliatesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AffiliatesUpdate & { id: string }) =>
      fetchApi<Affiliates>(`/api/simplified/affiliates`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: affiliatesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: affiliatesKeys.detail(variables.id),
      });
    },
  });
}

export function useAffiliatesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/affiliates?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliatesKeys.lists() });
    },
  });
}
