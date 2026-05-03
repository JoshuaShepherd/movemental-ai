import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  IntegrityDiagnosticSubmissions,
  IntegrityDiagnosticSubmissionsCreate,
  IntegrityDiagnosticSubmissionsUpdate,
  IntegrityDiagnosticSubmissionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const integrityDiagnosticSubmissionsKeys = {
  all: ["integrityDiagnosticSubmissions"] as const,
  lists: () => [...integrityDiagnosticSubmissionsKeys.all, "list"] as const,
  list: (filters?: IntegrityDiagnosticSubmissionsFilters) => [...integrityDiagnosticSubmissionsKeys.lists(), filters] as const,
  details: () => [...integrityDiagnosticSubmissionsKeys.all, "detail"] as const,
  detail: (id: string) => [...integrityDiagnosticSubmissionsKeys.details(), id] as const,
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

export function useIntegrityDiagnosticSubmissionsList(filters?: IntegrityDiagnosticSubmissionsFilters) {
  return useQuery({
    queryKey: integrityDiagnosticSubmissionsKeys.list(filters),
    queryFn: () =>
      fetchApi<IntegrityDiagnosticSubmissions[]>(`/api/simplified/integrity-diagnostic-submissions${buildQueryString(filters)}`),
  });
}

export function useIntegrityDiagnosticSubmissions(id: string) {
  return useQuery({
    queryKey: integrityDiagnosticSubmissionsKeys.detail(id),
    queryFn: () =>
      fetchApi<IntegrityDiagnosticSubmissions>(`/api/simplified/integrity-diagnostic-submissions?id=${id}`),
    enabled: !!id,
  });
}

export function useIntegrityDiagnosticSubmissionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IntegrityDiagnosticSubmissionsCreate) =>
      fetchApi<IntegrityDiagnosticSubmissions>(`/api/simplified/integrity-diagnostic-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrityDiagnosticSubmissionsKeys.lists() });
    },
  });
}

export function useIntegrityDiagnosticSubmissionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: IntegrityDiagnosticSubmissionsUpdate & { id: string }) =>
      fetchApi<IntegrityDiagnosticSubmissions>(`/api/simplified/integrity-diagnostic-submissions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: integrityDiagnosticSubmissionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: integrityDiagnosticSubmissionsKeys.detail(variables.id),
      });
    },
  });
}

export function useIntegrityDiagnosticSubmissionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/integrity-diagnostic-submissions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrityDiagnosticSubmissionsKeys.lists() });
    },
  });
}
