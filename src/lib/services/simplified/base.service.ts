import { eq, and, asc, desc, type AnyColumn, type SQL } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { z } from "zod";
import { db } from "@/lib/db";
import { getTenantOrgId } from "@/lib/tenant";

// ---- Result<T> Pattern ----

export type Ok<T> = { success: true; data: T };
export type Err = { success: false; error: { code: string; message: string } };
export type Result<T> = Ok<T> | Err;

// ---- Helpers ----

/** Convert camelCase filter keys to snake_case column names. */
function toSnakeCase(s: string): string {
  return s.replace(/[A-Z]/g, (ch) => `_${ch.toLowerCase()}`);
}

/** Keys that are pagination/search meta, not column filters. */
const META_KEYS = new Set(["limit", "offset", "search"]);

/** Drizzle pgTable instances expose runtime columns by name. */
type ColumnLookup = Record<string, AnyColumn | undefined>;

/** Cast a generic PgTable to its runtime column-lookup shape. */
function columns(table: PgTable): ColumnLookup {
  return table as unknown as ColumnLookup;
}

/** Extract a string error message from an unknown thrown value. */
function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  return typeof e === "string" ? e : "Unknown error";
}

/** Whether an unknown thrown value looks like a ZodError. */
function isZodError(e: unknown): boolean {
  return e instanceof Error && e.name === "ZodError";
}

/* -------------------------------------------------------------------------- */
/*  Drizzle generic-abstraction escape hatches                                 */
/*                                                                             */
/*  Drizzle's typed query builder rejects a generic `TTable extends PgTable`   */
/*  because its overload conditionals (TableLikeHasEmptySelection, inferred    */
/*  insert/update value types) cannot simplify until TTable is concrete. Each  */
/*  concrete subclass passes a real pgTable, so the runtime is sound — but    */
/*  the type system can't prove it inside this abstract base class. The       */
/*  helpers below isolate the necessary escapes to one place.                  */
/* -------------------------------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericQueryBuilder = any;

/** Strongly-typed db proxy with relaxed table parameters. */
interface GenericDb {
  select: () => { from: (table: PgTable) => GenericQueryBuilder };
  insert: (table: PgTable) => {
    values: (values: unknown) => { returning: () => Promise<unknown[]> };
  };
  update: (table: PgTable) => {
    set: (values: unknown) => {
      where: (where: SQL | undefined) => { returning: () => Promise<unknown[]> };
    };
  };
  delete: (table: PgTable) => {
    where: (where: SQL | undefined) => { returning: () => Promise<unknown[]> };
  };
}

const dbx = db as unknown as GenericDb;

// ---- SimplifiedService Base Class ----

export abstract class SimplifiedService<
  TTable extends PgTable,
  TSelect,
  TInsert,
  TUpdate,
  TFilters extends { limit?: number; offset?: number },
> {
  protected table: TTable;
  protected selectSchema: z.ZodType<TSelect>;
  protected insertSchema: z.ZodType<TInsert>;
  protected updateSchema: z.ZodType<TUpdate>;
  protected filtersSchema: z.ZodType<TFilters>;

  constructor(
    table: TTable,
    selectSchema: z.ZodType<TSelect>,
    insertSchema: z.ZodType<TInsert>,
    updateSchema: z.ZodType<TUpdate>,
    filtersSchema: z.ZodType<TFilters>,
  ) {
    this.table = table;
    this.selectSchema = selectSchema;
    this.insertSchema = insertSchema;
    this.updateSchema = updateSchema;
    this.filtersSchema = filtersSchema;
  }

  protected ok<T>(data: T): Ok<T> {
    return { success: true, data };
  }

  protected fail(code: string, message: string): Err {
    return { success: false, error: { code, message } };
  }

  /** Build WHERE conditions from filter fields that match table columns. */
  protected buildFilterConditions(filters?: TFilters): SQL[] {
    const conditions: SQL[] = [];
    if (!filters) return conditions;
    const cols = columns(this.table);
    for (const [key, value] of Object.entries(filters)) {
      if (META_KEYS.has(key) || value === undefined || value === null) continue;
      const col = cols[key] ?? cols[toSnakeCase(key)];
      if (col) {
        conditions.push(eq(col, value));
      }
    }
    return conditions;
  }

  async list(filters?: TFilters): Promise<Result<TSelect[]>> {
    try {
      const cols = columns(this.table);
      const conditions = this.buildFilterConditions(filters);

      if (cols.organization_id != null) {
        const tenantOrgId = getTenantOrgId();
        if (!tenantOrgId) {
          return this.fail(
            "TENANT_NOT_CONFIGURED",
            "TENANT_ORG_ID is required for this resource. Set it in .env.local.",
          );
        }
        conditions.unshift(eq(cols.organization_id, tenantOrgId));
      }

      const limit = filters?.limit ?? 50;
      const offset = filters?.offset ?? 0;
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const rows = (await dbx
        .select()
        .from(this.table)
        .where(where)
        .limit(limit)
        .offset(offset)) as unknown[];
      return this.ok(rows as TSelect[]);
    } catch (e) {
      return this.fail("LIST_ERROR", errorMessage(e));
    }
  }

  async getById(id: string): Promise<Result<TSelect | null>> {
    try {
      const cols = columns(this.table);
      if (!cols.id) {
        return this.fail("NO_ID_COLUMN", "Table does not have an id column");
      }
      if (cols.organization_id != null) {
        const tenantOrgId = getTenantOrgId();
        if (!tenantOrgId) {
          return this.fail(
            "TENANT_NOT_CONFIGURED",
            "TENANT_ORG_ID is required for this resource. Set it in .env.local.",
          );
        }
        const rows = (await dbx
          .select()
          .from(this.table)
          .where(and(eq(cols.id, id), eq(cols.organization_id, tenantOrgId)))
          .limit(1)) as unknown[];
        return this.ok(((rows[0] as TSelect | undefined) ?? null));
      }
      const rows = (await dbx
        .select()
        .from(this.table)
        .where(eq(cols.id, id))
        .limit(1)) as unknown[];
      return this.ok(((rows[0] as TSelect | undefined) ?? null));
    } catch (e) {
      return this.fail("GET_ERROR", errorMessage(e));
    }
  }

  async create(data: TInsert): Promise<Result<TSelect>> {
    try {
      const parsed = this.insertSchema.parse(data);
      const rows = await dbx
        .insert(this.table)
        .values(parsed)
        .returning();
      return this.ok(rows[0] as TSelect);
    } catch (e) {
      if (isZodError(e)) {
        return this.fail("VALIDATION_ERROR", errorMessage(e));
      }
      return this.fail("CREATE_ERROR", errorMessage(e));
    }
  }

  async update(id: string, data: TUpdate): Promise<Result<TSelect>> {
    try {
      const existing = await this.getById(id);
      if (!existing.success) return existing;
      if (existing.data === null) {
        return this.fail("NOT_FOUND", `Record with id ${id} not found`);
      }
      const parsed = this.updateSchema.parse(data);
      const cols = columns(this.table);
      if (!cols.id) {
        return this.fail("NO_ID_COLUMN", "Table does not have an id column");
      }
      const rows = await dbx
        .update(this.table)
        .set(parsed)
        .where(eq(cols.id, id))
        .returning();
      if (rows.length === 0) {
        return this.fail("NOT_FOUND", `Record with id ${id} not found`);
      }
      return this.ok(rows[0] as TSelect);
    } catch (e) {
      if (isZodError(e)) {
        return this.fail("VALIDATION_ERROR", errorMessage(e));
      }
      return this.fail("UPDATE_ERROR", errorMessage(e));
    }
  }

  async getBySlug(slug: string): Promise<Result<TSelect | null>> {
    try {
      const cols = columns(this.table);
      if (!cols.slug) {
        return this.fail("NO_SLUG_COLUMN", "Table does not have a slug column");
      }
      if (cols.organization_id != null) {
        const tenantOrgId = getTenantOrgId();
        if (!tenantOrgId) {
          return this.fail(
            "TENANT_NOT_CONFIGURED",
            "TENANT_ORG_ID is required for this resource. Set it in .env.local.",
          );
        }
        const rows = (await dbx
          .select()
          .from(this.table)
          .where(and(eq(cols.slug, slug), eq(cols.organization_id, tenantOrgId)))
          .limit(1)) as unknown[];
        return this.ok(((rows[0] as TSelect | undefined) ?? null));
      }
      const rows = (await dbx
        .select()
        .from(this.table)
        .where(eq(cols.slug, slug))
        .limit(1)) as unknown[];
      return this.ok(((rows[0] as TSelect | undefined) ?? null));
    } catch (e) {
      return this.fail("GET_BY_SLUG_ERROR", errorMessage(e));
    }
  }

  async listByColumn(
    column: string,
    value: unknown,
    orderByColumn?: string,
    direction: "asc" | "desc" = "asc",
  ): Promise<Result<TSelect[]>> {
    try {
      const cols = columns(this.table);
      const filterCol = cols[column];
      if (!filterCol) {
        return this.fail("NO_COLUMN", `Table does not have column: ${column}`);
      }
      const orderCol = orderByColumn ? cols[orderByColumn] : undefined;
      const baseQuery = dbx
        .select()
        .from(this.table)
        .where(eq(filterCol, value));
      const rows = (orderCol
        ? await baseQuery.orderBy(
            direction === "desc" ? desc(orderCol) : asc(orderCol),
          )
        : await baseQuery) as unknown[];
      return this.ok(rows as TSelect[]);
    } catch (e) {
      return this.fail("LIST_BY_COLUMN_ERROR", errorMessage(e));
    }
  }

  async delete(id: string): Promise<Result<{ deleted: boolean }>> {
    try {
      const existing = await this.getById(id);
      if (!existing.success) return existing;
      if (existing.data === null) {
        return this.fail("NOT_FOUND", `Record with id ${id} not found`);
      }
      const cols = columns(this.table);
      if (!cols.id) {
        return this.fail("NO_ID_COLUMN", "Table does not have an id column");
      }
      const rows = await dbx
        .delete(this.table)
        .where(eq(cols.id, id))
        .returning();
      if (rows.length === 0) {
        return this.fail("NOT_FOUND", `Record with id ${id} not found`);
      }
      return this.ok({ deleted: true });
    } catch (e) {
      return this.fail("DELETE_ERROR", errorMessage(e));
    }
  }
}
