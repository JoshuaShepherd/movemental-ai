/**
 * Merge movemental-relevant keys from Desktop/Dev/.env.shared into .env.local.
 * Preserves existing lines in .env.local whose keys are not in the merge set.
 *
 * Usage: pnpm env:local-from-shared
 * Optional: DEV_DOTENV_SHARED_PATH
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, ".env.local");

function defaultSharedPath() {
  if (process.env.DEV_DOTENV_SHARED_PATH) return process.env.DEV_DOTENV_SHARED_PATH;
  const a = path.join(process.env.HOME, "Desktop", "Dev", ".env.shared");
  const b = path.join(process.env.HOME, "Desktop", "dev", ".env.shared");
  if (fs.existsSync(a)) return a;
  if (fs.existsSync(b)) return b;
  return a;
}

const SHARED_PATH = defaultSharedPath();

function resolveFromShared(raw) {
  const out = {};
  const set = (k, v) => {
    if (v === undefined || v === null) return;
    const s = String(v).trim();
    if (!s) return;
    out[k] = s;
  };

  set("NEXT_PUBLIC_SUPABASE_URL", raw.NEXT_PUBLIC_SUPABASE_URL || raw.SUPABASE_URL);
  set("NEXT_PUBLIC_SUPABASE_ANON_KEY", raw.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  set(
    "DATABASE_URL",
    raw.DATABASE_URL ||
      raw.TRANSACTION_POOLER_DATABASE_URL ||
      raw.SESSION_POOLER_DATABASE_URL ||
      raw.DRIZZLE_DATABASE_URL,
  );
  set("SUPABASE_SERVICE_ROLE_KEY", raw.SUPABASE_SERVICE_ROLE_KEY);
  set("TENANT_ORG_ID", raw.TENANT_ORG_ID);
  set("NEXT_PUBLIC_SITE_URL", raw.NEXT_PUBLIC_SITE_URL || raw.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
  set("RESEND_API_KEY", raw.RESEND_API_KEY);
  set("RESEND_FROM_EMAIL", raw.RESEND_FROM_EMAIL);
  set("NEXT_PUBLIC_SENTRY_DSN", raw.NEXT_PUBLIC_SENTRY_DSN || raw.SENTRY_DSN);
  set("SENTRY_AUTH_TOKEN", raw.SENTRY_AUTH_TOKEN);
  set("SENTRY_ORG", raw.SENTRY_ORG);
  set("SENTRY_PROJECT", raw.SENTRY_PROJECT);
  set("STRIPE_SECRET_KEY", raw.STRIPE_SECRET_KEY);
  set("STRIPE_WEBHOOK_SECRET", raw.STRIPE_WEBHOOK_SECRET);
  set("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", raw.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return out;
}

function main() {
  if (!fs.existsSync(SHARED_PATH)) {
    console.error("Missing:", SHARED_PATH);
    process.exit(1);
  }
  const shared = parse(fs.readFileSync(SHARED_PATH));
  const merged = resolveFromShared(shared);

  const existing = fs.existsSync(OUT) ? parse(fs.readFileSync(OUT)) : {};
  const final = { ...existing };
  for (const [k, v] of Object.entries(merged)) {
    final[k] = v;
  }

  const header = `# Merged from ${SHARED_PATH} — run pnpm env:local-from-shared to refresh.\n# Do not commit this file.\n\n`;
  const body = Object.keys(final)
    .sort()
    .map((k) => `${k}=${final[k]}`)
    .join("\n");
  fs.writeFileSync(OUT, header + body + "\n", "utf8");
  console.log("Wrote", OUT, `(${Object.keys(final).length} keys)`);
}

main();
