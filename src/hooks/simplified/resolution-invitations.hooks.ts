import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ResolutionInvitations,
  ResolutionInvitationsCreate,
  ResolutionInvitationsUpdate,
  ResolutionInvitationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const resolutionInvitationsKeys = {
  all: ["resolutionInvitations"] as const,
  lists: () => [...resolutionInvitationsKeys.all, "list"] as const,
  list: (filters?: ResolutionInvitationsFilters) => [...resolutionInvitationsKeys.lists(), filters] as const,
  details: () => [...resolutionInvitationsKeys.all, "detail"] as const,
  detail: (id: string) => [...resolutionInvitationsKeys.details(), id] as const,
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

export function useResolutionInvitationsList(filters?: ResolutionInvitationsFilters) {
  return useQuery({
    queryKey: resolutionInvitationsKeys.list(filters),
    queryFn: () =>
      fetchApi<ResolutionInvitations[]>(`/api/simplified/resolution-invitations${buildQueryString(filters)}`),
  });
}

export function useResolutionInvitations(id: string) {
  return useQuery({
    queryKey: resolutionInvitationsKeys.detail(id),
    queryFn: () =>
      fetchApi<ResolutionInvitations>(`/api/simplified/resolution-invitations?id=${id}`),
    enabled: !!id,
  });
}

export function useResolutionInvitationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ResolutionInvitationsCreate) =>
      fetchApi<ResolutionInvitations>(`/api/simplified/resolution-invitations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resolutionInvitationsKeys.lists() });
    },
  });
}

export function useResolutionInvitationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ResolutionInvitationsUpdate & { id: string }) =>
      fetchApi<ResolutionInvitations>(`/api/simplified/resolution-invitations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: resolutionInvitationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: resolutionInvitationsKeys.detail(variables.id),
      });
    },
  });
}

export function useResolutionInvitationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/resolution-invitations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resolutionInvitationsKeys.lists() });
    },
  });
}
