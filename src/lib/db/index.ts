import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Db = PostgresJsDatabase<typeof schema>;

/**
 * Server-only Drizzle client. Import from Server Components,
 * Server Actions, Route Handlers, and scripts — never from client code.
 *
 * Connection is lazy: importing this module must not throw during `next build`
 * when `DATABASE_URL` is absent (e.g. Vercel env not yet linked). The client is
 * created on first property access on `db`.
 */
const globalForDb = globalThis as unknown as {
  pg?: ReturnType<typeof postgres>;
};

let _db: Db | undefined;

function resolveDb(): Db {
  if (_db) return _db;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Run `vercel env pull .env.local` or set it in .env.local.",
    );
  }
  const client =
    globalForDb.pg ??
    postgres(connectionString, {
      prepare: false,
      max: 1,
    });
  if (process.env.NODE_ENV !== "production") {
    globalForDb.pg = client;
  }
  _db = drizzle(client, { schema });
  return _db;
}

export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const real = resolveDb();
    const value = Reflect.get(real as object, prop, receiver) as unknown;
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(real);
    }
    return value;
  },
});
