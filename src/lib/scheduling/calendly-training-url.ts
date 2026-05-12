import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { env } from "@/lib/env";

type OrgSettings = {
  calendly_training_url?: string;
};

function readOrgCalendlyOverride(settings: unknown): string | undefined {
  if (!settings || typeof settings !== "object") return undefined;
  const url = (settings as OrgSettings).calendly_training_url;
  if (typeof url !== "string") return undefined;
  const t = url.trim();
  return t === "" ? undefined : t;
}

/**
 * Resolve Calendly scheduling URL: per-org `organizations.settings.calendly_training_url`
 * then `NEXT_PUBLIC_CALENDLY_TRAINING_URL`.
 */
export async function getCalendlyTrainingUrlForOrganization(
  organizationId: string,
): Promise<string | null> {
  const [row] = await db
    .select({ settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  const fromSettings = readOrgCalendlyOverride(row?.settings);
  if (fromSettings) return fromSettings;

  return env.NEXT_PUBLIC_CALENDLY_TRAINING_URL ?? null;
}

/**
 * Append UTM so Calendly webhooks can map bookings back to an org slug (`utm_content`).
 */
export function withCalendlyOrgTracking(calendlyUrl: string, organizationSlug: string): string {
  try {
    const u = new URL(calendlyUrl);
    u.searchParams.set("utm_content", organizationSlug);
    u.searchParams.set("utm_source", "movemental");
    u.searchParams.set("utm_medium", "sandboxlive");
    return u.toString();
  } catch {
    return calendlyUrl;
  }
}
