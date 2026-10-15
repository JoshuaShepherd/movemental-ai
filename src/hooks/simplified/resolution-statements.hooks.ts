import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ResolutionStatements,
  ResolutionStatementsCreate,
  ResolutionStatementsUpdate,
  ResolutionStatementsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const resolutionStatementsKeys = {
  all: ["resolutionStatements"] as const,
  lists: () => [...resolutionStatementsKeys.all, "list"] as const,
  list: (filters?: ResolutionStatementsFilters) => [...resolutionStatementsKeys.lists(), filters] as const,
  details: () => [...resolutionStatementsKeys.all, "detail"] as const,
  detail: (id: string) => [...resolutionStatementsKeys.details(), id] as const,
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

export function useResolutionStatementsList(filters?: ResolutionStatementsFilters) {
  return useQuery({
    queryKey: resolutionStatementsKeys.list(filters),
    queryFn: () =>
      fetchApi<ResolutionStatements[]>(`/api/simplified/resolution-statements${buildQueryString(filters)}`),
  });
}

export function useResolutionStatements(id: string) {
  return useQuery({
    queryKey: resolutionStatementsKeys.detail(id),
    queryFn: () =>
      fetchApi<ResolutionStatements>(`/api/simplified/resolution-statements?id=${id}`),
    enabled: !!id,
  });
}

export function useResolutionStatementsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ResolutionStatementsCreate) =>
      fetchApi<ResolutionStatements>(`/api/simplified/resolution-statements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resolutionStatementsKeys.lists() });
    },
  });
}

export function useResolutionStatementsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ResolutionStatementsUpdate & { id: string }) =>
      fetchApi<ResolutionStatements>(`/api/simplified/resolution-statements`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: resolutionStatementsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: resolutionStatementsKeys.detail(variables.id),
      });
    },
  });
}

export function useResolutionStatementsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/resolution-statements?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resolutionStatementsKeys.lists() });
    },
  });
}
