import { and, eq, isNotNull, isNull, sql } from 'drizzle-orm';
import {
  type Write,
  type WriteContent,
  WriteSelectSchema,
  WriteContentSelectSchema,
} from '@/lib/schemas';
import { write as writeTable, writeContent as writeContentTable } from '@/db/schema';
import { db } from '@/db/index';
import type { Result } from '../types';

/**
 * Service for prospective writers (write table) and their content.
 * Platform-level: not tenant-scoped. Used for linked-writers section on why-movemental-final.
 */
export class WriteService {
  private validateWrite(data: unknown): Write {
    return WriteSelectSchema.parse(data);
  }

  private validateWriteContent(data: unknown): WriteContent {
    return WriteContentSelectSchema.parse(data);
  }

  /** List all writers that have been linked to a user (for "Voices joining" section). */
  async listLinkedWriters(): Promise<Result<Write[]>> {
    try {
      const rows = await db
        .select()
        .from(writeTable)
        .where(isNotNull(writeTable.linkedUserId))
        .orderBy(writeTable.createdAt);

      const validated = rows.map((r) => this.validateWrite(r));
      return { ok: true, data: validated };
    } catch (error) {
      return {
        ok: false,
        error: {
          code: 'DB_ERROR',
          message: error instanceof Error ? error.message : 'Database error',
        },
      };
    }
  }

  /** Get the first content item for each of the given write IDs (for display in section). */
  async getFirstContentByWriteIds(writeIds: string[]): Promise<Result<Record<string, WriteContent | null>>> {
    if (writeIds.length === 0) {
      return { ok: true, data: {} };
    }
    try {
      const result: Record<string, WriteContent | null> = {};
      for (const writeId of writeIds) {
        const [row] = await db
          .select()
          .from(writeContentTable)
          .where(eq(writeContentTable.writeId, writeId))
          .limit(1);
        result[writeId] = row ? this.validateWriteContent(row) : null;
      }
      return { ok: true, data: result };
    } catch (error) {
      return {
        ok: false,
        error: {
          code: 'DB_ERROR',
          message: error instanceof Error ? error.message : 'Database error',
        },
      };
    }
  }

  /** Find an unlinked prospective writer by normalized full name (for signup linking). */
  async findUnlinkedByFullName(fullName: string): Promise<Result<Write | null>> {
    const normalized = fullName.trim().toLowerCase();
    if (!normalized) {
      return { ok: true, data: null };
    }
    try {
      const [found] = await db
        .select()
        .from(writeTable)
        .where(
          and(
            isNull(writeTable.linkedUserId),
            sql`lower(trim(${writeTable.fullName})) = ${normalized}`
          )
        )
        .limit(1);

      if (!found) {
        return { ok: true, data: null };
      }
      return { ok: true, data: this.validateWrite(found) };
    } catch (error) {
      return {
        ok: false,
        error: {
          code: 'DB_ERROR',
          message: error instanceof Error ? error.message : 'Database error',
        },
      };
    }
  }

  /** Link a prospective writer to a user (call after signup when name matches). */
  async linkWriterToUser(writeId: string, userId: string): Promise<Result<Write>> {
    try {
      const [row] = await db
        .update(writeTable)
        .set({
          linkedUserId: userId,
          linkedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(writeTable.id, writeId))
        .returning();

      if (!row) {
        return { ok: false, error: { code: 'NOT_FOUND', message: 'Write record not found' } };
      }
      return { ok: true, data: this.validateWrite(row) };
    } catch (error) {
      return {
        ok: false,
        error: {
          code: 'DB_ERROR',
          message: error instanceof Error ? error.message : 'Database error',
        },
      };
    }
  }
}

export const writeService = new WriteService();
