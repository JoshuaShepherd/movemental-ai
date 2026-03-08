import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return drizzle(postgres(url));
}

type Db = ReturnType<typeof createDb>;
let _db: Db | null = null;

function getDb(): Db {
  if (_db) return _db;
  _db = createDb();
  return _db;
}

/** Lazy-initialized so build can complete without DATABASE_URL (e.g. on Vercel). Throws at first use if DATABASE_URL is missing. */
export const db = new Proxy({} as Db, {
  get(_, prop) {
    return (getDb() as unknown as Record<string, unknown>)[prop as string];
  },
});
