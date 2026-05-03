import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AuditLogs,
  AuditLogsCreate,
  AuditLogsUpdate,
  AuditLogsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const auditLogsKeys = {
  all: ["auditLogs"] as const,
  lists: () => [...auditLogsKeys.all, "list"] as const,
  list: (filters?: AuditLogsFilters) => [...auditLogsKeys.lists(), filters] as const,
  details: () => [...auditLogsKeys.all, "detail"] as const,
  detail: (id: string) => [...auditLogsKeys.details(), id] as const,
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

export function useAuditLogsList(filters?: AuditLogsFilters) {
  return useQuery({
    queryKey: auditLogsKeys.list(filters),
    queryFn: () =>
      fetchApi<AuditLogs[]>(`/api/simplified/audit-logs${buildQueryString(filters)}`),
  });
}

export function useAuditLogs(id: string) {
  return useQuery({
    queryKey: auditLogsKeys.detail(id),
    queryFn: () =>
      fetchApi<AuditLogs>(`/api/simplified/audit-logs?id=${id}`),
    enabled: !!id,
  });
}

export function useAuditLogsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AuditLogsCreate) =>
      fetchApi<AuditLogs>(`/api/simplified/audit-logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auditLogsKeys.lists() });
    },
  });
}

export function useAuditLogsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AuditLogsUpdate & { id: string }) =>
      fetchApi<AuditLogs>(`/api/simplified/audit-logs`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: auditLogsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: auditLogsKeys.detail(variables.id),
      });
    },
  });
}

export function useAuditLogsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/audit-logs?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auditLogsKeys.lists() });
    },
  });
}
