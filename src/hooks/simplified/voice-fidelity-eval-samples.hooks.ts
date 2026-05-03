import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VoiceFidelityEvalSamples,
  VoiceFidelityEvalSamplesCreate,
  VoiceFidelityEvalSamplesUpdate,
  VoiceFidelityEvalSamplesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const voiceFidelityEvalSamplesKeys = {
  all: ["voiceFidelityEvalSamples"] as const,
  lists: () => [...voiceFidelityEvalSamplesKeys.all, "list"] as const,
  list: (filters?: VoiceFidelityEvalSamplesFilters) => [...voiceFidelityEvalSamplesKeys.lists(), filters] as const,
  details: () => [...voiceFidelityEvalSamplesKeys.all, "detail"] as const,
  detail: (id: string) => [...voiceFidelityEvalSamplesKeys.details(), id] as const,
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

export function useVoiceFidelityEvalSamplesList(filters?: VoiceFidelityEvalSamplesFilters) {
  return useQuery({
    queryKey: voiceFidelityEvalSamplesKeys.list(filters),
    queryFn: () =>
      fetchApi<VoiceFidelityEvalSamples[]>(`/api/simplified/voice-fidelity-eval-samples${buildQueryString(filters)}`),
  });
}

export function useVoiceFidelityEvalSamples(id: string) {
  return useQuery({
    queryKey: voiceFidelityEvalSamplesKeys.detail(id),
    queryFn: () =>
      fetchApi<VoiceFidelityEvalSamples>(`/api/simplified/voice-fidelity-eval-samples?id=${id}`),
    enabled: !!id,
  });
}

export function useVoiceFidelityEvalSamplesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VoiceFidelityEvalSamplesCreate) =>
      fetchApi<VoiceFidelityEvalSamples>(`/api/simplified/voice-fidelity-eval-samples`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceFidelityEvalSamplesKeys.lists() });
    },
  });
}

export function useVoiceFidelityEvalSamplesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VoiceFidelityEvalSamplesUpdate & { id: string }) =>
      fetchApi<VoiceFidelityEvalSamples>(`/api/simplified/voice-fidelity-eval-samples`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: voiceFidelityEvalSamplesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: voiceFidelityEvalSamplesKeys.detail(variables.id),
      });
    },
  });
}

export function useVoiceFidelityEvalSamplesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/voice-fidelity-eval-samples?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceFidelityEvalSamplesKeys.lists() });
    },
  });
}
