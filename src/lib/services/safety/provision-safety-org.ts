import "server-only";

import { and, desc, eq, sql } from "drizzle-orm";

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

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

type SafetyOnboardingState = {
  safety_dashboard?: {
    provisioned_at: string;
    inquiry_id: string;
    source?: "self_serve" | "enroll";
  };
};

export type ProvisionSource = "self_serve" | "enroll";

export type ProvisionSafetyOrgInput = {
  orgName: string;
  email: string;
  contactName?: string;
  source: ProvisionSource;
  /** When provisioning an existing enroll inquiry. */
  inquiryId?: string;
  teamSize?: string;
  orgType?: string;
};

export type ProvisionSafetyOrgResult = {
  organizationId: string;
  inquiryId: string;
  emailSent: boolean;
  idempotent: boolean;
};

export async function findOrgByInquiryId(inquiryId: string): Promise<string | null> {
  const [row] = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(sql`${organizations.onboarding_state}->'safety_dashboard'->>'inquiry_id' = ${inquiryId}`)
    .limit(1);
  return row?.id ?? null;
}

async function findExistingSelfServeInquiry(
  email: string,
  orgName: string,
): Promise<{ inquiryId: string; organizationId: string } | null> {
  const normEmail = normalizeEmail(email);
  const normOrg = orgName.trim();
  if (!normEmail || !normOrg) return null;

  const [inquiry] = await db
    .select()
    .from(organizationInquiries)
    .where(
      and(
        eq(organizationInquiries.email, normEmail),
        eq(organizationInquiries.org_name, normOrg),
        eq(organizationInquiries.status, "provisioned"),
        eq(organizationInquiries.org_type, "self_serve"),
      ),
    )
    .orderBy(desc(organizationInquiries.created_at))
    .limit(1);

  if (!inquiry) return null;

  const organizationId = await findOrgByInquiryId(inquiry.id);
  if (!organizationId) return null;

  return { inquiryId: inquiry.id, organizationId };
}

function defaultContactName(email: string, contactName?: string): string {
  const trimmed = contactName?.trim();
  if (trimmed) return trimmed;
  const local = email.split("@")[0]?.replace(/[._-]/g, " ").trim();
  return local || "Safety dashboard user";
}

/**
 * Create organization + safety artifacts + provisioned inquiry.
 * Self-serve: creates inquiry inline. Enroll: uses existing inquiry row.
 */
export async function provisionSafetyOrganization(
  input: ProvisionSafetyOrgInput,
): Promise<Result<ProvisionSafetyOrgResult>> {
  const orgName = input.orgName.trim();
  const email = normalizeEmail(input.email);
  if (!orgName || !email) {
    return err("validation_error", "Organization name and email are required.");
  }

  if (input.source === "self_serve") {
    const existing = await findExistingSelfServeInquiry(email, orgName);
    if (existing) {
      return ok({
        organizationId: existing.organizationId,
        inquiryId: existing.inquiryId,
        emailSent: false,
        idempotent: true,
      });
    }
  }

  let inquiryId = input.inquiryId;

  if (input.source === "enroll") {
    if (!inquiryId) {
      return err("validation_error", "inquiryId is required for enroll provisioning.");
    }
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
  }

  const slug = await uniqueOrgSlugFromName(orgName);
  const provisionedAt = nowIso();
  const contactName = defaultContactName(email, input.contactName);

  try {
    const result = await db.transaction(async (tx) => {
      let resolvedInquiryId = inquiryId;

      if (input.source === "self_serve") {
        const [inquiry] = await tx
          .insert(organizationInquiries)
          .values({
            org_name: orgName,
            contact_name: contactName,
            email,
            org_type: "self_serve",
            team_size: "unknown",
            message: "Safety flow self-serve",
            timeline: "now",
            status: "provisioned",
          })
          .returning({ id: organizationInquiries.id });
        resolvedInquiryId = inquiry.id;
      }

      if (!resolvedInquiryId) {
        throw new Error("Missing inquiry id after transaction setup.");
      }

      const [org] = await tx
        .insert(organizations)
        .values({
          name: orgName,
          slug,
          organization_type: "organization",
          size_category: input.teamSize ?? "unknown",
          contact_email: email,
          status: "trial",
          settings: {
            workspaceCourses: ["safety"],
            dashboardPersona: "implementation_org",
          },
          onboarding_state: {
            safety_dashboard: {
              provisioned_at: provisionedAt,
              inquiry_id: resolvedInquiryId,
              source: input.source,
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

      if (input.source === "enroll") {
        await tx
          .update(organizationInquiries)
          .set({ status: "provisioned" })
          .where(
            and(
              eq(organizationInquiries.id, resolvedInquiryId),
              eq(organizationInquiries.status, "new"),
            ),
          );
      }

      return { organizationId: orgId, inquiryId: resolvedInquiryId };
    });

    const emailSent =
      input.source === "enroll"
        ? await sendSafetyDashboardReadyEmail({
            email,
            contactName,
            orgName,
            inquiryId: result.inquiryId,
          })
        : false;

    return ok({
      organizationId: result.organizationId,
      inquiryId: result.inquiryId,
      emailSent,
      idempotent: false,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Provision failed.";
    return err("provision_error", msg);
  }
}
