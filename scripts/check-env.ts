/**
 * Validates that required environment variables are present in .env.local.
 * Run via `pnpm check:env`.
 *
 * Complements `vercel env pull .env.local` — pull first, then check.
 */
import { config as loadEnv } from "dotenv";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

loadEnv({ path: ".env.local" });

const REQUIRED: readonly string[] = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "DATABASE_URL",
];

const OPTIONAL: readonly string[] = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_SITE_URL",
  "TENANT_ORG_ID",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "RESEND_FROM_NAME",
  "CONTACT_NOTIFY_EMAIL",
  "NEWSLETTER_UNSUBSCRIBE_SECRET",
  "BOOK_MODERATION_TOKEN",
  "NEXT_PUBLIC_SENTRY_DSN",
  "SENTRY_AUTH_TOKEN",
  "SENTRY_ORG",
  "SENTRY_PROJECT",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SOCIAL_LINKEDIN_URL",
  "NEXT_PUBLIC_SOCIAL_X_URL",
  "NEXT_PUBLIC_SOCIAL_BLUESKY_URL",
];

const examplePath = resolve(".env.local.example");
const missing: string[] = [];
const extras: string[] = [];

for (const key of REQUIRED) {
  if (!process.env[key]) missing.push(key);
}

// Warn if .env.local.example references keys we don't track here.
if (existsSync(examplePath)) {
  const exampleContent = readFileSync(examplePath, "utf8");
  const exampleKeys = exampleContent
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=")[0]);

  for (const key of exampleKeys) {
    if (!REQUIRED.includes(key) && !OPTIONAL.includes(key)) {
      extras.push(key);
    }
  }
}

if (missing.length > 0) {
  console.error("❌ Missing required env vars in .env.local:");
  for (const key of missing) console.error(`   - ${key}`);
  console.error("\nRun `vercel env pull .env.local` or copy from .env.local.example.");
  process.exit(1);
}

if (extras.length > 0) {
  console.warn("⚠️  .env.local.example has keys not tracked in scripts/check-env.ts:");
  for (const key of extras) console.warn(`   - ${key}`);
}

/** Warn when Vercel production deployment may ship without comms wiring. */
function warnProductionComms(): void {
  if (process.env.VERCEL_ENV !== "production") return;
  const gaps: string[] = [];
  if (!process.env.RESEND_API_KEY) gaps.push("RESEND_API_KEY");
  if (!process.env.TENANT_ORG_ID) gaps.push("TENANT_ORG_ID");
  if (!process.env.NEXT_PUBLIC_SITE_URL) gaps.push("NEXT_PUBLIC_SITE_URL");
  if (!process.env.CONTACT_NOTIFY_EMAIL) gaps.push("CONTACT_NOTIFY_EMAIL (optional but recommended)");
  if (!process.env.NEWSLETTER_UNSUBSCRIBE_SECRET) {
    gaps.push("NEWSLETTER_UNSUBSCRIBE_SECRET (optional — one-click unsubscribe in confirmation email)");
  }
  if (gaps.length === 0) return;
  console.warn("⚠️  VERCEL_ENV=production: review comms env before go-live:");
  for (const g of gaps) console.warn(`   - ${g}`);
  console.warn("   See docs/build/markdown/contact-newsletter-operations-playbook.md");
}

warnProductionComms();

console.log("✅ Environment variables look good.");
