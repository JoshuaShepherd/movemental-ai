'use client';

import { useQuery } from '@tanstack/react-query';
import type { LinkedWriterWithContent } from '@/app/api/simplified/linked-writers/route';

export const linkedWritersKeys = {
  all: ['linked-writers'] as const,
};

/**
 * Fetches linked prospective writers and their first content item for the "Voices joining" section.
 */
export function useLinkedWriters() {
  return useQuery<LinkedWriterWithContent[]>({
    queryKey: linkedWritersKeys.all,
    queryFn: async () => {
      const response = await fetch('/api/simplified/linked-writers');
      if (!response.ok) {
        throw new Error('Failed to fetch linked writers');
      }
      const { data } = await response.json();
      return data ?? [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
