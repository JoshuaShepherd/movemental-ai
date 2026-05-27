import { z } from 'zod';
import { db } from '../../db/index';
import type { Result, ServiceError } from './types';

/**
 * Base service class for all simplified services
 * Provides common functionality: validation, error handling, tenant scoping
 */
export abstract class SimplifiedService<
  TTable,
  TSelect,
  TInsert,
  TUpdate,
  TFilters
> {
  protected abstract table: TTable;
  protected abstract selectSchema: z.ZodSchema<TSelect>;
  protected abstract insertSchema: z.ZodSchema<TInsert>;
  protected abstract updateSchema: z.ZodSchema<TUpdate>;
  protected abstract filtersSchema: z.ZodSchema<TFilters>;

  // Helper methods for Result pattern
  protected ok<T>(data: T): Result<T> {
    return { ok: true, data };
  }

  protected fail(code: string, message: string): Result<never> {
    return {
      ok: false,
      error: { code, message },
    };
  }

  // Validation helpers
  protected validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
  }

  protected validateOutput<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
  }

  // Get database instance
  protected get db() {
    return db;
  }
}
