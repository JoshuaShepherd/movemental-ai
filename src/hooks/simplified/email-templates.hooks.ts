import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  EmailTemplates,
  EmailTemplatesCreate,
  EmailTemplatesUpdate,
  EmailTemplatesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const emailTemplatesKeys = {
  all: ["emailTemplates"] as const,
  lists: () => [...emailTemplatesKeys.all, "list"] as const,
  list: (filters?: EmailTemplatesFilters) => [...emailTemplatesKeys.lists(), filters] as const,
  details: () => [...emailTemplatesKeys.all, "detail"] as const,
  detail: (id: string) => [...emailTemplatesKeys.details(), id] as const,
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

export function useEmailTemplatesList(filters?: EmailTemplatesFilters) {
  return useQuery({
    queryKey: emailTemplatesKeys.list(filters),
    queryFn: () =>
      fetchApi<EmailTemplates[]>(`/api/simplified/email-templates${buildQueryString(filters)}`),
  });
}

export function useEmailTemplates(id: string) {
  return useQuery({
    queryKey: emailTemplatesKeys.detail(id),
    queryFn: () =>
      fetchApi<EmailTemplates>(`/api/simplified/email-templates?id=${id}`),
    enabled: !!id,
  });
}

export function useEmailTemplatesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmailTemplatesCreate) =>
      fetchApi<EmailTemplates>(`/api/simplified/email-templates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailTemplatesKeys.lists() });
    },
  });
}

export function useEmailTemplatesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: EmailTemplatesUpdate & { id: string }) =>
      fetchApi<EmailTemplates>(`/api/simplified/email-templates`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: emailTemplatesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: emailTemplatesKeys.detail(variables.id),
      });
    },
  });
}

export function useEmailTemplatesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/email-templates?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailTemplatesKeys.lists() });
    },
  });
}
