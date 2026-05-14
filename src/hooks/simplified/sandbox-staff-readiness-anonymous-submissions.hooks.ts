import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SandboxStaffReadinessAnonymousSubmissions,
  SandboxStaffReadinessAnonymousSubmissionsCreate,
  SandboxStaffReadinessAnonymousSubmissionsUpdate,
  SandboxStaffReadinessAnonymousSubmissionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const sandboxStaffReadinessAnonymousSubmissionsKeys = {
  all: ["sandboxStaffReadinessAnonymousSubmissions"] as const,
  lists: () => [...sandboxStaffReadinessAnonymousSubmissionsKeys.all, "list"] as const,
  list: (filters?: SandboxStaffReadinessAnonymousSubmissionsFilters) => [...sandboxStaffReadinessAnonymousSubmissionsKeys.lists(), filters] as const,
  details: () => [...sandboxStaffReadinessAnonymousSubmissionsKeys.all, "detail"] as const,
  detail: (id: string) => [...sandboxStaffReadinessAnonymousSubmissionsKeys.details(), id] as const,
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

export function useSandboxStaffReadinessAnonymousSubmissionsList(filters?: SandboxStaffReadinessAnonymousSubmissionsFilters) {
  return useQuery({
    queryKey: sandboxStaffReadinessAnonymousSubmissionsKeys.list(filters),
    queryFn: () =>
      fetchApi<SandboxStaffReadinessAnonymousSubmissions[]>(`/api/simplified/sandbox-staff-readiness-anonymous-submissions${buildQueryString(filters)}`),
  });
}

export function useSandboxStaffReadinessAnonymousSubmissions(id: string) {
  return useQuery({
    queryKey: sandboxStaffReadinessAnonymousSubmissionsKeys.detail(id),
    queryFn: () =>
      fetchApi<SandboxStaffReadinessAnonymousSubmissions>(`/api/simplified/sandbox-staff-readiness-anonymous-submissions?id=${id}`),
    enabled: !!id,
  });
}

export function useSandboxStaffReadinessAnonymousSubmissionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SandboxStaffReadinessAnonymousSubmissionsCreate) =>
      fetchApi<SandboxStaffReadinessAnonymousSubmissions>(`/api/simplified/sandbox-staff-readiness-anonymous-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessAnonymousSubmissionsKeys.lists() });
    },
  });
}

export function useSandboxStaffReadinessAnonymousSubmissionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SandboxStaffReadinessAnonymousSubmissionsUpdate & { id: string }) =>
      fetchApi<SandboxStaffReadinessAnonymousSubmissions>(`/api/simplified/sandbox-staff-readiness-anonymous-submissions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessAnonymousSubmissionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: sandboxStaffReadinessAnonymousSubmissionsKeys.detail(variables.id),
      });
    },
  });
}

export function useSandboxStaffReadinessAnonymousSubmissionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/sandbox-staff-readiness-anonymous-submissions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessAnonymousSubmissionsKeys.lists() });
    },
  });
}
