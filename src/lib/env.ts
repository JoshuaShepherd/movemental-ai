import { z } from "zod";

/** Dotenv often yields ""; treat as unset before `.url()` validation. */
function optionalEnvUrl() {
  return z.preprocess(
    (val) => {
      if (val === undefined || val === null) return undefined;
      const s = String(val).trim();
      return s === "" ? undefined : s;
    },
    z.string().url().optional(),
  );
}

/**
 * Runtime-validated environment variables.
 * Import from this module rather than reading process.env directly.
 *
 * See docs/design/DESIGN.md + Vercel env guidance:
 *   - server-only secrets have no NEXT_PUBLIC_ prefix
 *   - NEXT_PUBLIC_* values are exposed to the browser bundle
 *   - `vercel env pull .env.local` provisions local values
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: optionalEnvUrl(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  /** Multi-tenant org scoping — required for data isolation */
  TENANT_ORG_ID: z.string().uuid().optional(),
  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  // Resend (transactional email)
  RESEND_API_KEY: z.string().min(1).optional(),
  /** Verified sender, e.g. updates@yourdomain.com — defaults to onboarding@resend.dev in dev */
  RESEND_FROM_EMAIL: z.string().email().optional(),
  /** Display name in the From header, e.g. "Movemental" */
  RESEND_FROM_NAME: z.string().min(1).optional(),
  /** Internal inbox for `/api/contact` team notifications (optional) */
  CONTACT_NOTIFY_EMAIL: z.string().email().optional(),
  /** Signs one-click newsletter unsubscribe links; use at least 16 random bytes in production. */
  NEWSLETTER_UNSUBSCRIBE_SECRET: z.string().optional(),
  /** Protects `/api/cron/*` routes (e.g. Vercel Cron Authorization header). */
  CRON_SECRET: z.string().min(8).optional(),
  /** Stripe amount for leader onboarding PaymentIntent (USD cents). Example: 50000 = $500. */
  ONBOARDING_PAYMENT_AMOUNT_CENTS: z.coerce.number().int().positive().optional(),
  /** Shared secret for /book/moderate tooling (set in production) */
  BOOK_MODERATION_TOKEN: z.string().min(8).optional(),
  /** DocuSign Connect HMAC key — validates `X-DocuSign-Signature-1` on POST /api/webhooks/docusign */
  DOCUSIGN_CONNECT_HMAC_KEY: z.string().min(1).optional(),
  /** Calendly webhook signing key — validates `Calendly-Webhook-Signature` on POST /api/webhooks/calendly */
  CALENDLY_WEBHOOK_SIGNING_KEY: z.string().min(1).optional(),
  // Sentry (optional — monitoring is disabled when DSN is unset)
  SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
  SENTRY_ORG: z.string().min(1).optional(),
  SENTRY_PROJECT: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: optionalEnvUrl(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: optionalEnvUrl(),
  /** Optional footer / JSON-LD profile URLs — set in Vercel when accounts exist */
  NEXT_PUBLIC_SOCIAL_LINKEDIN_URL: optionalEnvUrl(),
  NEXT_PUBLIC_SOCIAL_X_URL: optionalEnvUrl(),
  NEXT_PUBLIC_SOCIAL_BLUESKY_URL: optionalEnvUrl(),
  // Stripe publishable key
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  // Sentry DSN (optional — monitoring is disabled when unset)
  NEXT_PUBLIC_SENTRY_DSN: optionalEnvUrl(),
  /** DocuSign: engagement / MSA envelope (browser redirect) */
  NEXT_PUBLIC_DOCUSIGN_ENGAGEMENT_URL: optionalEnvUrl(),
  /** DocuSign: optional separate MOU envelope URL */
  NEXT_PUBLIC_DOCUSIGN_MOU_URL: optionalEnvUrl(),
  /** Calendly: default training / cohort kickoff scheduling page (embed) */
  NEXT_PUBLIC_CALENDLY_TRAINING_URL: optionalEnvUrl(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  TENANT_ORG_ID: process.env.TENANT_ORG_ID,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,
  CONTACT_NOTIFY_EMAIL: process.env.CONTACT_NOTIFY_EMAIL,
  NEWSLETTER_UNSUBSCRIBE_SECRET: process.env.NEWSLETTER_UNSUBSCRIBE_SECRET,
  CRON_SECRET: process.env.CRON_SECRET,
  ONBOARDING_PAYMENT_AMOUNT_CENTS: process.env.ONBOARDING_PAYMENT_AMOUNT_CENTS,
  BOOK_MODERATION_TOKEN: process.env.BOOK_MODERATION_TOKEN,
  DOCUSIGN_CONNECT_HMAC_KEY: process.env.DOCUSIGN_CONNECT_HMAC_KEY,
  CALENDLY_WEBHOOK_SIGNING_KEY: process.env.CALENDLY_WEBHOOK_SIGNING_KEY,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SOCIAL_LINKEDIN_URL: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL,
  NEXT_PUBLIC_SOCIAL_X_URL: process.env.NEXT_PUBLIC_SOCIAL_X_URL,
  NEXT_PUBLIC_SOCIAL_BLUESKY_URL: process.env.NEXT_PUBLIC_SOCIAL_BLUESKY_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_DOCUSIGN_ENGAGEMENT_URL: process.env.NEXT_PUBLIC_DOCUSIGN_ENGAGEMENT_URL,
  NEXT_PUBLIC_DOCUSIGN_MOU_URL: process.env.NEXT_PUBLIC_DOCUSIGN_MOU_URL,
  NEXT_PUBLIC_CALENDLY_TRAINING_URL: process.env.NEXT_PUBLIC_CALENDLY_TRAINING_URL,
} as const;

const serverParsed = serverSchema.safeParse(processEnv);
const clientParsed = clientSchema.safeParse(processEnv);

if (!serverParsed.success) {
  console.error(
    "❌ Invalid server env:",
    serverParsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid server environment variables");
}

if (!clientParsed.success) {
  console.error(
    "❌ Invalid client env:",
    clientParsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid client environment variables");
}

export const env = {
  ...serverParsed.data,
  ...clientParsed.data,
};

export type Env = typeof env;
