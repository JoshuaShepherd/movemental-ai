import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SignedAgreements,
  SignedAgreementsCreate,
  SignedAgreementsUpdate,
  SignedAgreementsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const signedAgreementsKeys = {
  all: ["signedAgreements"] as const,
  lists: () => [...signedAgreementsKeys.all, "list"] as const,
  list: (filters?: SignedAgreementsFilters) => [...signedAgreementsKeys.lists(), filters] as const,
  details: () => [...signedAgreementsKeys.all, "detail"] as const,
  detail: (id: string) => [...signedAgreementsKeys.details(), id] as const,
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

export function useSignedAgreementsList(filters?: SignedAgreementsFilters) {
  return useQuery({
    queryKey: signedAgreementsKeys.list(filters),
    queryFn: () =>
      fetchApi<SignedAgreements[]>(`/api/simplified/signed-agreements${buildQueryString(filters)}`),
  });
}

export function useSignedAgreements(id: string) {
  return useQuery({
    queryKey: signedAgreementsKeys.detail(id),
    queryFn: () =>
      fetchApi<SignedAgreements>(`/api/simplified/signed-agreements?id=${id}`),
    enabled: !!id,
  });
}

export function useSignedAgreementsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SignedAgreementsCreate) =>
      fetchApi<SignedAgreements>(`/api/simplified/signed-agreements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: signedAgreementsKeys.lists() });
    },
  });
}

export function useSignedAgreementsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SignedAgreementsUpdate & { id: string }) =>
      fetchApi<SignedAgreements>(`/api/simplified/signed-agreements`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: signedAgreementsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: signedAgreementsKeys.detail(variables.id),
      });
    },
  });
}

export function useSignedAgreementsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/signed-agreements?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: signedAgreementsKeys.lists() });
    },
  });
}
