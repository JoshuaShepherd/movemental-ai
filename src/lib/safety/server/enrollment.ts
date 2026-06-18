import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  organizationMemberships,
  organizations,
  safetyArtifacts,
  safetyArtifactVersions,
  safetyEngagements,
  safetyEnrollments,
  safetyGuidebooks,
  safetyLayerChecklistItems,
  safetyRolloutArtifacts,
  userProfiles,
} from "@/lib/db/schema";
import { SAFETY_GUIDEBOOK_DEFAULT_TITLE } from "@/lib/safety/constants";
import {
  GUIDEBOOK_LAYER_TAXONOMY,
  LAYER_CHECKLIST_TEMPLATES,
  ROLLOUT_ARTIFACT_TEMPLATES,
  seedBodyMdForLayer,
} from "@/lib/safety/layer-taxonomy";
import type { CreateEnrollmentInput } from "@/lib/safety/schemas";
import { uniqueOrgSlugFromName } from "@/lib/services/safety/org-slug";
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

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export type ProvisionEngagementResult = {
  organizationId: string;
  guidebookId: string;
  engagementId: string;
  enrollmentId: string;
};

/**
 * Full SafeStart provisioning — runs only after verified Stripe payment.
 */
export async function provisionEngagement(
  enrollmentId: string,
): Promise<Result<ProvisionEngagementResult>> {
  const [enrollment] = await db
    .select()
    .from(safetyEnrollments)
    .where(eq(safetyEnrollments.id, enrollmentId))
    .limit(1);

  if (!enrollment) {
    return err("not_found", "Enrollment not found.");
  }

  if (enrollment.status === "provisioned" && enrollment.organization_id) {
    const [engagement] = await db
      .select()
      .from(safetyEngagements)
      .where(eq(safetyEngagements.organization_id, enrollment.organization_id))
      .limit(1);

    const [guidebook] = await db
      .select()
      .from(safetyGuidebooks)
      .where(eq(safetyGuidebooks.organization_id, enrollment.organization_id))
      .limit(1);

    if (engagement && guidebook) {
      return ok({
        organizationId: enrollment.organization_id,
        guidebookId: guidebook.id,
        engagementId: engagement.id,
        enrollmentId,
      });
    }
  }

  if (enrollment.status !== "paid" && enrollment.status !== "provisioned") {
    return err("invalid_status", `Cannot provision enrollment with status "${enrollment.status}".`);
  }

  const orgName = enrollment.org_name.trim();
  const contactEmail = normalizeEmail(enrollment.contact_email);
  if (!orgName || !contactEmail) {
    return err("validation_error", "Enrollment is missing org name or contact email.");
  }

  const provisionedAt = nowIso();

  try {
    const result = await db.transaction(async (tx) => {
      const slug = await uniqueOrgSlugFromName(orgName);

      const [org] = await tx
        .insert(organizations)
        .values({
          name: orgName,
          slug,
          organization_type: enrollment.org_type ?? "organization",
          size_category: enrollment.size_text ?? "unknown",
          contact_email: contactEmail,
          contact_phone: enrollment.contact_phone,
          website: enrollment.website,
          country: enrollment.country,
          status: "active",
          current_stage: "safety",
          settings: {
            workspaceCourses: ["safety"],
            dashboardPersona: "implementation_org",
          },
          onboarding_state: {
            safestart: {
              enrollment_id: enrollmentId,
              provisioned_at: provisionedAt,
            },
          },
        })
        .returning({ id: organizations.id });

      const orgId = org.id;

      const [guidebook] = await tx
        .insert(safetyGuidebooks)
        .values({
          organization_id: orgId,
          title: SAFETY_GUIDEBOOK_DEFAULT_TITLE,
          status: "drafting",
          current_version: 1,
        })
        .returning({ id: safetyGuidebooks.id });

      const guidebookId = guidebook.id;

      for (const layer of GUIDEBOOK_LAYER_TAXONOMY) {
        const [artifact] = await tx
          .insert(safetyArtifacts)
          .values({
            organization_id: orgId,
            guidebook_id: guidebookId,
            layer_order: layer.layerOrder,
            deck: layer.deck,
            title: layer.title,
            slug: layer.slug,
            kind: layer.kind,
            status: "draft",
            review_status: "drafting",
          })
          .returning({ id: safetyArtifacts.id });

        await tx.insert(safetyArtifactVersions).values({
          artifact_id: artifact.id,
          version_number: 1,
          body_md: seedBodyMdForLayer(layer.draftKey),
        });

        const checklist = LAYER_CHECKLIST_TEMPLATES[layer.kind];
        for (let i = 0; i < checklist.length; i++) {
          await tx.insert(safetyLayerChecklistItems).values({
            artifact_id: artifact.id,
            label: checklist[i]!,
            sort_order: i,
            is_complete: false,
          });
        }
      }

      const [engagement] = await tx
        .insert(safetyEngagements)
        .values({
          organization_id: orgId,
          guidebook_id: guidebookId,
          plan: "safestart",
          status: "provisioning",
          current_step: 1,
          week: 1,
          dashboard_provisioned_at: provisionedAt,
        })
        .returning({ id: safetyEngagements.id });

      await tx
        .update(safetyGuidebooks)
        .set({ engagement_id: engagement.id, updated_at: provisionedAt })
        .where(eq(safetyGuidebooks.id, guidebookId));

      for (const rollout of ROLLOUT_ARTIFACT_TEMPLATES) {
        await tx.insert(safetyRolloutArtifacts).values({
          guidebook_id: guidebookId,
          kind: rollout.kind,
          title: rollout.title,
          status: "locked",
        });
      }

      const pendingInvites: Array<{ email: string; name: string; role: string }> = [];

      const memberships: Array<{ email: string; name: string; role: string }> = [];
      if (enrollment.decider_email) {
        memberships.push({
          email: normalizeEmail(enrollment.decider_email),
          name: enrollment.decider_name ?? "Lead decider",
          role: "lead_decider",
        });
      }

      const contributors = Array.isArray(enrollment.contributors)
        ? (enrollment.contributors as Array<{ email?: string; name?: string; role?: string }>)
        : [];

      for (const c of contributors) {
        if (!c.email) continue;
        memberships.push({
          email: normalizeEmail(c.email),
          name: c.name ?? "Contributor",
          role: c.role ?? "contributor",
        });
      }

      for (const m of memberships) {
        const [profile] = await tx
          .select({ id: userProfiles.id })
          .from(userProfiles)
          .where(eq(userProfiles.email, m.email))
          .limit(1);

        if (profile) {
          const [existing] = await tx
            .select({ id: organizationMemberships.id })
            .from(organizationMemberships)
            .where(
              and(
                eq(organizationMemberships.user_id, profile.id),
                eq(organizationMemberships.organization_id, orgId),
              ),
            )
            .limit(1);

          if (!existing) {
            await tx.insert(organizationMemberships).values({
              user_id: profile.id,
              organization_id: orgId,
              role: m.role,
              status: "pending",
              invited_at: provisionedAt,
            });
          }
        } else {
          pendingInvites.push(m);
        }
      }

      if (pendingInvites.length > 0) {
        await tx
          .update(organizations)
          .set({
            onboarding_state: {
              safestart: {
                enrollment_id: enrollmentId,
                provisioned_at: provisionedAt,
                pending_invites: pendingInvites,
              },
            },
            updated_at: provisionedAt,
          })
          .where(eq(organizations.id, orgId));
      }

      await tx
        .update(safetyEnrollments)
        .set({
          organization_id: orgId,
          status: "provisioned",
          provisioned_at: provisionedAt,
          updated_at: provisionedAt,
        })
        .where(eq(safetyEnrollments.id, enrollmentId));

      return {
        organizationId: orgId,
        guidebookId,
        engagementId: engagement.id,
      };
    });

    return ok({ ...result, enrollmentId });
  } catch (e) {
    return err("provision_error", e instanceof Error ? e.message : "Provision failed.");
  }
}

export async function createEnrollmentRecord(
  input: CreateEnrollmentInput,
): Promise<Result<{ enrollmentId: string }>> {
  try {
    const [row] = await db
      .insert(safetyEnrollments)
      .values({
        contact_name: input.contact_name,
        contact_role: input.contact_role,
        contact_email: normalizeEmail(input.contact_email),
        contact_phone: input.contact_phone,
        decider_name: input.decider_name,
        decider_role: input.decider_role,
        decider_email: input.decider_email ? normalizeEmail(input.decider_email) : null,
        org_name: input.org_name,
        org_type: input.org_type,
        website: input.website || null,
        denomination: input.denomination,
        size_text: input.size_text,
        annual_budget: input.annual_budget,
        country: input.country,
        current_ai_usage: input.current_ai_usage,
        leadership_concerns: input.leadership_concerns,
        ratification_process: input.ratification_process,
        preferred_kickoff_window: input.preferred_kickoff_window,
        contributors: input.contributors,
        artifact_uploads: input.artifact_uploads,
        status: "pending_payment",
      })
      .returning({ id: safetyEnrollments.id });

    return ok({ enrollmentId: row.id });
  } catch (e) {
    return err("create_error", e instanceof Error ? e.message : "Failed to create enrollment.");
  }
}

export async function updateEnrollmentRecord(
  enrollmentId: string,
  patch: Partial<CreateEnrollmentInput>,
): Promise<Result<{ enrollmentId: string }>> {
  try {
    await db
      .update(safetyEnrollments)
      .set({
        ...patch,
        contact_email: patch.contact_email ? normalizeEmail(patch.contact_email) : undefined,
        decider_email: patch.decider_email ? normalizeEmail(patch.decider_email) : undefined,
        updated_at: nowIso(),
      })
      .where(eq(safetyEnrollments.id, enrollmentId));

    return ok({ enrollmentId });
  } catch (e) {
    return err("update_error", e instanceof Error ? e.message : "Failed to update enrollment.");
  }
}

export async function getEnrollmentById(enrollmentId: string) {
  const [row] = await db
    .select()
    .from(safetyEnrollments)
    .where(eq(safetyEnrollments.id, enrollmentId))
    .limit(1);
  return row ?? null;
}
