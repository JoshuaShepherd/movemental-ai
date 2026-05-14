import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Recipes,
  RecipesCreate,
  RecipesUpdate,
  RecipesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const recipesKeys = {
  all: ["recipes"] as const,
  lists: () => [...recipesKeys.all, "list"] as const,
  list: (filters?: RecipesFilters) => [...recipesKeys.lists(), filters] as const,
  details: () => [...recipesKeys.all, "detail"] as const,
  detail: (id: string) => [...recipesKeys.details(), id] as const,
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

export function useRecipesList(filters?: RecipesFilters) {
  return useQuery({
    queryKey: recipesKeys.list(filters),
    queryFn: () =>
      fetchApi<Recipes[]>(`/api/simplified/recipes${buildQueryString(filters)}`),
  });
}

export function useRecipes(id: string) {
  return useQuery({
    queryKey: recipesKeys.detail(id),
    queryFn: () =>
      fetchApi<Recipes>(`/api/simplified/recipes?id=${id}`),
    enabled: !!id,
  });
}

export function useRecipesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RecipesCreate) =>
      fetchApi<Recipes>(`/api/simplified/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipesKeys.lists() });
    },
  });
}

export function useRecipesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: RecipesUpdate & { id: string }) =>
      fetchApi<Recipes>(`/api/simplified/recipes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: recipesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: recipesKeys.detail(variables.id),
      });
    },
  });
}

export function useRecipesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/recipes?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipesKeys.lists() });
    },
  });
}
