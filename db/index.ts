import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

let _db: ReturnType<typeof drizzle<postgres.Sql>> | null = null;

function getDb() {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const client = postgres(url);
  _db = drizzle(client);
  return _db;
}

/** Lazy-initialized so build can complete without DATABASE_URL (e.g. on Vercel). Throws at first use if DATABASE_URL is missing. */
export const db = new Proxy({} as ReturnType<typeof drizzle<postgres.Sql>>, {
  get(_, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle<postgres.Sql>>];
  },
});
