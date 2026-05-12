import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizations, userProfiles } from "@/lib/db/schema";
import { completeOnboardingTask } from "@/lib/services/onboarding/onboarding.service";

export type AccountOwnerProfile = {
  userId: string;
  email: string;
  firstName: string | null;
};

export async function loadAccountOwnerProfileForOrganization(
  organizationId: string,
): Promise<AccountOwnerProfile | null> {
  const [row] = await db
    .select({
      ownerId: organizations.account_owner_id,
    })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  const ownerId = row?.ownerId;
  if (!ownerId) return null;

  const [profile] = await db
    .select({
      id: userProfiles.id,
      email: userProfiles.email,
      first_name: userProfiles.first_name,
    })
    .from(userProfiles)
    .where(eq(userProfiles.id, ownerId))
    .limit(1);

  if (!profile) return null;
  return {
    userId: profile.id,
    email: profile.email,
    firstName: profile.first_name,
  };
}

/** After engagement MSA is recorded, advance onboarding when the task is still completable. */
export async function tryCompleteSignAgreementFromWebhook(organizationId: string): Promise<void> {
  const owner = await loadAccountOwnerProfileForOrganization(organizationId);
  if (!owner) return;
  const result = await completeOnboardingTask({
    organizationId,
    userId: owner.userId,
    userEmail: owner.email,
    firstName: owner.firstName,
    taskKey: "sign_agreement",
    metadata: { source: "docusign_connect_webhook" },
  });
  if (!result.success) {
    console.warn("[webhook] sign_agreement completion skipped:", result.error);
  }
}

/** After cohort date is set from Calendly, complete choose_cohort when still available. */
export async function tryCompleteChooseCohortFromWebhook(organizationId: string): Promise<void> {
  const owner = await loadAccountOwnerProfileForOrganization(organizationId);
  if (!owner) return;
  const result = await completeOnboardingTask({
    organizationId,
    userId: owner.userId,
    userEmail: owner.email,
    firstName: owner.firstName,
    taskKey: "choose_cohort",
    metadata: { source: "calendly_webhook" },
  });
  if (!result.success) {
    console.warn("[webhook] choose_cohort completion skipped:", result.error);
  }
}
