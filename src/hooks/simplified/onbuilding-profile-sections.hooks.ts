import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  OnbuildingProfileSections,
  OnbuildingProfileSectionsCreate,
  OnbuildingProfileSectionsUpdate,
  OnbuildingProfileSectionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const onbuildingProfileSectionsKeys = {
  all: ["onbuildingProfileSections"] as const,
  lists: () => [...onbuildingProfileSectionsKeys.all, "list"] as const,
  list: (filters?: OnbuildingProfileSectionsFilters) => [...onbuildingProfileSectionsKeys.lists(), filters] as const,
  details: () => [...onbuildingProfileSectionsKeys.all, "detail"] as const,
  detail: (id: string) => [...onbuildingProfileSectionsKeys.details(), id] as const,
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

export function useOnbuildingProfileSectionsList(filters?: OnbuildingProfileSectionsFilters) {
  return useQuery({
    queryKey: onbuildingProfileSectionsKeys.list(filters),
    queryFn: () =>
      fetchApi<OnbuildingProfileSections[]>(`/api/simplified/onbuilding-profile-sections${buildQueryString(filters)}`),
  });
}

export function useOnbuildingProfileSections(id: string) {
  return useQuery({
    queryKey: onbuildingProfileSectionsKeys.detail(id),
    queryFn: () =>
      fetchApi<OnbuildingProfileSections>(`/api/simplified/onbuilding-profile-sections?id=${id}`),
    enabled: !!id,
  });
}

export function useOnbuildingProfileSectionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OnbuildingProfileSectionsCreate) =>
      fetchApi<OnbuildingProfileSections>(`/api/simplified/onbuilding-profile-sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onbuildingProfileSectionsKeys.lists() });
    },
  });
}

export function useOnbuildingProfileSectionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: OnbuildingProfileSectionsUpdate & { id: string }) =>
      fetchApi<OnbuildingProfileSections>(`/api/simplified/onbuilding-profile-sections`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: onbuildingProfileSectionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: onbuildingProfileSectionsKeys.detail(variables.id),
      });
    },
  });
}

export function useOnbuildingProfileSectionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/onbuilding-profile-sections?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onbuildingProfileSectionsKeys.lists() });
    },
  });
}
