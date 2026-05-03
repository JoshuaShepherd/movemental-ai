import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  QuestionBanks,
  QuestionBanksCreate,
  QuestionBanksUpdate,
  QuestionBanksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const questionBanksKeys = {
  all: ["questionBanks"] as const,
  lists: () => [...questionBanksKeys.all, "list"] as const,
  list: (filters?: QuestionBanksFilters) => [...questionBanksKeys.lists(), filters] as const,
  details: () => [...questionBanksKeys.all, "detail"] as const,
  detail: (id: string) => [...questionBanksKeys.details(), id] as const,
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

export function useQuestionBanksList(filters?: QuestionBanksFilters) {
  return useQuery({
    queryKey: questionBanksKeys.list(filters),
    queryFn: () =>
      fetchApi<QuestionBanks[]>(`/api/simplified/question-banks${buildQueryString(filters)}`),
  });
}

export function useQuestionBanks(id: string) {
  return useQuery({
    queryKey: questionBanksKeys.detail(id),
    queryFn: () =>
      fetchApi<QuestionBanks>(`/api/simplified/question-banks?id=${id}`),
    enabled: !!id,
  });
}

export function useQuestionBanksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: QuestionBanksCreate) =>
      fetchApi<QuestionBanks>(`/api/simplified/question-banks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionBanksKeys.lists() });
    },
  });
}

export function useQuestionBanksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: QuestionBanksUpdate & { id: string }) =>
      fetchApi<QuestionBanks>(`/api/simplified/question-banks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: questionBanksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: questionBanksKeys.detail(variables.id),
      });
    },
  });
}

export function useQuestionBanksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/question-banks?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionBanksKeys.lists() });
    },
  });
}
