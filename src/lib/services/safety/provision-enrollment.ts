import "server-only";

import type { Result } from "@/lib/services/simplified/base.service";
import {
  provisionSafetyOrganization,
  type ProvisionSafetyOrgResult,
} from "@/lib/services/safety/provision-safety-org";
import { db } from "@/lib/db";
import { organizationInquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

export type ProvisionEnrollmentResult = ProvisionSafetyOrgResult;

/**
 * Trusted ops path: inquiry → organization + safety artifacts + workspaceCourses.safety.
 * Membership is created later on signup via `linkEnrolledUser`.
 */
export async function provisionEnrollment(inquiryId: string): Promise<Result<ProvisionEnrollmentResult>> {
  const [inquiry] = await db
    .select()
    .from(organizationInquiries)
    .where(eq(organizationInquiries.id, inquiryId))
    .limit(1);

  if (!inquiry) {
    return err("not_found", "Enrollment inquiry not found.");
  }

  return provisionSafetyOrganization({
    orgName: inquiry.org_name,
    email: inquiry.email,
    contactName: inquiry.contact_name,
    source: "enroll",
    inquiryId,
    teamSize: inquiry.team_size,
    orgType: inquiry.org_type,
  });
}
