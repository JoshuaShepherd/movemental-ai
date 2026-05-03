import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VoiceBaselines,
  VoiceBaselinesCreate,
  VoiceBaselinesUpdate,
  VoiceBaselinesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const voiceBaselinesKeys = {
  all: ["voiceBaselines"] as const,
  lists: () => [...voiceBaselinesKeys.all, "list"] as const,
  list: (filters?: VoiceBaselinesFilters) => [...voiceBaselinesKeys.lists(), filters] as const,
  details: () => [...voiceBaselinesKeys.all, "detail"] as const,
  detail: (id: string) => [...voiceBaselinesKeys.details(), id] as const,
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

export function useVoiceBaselinesList(filters?: VoiceBaselinesFilters) {
  return useQuery({
    queryKey: voiceBaselinesKeys.list(filters),
    queryFn: () =>
      fetchApi<VoiceBaselines[]>(`/api/simplified/voice-baselines${buildQueryString(filters)}`),
  });
}

export function useVoiceBaselines(id: string) {
  return useQuery({
    queryKey: voiceBaselinesKeys.detail(id),
    queryFn: () =>
      fetchApi<VoiceBaselines>(`/api/simplified/voice-baselines?id=${id}`),
    enabled: !!id,
  });
}

export function useVoiceBaselinesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VoiceBaselinesCreate) =>
      fetchApi<VoiceBaselines>(`/api/simplified/voice-baselines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceBaselinesKeys.lists() });
    },
  });
}

export function useVoiceBaselinesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VoiceBaselinesUpdate & { id: string }) =>
      fetchApi<VoiceBaselines>(`/api/simplified/voice-baselines`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: voiceBaselinesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: voiceBaselinesKeys.detail(variables.id),
      });
    },
  });
}

export function useVoiceBaselinesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/voice-baselines?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceBaselinesKeys.lists() });
    },
  });
}
