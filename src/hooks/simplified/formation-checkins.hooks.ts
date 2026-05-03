import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FormationCheckins,
  FormationCheckinsCreate,
  FormationCheckinsUpdate,
  FormationCheckinsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const formationCheckinsKeys = {
  all: ["formationCheckins"] as const,
  lists: () => [...formationCheckinsKeys.all, "list"] as const,
  list: (filters?: FormationCheckinsFilters) => [...formationCheckinsKeys.lists(), filters] as const,
  details: () => [...formationCheckinsKeys.all, "detail"] as const,
  detail: (id: string) => [...formationCheckinsKeys.details(), id] as const,
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

export function useFormationCheckinsList(filters?: FormationCheckinsFilters) {
  return useQuery({
    queryKey: formationCheckinsKeys.list(filters),
    queryFn: () =>
      fetchApi<FormationCheckins[]>(`/api/simplified/formation-checkins${buildQueryString(filters)}`),
  });
}

export function useFormationCheckins(id: string) {
  return useQuery({
    queryKey: formationCheckinsKeys.detail(id),
    queryFn: () =>
      fetchApi<FormationCheckins>(`/api/simplified/formation-checkins?id=${id}`),
    enabled: !!id,
  });
}

export function useFormationCheckinsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormationCheckinsCreate) =>
      fetchApi<FormationCheckins>(`/api/simplified/formation-checkins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationCheckinsKeys.lists() });
    },
  });
}

export function useFormationCheckinsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FormationCheckinsUpdate & { id: string }) =>
      fetchApi<FormationCheckins>(`/api/simplified/formation-checkins`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: formationCheckinsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: formationCheckinsKeys.detail(variables.id),
      });
    },
  });
}

export function useFormationCheckinsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/formation-checkins?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formationCheckinsKeys.lists() });
    },
  });
}
