import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VoiceIdentities,
  VoiceIdentitiesCreate,
  VoiceIdentitiesUpdate,
  VoiceIdentitiesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const voiceIdentitiesKeys = {
  all: ["voiceIdentities"] as const,
  lists: () => [...voiceIdentitiesKeys.all, "list"] as const,
  list: (filters?: VoiceIdentitiesFilters) => [...voiceIdentitiesKeys.lists(), filters] as const,
  details: () => [...voiceIdentitiesKeys.all, "detail"] as const,
  detail: (id: string) => [...voiceIdentitiesKeys.details(), id] as const,
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

export function useVoiceIdentitiesList(filters?: VoiceIdentitiesFilters) {
  return useQuery({
    queryKey: voiceIdentitiesKeys.list(filters),
    queryFn: () =>
      fetchApi<VoiceIdentities[]>(`/api/simplified/voice-identities${buildQueryString(filters)}`),
  });
}

export function useVoiceIdentities(id: string) {
  return useQuery({
    queryKey: voiceIdentitiesKeys.detail(id),
    queryFn: () =>
      fetchApi<VoiceIdentities>(`/api/simplified/voice-identities?id=${id}`),
    enabled: !!id,
  });
}

export function useVoiceIdentitiesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VoiceIdentitiesCreate) =>
      fetchApi<VoiceIdentities>(`/api/simplified/voice-identities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceIdentitiesKeys.lists() });
    },
  });
}

export function useVoiceIdentitiesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VoiceIdentitiesUpdate & { id: string }) =>
      fetchApi<VoiceIdentities>(`/api/simplified/voice-identities`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: voiceIdentitiesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: voiceIdentitiesKeys.detail(variables.id),
      });
    },
  });
}

export function useVoiceIdentitiesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/voice-identities?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceIdentitiesKeys.lists() });
    },
  });
}
