import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Write,
  WriteCreate,
  WriteUpdate,
  WriteFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const writeKeys = {
  all: ["write"] as const,
  lists: () => [...writeKeys.all, "list"] as const,
  list: (filters?: WriteFilters) => [...writeKeys.lists(), filters] as const,
  details: () => [...writeKeys.all, "detail"] as const,
  detail: (id: string) => [...writeKeys.details(), id] as const,
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

export function useWriteList(filters?: WriteFilters) {
  return useQuery({
    queryKey: writeKeys.list(filters),
    queryFn: () =>
      fetchApi<Write[]>(`/api/simplified/write${buildQueryString(filters)}`),
  });
}

export function useWrite(id: string) {
  return useQuery({
    queryKey: writeKeys.detail(id),
    queryFn: () =>
      fetchApi<Write>(`/api/simplified/write?id=${id}`),
    enabled: !!id,
  });
}

export function useWriteCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WriteCreate) =>
      fetchApi<Write>(`/api/simplified/write`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writeKeys.lists() });
    },
  });
}

export function useWriteUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WriteUpdate & { id: string }) =>
      fetchApi<Write>(`/api/simplified/write`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: writeKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: writeKeys.detail(variables.id),
      });
    },
  });
}

export function useWriteDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/write?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writeKeys.lists() });
    },
  });
}
