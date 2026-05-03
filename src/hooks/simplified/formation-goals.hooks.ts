import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FormationGoals,
  FormationGoalsCreate,
  FormationGoalsUpdate,
  FormationGoalsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const formationGoalsKeys = {
  all: ["formationGoals"] as const,
  lists: () => [...formationGoalsKeys.all, "list"] as const,
  list: (filters?: FormationGoalsFilters) => [...formationGoalsKeys.lists(), filters] as const,
  details: () => [...formationGoalsKeys.all, "detail"] as const,
  detail: (id: string) => [...formationGoalsKeys.details(), id] as const,
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

export function useFormationGoalsList(filters?: FormationGoalsFilters) {
  return useQuery({
    queryKey: formationGoalsKeys.list(filters),
    queryFn: () =>
      fetchApi<FormationGoals[]>(`/api/simplified/formation-goals${buildQueryString(filters)}`),
  });
}

export function useFormationGoals(id: string) {
  return useQuery({
    queryKey: formationGoalsKeys.detail(id),
    queryFn: () =>
      fetchApi<FormationGoals>(`/api/simplified/formation-goals?id=${id}`),
    enabled: !!id,
  });
}

export function useFormationGoalsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormationGoalsCreate) =>
      fetchApi<FormationGoals>(`/api/simplified/formation-goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationGoalsKeys.lists() });
    },
  });
}

export function useFormationGoalsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FormationGoalsUpdate & { id: string }) =>
      fetchApi<FormationGoals>(`/api/simplified/formation-goals`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formationGoalsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: formationGoalsKeys.detail(variables.id),
      });
    },
  });
}

export function useFormationGoalsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/formation-goals?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationGoalsKeys.lists() });
    },
  });
}
