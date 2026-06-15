import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiRealityShareTokens,
  AiRealityShareTokensCreate,
  AiRealityShareTokensUpdate,
  AiRealityShareTokensFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiRealityShareTokensKeys = {
  all: ["aiRealityShareTokens"] as const,
  lists: () => [...aiRealityShareTokensKeys.all, "list"] as const,
  list: (filters?: AiRealityShareTokensFilters) => [...aiRealityShareTokensKeys.lists(), filters] as const,
  details: () => [...aiRealityShareTokensKeys.all, "detail"] as const,
  detail: (id: string) => [...aiRealityShareTokensKeys.details(), id] as const,
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

export function useAiRealityShareTokensList(filters?: AiRealityShareTokensFilters) {
  return useQuery({
    queryKey: aiRealityShareTokensKeys.list(filters),
    queryFn: () =>
      fetchApi<AiRealityShareTokens[]>(`/api/simplified/ai-reality-share-tokens${buildQueryString(filters)}`),
  });
}

export function useAiRealityShareTokens(id: string) {
  return useQuery({
    queryKey: aiRealityShareTokensKeys.detail(id),
    queryFn: () =>
      fetchApi<AiRealityShareTokens>(`/api/simplified/ai-reality-share-tokens?id=${id}`),
    enabled: !!id,
  });
}

export function useAiRealityShareTokensCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiRealityShareTokensCreate) =>
      fetchApi<AiRealityShareTokens>(`/api/simplified/ai-reality-share-tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiRealityShareTokensKeys.lists() });
    },
  });
}

export function useAiRealityShareTokensUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiRealityShareTokensUpdate & { id: string }) =>
      fetchApi<AiRealityShareTokens>(`/api/simplified/ai-reality-share-tokens`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiRealityShareTokensKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiRealityShareTokensKeys.detail(variables.id),
      });
    },
  });
}

export function useAiRealityShareTokensDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-reality-share-tokens?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiRealityShareTokensKeys.lists() });
    },
  });
}
