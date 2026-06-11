import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizationMemberships, organizations, userProfiles } from "@/lib/db/schema";
import { findProvisionedInquiryForSignup } from "@/lib/services/safety/enrollment-gate";
import type { Result } from "@/lib/services/simplified/base.service";

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

function nowIso(): string {
  return new Date().toISOString();
}

async function resolveOrgIdForInquiry(inquiryId: string): Promise<string | null> {
  const [row] = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(sql`${organizations.onboarding_state}->'safety_dashboard'->>'inquiry_id' = ${inquiryId}`)
    .limit(1);
  return row?.id ?? null;
}

function splitContactName(contactName: string): { first: string | null; last: string | null } {
  const parts = contactName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: null, last: null };
  if (parts.length === 1) return { first: parts[0], last: null };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export type LinkEnrolledUserResult = {
  profileId: string;
  organizationId: string;
  membershipCreated: boolean;
};

/**
 * After gated signup: align auth user ↔ user_profiles ↔ organization_memberships.
 * Idempotent for the same email + org.
 */
export async function linkEnrolledUser(params: {
  authUserId: string;
  email: string;
  inquiryId?: string | null;
}): Promise<Result<LinkEnrolledUserResult>> {
  const normEmail = params.email.toLowerCase().trim();
  if (!normEmail) {
    return err("validation_error", "Email is required.");
  }

  const inquiry = await findProvisionedInquiryForSignup({
    inquiryId: params.inquiryId,
    email: normEmail,
  });
  if (!inquiry) {
    return err("not_eligible", "No provisioned enrollment found for this email.");
  }

  const organizationId = await resolveOrgIdForInquiry(inquiry.id);
  if (!organizationId) {
    return err("org_not_found", "Provisioned organization not found for this enrollment.");
  }

  const { first, last } = splitContactName(inquiry.contact_name);

  let profileId = params.authUserId;

  const [existingProfile] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.email, normEmail))
    .limit(1);

  if (existingProfile) {
    if (existingProfile.id !== params.authUserId) {
      return err(
        "email_mismatch",
        "This email is tied to a different account. Sign in with the enrolled email.",
      );
    }
    profileId = existingProfile.id;
  } else {
    await db.insert(userProfiles).values({
      id: params.authUserId,
      email: normEmail,
      first_name: first,
      last_name: last,
      display_name: inquiry.contact_name.trim() || null,
    });
  }

  const [existingMembership] = await db
    .select({ id: organizationMemberships.id })
    .from(organizationMemberships)
    .where(
      and(
        eq(organizationMemberships.user_id, profileId),
        eq(organizationMemberships.organization_id, organizationId),
      ),
    )
    .limit(1);

  let membershipCreated = false;
  if (!existingMembership) {
    await db.insert(organizationMemberships).values({
      user_id: profileId,
      organization_id: organizationId,
      role: "owner",
      status: "active",
      joined_at: nowIso(),
    });
    membershipCreated = true;
  } else {
    await db
      .update(organizationMemberships)
      .set({ status: "active", joined_at: nowIso(), updated_at: nowIso() })
      .where(eq(organizationMemberships.id, existingMembership.id));
  }

  await db
    .update(organizations)
    .set({ account_owner_id: profileId, updated_at: nowIso() })
    .where(eq(organizations.id, organizationId));

  return ok({ profileId, organizationId, membershipCreated });
}
