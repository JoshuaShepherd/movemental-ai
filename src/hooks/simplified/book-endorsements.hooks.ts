import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookEndorsements,
  BookEndorsementsCreate,
  BookEndorsementsUpdate,
  BookEndorsementsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookEndorsementsKeys = {
  all: ["bookEndorsements"] as const,
  lists: () => [...bookEndorsementsKeys.all, "list"] as const,
  list: (filters?: BookEndorsementsFilters) => [...bookEndorsementsKeys.lists(), filters] as const,
  details: () => [...bookEndorsementsKeys.all, "detail"] as const,
  detail: (id: string) => [...bookEndorsementsKeys.details(), id] as const,
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

export function useBookEndorsementsList(filters?: BookEndorsementsFilters) {
  return useQuery({
    queryKey: bookEndorsementsKeys.list(filters),
    queryFn: () =>
      fetchApi<BookEndorsements[]>(`/api/simplified/book-endorsements${buildQueryString(filters)}`),
  });
}

export function useBookEndorsements(id: string) {
  return useQuery({
    queryKey: bookEndorsementsKeys.detail(id),
    queryFn: () =>
      fetchApi<BookEndorsements>(`/api/simplified/book-endorsements?id=${id}`),
    enabled: !!id,
  });
}

export function useBookEndorsementsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookEndorsementsCreate) =>
      fetchApi<BookEndorsements>(`/api/simplified/book-endorsements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookEndorsementsKeys.lists() });
    },
  });
}

export function useBookEndorsementsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookEndorsementsUpdate & { id: string }) =>
      fetchApi<BookEndorsements>(`/api/simplified/book-endorsements`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookEndorsementsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookEndorsementsKeys.detail(variables.id),
      });
    },
  });
}

export function useBookEndorsementsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-endorsements?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookEndorsementsKeys.lists() });
    },
  });
}
