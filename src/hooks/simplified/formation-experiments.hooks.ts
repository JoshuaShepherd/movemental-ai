import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FormationExperiments,
  FormationExperimentsCreate,
  FormationExperimentsUpdate,
  FormationExperimentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const formationExperimentsKeys = {
  all: ["formationExperiments"] as const,
  lists: () => [...formationExperimentsKeys.all, "list"] as const,
  list: (filters?: FormationExperimentsFilters) => [...formationExperimentsKeys.lists(), filters] as const,
  details: () => [...formationExperimentsKeys.all, "detail"] as const,
  detail: (id: string) => [...formationExperimentsKeys.details(), id] as const,
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

export function useFormationExperimentsList(filters?: FormationExperimentsFilters) {
  return useQuery({
    queryKey: formationExperimentsKeys.list(filters),
    queryFn: () =>
      fetchApi<FormationExperiments[]>(`/api/simplified/formation-experiments${buildQueryString(filters)}`),
  });
}

export function useFormationExperiments(id: string) {
  return useQuery({
    queryKey: formationExperimentsKeys.detail(id),
    queryFn: () =>
      fetchApi<FormationExperiments>(`/api/simplified/formation-experiments?id=${id}`),
    enabled: !!id,
  });
}

export function useFormationExperimentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormationExperimentsCreate) =>
      fetchApi<FormationExperiments>(`/api/simplified/formation-experiments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationExperimentsKeys.lists() });
    },
  });
}

export function useFormationExperimentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FormationExperimentsUpdate & { id: string }) =>
      fetchApi<FormationExperiments>(`/api/simplified/formation-experiments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formationExperimentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: formationExperimentsKeys.detail(variables.id),
      });
    },
  });
}

export function useFormationExperimentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/formation-experiments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationExperimentsKeys.lists() });
    },
  });
}
