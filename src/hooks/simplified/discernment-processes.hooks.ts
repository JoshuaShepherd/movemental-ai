import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  DiscernmentProcesses,
  DiscernmentProcessesCreate,
  DiscernmentProcessesUpdate,
  DiscernmentProcessesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const discernmentProcessesKeys = {
  all: ["discernmentProcesses"] as const,
  lists: () => [...discernmentProcessesKeys.all, "list"] as const,
  list: (filters?: DiscernmentProcessesFilters) => [...discernmentProcessesKeys.lists(), filters] as const,
  details: () => [...discernmentProcessesKeys.all, "detail"] as const,
  detail: (id: string) => [...discernmentProcessesKeys.details(), id] as const,
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

export function useDiscernmentProcessesList(filters?: DiscernmentProcessesFilters) {
  return useQuery({
    queryKey: discernmentProcessesKeys.list(filters),
    queryFn: () =>
      fetchApi<DiscernmentProcesses[]>(`/api/simplified/discernment-processes${buildQueryString(filters)}`),
  });
}

export function useDiscernmentProcesses(id: string) {
  return useQuery({
    queryKey: discernmentProcessesKeys.detail(id),
    queryFn: () =>
      fetchApi<DiscernmentProcesses>(`/api/simplified/discernment-processes?id=${id}`),
    enabled: !!id,
  });
}

export function useDiscernmentProcessesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DiscernmentProcessesCreate) =>
      fetchApi<DiscernmentProcesses>(`/api/simplified/discernment-processes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discernmentProcessesKeys.lists() });
    },
  });
}

export function useDiscernmentProcessesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: DiscernmentProcessesUpdate & { id: string }) =>
      fetchApi<DiscernmentProcesses>(`/api/simplified/discernment-processes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: discernmentProcessesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: discernmentProcessesKeys.detail(variables.id),
      });
    },
  });
}

export function useDiscernmentProcessesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/discernment-processes?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discernmentProcessesKeys.lists() });
    },
  });
}
