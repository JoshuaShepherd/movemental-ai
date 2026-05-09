import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ConsentRecords,
  ConsentRecordsCreate,
  ConsentRecordsUpdate,
  ConsentRecordsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const consentRecordsKeys = {
  all: ["consentRecords"] as const,
  lists: () => [...consentRecordsKeys.all, "list"] as const,
  list: (filters?: ConsentRecordsFilters) => [...consentRecordsKeys.lists(), filters] as const,
  details: () => [...consentRecordsKeys.all, "detail"] as const,
  detail: (id: string) => [...consentRecordsKeys.details(), id] as const,
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

export function useConsentRecordsList(filters?: ConsentRecordsFilters) {
  return useQuery({
    queryKey: consentRecordsKeys.list(filters),
    queryFn: () =>
      fetchApi<ConsentRecords[]>(`/api/simplified/consent-records${buildQueryString(filters)}`),
  });
}

export function useConsentRecords(id: string) {
  return useQuery({
    queryKey: consentRecordsKeys.detail(id),
    queryFn: () =>
      fetchApi<ConsentRecords>(`/api/simplified/consent-records?id=${id}`),
    enabled: !!id,
  });
}

export function useConsentRecordsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ConsentRecordsCreate) =>
      fetchApi<ConsentRecords>(`/api/simplified/consent-records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consentRecordsKeys.lists() });
    },
  });
}

export function useConsentRecordsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ConsentRecordsUpdate & { id: string }) =>
      fetchApi<ConsentRecords>(`/api/simplified/consent-records`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: consentRecordsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: consentRecordsKeys.detail(variables.id),
      });
    },
  });
}

export function useConsentRecordsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/consent-records?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consentRecordsKeys.lists() });
    },
  });
}
