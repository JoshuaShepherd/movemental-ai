import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyRoleAccess,
  SafetyRoleAccessCreate,
  SafetyRoleAccessUpdate,
  SafetyRoleAccessFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyRoleAccessKeys = {
  all: ["safetyRoleAccess"] as const,
  lists: () => [...safetyRoleAccessKeys.all, "list"] as const,
  list: (filters?: SafetyRoleAccessFilters) => [...safetyRoleAccessKeys.lists(), filters] as const,
  details: () => [...safetyRoleAccessKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyRoleAccessKeys.details(), id] as const,
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

export function useSafetyRoleAccessList(filters?: SafetyRoleAccessFilters) {
  return useQuery({
    queryKey: safetyRoleAccessKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyRoleAccess[]>(`/api/simplified/safety-role-access${buildQueryString(filters)}`),
  });
}

export function useSafetyRoleAccess(id: string) {
  return useQuery({
    queryKey: safetyRoleAccessKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyRoleAccess>(`/api/simplified/safety-role-access?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyRoleAccessCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyRoleAccessCreate) =>
      fetchApi<SafetyRoleAccess>(`/api/simplified/safety-role-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyRoleAccessKeys.lists() });
    },
  });
}

export function useSafetyRoleAccessUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyRoleAccessUpdate & { id: string }) =>
      fetchApi<SafetyRoleAccess>(`/api/simplified/safety-role-access`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyRoleAccessKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyRoleAccessKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyRoleAccessDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-role-access?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyRoleAccessKeys.lists() });
    },
  });
}
