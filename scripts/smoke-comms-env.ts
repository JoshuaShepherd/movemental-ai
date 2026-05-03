/**
 * Readiness check for communication surfaces (no network calls).
 * Run: pnpm smoke:comms
 *
 * After env looks good, manually smoke from staging:
 * - POST /api/contact with JSON body (see docs/build/markdown/comms-smoke-test.md)
 * - POST /api/newsletter then click confirm link from Resend
 * - POST /api/book/subscribe from /book
 */
import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";

loadEnv({ path: resolve(".env.local") });

const REQUIRED_CORE = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "DATABASE_URL",
] as const;

const COMMS_RECOMMENDED = [
  { key: "RESEND_API_KEY", note: "Transactional email (contact, newsletter, book)" },
  { key: "RESEND_FROM_EMAIL", note: "Verified domain sender in Resend" },
  { key: "NEXT_PUBLIC_SITE_URL", note: "Canonical URLs in emails and redirects" },
  { key: "TENANT_ORG_ID", note: "Required for /api/newsletter (503 without)" },
  { key: "CONTACT_NOTIFY_EMAIL", note: "Optional team inbox for /api/contact" },
  { key: "NEWSLETTER_UNSUBSCRIBE_SECRET", note: "Min 16 chars — one-click unsubscribe links in confirmation mail" },
] as const;

let failed = false;

for (const key of REQUIRED_CORE) {
  if (!process.env[key]) {
    console.error(`❌ Missing ${key}`);
    failed = true;
  }
}

const missingComms: string[] = [];
for (const { key, note } of COMMS_RECOMMENDED) {
  if (!process.env[key]) {
    missingComms.push(`   - ${key} — ${note}`);
  }
}

if (missingComms.length > 0) {
  console.warn("⚠️  Comms go-live: set these in Vercel (prod + preview) before treating forms as live:");
  for (const line of missingComms) console.warn(line);
}

if (failed) {
  console.error("\nFix .env.local or run vercel env pull, then re-run pnpm smoke:comms");
  process.exit(1);
}

console.log("✅ Core env present. Review warnings above for production comms readiness.");
process.exit(0);
