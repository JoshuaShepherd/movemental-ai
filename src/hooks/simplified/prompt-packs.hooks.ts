import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  PromptPacks,
  PromptPacksCreate,
  PromptPacksUpdate,
  PromptPacksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const promptPacksKeys = {
  all: ["promptPacks"] as const,
  lists: () => [...promptPacksKeys.all, "list"] as const,
  list: (filters?: PromptPacksFilters) => [...promptPacksKeys.lists(), filters] as const,
  details: () => [...promptPacksKeys.all, "detail"] as const,
  detail: (id: string) => [...promptPacksKeys.details(), id] as const,
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

export function usePromptPacksList(filters?: PromptPacksFilters) {
  return useQuery({
    queryKey: promptPacksKeys.list(filters),
    queryFn: () =>
      fetchApi<PromptPacks[]>(`/api/simplified/prompt-packs${buildQueryString(filters)}`),
  });
}

export function usePromptPacks(id: string) {
  return useQuery({
    queryKey: promptPacksKeys.detail(id),
    queryFn: () =>
      fetchApi<PromptPacks>(`/api/simplified/prompt-packs?id=${id}`),
    enabled: !!id,
  });
}

export function usePromptPacksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PromptPacksCreate) =>
      fetchApi<PromptPacks>(`/api/simplified/prompt-packs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promptPacksKeys.lists() });
    },
  });
}

export function usePromptPacksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PromptPacksUpdate & { id: string }) =>
      fetchApi<PromptPacks>(`/api/simplified/prompt-packs`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: promptPacksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: promptPacksKeys.detail(variables.id),
      });
    },
  });
}

export function usePromptPacksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/prompt-packs?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promptPacksKeys.lists() });
    },
  });
}
