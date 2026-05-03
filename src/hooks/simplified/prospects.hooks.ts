import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Prospects,
  ProspectsCreate,
  ProspectsUpdate,
  ProspectsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const prospectsKeys = {
  all: ["prospects"] as const,
  lists: () => [...prospectsKeys.all, "list"] as const,
  list: (filters?: ProspectsFilters) => [...prospectsKeys.lists(), filters] as const,
  details: () => [...prospectsKeys.all, "detail"] as const,
  detail: (id: string) => [...prospectsKeys.details(), id] as const,
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

export function useProspectsList(filters?: ProspectsFilters) {
  return useQuery({
    queryKey: prospectsKeys.list(filters),
    queryFn: () =>
      fetchApi<Prospects[]>(`/api/simplified/prospects${buildQueryString(filters)}`),
  });
}

export function useProspects(id: string) {
  return useQuery({
    queryKey: prospectsKeys.detail(id),
    queryFn: () =>
      fetchApi<Prospects>(`/api/simplified/prospects?id=${id}`),
    enabled: !!id,
  });
}

export function useProspectsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProspectsCreate) =>
      fetchApi<Prospects>(`/api/simplified/prospects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prospectsKeys.lists() });
    },
  });
}

export function useProspectsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ProspectsUpdate & { id: string }) =>
      fetchApi<Prospects>(`/api/simplified/prospects`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: prospectsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: prospectsKeys.detail(variables.id),
      });
    },
  });
}

export function useProspectsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/prospects?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prospectsKeys.lists() });
    },
  });
}
