import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  WriteContent,
  WriteContentCreate,
  WriteContentUpdate,
  WriteContentFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const writeContentKeys = {
  all: ["writeContent"] as const,
  lists: () => [...writeContentKeys.all, "list"] as const,
  list: (filters?: WriteContentFilters) => [...writeContentKeys.lists(), filters] as const,
  details: () => [...writeContentKeys.all, "detail"] as const,
  detail: (id: string) => [...writeContentKeys.details(), id] as const,
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

export function useWriteContentList(filters?: WriteContentFilters) {
  return useQuery({
    queryKey: writeContentKeys.list(filters),
    queryFn: () =>
      fetchApi<WriteContent[]>(`/api/simplified/write-content${buildQueryString(filters)}`),
  });
}

export function useWriteContent(id: string) {
  return useQuery({
    queryKey: writeContentKeys.detail(id),
    queryFn: () =>
      fetchApi<WriteContent>(`/api/simplified/write-content?id=${id}`),
    enabled: !!id,
  });
}

export function useWriteContentCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WriteContentCreate) =>
      fetchApi<WriteContent>(`/api/simplified/write-content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writeContentKeys.lists() });
    },
  });
}

export function useWriteContentUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WriteContentUpdate & { id: string }) =>
      fetchApi<WriteContent>(`/api/simplified/write-content`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: writeContentKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: writeContentKeys.detail(variables.id),
      });
    },
  });
}

export function useWriteContentDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/write-content?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writeContentKeys.lists() });
    },
  });
}
