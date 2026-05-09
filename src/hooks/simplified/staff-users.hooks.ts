import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  StaffUsers,
  StaffUsersCreate,
  StaffUsersUpdate,
  StaffUsersFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const staffUsersKeys = {
  all: ["staffUsers"] as const,
  lists: () => [...staffUsersKeys.all, "list"] as const,
  list: (filters?: StaffUsersFilters) => [...staffUsersKeys.lists(), filters] as const,
  details: () => [...staffUsersKeys.all, "detail"] as const,
  detail: (id: string) => [...staffUsersKeys.details(), id] as const,
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

export function useStaffUsersList(filters?: StaffUsersFilters) {
  return useQuery({
    queryKey: staffUsersKeys.list(filters),
    queryFn: () =>
      fetchApi<StaffUsers[]>(`/api/simplified/staff-users${buildQueryString(filters)}`),
  });
}

export function useStaffUsers(id: string) {
  return useQuery({
    queryKey: staffUsersKeys.detail(id),
    queryFn: () =>
      fetchApi<StaffUsers>(`/api/simplified/staff-users?id=${id}`),
    enabled: !!id,
  });
}

export function useStaffUsersCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StaffUsersCreate) =>
      fetchApi<StaffUsers>(`/api/simplified/staff-users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffUsersKeys.lists() });
    },
  });
}

export function useStaffUsersUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: StaffUsersUpdate & { id: string }) =>
      fetchApi<StaffUsers>(`/api/simplified/staff-users`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: staffUsersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: staffUsersKeys.detail(variables.id),
      });
    },
  });
}

export function useStaffUsersDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/staff-users?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffUsersKeys.lists() });
    },
  });
}
