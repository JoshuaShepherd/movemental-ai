import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AssignmentGrades,
  AssignmentGradesCreate,
  AssignmentGradesUpdate,
  AssignmentGradesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const assignmentGradesKeys = {
  all: ["assignmentGrades"] as const,
  lists: () => [...assignmentGradesKeys.all, "list"] as const,
  list: (filters?: AssignmentGradesFilters) => [...assignmentGradesKeys.lists(), filters] as const,
  details: () => [...assignmentGradesKeys.all, "detail"] as const,
  detail: (id: string) => [...assignmentGradesKeys.details(), id] as const,
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

export function useAssignmentGradesList(filters?: AssignmentGradesFilters) {
  return useQuery({
    queryKey: assignmentGradesKeys.list(filters),
    queryFn: () =>
      fetchApi<AssignmentGrades[]>(`/api/simplified/assignment-grades${buildQueryString(filters)}`),
  });
}

export function useAssignmentGrades(id: string) {
  return useQuery({
    queryKey: assignmentGradesKeys.detail(id),
    queryFn: () =>
      fetchApi<AssignmentGrades>(`/api/simplified/assignment-grades?id=${id}`),
    enabled: !!id,
  });
}

export function useAssignmentGradesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignmentGradesCreate) =>
      fetchApi<AssignmentGrades>(`/api/simplified/assignment-grades`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentGradesKeys.lists() });
    },
  });
}

export function useAssignmentGradesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AssignmentGradesUpdate & { id: string }) =>
      fetchApi<AssignmentGrades>(`/api/simplified/assignment-grades`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assignmentGradesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assignmentGradesKeys.detail(variables.id),
      });
    },
  });
}

export function useAssignmentGradesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/assignment-grades?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentGradesKeys.lists() });
    },
  });
}
