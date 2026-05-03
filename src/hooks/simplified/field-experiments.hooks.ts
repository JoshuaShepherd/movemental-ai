import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FieldExperiments,
  FieldExperimentsCreate,
  FieldExperimentsUpdate,
  FieldExperimentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const fieldExperimentsKeys = {
  all: ["fieldExperiments"] as const,
  lists: () => [...fieldExperimentsKeys.all, "list"] as const,
  list: (filters?: FieldExperimentsFilters) => [...fieldExperimentsKeys.lists(), filters] as const,
  details: () => [...fieldExperimentsKeys.all, "detail"] as const,
  detail: (id: string) => [...fieldExperimentsKeys.details(), id] as const,
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

export function useFieldExperimentsList(filters?: FieldExperimentsFilters) {
  return useQuery({
    queryKey: fieldExperimentsKeys.list(filters),
    queryFn: () =>
      fetchApi<FieldExperiments[]>(`/api/simplified/field-experiments${buildQueryString(filters)}`),
  });
}

export function useFieldExperiments(id: string) {
  return useQuery({
    queryKey: fieldExperimentsKeys.detail(id),
    queryFn: () =>
      fetchApi<FieldExperiments>(`/api/simplified/field-experiments?id=${id}`),
    enabled: !!id,
  });
}

export function useFieldExperimentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FieldExperimentsCreate) =>
      fetchApi<FieldExperiments>(`/api/simplified/field-experiments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fieldExperimentsKeys.lists() });
    },
  });
}

export function useFieldExperimentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FieldExperimentsUpdate & { id: string }) =>
      fetchApi<FieldExperiments>(`/api/simplified/field-experiments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: fieldExperimentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: fieldExperimentsKeys.detail(variables.id),
      });
    },
  });
}

export function useFieldExperimentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/field-experiments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fieldExperimentsKeys.lists() });
    },
  });
}
