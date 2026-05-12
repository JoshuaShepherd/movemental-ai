import "server-only";

import { redirect } from "next/navigation";
import { and, desc, eq, inArray, or, sql } from "drizzle-orm";

import { resolveDashboardPersona, type DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import { db } from "@/lib/db";
import {
  movementLeaderSignings,
  movementLeaders,
  organizationMemberships,
  organizations,
  signedAgreements,
  userProfiles,
} from "@/lib/db/schema";
import { MOVEMENT_VOICE_COMMITMENTS_SLUG } from "@/lib/movement-leaders/commitments-doc";
import {
  isSandboxLiveOrgAdminRole,
  normalizeOrgMembershipRole,
  type OrgMembershipRole,
} from "@/lib/organizations/org-membership-role";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export type SandboxLiveOrgAdminGate = "admin" | "forbidden";

export async function resolveSandboxLiveOrgAdminGate(
  userId: string,
  orgSlug: string | null | undefined,
): Promise<SandboxLiveOrgAdminGate> {
  const resolved = await resolveActiveOrganizationId(userId, orgSlug ?? undefined);
  if (!resolved.success) return "forbidden";

  const [row] = await db
    .select({
      role: organizationMemberships.role,
      accountOwnerId: organizations.account_owner_id,
    })
    .from(organizationMemberships)
    .innerJoin(organizations, eq(organizationMemberships.organization_id, organizations.id))
    .where(
      and(
        eq(organizationMemberships.user_id, userId),
        eq(organizations.id, resolved.data.organizationId),
        or(
          eq(organizationMemberships.status, "active"),
          eq(organizationMemberships.status, "pending"),
        ),
      ),
    )
    .limit(1);

  if (!row) return "forbidden";
  if (
    isSandboxLiveOrgAdminRole(row.role, {
      isAccountOwner: row.accountOwnerId != null && row.accountOwnerId === userId,
    })
  ) {
    return "admin";
  }
  return "forbidden";
}

export async function requireSandboxLiveOrgAdminSession(
  orgSlug: string | null | undefined,
): Promise<{ userId: string; organizationId: string; slug: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect(`/login?next=${encodeURIComponent(`/sandboxlive/org${orgSlug ? `?org=${orgSlug}` : ""}`)}`);
  }
  if ((await resolveSandboxLiveOrgAdminGate(user.id, orgSlug ?? null)) !== "admin") {
    redirect(`/sandboxlive${orgSlug ? `?org=${encodeURIComponent(orgSlug)}` : ""}`);
  }
  const resolved = await resolveActiveOrganizationId(user.id, orgSlug ?? undefined);
  if (!resolved.success) {
    redirect("/sandboxlive");
  }
  return { userId: user.id, organizationId: resolved.data.organizationId, slug: resolved.data.slug };
}

export async function requireSandboxLiveOrgParticipantSession(
  orgSlug: string | null | undefined,
): Promise<{
  userId: string;
  organizationId: string;
  slug: string;
  membershipRole: OrgMembershipRole;
  isOrgAdmin: boolean;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect(`/login?next=${encodeURIComponent(`/sandboxlive/org/members${orgSlug ? `?org=${orgSlug}` : ""}`)}`);
  }
  const resolved = await resolveActiveOrganizationId(user.id, orgSlug ?? undefined);
  if (!resolved.success) {
    redirect("/sandboxlive");
  }
  const [row] = await db
    .select({
      role: organizationMemberships.role,
      accountOwnerId: organizations.account_owner_id,
    })
    .from(organizationMemberships)
    .innerJoin(organizations, eq(organizationMemberships.organization_id, organizations.id))
    .where(
      and(
        eq(organizationMemberships.user_id, user.id),
        eq(organizations.id, resolved.data.organizationId),
        or(
          eq(organizationMemberships.status, "active"),
          eq(organizationMemberships.status, "pending"),
        ),
      ),
    )
    .limit(1);
  if (!row) {
    redirect(`/sandboxlive${orgSlug ? `?org=${encodeURIComponent(orgSlug)}` : ""}`);
  }
  const membershipRole = normalizeOrgMembershipRole(row.role, {
    isAccountOwner: row.accountOwnerId != null && row.accountOwnerId === user.id,
  });
  return {
    userId: user.id,
    organizationId: resolved.data.organizationId,
    slug: resolved.data.slug,
    membershipRole,
    isOrgAdmin: membershipRole === "admin",
  };
}

export async function requireSandboxLiveOrgParticipantOrAdminForReadPages(
  orgSlug: string | null | undefined,
): Promise<{
  userId: string;
  organizationId: string;
  slug: string;
  isOrgAdmin: boolean;
}> {
  const ctx = await requireSandboxLiveOrgParticipantSession(orgSlug);
  return {
    userId: ctx.userId,
    organizationId: ctx.organizationId,
    slug: ctx.slug,
    isOrgAdmin: ctx.isOrgAdmin,
  };
}

export type SandboxLiveOrgProfile = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  contactEmail: string | null;
  logoUrl: string | null;
  cohortStartDate: string | null;
  cohortId: string | null;
  cohortLabel: string | null;
  onboardingCompletedAt: string | null;
  organizationType: string;
  settings: unknown;
  persona: DashboardPersona;
};

export async function loadSandboxLiveOrgProfile(organizationId: string): Promise<SandboxLiveOrgProfile | null> {
  const [org] = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      description: organizations.description,
      contact_email: organizations.contact_email,
      logo_url: organizations.logo_url,
      cohort_start_date: organizations.cohort_start_date,
      cohort_id: organizations.cohort_id,
      onboarding_completed_at: organizations.onboarding_completed_at,
      organization_type: organizations.organization_type,
      settings: organizations.settings,
    })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  if (!org) return null;

  const persona = resolveDashboardPersona({
    slug: org.slug,
    organization_type: org.organization_type,
    settings: org.settings,
  });

  let cohortLabel: string | null = null;
  if (org.cohort_id) {
    cohortLabel = `Cohort ${org.cohort_id.slice(0, 8)}…`;
  }

  return {
    id: org.id,
    name: org.name,
    slug: org.slug,
    description: org.description,
    contactEmail: org.contact_email,
    logoUrl: org.logo_url,
    cohortStartDate: org.cohort_start_date,
    cohortId: org.cohort_id,
    cohortLabel,
    onboardingCompletedAt: org.onboarding_completed_at,
    organizationType: org.organization_type,
    settings: org.settings,
    persona,
  };
}

export function engagementTypeLabelFromSettings(settings: unknown): "SandboxLive" | "SafeStart" {
  const s =
    settings && typeof settings === "object" && settings !== null
      ? (settings as Record<string, unknown>)
      : {};
  const raw = s.engagement_type ?? s.engagementType;
  if (raw === "safestart" || raw === "safe_start") return "SafeStart";
  return "SandboxLive";
}

export function engagementStatusLabel(profile: SandboxLiveOrgProfile): string {
  if (profile.onboardingCompletedAt) return "Onboarding complete — cohort active.";
  if (profile.cohortStartDate) return "Onboarding in progress — cohort dated.";
  return "Onboarding in progress — cohort assignment pending.";
}

export type OrgMemberRosterRow = {
  membershipId: string;
  userId: string;
  email: string;
  displayName: string;
  ministryRole: string | null;
  membershipRole: string;
  membershipStatus: string | null;
  lastActiveAt: string | null;
  userOnboardingCompleted: boolean | null;
  userOnboardingStep: number | null;
};

export async function listOrgMemberRoster(organizationId: string): Promise<OrgMemberRosterRow[]> {
  const rows = await db
    .select({
      membershipId: organizationMemberships.id,
      userId: userProfiles.id,
      email: userProfiles.email,
      first_name: userProfiles.first_name,
      last_name: userProfiles.last_name,
      display_name: userProfiles.display_name,
      ministry_role: userProfiles.ministry_role,
      membershipRole: organizationMemberships.role,
      membershipStatus: organizationMemberships.status,
      last_active_at: userProfiles.last_active_at,
      onboarding_completed: userProfiles.onboarding_completed,
      onboarding_step: userProfiles.onboarding_step,
    })
    .from(organizationMemberships)
    .innerJoin(userProfiles, eq(organizationMemberships.user_id, userProfiles.id))
    .where(
      and(
        eq(organizationMemberships.organization_id, organizationId),
        or(
          eq(organizationMemberships.status, "active"),
          eq(organizationMemberships.status, "pending"),
        ),
      ),
    )
    .orderBy(desc(userProfiles.last_active_at));

  return rows.map((r) => ({
    membershipId: r.membershipId,
    userId: r.userId,
    email: r.email,
    displayName:
      r.display_name?.trim() ||
      [r.first_name, r.last_name].filter(Boolean).join(" ").trim() ||
      r.email,
    ministryRole: r.ministry_role,
    membershipRole: r.membershipRole,
    membershipStatus: r.membershipStatus,
    lastActiveAt: r.last_active_at,
    userOnboardingCompleted: r.onboarding_completed,
    userOnboardingStep: r.onboarding_step,
  }));
}

export type OrgAgreementRow = {
  id: string;
  agreementType: string;
  agreementVersion: string;
  signedAt: string;
  documentUrl: string | null;
  signedByUserId: string | null;
  signatoryLabel: string | null;
};

export async function listOrgSignedAgreements(organizationId: string): Promise<OrgAgreementRow[]> {
  const rows = await db
    .select({
      id: signedAgreements.id,
      agreement_type: signedAgreements.agreement_type,
      agreement_version: signedAgreements.agreement_version,
      signed_at: signedAgreements.signed_at,
      document_url: signedAgreements.document_url,
      signed_by_user_id: signedAgreements.signed_by_user_id,
    })
    .from(signedAgreements)
    .where(eq(signedAgreements.organization_id, organizationId))
    .orderBy(desc(signedAgreements.signed_at));

  const userIds = rows.map((r) => r.signed_by_user_id).filter((x): x is string => Boolean(x));
  const names = new Map<string, string>();
  if (userIds.length) {
    const profiles = await db
      .select({
        id: userProfiles.id,
        email: userProfiles.email,
        display_name: userProfiles.display_name,
        first_name: userProfiles.first_name,
        last_name: userProfiles.last_name,
      })
      .from(userProfiles)
      .where(inArray(userProfiles.id, userIds));
    for (const p of profiles) {
      names.set(
        p.id,
        p.display_name?.trim() ||
          [p.first_name, p.last_name].filter(Boolean).join(" ").trim() ||
          p.email,
      );
    }
  }

  return rows.map((r) => ({
    id: r.id,
    agreementType: r.agreement_type,
    agreementVersion: r.agreement_version,
    signedAt: r.signed_at,
    documentUrl: r.document_url,
    signedByUserId: r.signed_by_user_id,
    signatoryLabel: r.signed_by_user_id ? (names.get(r.signed_by_user_id) ?? null) : null,
  }));
}

export async function listMovementVoiceCommitmentRowsForOrg(
  organizationId: string,
): Promise<
  Array<{
    leaderName: string;
    leaderEmail: string;
    signedAt: string;
    versionSigned: string;
  }>
> {
  const memberEmails = await db
    .select({ email: userProfiles.email })
    .from(organizationMemberships)
    .innerJoin(userProfiles, eq(organizationMemberships.user_id, userProfiles.id))
    .where(
      and(
        eq(organizationMemberships.organization_id, organizationId),
        or(
          eq(organizationMemberships.status, "active"),
          eq(organizationMemberships.status, "pending"),
        ),
      ),
    );

  const emails = [...new Set(memberEmails.map((m) => m.email.trim().toLowerCase()).filter(Boolean))];
  if (!emails.length) return [];

  const emailClause =
    emails.length === 1
      ? eq(sql`lower(trim(${movementLeaders.email}))`, emails[0]!)
      : or(...emails.map((e) => eq(sql`lower(trim(${movementLeaders.email}))`, e)));

  const leaders = await db
    .select({
      id: movementLeaders.id,
      full_name: movementLeaders.full_name,
      email: movementLeaders.email,
    })
    .from(movementLeaders)
    .where(emailClause);

  if (!leaders.length) return [];

  const leaderIds = leaders.map((l) => l.id);
  const signs = await db
    .select({
      leader_id: movementLeaderSignings.leader_id,
      signed_at: movementLeaderSignings.signed_at,
      version_signed: movementLeaderSignings.version_signed,
    })
    .from(movementLeaderSignings)
    .where(
      and(
        inArray(movementLeaderSignings.leader_id, leaderIds),
        eq(movementLeaderSignings.document_slug, MOVEMENT_VOICE_COMMITMENTS_SLUG),
      ),
    );

  const byLeader = new Map(signs.map((s) => [s.leader_id, s]));
  const out: Array<{ leaderName: string; leaderEmail: string; signedAt: string; versionSigned: string }> = [];
  for (const l of leaders) {
    const s = byLeader.get(l.id);
    if (!s) continue;
    out.push({
      leaderName: l.full_name,
      leaderEmail: l.email,
      signedAt: s.signed_at,
      versionSigned: s.version_signed,
    });
  }
  return out;
}
