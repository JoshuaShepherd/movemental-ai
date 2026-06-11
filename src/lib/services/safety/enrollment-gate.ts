import "server-only";

import { and, desc, eq, or } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  organizationInquiries,
  organizationMemberships,
  userProfiles,
} from "@/lib/db/schema";

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Gated signup: only provisioned enrollments or existing membership invites.
 * Returns false for unknown emails — callers must use generic copy (no enumeration).
 */
export async function canEnrolledEmailSignUp(email: string): Promise<boolean> {
  const norm = normalizeEmail(email);
  if (!norm) return false;

  const [inquiry] = await db
    .select({ id: organizationInquiries.id })
    .from(organizationInquiries)
    .where(and(eq(organizationInquiries.email, norm), eq(organizationInquiries.status, "provisioned")))
    .limit(1);
  if (inquiry) return true;

  const [profile] = await db
    .select({ id: userProfiles.id })
    .from(userProfiles)
    .where(eq(userProfiles.email, norm))
    .limit(1);
  if (!profile) return false;

  const [membership] = await db
    .select({ id: organizationMemberships.id })
    .from(organizationMemberships)
    .where(
      and(
        eq(organizationMemberships.user_id, profile.id),
        or(
          eq(organizationMemberships.status, "pending"),
          eq(organizationMemberships.status, "active"),
        ),
      ),
    )
    .limit(1);

  return Boolean(membership);
}

/** Load a provisioned inquiry by id + email (anti token-guessing). */
export async function findProvisionedInquiryForSignup(params: {
  inquiryId?: string | null;
  email: string;
}) {
  const norm = normalizeEmail(params.email);
  if (!norm) return null;

  if (params.inquiryId) {
    const [row] = await db
      .select()
      .from(organizationInquiries)
      .where(
        and(
          eq(organizationInquiries.id, params.inquiryId),
          eq(organizationInquiries.email, norm),
          eq(organizationInquiries.status, "provisioned"),
        ),
      )
      .limit(1);
    return row ?? null;
  }

  const [row] = await db
    .select()
    .from(organizationInquiries)
    .where(and(eq(organizationInquiries.email, norm), eq(organizationInquiries.status, "provisioned")))
    .orderBy(desc(organizationInquiries.created_at))
    .limit(1);
  return row ?? null;
}
