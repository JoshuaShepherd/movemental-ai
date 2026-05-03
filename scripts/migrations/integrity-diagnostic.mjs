import { config as loadEnv } from "dotenv";
import postgres from "postgres";

loadEnv({ path: "/Users/joshuashepherd/Desktop/movemental/.env.local" });

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const sql = postgres(url, { ssl: "require", max: 1 });

const ddl = `
CREATE TABLE IF NOT EXISTS public.integrity_diagnostic_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  organization_id uuid NOT NULL REFERENCES public.organizations(id),
  email text NOT NULL,
  name text NOT NULL,
  organization_name text,
  role text,
  answers jsonb NOT NULL,
  follow_ups jsonb,
  closing_note text,
  diagnostic_version text NOT NULL DEFAULT 'id-v1',
  status text DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_integrity_diagnostic_submissions_org_created
  ON public.integrity_diagnostic_submissions (organization_id, created_at DESC);
`;

try {
  await sql.unsafe(ddl);
  const r = await sql`SELECT COUNT(*) AS c FROM public.integrity_diagnostic_submissions`;
  console.log("OK — table ready. existing rows:", r[0].c);
} catch (e) {
  console.error("Migration failed:", e.message);
  process.exit(1);
} finally {
  await sql.end({ timeout: 5 });
}
