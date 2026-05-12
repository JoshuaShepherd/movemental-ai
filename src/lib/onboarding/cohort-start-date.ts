import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";

/**
 * Persist cohort kickoff date (`organizations.cohort_start_date` as YYYY-MM-DD).
 */
export async function setOrganizationCohortStartDateFromIso(
  organizationId: string,
  startTimeIso: string,
): Promise<{ ymd: string }> {
  const d = new Date(startTimeIso);
  if (Number.isNaN(d.getTime())) {
    throw new Error("Invalid start time.");
  }
  const ymd = d.toISOString().slice(0, 10);
  await db
    .update(organizations)
    .set({ cohort_start_date: ymd, updated_at: new Date().toISOString() })
    .where(eq(organizations.id, organizationId));
  return { ymd };
}
