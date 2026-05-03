import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Pathways,
  PathwaysCreate,
  PathwaysUpdate,
  PathwaysFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const pathwaysKeys = {
  all: ["pathways"] as const,
  lists: () => [...pathwaysKeys.all, "list"] as const,
  list: (filters?: PathwaysFilters) => [...pathwaysKeys.lists(), filters] as const,
  details: () => [...pathwaysKeys.all, "detail"] as const,
  detail: (id: string) => [...pathwaysKeys.details(), id] as const,
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

export function usePathwaysList(filters?: PathwaysFilters) {
  return useQuery({
    queryKey: pathwaysKeys.list(filters),
    queryFn: () =>
      fetchApi<Pathways[]>(`/api/simplified/pathways${buildQueryString(filters)}`),
  });
}

export function usePathways(id: string) {
  return useQuery({
    queryKey: pathwaysKeys.detail(id),
    queryFn: () =>
      fetchApi<Pathways>(`/api/simplified/pathways?id=${id}`),
    enabled: !!id,
  });
}

export function usePathwaysCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PathwaysCreate) =>
      fetchApi<Pathways>(`/api/simplified/pathways`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pathwaysKeys.lists() });
    },
  });
}

export function usePathwaysUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PathwaysUpdate & { id: string }) =>
      fetchApi<Pathways>(`/api/simplified/pathways`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: pathwaysKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: pathwaysKeys.detail(variables.id),
      });
    },
  });
}

export function usePathwaysDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/pathways?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pathwaysKeys.lists() });
    },
  });
}
