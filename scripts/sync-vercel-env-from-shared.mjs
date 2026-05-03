/**
 * Push env vars from Desktop/Dev/.env.shared to the linked Vercel project
 * (movemental org site — keys aligned with src/lib/env.ts).
 *
 * - Maps NEXT_PUBLIC_APP_URL (shared) → NEXT_PUBLIC_SITE_URL (this app).
 * - Uses TRANSACTION_POOLER_DATABASE_URL or SESSION_POOLER_DATABASE_URL as
 *   DATABASE_URL when DATABASE_URL is missing in shared.
 * - Does not print secret values.
 *
 * Prereqs: `vercel link` in repo root; `npx vercel` available; logged in.
 *
 * Usage: pnpm vercel:env:sync
 * Optional: DEV_DOTENV_SHARED_PATH=/path/to/.env.shared
 * Optional: VERCEL_TEAM_SCOPE=your-team-slug (only if CLI requires explicit scope)
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function defaultSharedPath() {
  if (process.env.DEV_DOTENV_SHARED_PATH) return process.env.DEV_DOTENV_SHARED_PATH;
  const a = path.join(process.env.HOME, "Desktop", "Dev", ".env.shared");
  const b = path.join(process.env.HOME, "Desktop", "dev", ".env.shared");
  if (fs.existsSync(a)) return a;
  if (fs.existsSync(b)) return b;
  return a;
}

const SHARED_PATH = defaultSharedPath();

const SKIP = new Set([
  "NODE_OPTIONS",
  "PGPORT",
  "PGUSER",
  "PLAYWRIGHT_BASE_URL",
  "PLAYWRIGHT_TEST_EMAIL",
  "PLAYWRIGHT_TEST_PASSWORD",
  "VERCEL_OIDC_TOKEN",
  "STITCH_ACCESS_TOKEN",
]);

const SENSITIVE = (name) =>
  /SECRET|TOKEN|KEY|PASSWORD|DATABASE_URL|POOLER|DSN|ANON|SERVICE_ROLE|STRIPE|RESEND|SUPABASE_ACCESS/i.test(
    name,
  );

/** Vercel env name → value resolver from shared `env` object */
const MOVEMENTAL_RESOLVERS = [
  ["NEXT_PUBLIC_SUPABASE_URL", (e) => e.NEXT_PUBLIC_SUPABASE_URL || e.SUPABASE_URL],
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", (e) => e.NEXT_PUBLIC_SUPABASE_ANON_KEY],
  ["DATABASE_URL", (e) =>
    e.DATABASE_URL ||
    e.TRANSACTION_POOLER_DATABASE_URL ||
    e.SESSION_POOLER_DATABASE_URL ||
    e.DRIZZLE_DATABASE_URL],
  ["SUPABASE_SERVICE_ROLE_KEY", (e) => e.SUPABASE_SERVICE_ROLE_KEY],
  ["TENANT_ORG_ID", (e) => e.TENANT_ORG_ID],
  ["NEXT_PUBLIC_SITE_URL", (e) => e.NEXT_PUBLIC_SITE_URL || e.NEXT_PUBLIC_APP_URL],
  ["RESEND_API_KEY", (e) => e.RESEND_API_KEY],
  ["RESEND_FROM_EMAIL", (e) => e.RESEND_FROM_EMAIL],
  ["NEXT_PUBLIC_SENTRY_DSN", (e) => e.NEXT_PUBLIC_SENTRY_DSN || e.SENTRY_DSN],
  ["SENTRY_AUTH_TOKEN", (e) => e.SENTRY_AUTH_TOKEN],
  ["SENTRY_ORG", (e) => e.SENTRY_ORG],
  ["SENTRY_PROJECT", (e) => e.SENTRY_PROJECT],
  ["STRIPE_SECRET_KEY", (e) => e.STRIPE_SECRET_KEY],
  ["STRIPE_WEBHOOK_SECRET", (e) => e.STRIPE_WEBHOOK_SECRET],
  ["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", (e) => e.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY],
];

/** Override shared values when this Vercel project differs (Sentry project name, etc.). */
const OVERRIDES = {
  SENTRY_PROJECT: "movemental-launch",
};

/**
 * @param {"production" | "preview" | "development"} envName
 */
function vercelEnvAdd(name, envName, previewBranch, value, extraArgs) {
  const args = ["vercel", "env", "add", name, envName];
  if (envName === "preview" && previewBranch) {
    args.push(previewBranch);
  }
  const v = String(value);
  args.push("--value", v);
  if (SENSITIVE(name)) {
    args.push("--sensitive");
  }
  args.push("--yes", "--non-interactive", "--force");
  if (extraArgs?.scope) {
    args.push("--scope", extraArgs.scope);
  }
  if (envName === "preview" && !previewBranch) {
    args.push("");
  }

  const r = spawnSync("npx", ["--yes", ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "0" },
  });
  if (r.status !== 0 && r.status !== null) {
    const err = [r.stderr, r.stdout].filter(Boolean).join("\n").trim();
    throw new Error(
      `vercel env add failed for ${name} ${envName} (exit ${r.status}): ${err}`,
    );
  }
}

function main() {
  if (!fs.existsSync(SHARED_PATH)) {
    console.error("Missing shared env file:", SHARED_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(path.join(ROOT, ".vercel", "project.json"))) {
    console.error("Missing .vercel/project.json — run `vercel link` in the repo root first.");
    process.exit(1);
  }

  const raw = parse(fs.readFileSync(SHARED_PATH));
  const scope = process.env.VERCEL_TEAM_SCOPE;
  const extra = scope ? { scope } : {};

  const resolved = new Map();
  for (const [targetName, resolver] of MOVEMENTAL_RESOLVERS) {
    let value = resolver(raw);
    if (Object.prototype.hasOwnProperty.call(OVERRIDES, targetName)) {
      value = OVERRIDES[targetName];
    }
    if (value === undefined || value === null) continue;
    const v = String(value).trim();
    if (!v) continue;
    resolved.set(targetName, v);
  }

  const names = [...resolved.keys()].sort();
  for (const name of names) {
    if (SKIP.has(name)) continue;
    const v = resolved.get(name);
    process.stdout.write(`Syncing ${name} …\n`);
    vercelEnvAdd(name, "production", undefined, v, extra);
    vercelEnvAdd(name, "preview", undefined, v, extra);
    if (!SENSITIVE(name)) {
      vercelEnvAdd(name, "development", undefined, v, extra);
    }
  }
  process.stdout.write("Done. Verify with: npx vercel env ls\n");
}

main();
