import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SermonPreparations,
  SermonPreparationsCreate,
  SermonPreparationsUpdate,
  SermonPreparationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const sermonPreparationsKeys = {
  all: ["sermonPreparations"] as const,
  lists: () => [...sermonPreparationsKeys.all, "list"] as const,
  list: (filters?: SermonPreparationsFilters) => [...sermonPreparationsKeys.lists(), filters] as const,
  details: () => [...sermonPreparationsKeys.all, "detail"] as const,
  detail: (id: string) => [...sermonPreparationsKeys.details(), id] as const,
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

export function useSermonPreparationsList(filters?: SermonPreparationsFilters) {
  return useQuery({
    queryKey: sermonPreparationsKeys.list(filters),
    queryFn: () =>
      fetchApi<SermonPreparations[]>(`/api/simplified/sermon-preparations${buildQueryString(filters)}`),
  });
}

export function useSermonPreparations(id: string) {
  return useQuery({
    queryKey: sermonPreparationsKeys.detail(id),
    queryFn: () =>
      fetchApi<SermonPreparations>(`/api/simplified/sermon-preparations?id=${id}`),
    enabled: !!id,
  });
}

export function useSermonPreparationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SermonPreparationsCreate) =>
      fetchApi<SermonPreparations>(`/api/simplified/sermon-preparations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sermonPreparationsKeys.lists() });
    },
  });
}

export function useSermonPreparationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SermonPreparationsUpdate & { id: string }) =>
      fetchApi<SermonPreparations>(`/api/simplified/sermon-preparations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: sermonPreparationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: sermonPreparationsKeys.detail(variables.id),
      });
    },
  });
}

export function useSermonPreparationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/sermon-preparations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sermonPreparationsKeys.lists() });
    },
  });
}
