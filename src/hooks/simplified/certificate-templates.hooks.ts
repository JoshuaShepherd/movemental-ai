import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CertificateTemplates,
  CertificateTemplatesCreate,
  CertificateTemplatesUpdate,
  CertificateTemplatesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const certificateTemplatesKeys = {
  all: ["certificateTemplates"] as const,
  lists: () => [...certificateTemplatesKeys.all, "list"] as const,
  list: (filters?: CertificateTemplatesFilters) => [...certificateTemplatesKeys.lists(), filters] as const,
  details: () => [...certificateTemplatesKeys.all, "detail"] as const,
  detail: (id: string) => [...certificateTemplatesKeys.details(), id] as const,
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

export function useCertificateTemplatesList(filters?: CertificateTemplatesFilters) {
  return useQuery({
    queryKey: certificateTemplatesKeys.list(filters),
    queryFn: () =>
      fetchApi<CertificateTemplates[]>(`/api/simplified/certificate-templates${buildQueryString(filters)}`),
  });
}

export function useCertificateTemplates(id: string) {
  return useQuery({
    queryKey: certificateTemplatesKeys.detail(id),
    queryFn: () =>
      fetchApi<CertificateTemplates>(`/api/simplified/certificate-templates?id=${id}`),
    enabled: !!id,
  });
}

export function useCertificateTemplatesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CertificateTemplatesCreate) =>
      fetchApi<CertificateTemplates>(`/api/simplified/certificate-templates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: certificateTemplatesKeys.lists() });
    },
  });
}

export function useCertificateTemplatesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CertificateTemplatesUpdate & { id: string }) =>
      fetchApi<CertificateTemplates>(`/api/simplified/certificate-templates`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: certificateTemplatesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: certificateTemplatesKeys.detail(variables.id),
      });
    },
  });
}

export function useCertificateTemplatesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/certificate-templates?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: certificateTemplatesKeys.lists() });
    },
  });
}
