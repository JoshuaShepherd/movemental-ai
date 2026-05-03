import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookEmailSubscribers,
  BookEmailSubscribersCreate,
  BookEmailSubscribersUpdate,
  BookEmailSubscribersFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookEmailSubscribersKeys = {
  all: ["bookEmailSubscribers"] as const,
  lists: () => [...bookEmailSubscribersKeys.all, "list"] as const,
  list: (filters?: BookEmailSubscribersFilters) => [...bookEmailSubscribersKeys.lists(), filters] as const,
  details: () => [...bookEmailSubscribersKeys.all, "detail"] as const,
  detail: (id: string) => [...bookEmailSubscribersKeys.details(), id] as const,
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

export function useBookEmailSubscribersList(filters?: BookEmailSubscribersFilters) {
  return useQuery({
    queryKey: bookEmailSubscribersKeys.list(filters),
    queryFn: () =>
      fetchApi<BookEmailSubscribers[]>(`/api/simplified/book-email-subscribers${buildQueryString(filters)}`),
  });
}

export function useBookEmailSubscribers(id: string) {
  return useQuery({
    queryKey: bookEmailSubscribersKeys.detail(id),
    queryFn: () =>
      fetchApi<BookEmailSubscribers>(`/api/simplified/book-email-subscribers?id=${id}`),
    enabled: !!id,
  });
}

export function useBookEmailSubscribersCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookEmailSubscribersCreate) =>
      fetchApi<BookEmailSubscribers>(`/api/simplified/book-email-subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookEmailSubscribersKeys.lists() });
    },
  });
}

export function useBookEmailSubscribersUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookEmailSubscribersUpdate & { id: string }) =>
      fetchApi<BookEmailSubscribers>(`/api/simplified/book-email-subscribers`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookEmailSubscribersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookEmailSubscribersKeys.detail(variables.id),
      });
    },
  });
}

export function useBookEmailSubscribersDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-email-subscribers?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookEmailSubscribersKeys.lists() });
    },
  });
}
