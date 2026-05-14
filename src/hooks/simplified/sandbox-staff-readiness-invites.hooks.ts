import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SandboxStaffReadinessInvites,
  SandboxStaffReadinessInvitesCreate,
  SandboxStaffReadinessInvitesUpdate,
  SandboxStaffReadinessInvitesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const sandboxStaffReadinessInvitesKeys = {
  all: ["sandboxStaffReadinessInvites"] as const,
  lists: () => [...sandboxStaffReadinessInvitesKeys.all, "list"] as const,
  list: (filters?: SandboxStaffReadinessInvitesFilters) => [...sandboxStaffReadinessInvitesKeys.lists(), filters] as const,
  details: () => [...sandboxStaffReadinessInvitesKeys.all, "detail"] as const,
  detail: (id: string) => [...sandboxStaffReadinessInvitesKeys.details(), id] as const,
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

export function useSandboxStaffReadinessInvitesList(filters?: SandboxStaffReadinessInvitesFilters) {
  return useQuery({
    queryKey: sandboxStaffReadinessInvitesKeys.list(filters),
    queryFn: () =>
      fetchApi<SandboxStaffReadinessInvites[]>(`/api/simplified/sandbox-staff-readiness-invites${buildQueryString(filters)}`),
  });
}

export function useSandboxStaffReadinessInvites(id: string) {
  return useQuery({
    queryKey: sandboxStaffReadinessInvitesKeys.detail(id),
    queryFn: () =>
      fetchApi<SandboxStaffReadinessInvites>(`/api/simplified/sandbox-staff-readiness-invites?id=${id}`),
    enabled: !!id,
  });
}

export function useSandboxStaffReadinessInvitesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SandboxStaffReadinessInvitesCreate) =>
      fetchApi<SandboxStaffReadinessInvites>(`/api/simplified/sandbox-staff-readiness-invites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessInvitesKeys.lists() });
    },
  });
}

export function useSandboxStaffReadinessInvitesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SandboxStaffReadinessInvitesUpdate & { id: string }) =>
      fetchApi<SandboxStaffReadinessInvites>(`/api/simplified/sandbox-staff-readiness-invites`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessInvitesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: sandboxStaffReadinessInvitesKeys.detail(variables.id),
      });
    },
  });
}

export function useSandboxStaffReadinessInvitesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/sandbox-staff-readiness-invites?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sandboxStaffReadinessInvitesKeys.lists() });
    },
  });
}
