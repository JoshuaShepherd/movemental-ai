import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AssignmentSubmissions,
  AssignmentSubmissionsCreate,
  AssignmentSubmissionsUpdate,
  AssignmentSubmissionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const assignmentSubmissionsKeys = {
  all: ["assignmentSubmissions"] as const,
  lists: () => [...assignmentSubmissionsKeys.all, "list"] as const,
  list: (filters?: AssignmentSubmissionsFilters) => [...assignmentSubmissionsKeys.lists(), filters] as const,
  details: () => [...assignmentSubmissionsKeys.all, "detail"] as const,
  detail: (id: string) => [...assignmentSubmissionsKeys.details(), id] as const,
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

export function useAssignmentSubmissionsList(filters?: AssignmentSubmissionsFilters) {
  return useQuery({
    queryKey: assignmentSubmissionsKeys.list(filters),
    queryFn: () =>
      fetchApi<AssignmentSubmissions[]>(`/api/simplified/assignment-submissions${buildQueryString(filters)}`),
  });
}

export function useAssignmentSubmissions(id: string) {
  return useQuery({
    queryKey: assignmentSubmissionsKeys.detail(id),
    queryFn: () =>
      fetchApi<AssignmentSubmissions>(`/api/simplified/assignment-submissions?id=${id}`),
    enabled: !!id,
  });
}

export function useAssignmentSubmissionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignmentSubmissionsCreate) =>
      fetchApi<AssignmentSubmissions>(`/api/simplified/assignment-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentSubmissionsKeys.lists() });
    },
  });
}

export function useAssignmentSubmissionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AssignmentSubmissionsUpdate & { id: string }) =>
      fetchApi<AssignmentSubmissions>(`/api/simplified/assignment-submissions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assignmentSubmissionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assignmentSubmissionsKeys.detail(variables.id),
      });
    },
  });
}

export function useAssignmentSubmissionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/assignment-submissions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentSubmissionsKeys.lists() });
    },
  });
}
