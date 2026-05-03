import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiLabTestTickets,
  AiLabTestTicketsCreate,
  AiLabTestTicketsUpdate,
  AiLabTestTicketsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiLabTestTicketsKeys = {
  all: ["aiLabTestTickets"] as const,
  lists: () => [...aiLabTestTicketsKeys.all, "list"] as const,
  list: (filters?: AiLabTestTicketsFilters) => [...aiLabTestTicketsKeys.lists(), filters] as const,
  details: () => [...aiLabTestTicketsKeys.all, "detail"] as const,
  detail: (id: string) => [...aiLabTestTicketsKeys.details(), id] as const,
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

export function useAiLabTestTicketsList(filters?: AiLabTestTicketsFilters) {
  return useQuery({
    queryKey: aiLabTestTicketsKeys.list(filters),
    queryFn: () =>
      fetchApi<AiLabTestTickets[]>(`/api/simplified/ai-lab-test-tickets${buildQueryString(filters)}`),
  });
}

export function useAiLabTestTickets(id: string) {
  return useQuery({
    queryKey: aiLabTestTicketsKeys.detail(id),
    queryFn: () =>
      fetchApi<AiLabTestTickets>(`/api/simplified/ai-lab-test-tickets?id=${id}`),
    enabled: !!id,
  });
}

export function useAiLabTestTicketsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiLabTestTicketsCreate) =>
      fetchApi<AiLabTestTickets>(`/api/simplified/ai-lab-test-tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabTestTicketsKeys.lists() });
    },
  });
}

export function useAiLabTestTicketsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiLabTestTicketsUpdate & { id: string }) =>
      fetchApi<AiLabTestTickets>(`/api/simplified/ai-lab-test-tickets`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiLabTestTicketsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiLabTestTicketsKeys.detail(variables.id),
      });
    },
  });
}

export function useAiLabTestTicketsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-lab-test-tickets?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabTestTicketsKeys.lists() });
    },
  });
}
