import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  PromptPackLayers,
  PromptPackLayersCreate,
  PromptPackLayersUpdate,
  PromptPackLayersFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const promptPackLayersKeys = {
  all: ["promptPackLayers"] as const,
  lists: () => [...promptPackLayersKeys.all, "list"] as const,
  list: (filters?: PromptPackLayersFilters) => [...promptPackLayersKeys.lists(), filters] as const,
  details: () => [...promptPackLayersKeys.all, "detail"] as const,
  detail: (id: string) => [...promptPackLayersKeys.details(), id] as const,
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

export function usePromptPackLayersList(filters?: PromptPackLayersFilters) {
  return useQuery({
    queryKey: promptPackLayersKeys.list(filters),
    queryFn: () =>
      fetchApi<PromptPackLayers[]>(`/api/simplified/prompt-pack-layers${buildQueryString(filters)}`),
  });
}

export function usePromptPackLayers(id: string) {
  return useQuery({
    queryKey: promptPackLayersKeys.detail(id),
    queryFn: () =>
      fetchApi<PromptPackLayers>(`/api/simplified/prompt-pack-layers?id=${id}`),
    enabled: !!id,
  });
}

export function usePromptPackLayersCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PromptPackLayersCreate) =>
      fetchApi<PromptPackLayers>(`/api/simplified/prompt-pack-layers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promptPackLayersKeys.lists() });
    },
  });
}

export function usePromptPackLayersUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PromptPackLayersUpdate & { id: string }) =>
      fetchApi<PromptPackLayers>(`/api/simplified/prompt-pack-layers`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: promptPackLayersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: promptPackLayersKeys.detail(variables.id),
      });
    },
  });
}

export function usePromptPackLayersDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/prompt-pack-layers?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promptPackLayersKeys.lists() });
    },
  });
}
