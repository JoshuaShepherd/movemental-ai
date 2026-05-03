import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CohortDiscussionMessages,
  CohortDiscussionMessagesCreate,
  CohortDiscussionMessagesUpdate,
  CohortDiscussionMessagesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const cohortDiscussionMessagesKeys = {
  all: ["cohortDiscussionMessages"] as const,
  lists: () => [...cohortDiscussionMessagesKeys.all, "list"] as const,
  list: (filters?: CohortDiscussionMessagesFilters) => [...cohortDiscussionMessagesKeys.lists(), filters] as const,
  details: () => [...cohortDiscussionMessagesKeys.all, "detail"] as const,
  detail: (id: string) => [...cohortDiscussionMessagesKeys.details(), id] as const,
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

export function useCohortDiscussionMessagesList(filters?: CohortDiscussionMessagesFilters) {
  return useQuery({
    queryKey: cohortDiscussionMessagesKeys.list(filters),
    queryFn: () =>
      fetchApi<CohortDiscussionMessages[]>(`/api/simplified/cohort-discussion-messages${buildQueryString(filters)}`),
  });
}

export function useCohortDiscussionMessages(id: string) {
  return useQuery({
    queryKey: cohortDiscussionMessagesKeys.detail(id),
    queryFn: () =>
      fetchApi<CohortDiscussionMessages>(`/api/simplified/cohort-discussion-messages?id=${id}`),
    enabled: !!id,
  });
}

export function useCohortDiscussionMessagesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CohortDiscussionMessagesCreate) =>
      fetchApi<CohortDiscussionMessages>(`/api/simplified/cohort-discussion-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cohortDiscussionMessagesKeys.lists() });
    },
  });
}

export function useCohortDiscussionMessagesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CohortDiscussionMessagesUpdate & { id: string }) =>
      fetchApi<CohortDiscussionMessages>(`/api/simplified/cohort-discussion-messages`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cohortDiscussionMessagesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: cohortDiscussionMessagesKeys.detail(variables.id),
      });
    },
  });
}

export function useCohortDiscussionMessagesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/cohort-discussion-messages?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cohortDiscussionMessagesKeys.lists() });
    },
  });
}
