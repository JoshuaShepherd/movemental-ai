import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  TranslationJobs,
  TranslationJobsCreate,
  TranslationJobsUpdate,
  TranslationJobsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const translationJobsKeys = {
  all: ["translationJobs"] as const,
  lists: () => [...translationJobsKeys.all, "list"] as const,
  list: (filters?: TranslationJobsFilters) => [...translationJobsKeys.lists(), filters] as const,
  details: () => [...translationJobsKeys.all, "detail"] as const,
  detail: (id: string) => [...translationJobsKeys.details(), id] as const,
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

export function useTranslationJobsList(filters?: TranslationJobsFilters) {
  return useQuery({
    queryKey: translationJobsKeys.list(filters),
    queryFn: () =>
      fetchApi<TranslationJobs[]>(`/api/simplified/translation-jobs${buildQueryString(filters)}`),
  });
}

export function useTranslationJobs(id: string) {
  return useQuery({
    queryKey: translationJobsKeys.detail(id),
    queryFn: () =>
      fetchApi<TranslationJobs>(`/api/simplified/translation-jobs?id=${id}`),
    enabled: !!id,
  });
}

export function useTranslationJobsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TranslationJobsCreate) =>
      fetchApi<TranslationJobs>(`/api/simplified/translation-jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: translationJobsKeys.lists() });
    },
  });
}

export function useTranslationJobsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: TranslationJobsUpdate & { id: string }) =>
      fetchApi<TranslationJobs>(`/api/simplified/translation-jobs`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: translationJobsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: translationJobsKeys.detail(variables.id),
      });
    },
  });
}

export function useTranslationJobsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/translation-jobs?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: translationJobsKeys.lists() });
    },
  });
}
