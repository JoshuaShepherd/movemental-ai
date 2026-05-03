import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  WritingInteractions,
  WritingInteractionsCreate,
  WritingInteractionsUpdate,
  WritingInteractionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const writingInteractionsKeys = {
  all: ["writingInteractions"] as const,
  lists: () => [...writingInteractionsKeys.all, "list"] as const,
  list: (filters?: WritingInteractionsFilters) => [...writingInteractionsKeys.lists(), filters] as const,
  details: () => [...writingInteractionsKeys.all, "detail"] as const,
  detail: (id: string) => [...writingInteractionsKeys.details(), id] as const,
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

export function useWritingInteractionsList(filters?: WritingInteractionsFilters) {
  return useQuery({
    queryKey: writingInteractionsKeys.list(filters),
    queryFn: () =>
      fetchApi<WritingInteractions[]>(`/api/simplified/writing-interactions${buildQueryString(filters)}`),
  });
}

export function useWritingInteractions(id: string) {
  return useQuery({
    queryKey: writingInteractionsKeys.detail(id),
    queryFn: () =>
      fetchApi<WritingInteractions>(`/api/simplified/writing-interactions?id=${id}`),
    enabled: !!id,
  });
}

export function useWritingInteractionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WritingInteractionsCreate) =>
      fetchApi<WritingInteractions>(`/api/simplified/writing-interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingInteractionsKeys.lists() });
    },
  });
}

export function useWritingInteractionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WritingInteractionsUpdate & { id: string }) =>
      fetchApi<WritingInteractions>(`/api/simplified/writing-interactions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: writingInteractionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: writingInteractionsKeys.detail(variables.id),
      });
    },
  });
}

export function useWritingInteractionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/writing-interactions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingInteractionsKeys.lists() });
    },
  });
}
