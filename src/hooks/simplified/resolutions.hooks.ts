import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Resolutions,
  ResolutionsCreate,
  ResolutionsUpdate,
  ResolutionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const resolutionsKeys = {
  all: ["resolutions"] as const,
  lists: () => [...resolutionsKeys.all, "list"] as const,
  list: (filters?: ResolutionsFilters) => [...resolutionsKeys.lists(), filters] as const,
  details: () => [...resolutionsKeys.all, "detail"] as const,
  detail: (id: string) => [...resolutionsKeys.details(), id] as const,
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

export function useResolutionsList(filters?: ResolutionsFilters) {
  return useQuery({
    queryKey: resolutionsKeys.list(filters),
    queryFn: () =>
      fetchApi<Resolutions[]>(`/api/simplified/resolutions${buildQueryString(filters)}`),
  });
}

export function useResolutions(id: string) {
  return useQuery({
    queryKey: resolutionsKeys.detail(id),
    queryFn: () =>
      fetchApi<Resolutions>(`/api/simplified/resolutions?id=${id}`),
    enabled: !!id,
  });
}

export function useResolutionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ResolutionsCreate) =>
      fetchApi<Resolutions>(`/api/simplified/resolutions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resolutionsKeys.lists() });
    },
  });
}

export function useResolutionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ResolutionsUpdate & { id: string }) =>
      fetchApi<Resolutions>(`/api/simplified/resolutions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: resolutionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: resolutionsKeys.detail(variables.id),
      });
    },
  });
}

export function useResolutionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/resolutions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resolutionsKeys.lists() });
    },
  });
}
