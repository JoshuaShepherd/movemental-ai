import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  RealityAssessmentInvites,
  RealityAssessmentInvitesCreate,
  RealityAssessmentInvitesUpdate,
  RealityAssessmentInvitesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const realityAssessmentInvitesKeys = {
  all: ["realityAssessmentInvites"] as const,
  lists: () => [...realityAssessmentInvitesKeys.all, "list"] as const,
  list: (filters?: RealityAssessmentInvitesFilters) => [...realityAssessmentInvitesKeys.lists(), filters] as const,
  details: () => [...realityAssessmentInvitesKeys.all, "detail"] as const,
  detail: (id: string) => [...realityAssessmentInvitesKeys.details(), id] as const,
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

export function useRealityAssessmentInvitesList(filters?: RealityAssessmentInvitesFilters) {
  return useQuery({
    queryKey: realityAssessmentInvitesKeys.list(filters),
    queryFn: () =>
      fetchApi<RealityAssessmentInvites[]>(`/api/simplified/reality-assessment-invites${buildQueryString(filters)}`),
  });
}

export function useRealityAssessmentInvites(id: string) {
  return useQuery({
    queryKey: realityAssessmentInvitesKeys.detail(id),
    queryFn: () =>
      fetchApi<RealityAssessmentInvites>(`/api/simplified/reality-assessment-invites?id=${id}`),
    enabled: !!id,
  });
}

export function useRealityAssessmentInvitesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RealityAssessmentInvitesCreate) =>
      fetchApi<RealityAssessmentInvites>(`/api/simplified/reality-assessment-invites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentInvitesKeys.lists() });
    },
  });
}

export function useRealityAssessmentInvitesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: RealityAssessmentInvitesUpdate & { id: string }) =>
      fetchApi<RealityAssessmentInvites>(`/api/simplified/reality-assessment-invites`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentInvitesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: realityAssessmentInvitesKeys.detail(variables.id),
      });
    },
  });
}

export function useRealityAssessmentInvitesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/reality-assessment-invites?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentInvitesKeys.lists() });
    },
  });
}
