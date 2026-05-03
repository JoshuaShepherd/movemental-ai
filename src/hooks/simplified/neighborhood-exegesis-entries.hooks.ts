import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  NeighborhoodExegesisEntries,
  NeighborhoodExegesisEntriesCreate,
  NeighborhoodExegesisEntriesUpdate,
  NeighborhoodExegesisEntriesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const neighborhoodExegesisEntriesKeys = {
  all: ["neighborhoodExegesisEntries"] as const,
  lists: () => [...neighborhoodExegesisEntriesKeys.all, "list"] as const,
  list: (filters?: NeighborhoodExegesisEntriesFilters) => [...neighborhoodExegesisEntriesKeys.lists(), filters] as const,
  details: () => [...neighborhoodExegesisEntriesKeys.all, "detail"] as const,
  detail: (id: string) => [...neighborhoodExegesisEntriesKeys.details(), id] as const,
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

export function useNeighborhoodExegesisEntriesList(filters?: NeighborhoodExegesisEntriesFilters) {
  return useQuery({
    queryKey: neighborhoodExegesisEntriesKeys.list(filters),
    queryFn: () =>
      fetchApi<NeighborhoodExegesisEntries[]>(`/api/simplified/neighborhood-exegesis-entries${buildQueryString(filters)}`),
  });
}

export function useNeighborhoodExegesisEntries(id: string) {
  return useQuery({
    queryKey: neighborhoodExegesisEntriesKeys.detail(id),
    queryFn: () =>
      fetchApi<NeighborhoodExegesisEntries>(`/api/simplified/neighborhood-exegesis-entries?id=${id}`),
    enabled: !!id,
  });
}

export function useNeighborhoodExegesisEntriesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NeighborhoodExegesisEntriesCreate) =>
      fetchApi<NeighborhoodExegesisEntries>(`/api/simplified/neighborhood-exegesis-entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: neighborhoodExegesisEntriesKeys.lists() });
    },
  });
}

export function useNeighborhoodExegesisEntriesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: NeighborhoodExegesisEntriesUpdate & { id: string }) =>
      fetchApi<NeighborhoodExegesisEntries>(`/api/simplified/neighborhood-exegesis-entries`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: neighborhoodExegesisEntriesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: neighborhoodExegesisEntriesKeys.detail(variables.id),
      });
    },
  });
}

export function useNeighborhoodExegesisEntriesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/neighborhood-exegesis-entries?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: neighborhoodExegesisEntriesKeys.lists() });
    },
  });
}
