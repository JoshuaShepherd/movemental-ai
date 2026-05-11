import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ProgramEngagements,
  ProgramEngagementsCreate,
  ProgramEngagementsUpdate,
  ProgramEngagementsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const programEngagementsKeys = {
  all: ["programEngagements"] as const,
  lists: () => [...programEngagementsKeys.all, "list"] as const,
  list: (filters?: ProgramEngagementsFilters) => [...programEngagementsKeys.lists(), filters] as const,
  details: () => [...programEngagementsKeys.all, "detail"] as const,
  detail: (id: string) => [...programEngagementsKeys.details(), id] as const,
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

export function useProgramEngagementsList(filters?: ProgramEngagementsFilters) {
  return useQuery({
    queryKey: programEngagementsKeys.list(filters),
    queryFn: () =>
      fetchApi<ProgramEngagements[]>(`/api/simplified/program-engagements${buildQueryString(filters)}`),
  });
}

export function useProgramEngagements(id: string) {
  return useQuery({
    queryKey: programEngagementsKeys.detail(id),
    queryFn: () =>
      fetchApi<ProgramEngagements>(`/api/simplified/program-engagements?id=${id}`),
    enabled: !!id,
  });
}

export function useProgramEngagementsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProgramEngagementsCreate) =>
      fetchApi<ProgramEngagements>(`/api/simplified/program-engagements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programEngagementsKeys.lists() });
    },
  });
}

export function useProgramEngagementsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ProgramEngagementsUpdate & { id: string }) =>
      fetchApi<ProgramEngagements>(`/api/simplified/program-engagements`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: programEngagementsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: programEngagementsKeys.detail(variables.id),
      });
    },
  });
}

export function useProgramEngagementsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/program-engagements?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programEngagementsKeys.lists() });
    },
  });
}
