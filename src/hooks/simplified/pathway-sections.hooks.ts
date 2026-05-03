import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  PathwaySections,
  PathwaySectionsCreate,
  PathwaySectionsUpdate,
  PathwaySectionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const pathwaySectionsKeys = {
  all: ["pathwaySections"] as const,
  lists: () => [...pathwaySectionsKeys.all, "list"] as const,
  list: (filters?: PathwaySectionsFilters) => [...pathwaySectionsKeys.lists(), filters] as const,
  details: () => [...pathwaySectionsKeys.all, "detail"] as const,
  detail: (id: string) => [...pathwaySectionsKeys.details(), id] as const,
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

export function usePathwaySectionsList(filters?: PathwaySectionsFilters) {
  return useQuery({
    queryKey: pathwaySectionsKeys.list(filters),
    queryFn: () =>
      fetchApi<PathwaySections[]>(`/api/simplified/pathway-sections${buildQueryString(filters)}`),
  });
}

export function usePathwaySections(id: string) {
  return useQuery({
    queryKey: pathwaySectionsKeys.detail(id),
    queryFn: () =>
      fetchApi<PathwaySections>(`/api/simplified/pathway-sections?id=${id}`),
    enabled: !!id,
  });
}

export function usePathwaySectionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PathwaySectionsCreate) =>
      fetchApi<PathwaySections>(`/api/simplified/pathway-sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pathwaySectionsKeys.lists() });
    },
  });
}

export function usePathwaySectionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PathwaySectionsUpdate & { id: string }) =>
      fetchApi<PathwaySections>(`/api/simplified/pathway-sections`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: pathwaySectionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: pathwaySectionsKeys.detail(variables.id),
      });
    },
  });
}

export function usePathwaySectionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/pathway-sections?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pathwaySectionsKeys.lists() });
    },
  });
}
