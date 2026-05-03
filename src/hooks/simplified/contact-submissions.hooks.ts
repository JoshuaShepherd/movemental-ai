import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContactSubmissions,
  ContactSubmissionsCreate,
  ContactSubmissionsUpdate,
  ContactSubmissionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contactSubmissionsKeys = {
  all: ["contactSubmissions"] as const,
  lists: () => [...contactSubmissionsKeys.all, "list"] as const,
  list: (filters?: ContactSubmissionsFilters) => [...contactSubmissionsKeys.lists(), filters] as const,
  details: () => [...contactSubmissionsKeys.all, "detail"] as const,
  detail: (id: string) => [...contactSubmissionsKeys.details(), id] as const,
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

export function useContactSubmissionsList(filters?: ContactSubmissionsFilters) {
  return useQuery({
    queryKey: contactSubmissionsKeys.list(filters),
    queryFn: () =>
      fetchApi<ContactSubmissions[]>(`/api/simplified/contact-submissions${buildQueryString(filters)}`),
  });
}

export function useContactSubmissions(id: string) {
  return useQuery({
    queryKey: contactSubmissionsKeys.detail(id),
    queryFn: () =>
      fetchApi<ContactSubmissions>(`/api/simplified/contact-submissions?id=${id}`),
    enabled: !!id,
  });
}

export function useContactSubmissionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContactSubmissionsCreate) =>
      fetchApi<ContactSubmissions>(`/api/simplified/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactSubmissionsKeys.lists() });
    },
  });
}

export function useContactSubmissionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContactSubmissionsUpdate & { id: string }) =>
      fetchApi<ContactSubmissions>(`/api/simplified/contact-submissions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contactSubmissionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contactSubmissionsKeys.detail(variables.id),
      });
    },
  });
}

export function useContactSubmissionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/contact-submissions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactSubmissionsKeys.lists() });
    },
  });
}
