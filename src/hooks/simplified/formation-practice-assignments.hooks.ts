import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FormationPracticeAssignments,
  FormationPracticeAssignmentsCreate,
  FormationPracticeAssignmentsUpdate,
  FormationPracticeAssignmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const formationPracticeAssignmentsKeys = {
  all: ["formationPracticeAssignments"] as const,
  lists: () => [...formationPracticeAssignmentsKeys.all, "list"] as const,
  list: (filters?: FormationPracticeAssignmentsFilters) => [...formationPracticeAssignmentsKeys.lists(), filters] as const,
  details: () => [...formationPracticeAssignmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...formationPracticeAssignmentsKeys.details(), id] as const,
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

export function useFormationPracticeAssignmentsList(filters?: FormationPracticeAssignmentsFilters) {
  return useQuery({
    queryKey: formationPracticeAssignmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<FormationPracticeAssignments[]>(`/api/simplified/formation-practice-assignments${buildQueryString(filters)}`),
  });
}

export function useFormationPracticeAssignments(id: string) {
  return useQuery({
    queryKey: formationPracticeAssignmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<FormationPracticeAssignments>(`/api/simplified/formation-practice-assignments?id=${id}`),
    enabled: !!id,
  });
}

export function useFormationPracticeAssignmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormationPracticeAssignmentsCreate) =>
      fetchApi<FormationPracticeAssignments>(`/api/simplified/formation-practice-assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationPracticeAssignmentsKeys.lists() });
    },
  });
}

export function useFormationPracticeAssignmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FormationPracticeAssignmentsUpdate & { id: string }) =>
      fetchApi<FormationPracticeAssignments>(`/api/simplified/formation-practice-assignments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formationPracticeAssignmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: formationPracticeAssignmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useFormationPracticeAssignmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/formation-practice-assignments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationPracticeAssignmentsKeys.lists() });
    },
  });
}
