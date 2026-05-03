import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  NewsletterSubscribers,
  NewsletterSubscribersCreate,
  NewsletterSubscribersUpdate,
  NewsletterSubscribersFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const newsletterSubscribersKeys = {
  all: ["newsletterSubscribers"] as const,
  lists: () => [...newsletterSubscribersKeys.all, "list"] as const,
  list: (filters?: NewsletterSubscribersFilters) => [...newsletterSubscribersKeys.lists(), filters] as const,
  details: () => [...newsletterSubscribersKeys.all, "detail"] as const,
  detail: (id: string) => [...newsletterSubscribersKeys.details(), id] as const,
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

export function useNewsletterSubscribersList(filters?: NewsletterSubscribersFilters) {
  return useQuery({
    queryKey: newsletterSubscribersKeys.list(filters),
    queryFn: () =>
      fetchApi<NewsletterSubscribers[]>(`/api/simplified/newsletter-subscribers${buildQueryString(filters)}`),
  });
}

export function useNewsletterSubscribers(id: string) {
  return useQuery({
    queryKey: newsletterSubscribersKeys.detail(id),
    queryFn: () =>
      fetchApi<NewsletterSubscribers>(`/api/simplified/newsletter-subscribers?id=${id}`),
    enabled: !!id,
  });
}

export function useNewsletterSubscribersCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NewsletterSubscribersCreate) =>
      fetchApi<NewsletterSubscribers>(`/api/simplified/newsletter-subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsletterSubscribersKeys.lists() });
    },
  });
}

export function useNewsletterSubscribersUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: NewsletterSubscribersUpdate & { id: string }) =>
      fetchApi<NewsletterSubscribers>(`/api/simplified/newsletter-subscribers`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: newsletterSubscribersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: newsletterSubscribersKeys.detail(variables.id),
      });
    },
  });
}

export function useNewsletterSubscribersDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/newsletter-subscribers?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsletterSubscribersKeys.lists() });
    },
  });
}
