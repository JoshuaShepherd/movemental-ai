import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  WritingExamples,
  WritingExamplesCreate,
  WritingExamplesUpdate,
  WritingExamplesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const writingExamplesKeys = {
  all: ["writingExamples"] as const,
  lists: () => [...writingExamplesKeys.all, "list"] as const,
  list: (filters?: WritingExamplesFilters) => [...writingExamplesKeys.lists(), filters] as const,
  details: () => [...writingExamplesKeys.all, "detail"] as const,
  detail: (id: string) => [...writingExamplesKeys.details(), id] as const,
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

export function useWritingExamplesList(filters?: WritingExamplesFilters) {
  return useQuery({
    queryKey: writingExamplesKeys.list(filters),
    queryFn: () =>
      fetchApi<WritingExamples[]>(`/api/simplified/writing-examples${buildQueryString(filters)}`),
  });
}

export function useWritingExamples(id: string) {
  return useQuery({
    queryKey: writingExamplesKeys.detail(id),
    queryFn: () =>
      fetchApi<WritingExamples>(`/api/simplified/writing-examples?id=${id}`),
    enabled: !!id,
  });
}

export function useWritingExamplesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WritingExamplesCreate) =>
      fetchApi<WritingExamples>(`/api/simplified/writing-examples`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingExamplesKeys.lists() });
    },
  });
}

export function useWritingExamplesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WritingExamplesUpdate & { id: string }) =>
      fetchApi<WritingExamples>(`/api/simplified/writing-examples`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: writingExamplesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: writingExamplesKeys.detail(variables.id),
      });
    },
  });
}

export function useWritingExamplesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/writing-examples?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingExamplesKeys.lists() });
    },
  });
}
