import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Certificates,
  CertificatesCreate,
  CertificatesUpdate,
  CertificatesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const certificatesKeys = {
  all: ["certificates"] as const,
  lists: () => [...certificatesKeys.all, "list"] as const,
  list: (filters?: CertificatesFilters) => [...certificatesKeys.lists(), filters] as const,
  details: () => [...certificatesKeys.all, "detail"] as const,
  detail: (id: string) => [...certificatesKeys.details(), id] as const,
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

export function useCertificatesList(filters?: CertificatesFilters) {
  return useQuery({
    queryKey: certificatesKeys.list(filters),
    queryFn: () =>
      fetchApi<Certificates[]>(`/api/simplified/certificates${buildQueryString(filters)}`),
  });
}

export function useCertificates(id: string) {
  return useQuery({
    queryKey: certificatesKeys.detail(id),
    queryFn: () =>
      fetchApi<Certificates>(`/api/simplified/certificates?id=${id}`),
    enabled: !!id,
  });
}

export function useCertificatesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CertificatesCreate) =>
      fetchApi<Certificates>(`/api/simplified/certificates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: certificatesKeys.lists() });
    },
  });
}

export function useCertificatesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CertificatesUpdate & { id: string }) =>
      fetchApi<Certificates>(`/api/simplified/certificates`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: certificatesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: certificatesKeys.detail(variables.id),
      });
    },
  });
}

export function useCertificatesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/certificates?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: certificatesKeys.lists() });
    },
  });
}
