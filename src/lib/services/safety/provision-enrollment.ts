import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { sendSafetyDashboardReadyEmail } from "@/lib/email/send-safety-dashboard-ready-email";
import { db } from "@/lib/db";
import {
  organizationInquiries,
  organizations,
  safetyArtifacts,
  safetyArtifactVersions,
} from "@/lib/db/schema";
import type { Result } from "@/lib/services/simplified/base.service";
import { SAFETY_ARTIFACT_SEEDS, seedBodyMd } from "@/lib/services/safety/artifact-seeds";
import { uniqueOrgSlugFromName } from "@/lib/services/safety/org-slug";

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

function nowIso(): string {
  return new Date().toISOString();
}

type SafetyOnboardingState = {
  safety_dashboard?: {
    provisioned_at: string;
    inquiry_id: string;
  };
};

async function findOrgByInquiryId(inquiryId: string): Promise<string | null> {
  const [row] = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(sql`${organizations.onboarding_state}->'safety_dashboard'->>'inquiry_id' = ${inquiryId}`)
    .limit(1);
  return row?.id ?? null;
}

export type ProvisionEnrollmentResult = {
  organizationId: string;
  inquiryId: string;
  emailSent: boolean;
  idempotent: boolean;
};

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

  if (inquiry.status === "provisioned") {
    const existingOrgId = await findOrgByInquiryId(inquiryId);
    if (!existingOrgId) {
      return err("orphan_inquiry", "Inquiry is provisioned but no organization was found.");
    }
    return ok({
      organizationId: existingOrgId,
      inquiryId,
      emailSent: false,
      idempotent: true,
    });
  }

  if (inquiry.status !== "new") {
    return err("invalid_status", `Cannot provision inquiry with status "${inquiry.status}".`);
  }

  const slug = await uniqueOrgSlugFromName(inquiry.org_name);
  const provisionedAt = nowIso();

  try {
    const organizationId = await db.transaction(async (tx) => {
      const [org] = await tx
        .insert(organizations)
        .values({
          name: inquiry.org_name,
          slug,
          organization_type: "organization",
          size_category: inquiry.team_size,
          contact_email: inquiry.email,
          status: "trial",
          settings: {
            workspaceCourses: ["safety"],
            dashboardPersona: "implementation_org",
          },
          onboarding_state: {
            safety_dashboard: {
              provisioned_at: provisionedAt,
              inquiry_id: inquiryId,
            },
          } satisfies SafetyOnboardingState,
        })
        .returning({ id: organizations.id });

      const orgId = org.id;

      for (const seed of SAFETY_ARTIFACT_SEEDS) {
        const [artifact] = await tx
          .insert(safetyArtifacts)
          .values({
            organization_id: orgId,
            title: seed.title,
            slug: seed.slug,
            kind: seed.kind,
            status: "draft",
          })
          .returning({ id: safetyArtifacts.id });

        await tx.insert(safetyArtifactVersions).values({
          artifact_id: artifact.id,
          version_number: 1,
          body_md: seedBodyMd(seed.draftKey),
        });
      }

      await tx
        .update(organizationInquiries)
        .set({ status: "provisioned" })
        .where(and(eq(organizationInquiries.id, inquiryId), eq(organizationInquiries.status, "new")));

      return orgId;
    });

    const emailSent = await sendSafetyDashboardReadyEmail({
      email: inquiry.email,
      contactName: inquiry.contact_name,
      orgName: inquiry.org_name,
      inquiryId,
    });

    return ok({
      organizationId,
      inquiryId,
      emailSent,
      idempotent: false,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Provision failed.";
    return err("provision_error", msg);
  }
}
