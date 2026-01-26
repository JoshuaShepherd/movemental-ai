'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  OnboardingResponses,
  OnboardingResponsesCreate,
  OnboardingResponsesUpdate,
} from '@/lib/schemas';

// Query keys for cache management
export const onboardingResponseKeys = {
  all: ['onboarding-response'] as const,
  detail: () => [...onboardingResponseKeys.all, 'detail'] as const,
};

/**
 * Hook to fetch onboarding response for current tenant
 */
export function useOnboardingResponse() {
  return useQuery<OnboardingResponses | null>({
    queryKey: onboardingResponseKeys.detail(),
    queryFn: async () => {
      const response = await fetch('/api/simplified/onboarding-responses');
      if (!response.ok) {
        throw new Error('Failed to fetch onboarding response');
      }
      const { data } = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to create onboarding response
 */
export function useCreateOnboardingResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OnboardingResponsesCreate) => {
      const response = await fetch('/api/simplified/onboarding-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create onboarding response');
      }
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.all });
    },
  });
}

/**
 * Hook to update onboarding response
 */
export function useUpdateOnboardingResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OnboardingResponsesUpdate) => {
      const response = await fetch('/api/simplified/onboarding-responses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update onboarding response');
      }
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.all });
    },
  });
}

/**
 * Hook to complete onboarding response
 */
export function useCompleteOnboardingResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/simplified/onboarding-responses/complete', {
        method: 'POST',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to complete onboarding response');
      }
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.all });
    },
  });
}

/**
 * Hook for uploading onboarding files (photos, content samples) to Supabase Storage
 * Files are automatically scoped to the current tenant's organization
 */
export function useUploadOnboardingFile() {
  return useMutation({
    mutationFn: async ({ file, type }: { file: File; type: 'photo' | 'content-sample' }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch('/api/onboarding/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload file');
      }

      const { data } = await response.json();
      return data;
    },
  });
}
