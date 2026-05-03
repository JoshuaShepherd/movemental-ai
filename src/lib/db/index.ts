import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Server-only Drizzle client. Import from Server Components,
 * Server Actions, Route Handlers, and scripts — never from client code.
 */
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Run `vercel env pull .env.local` or set it in .env.local.",
  );
}

// In dev, cache the postgres client across HMR reloads.
const globalForDb = globalThis as unknown as {
  pg?: ReturnType<typeof postgres>;
};

const client =
  globalForDb.pg ??
  postgres(connectionString, {
    prepare: false,
    max: 1,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pg = client;
}

export const db = drizzle(client, { schema });
export type Db = typeof db;
