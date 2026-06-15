import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiRealityInvites,
  AiRealityInvitesCreate,
  AiRealityInvitesUpdate,
  AiRealityInvitesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiRealityInvitesKeys = {
  all: ["aiRealityInvites"] as const,
  lists: () => [...aiRealityInvitesKeys.all, "list"] as const,
  list: (filters?: AiRealityInvitesFilters) => [...aiRealityInvitesKeys.lists(), filters] as const,
  details: () => [...aiRealityInvitesKeys.all, "detail"] as const,
  detail: (id: string) => [...aiRealityInvitesKeys.details(), id] as const,
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

export function useAiRealityInvitesList(filters?: AiRealityInvitesFilters) {
  return useQuery({
    queryKey: aiRealityInvitesKeys.list(filters),
    queryFn: () =>
      fetchApi<AiRealityInvites[]>(`/api/simplified/ai-reality-invites${buildQueryString(filters)}`),
  });
}

export function useAiRealityInvites(id: string) {
  return useQuery({
    queryKey: aiRealityInvitesKeys.detail(id),
    queryFn: () =>
      fetchApi<AiRealityInvites>(`/api/simplified/ai-reality-invites?id=${id}`),
    enabled: !!id,
  });
}

export function useAiRealityInvitesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiRealityInvitesCreate) =>
      fetchApi<AiRealityInvites>(`/api/simplified/ai-reality-invites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiRealityInvitesKeys.lists() });
    },
  });
}

export function useAiRealityInvitesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiRealityInvitesUpdate & { id: string }) =>
      fetchApi<AiRealityInvites>(`/api/simplified/ai-reality-invites`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiRealityInvitesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiRealityInvitesKeys.detail(variables.id),
      });
    },
  });
}

export function useAiRealityInvitesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-reality-invites?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiRealityInvitesKeys.lists() });
    },
  });
}
