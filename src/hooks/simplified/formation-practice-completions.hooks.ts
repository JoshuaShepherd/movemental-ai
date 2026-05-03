import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FormationPracticeCompletions,
  FormationPracticeCompletionsCreate,
  FormationPracticeCompletionsUpdate,
  FormationPracticeCompletionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const formationPracticeCompletionsKeys = {
  all: ["formationPracticeCompletions"] as const,
  lists: () => [...formationPracticeCompletionsKeys.all, "list"] as const,
  list: (filters?: FormationPracticeCompletionsFilters) => [...formationPracticeCompletionsKeys.lists(), filters] as const,
  details: () => [...formationPracticeCompletionsKeys.all, "detail"] as const,
  detail: (id: string) => [...formationPracticeCompletionsKeys.details(), id] as const,
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

export function useFormationPracticeCompletionsList(filters?: FormationPracticeCompletionsFilters) {
  return useQuery({
    queryKey: formationPracticeCompletionsKeys.list(filters),
    queryFn: () =>
      fetchApi<FormationPracticeCompletions[]>(`/api/simplified/formation-practice-completions${buildQueryString(filters)}`),
  });
}

export function useFormationPracticeCompletions(id: string) {
  return useQuery({
    queryKey: formationPracticeCompletionsKeys.detail(id),
    queryFn: () =>
      fetchApi<FormationPracticeCompletions>(`/api/simplified/formation-practice-completions?id=${id}`),
    enabled: !!id,
  });
}

export function useFormationPracticeCompletionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormationPracticeCompletionsCreate) =>
      fetchApi<FormationPracticeCompletions>(`/api/simplified/formation-practice-completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationPracticeCompletionsKeys.lists() });
    },
  });
}

export function useFormationPracticeCompletionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FormationPracticeCompletionsUpdate & { id: string }) =>
      fetchApi<FormationPracticeCompletions>(`/api/simplified/formation-practice-completions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formationPracticeCompletionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: formationPracticeCompletionsKeys.detail(variables.id),
      });
    },
  });
}

export function useFormationPracticeCompletionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/formation-practice-completions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationPracticeCompletionsKeys.lists() });
    },
  });
}
