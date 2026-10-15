import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ResolutionVersions,
  ResolutionVersionsCreate,
  ResolutionVersionsUpdate,
  ResolutionVersionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const resolutionVersionsKeys = {
  all: ["resolutionVersions"] as const,
  lists: () => [...resolutionVersionsKeys.all, "list"] as const,
  list: (filters?: ResolutionVersionsFilters) => [...resolutionVersionsKeys.lists(), filters] as const,
  details: () => [...resolutionVersionsKeys.all, "detail"] as const,
  detail: (id: string) => [...resolutionVersionsKeys.details(), id] as const,
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

export function useResolutionVersionsList(filters?: ResolutionVersionsFilters) {
  return useQuery({
    queryKey: resolutionVersionsKeys.list(filters),
    queryFn: () =>
      fetchApi<ResolutionVersions[]>(`/api/simplified/resolution-versions${buildQueryString(filters)}`),
  });
}

export function useResolutionVersions(id: string) {
  return useQuery({
    queryKey: resolutionVersionsKeys.detail(id),
    queryFn: () =>
      fetchApi<ResolutionVersions>(`/api/simplified/resolution-versions?id=${id}`),
    enabled: !!id,
  });
}

export function useResolutionVersionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ResolutionVersionsCreate) =>
      fetchApi<ResolutionVersions>(`/api/simplified/resolution-versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resolutionVersionsKeys.lists() });
    },
  });
}

export function useResolutionVersionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ResolutionVersionsUpdate & { id: string }) =>
      fetchApi<ResolutionVersions>(`/api/simplified/resolution-versions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: resolutionVersionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: resolutionVersionsKeys.detail(variables.id),
      });
    },
  });
}

export function useResolutionVersionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/resolution-versions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resolutionVersionsKeys.lists() });
    },
  });
}
