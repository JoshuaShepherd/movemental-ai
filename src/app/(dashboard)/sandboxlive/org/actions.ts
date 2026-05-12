"use server";

import { createClient } from "@supabase/supabase-js";
import { and, eq, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { env } from "@/lib/env";
import { db } from "@/lib/db";
import { organizationMemberships, organizations, userProfiles } from "@/lib/db/schema";
import { ORG_MEMBERSHIP_ROLES, type OrgMembershipRole } from "@/lib/organizations/org-membership-role";
import { resolveSandboxLiveOrgAdminGate } from "@/lib/sandboxlive/org-admin.server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient as createServerSupabase } from "@/lib/supabase/server";

function getServiceRoleSupabase() {
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  if (!key || !url) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

function mergeSettings(existing: unknown, patch: Record<string, unknown>): Record<string, unknown> {
  const base =
    existing && typeof existing === "object" && existing !== null
      ? { ...(existing as Record<string, unknown>) }
      : {};
  return { ...base, ...patch };
}

async function requireSessionUserId(): Promise<string | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

function parseUuidOrNull(raw: string | null | undefined): string | null {
  const t = raw?.trim() ?? "";
  if (!t) return null;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t)
    ? t
    : null;
}

export type SandboxLiveOrgActionResult = { ok: true } | { ok: false; message: string };

function revalidateOrgPaths(orgSlug: string | null) {
  const q = orgSlug ? `?org=${encodeURIComponent(orgSlug)}` : "";
  revalidatePath(`/sandboxlive/org${q}`);
  revalidatePath(`/sandboxlive/org/members${q}`);
  revalidatePath(`/sandboxlive/org/settings${q}`);
  revalidatePath(`/sandboxlive/org/agreements${q}`);
  revalidatePath(`/sandboxlive/org/billing${q}`);
}

export async function submitSandboxLiveOrgProfileForm(formData: FormData): Promise<void> {
  const userId = await requireSessionUserId();
  if (!userId) return;
  const orgSlug = (formData.get("orgSlug") as string | null)?.trim() || null;
  if ((await resolveSandboxLiveOrgAdminGate(userId, orgSlug)) !== "admin") {
    return;
  }
  const resolved = await resolveActiveOrganizationId(userId, orgSlug ?? undefined);
  if (!resolved.success) return;

  const engagementRaw = (formData.get("engagementType") as string | null)?.trim() ?? "sandboxlive";
  const engagement =
    engagementRaw === "safestart"
      ? { engagement_type: "safestart" as const }
      : { engagement_type: "sandboxlive" as const };

  const [org] = await db
    .select({ settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.id, resolved.data.organizationId))
    .limit(1);

  const cohortId = parseUuidOrNull(formData.get("cohortId") as string | null);
  const cohortStart = (formData.get("cohortStartDate") as string | null)?.trim() || null;

  await db
    .update(organizations)
    .set({
      name: ((formData.get("name") as string | null) ?? "").trim() || "Organization",
      description: ((formData.get("description") as string | null) ?? "").trim() || null,
      contact_email: ((formData.get("contactEmail") as string | null) ?? "").trim() || null,
      logo_url: ((formData.get("logoUrl") as string | null) ?? "").trim() || null,
      cohort_start_date: cohortStart && cohortStart.length > 0 ? cohortStart : null,
      cohort_id: cohortId,
      settings: mergeSettings(org?.settings, engagement) as unknown as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    })
    .where(eq(organizations.id, resolved.data.organizationId));

  revalidateOrgPaths(orgSlug);
}

export async function submitSandboxLiveOrgSettingsForm(formData: FormData): Promise<void> {
  const userId = await requireSessionUserId();
  if (!userId) return;
  const orgSlug = (formData.get("orgSlug") as string | null)?.trim() || null;
  if ((await resolveSandboxLiveOrgAdminGate(userId, orgSlug)) !== "admin") {
    return;
  }
  const resolved = await resolveActiveOrganizationId(userId, orgSlug ?? undefined);
  if (!resolved.success) return;

  const [org] = await db
    .select({ settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.id, resolved.data.organizationId))
    .limit(1);

  const personaRaw = (formData.get("persona") as string | null)?.trim();
  const persona =
    personaRaw === "implementation_org" ? ("implementation_org" as const) : ("movement_leader" as const);

  const next = mergeSettings(org?.settings, {
    dashboardPersona: persona,
  });
  const prevShell =
    next.org_shell_prefs && typeof next.org_shell_prefs === "object" && next.org_shell_prefs !== null
      ? { ...(next.org_shell_prefs as Record<string, unknown>) }
      : {};
  next.org_shell_prefs = {
    ...prevShell,
    email_frequency: (formData.get("emailFrequency") as string | null)?.trim() || "digest",
    notify_product: formData.get("notifyProduct") === "on",
    notify_ops: formData.get("notifyOps") === "on",
    display_name_in_cohort: ((formData.get("displayNameInCohort") as string | null) ?? "").trim(),
    timezone: ((formData.get("timezone") as string | null) ?? "").trim(),
  };

  await db
    .update(organizations)
    .set({
      settings: next as unknown as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    })
    .where(eq(organizations.id, resolved.data.organizationId));

  revalidateOrgPaths(orgSlug);
}

export async function submitSandboxLiveOrgInviteForm(formData: FormData): Promise<void> {
  const userId = await requireSessionUserId();
  if (!userId) return;
  const orgSlug = (formData.get("orgSlug") as string | null)?.trim() || null;
  if ((await resolveSandboxLiveOrgAdminGate(userId, orgSlug)) !== "admin") {
    return;
  }
  const resolved = await resolveActiveOrganizationId(userId, orgSlug ?? undefined);
  if (!resolved.success) return;

  const email = ((formData.get("email") as string | null) ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return;
  }

  const [existing] = await db
    .select({ id: userProfiles.id })
    .from(userProfiles)
    .where(eq(sql`lower(trim(${userProfiles.email}))`, email))
    .limit(1);

  if (existing) {
    const [dup] = await db
      .select({ id: organizationMemberships.id })
      .from(organizationMemberships)
      .where(
        and(
          eq(organizationMemberships.organization_id, resolved.data.organizationId),
          eq(organizationMemberships.user_id, existing.id),
          or(
            eq(organizationMemberships.status, "active"),
            eq(organizationMemberships.status, "pending"),
          ),
        ),
      )
      .limit(1);
    if (dup) return;

    await db.insert(organizationMemberships).values({
      user_id: existing.id,
      organization_id: resolved.data.organizationId,
      role: "member",
      status: "active",
      joined_at: new Date().toISOString(),
    });
    revalidateOrgPaths(orgSlug);
    return;
  }

  const admin = getServiceRoleSupabase();
  if (admin) {
    const site = env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
    const { error } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: site ? `${site}/dashboard` : undefined,
    });
    if (error) return;
    revalidateOrgPaths(orgSlug);
  }
}

export async function updateSandboxLiveOrgMemberRoleAction(input: {
  orgSlug: string | null;
  membershipId: string;
  role: OrgMembershipRole;
}): Promise<SandboxLiveOrgActionResult> {
  const actorUserId = await requireSessionUserId();
  if (!actorUserId) return { ok: false, message: "Sign in required." };
  if (!ORG_MEMBERSHIP_ROLES.includes(input.role)) {
    return { ok: false, message: "Invalid role." };
  }
  if ((await resolveSandboxLiveOrgAdminGate(actorUserId, input.orgSlug)) !== "admin") {
    return { ok: false, message: "Only organization administrators can change roles." };
  }
  const resolved = await resolveActiveOrganizationId(actorUserId, input.orgSlug ?? undefined);
  if (!resolved.success) return { ok: false, message: "Organization not found." };

  const [row] = await db
    .select({ id: organizationMemberships.id, user_id: organizationMemberships.user_id })
    .from(organizationMemberships)
    .where(
      and(
        eq(organizationMemberships.id, input.membershipId),
        eq(organizationMemberships.organization_id, resolved.data.organizationId),
      ),
    )
    .limit(1);
  if (!row) return { ok: false, message: "Membership not found." };
  if (row.user_id === actorUserId && input.role !== "admin") {
    return { ok: false, message: "You cannot remove your own administrator access here." };
  }

  await db
    .update(organizationMemberships)
    .set({ role: input.role, updated_at: new Date().toISOString() })
    .where(eq(organizationMemberships.id, input.membershipId));

  revalidateOrgPaths(input.orgSlug);
  return { ok: true };
}

export async function removeSandboxLiveOrgMemberAction(input: {
  orgSlug: string | null;
  membershipId: string;
}): Promise<SandboxLiveOrgActionResult> {
  const actorUserId = await requireSessionUserId();
  if (!actorUserId) return { ok: false, message: "Sign in required." };
  if ((await resolveSandboxLiveOrgAdminGate(actorUserId, input.orgSlug)) !== "admin") {
    return { ok: false, message: "Only organization administrators can remove members." };
  }
  const resolved = await resolveActiveOrganizationId(actorUserId, input.orgSlug ?? undefined);
  if (!resolved.success) return { ok: false, message: "Organization not found." };

  const [row] = await db
    .select({ id: organizationMemberships.id, user_id: organizationMemberships.user_id })
    .from(organizationMemberships)
    .where(
      and(
        eq(organizationMemberships.id, input.membershipId),
        eq(organizationMemberships.organization_id, resolved.data.organizationId),
      ),
    )
    .limit(1);
  if (!row) return { ok: false, message: "Membership not found." };
  if (row.user_id === actorUserId) {
    return { ok: false, message: "You cannot remove yourself from the organization here." };
  }

  await db
    .update(organizationMemberships)
    .set({ status: "inactive", updated_at: new Date().toISOString() })
    .where(eq(organizationMemberships.id, input.membershipId));

  revalidateOrgPaths(input.orgSlug);
  return { ok: true };
}
