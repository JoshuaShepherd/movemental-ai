import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  KairosMoments,
  KairosMomentsCreate,
  KairosMomentsUpdate,
  KairosMomentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const kairosMomentsKeys = {
  all: ["kairosMoments"] as const,
  lists: () => [...kairosMomentsKeys.all, "list"] as const,
  list: (filters?: KairosMomentsFilters) => [...kairosMomentsKeys.lists(), filters] as const,
  details: () => [...kairosMomentsKeys.all, "detail"] as const,
  detail: (id: string) => [...kairosMomentsKeys.details(), id] as const,
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

export function useKairosMomentsList(filters?: KairosMomentsFilters) {
  return useQuery({
    queryKey: kairosMomentsKeys.list(filters),
    queryFn: () =>
      fetchApi<KairosMoments[]>(`/api/simplified/kairos-moments${buildQueryString(filters)}`),
  });
}

export function useKairosMoments(id: string) {
  return useQuery({
    queryKey: kairosMomentsKeys.detail(id),
    queryFn: () =>
      fetchApi<KairosMoments>(`/api/simplified/kairos-moments?id=${id}`),
    enabled: !!id,
  });
}

export function useKairosMomentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: KairosMomentsCreate) =>
      fetchApi<KairosMoments>(`/api/simplified/kairos-moments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kairosMomentsKeys.lists() });
    },
  });
}

export function useKairosMomentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: KairosMomentsUpdate & { id: string }) =>
      fetchApi<KairosMoments>(`/api/simplified/kairos-moments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: kairosMomentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: kairosMomentsKeys.detail(variables.id),
      });
    },
  });
}

export function useKairosMomentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/kairos-moments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kairosMomentsKeys.lists() });
    },
  });
}
