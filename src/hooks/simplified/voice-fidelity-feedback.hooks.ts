import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VoiceFidelityFeedback,
  VoiceFidelityFeedbackCreate,
  VoiceFidelityFeedbackUpdate,
  VoiceFidelityFeedbackFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const voiceFidelityFeedbackKeys = {
  all: ["voiceFidelityFeedback"] as const,
  lists: () => [...voiceFidelityFeedbackKeys.all, "list"] as const,
  list: (filters?: VoiceFidelityFeedbackFilters) => [...voiceFidelityFeedbackKeys.lists(), filters] as const,
  details: () => [...voiceFidelityFeedbackKeys.all, "detail"] as const,
  detail: (id: string) => [...voiceFidelityFeedbackKeys.details(), id] as const,
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

export function useVoiceFidelityFeedbackList(filters?: VoiceFidelityFeedbackFilters) {
  return useQuery({
    queryKey: voiceFidelityFeedbackKeys.list(filters),
    queryFn: () =>
      fetchApi<VoiceFidelityFeedback[]>(`/api/simplified/voice-fidelity-feedback${buildQueryString(filters)}`),
  });
}

export function useVoiceFidelityFeedback(id: string) {
  return useQuery({
    queryKey: voiceFidelityFeedbackKeys.detail(id),
    queryFn: () =>
      fetchApi<VoiceFidelityFeedback>(`/api/simplified/voice-fidelity-feedback?id=${id}`),
    enabled: !!id,
  });
}

export function useVoiceFidelityFeedbackCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VoiceFidelityFeedbackCreate) =>
      fetchApi<VoiceFidelityFeedback>(`/api/simplified/voice-fidelity-feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceFidelityFeedbackKeys.lists() });
    },
  });
}

export function useVoiceFidelityFeedbackUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VoiceFidelityFeedbackUpdate & { id: string }) =>
      fetchApi<VoiceFidelityFeedback>(`/api/simplified/voice-fidelity-feedback`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: voiceFidelityFeedbackKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: voiceFidelityFeedbackKeys.detail(variables.id),
      });
    },
  });
}

export function useVoiceFidelityFeedbackDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/voice-fidelity-feedback?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceFidelityFeedbackKeys.lists() });
    },
  });
}
