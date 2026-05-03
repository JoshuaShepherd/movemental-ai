import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CredibilityRubrics,
  CredibilityRubricsCreate,
  CredibilityRubricsUpdate,
  CredibilityRubricsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const credibilityRubricsKeys = {
  all: ["credibilityRubrics"] as const,
  lists: () => [...credibilityRubricsKeys.all, "list"] as const,
  list: (filters?: CredibilityRubricsFilters) => [...credibilityRubricsKeys.lists(), filters] as const,
  details: () => [...credibilityRubricsKeys.all, "detail"] as const,
  detail: (id: string) => [...credibilityRubricsKeys.details(), id] as const,
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

export function useCredibilityRubricsList(filters?: CredibilityRubricsFilters) {
  return useQuery({
    queryKey: credibilityRubricsKeys.list(filters),
    queryFn: () =>
      fetchApi<CredibilityRubrics[]>(`/api/simplified/credibility-rubrics${buildQueryString(filters)}`),
  });
}

export function useCredibilityRubrics(id: string) {
  return useQuery({
    queryKey: credibilityRubricsKeys.detail(id),
    queryFn: () =>
      fetchApi<CredibilityRubrics>(`/api/simplified/credibility-rubrics?id=${id}`),
    enabled: !!id,
  });
}

export function useCredibilityRubricsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CredibilityRubricsCreate) =>
      fetchApi<CredibilityRubrics>(`/api/simplified/credibility-rubrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: credibilityRubricsKeys.lists() });
    },
  });
}

export function useCredibilityRubricsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CredibilityRubricsUpdate & { id: string }) =>
      fetchApi<CredibilityRubrics>(`/api/simplified/credibility-rubrics`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: credibilityRubricsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: credibilityRubricsKeys.detail(variables.id),
      });
    },
  });
}

export function useCredibilityRubricsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/credibility-rubrics?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: credibilityRubricsKeys.lists() });
    },
  });
}
