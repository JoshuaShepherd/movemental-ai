import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SandboxStaffReadinessSubmissions,
  SandboxStaffReadinessSubmissionsCreate,
  SandboxStaffReadinessSubmissionsUpdate,
  SandboxStaffReadinessSubmissionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const sandboxStaffReadinessSubmissionsKeys = {
  all: ["sandboxStaffReadinessSubmissions"] as const,
  lists: () => [...sandboxStaffReadinessSubmissionsKeys.all, "list"] as const,
  list: (filters?: SandboxStaffReadinessSubmissionsFilters) => [...sandboxStaffReadinessSubmissionsKeys.lists(), filters] as const,
  details: () => [...sandboxStaffReadinessSubmissionsKeys.all, "detail"] as const,
  detail: (id: string) => [...sandboxStaffReadinessSubmissionsKeys.details(), id] as const,
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

export function useSandboxStaffReadinessSubmissionsList(filters?: SandboxStaffReadinessSubmissionsFilters) {
  return useQuery({
    queryKey: sandboxStaffReadinessSubmissionsKeys.list(filters),
    queryFn: () =>
      fetchApi<SandboxStaffReadinessSubmissions[]>(`/api/simplified/sandbox-staff-readiness-submissions${buildQueryString(filters)}`),
  });
}

export function useSandboxStaffReadinessSubmissions(id: string) {
  return useQuery({
    queryKey: sandboxStaffReadinessSubmissionsKeys.detail(id),
    queryFn: () =>
      fetchApi<SandboxStaffReadinessSubmissions>(`/api/simplified/sandbox-staff-readiness-submissions?id=${id}`),
    enabled: !!id,
  });
}

export function useSandboxStaffReadinessSubmissionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SandboxStaffReadinessSubmissionsCreate) =>
      fetchApi<SandboxStaffReadinessSubmissions>(`/api/simplified/sandbox-staff-readiness-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessSubmissionsKeys.lists() });
    },
  });
}

export function useSandboxStaffReadinessSubmissionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SandboxStaffReadinessSubmissionsUpdate & { id: string }) =>
      fetchApi<SandboxStaffReadinessSubmissions>(`/api/simplified/sandbox-staff-readiness-submissions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessSubmissionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: sandboxStaffReadinessSubmissionsKeys.detail(variables.id),
      });
    },
  });
}

export function useSandboxStaffReadinessSubmissionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/sandbox-staff-readiness-submissions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessSubmissionsKeys.lists() });
    },
  });
}
