import { z } from 'zod';

// Base schema for IDs
export const IdSchema = z.string().uuid();

// Base filters schema that all filter schemas extend
export const BaseFiltersSchema = z.object({
  // Common pagination fields can be added here
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});
