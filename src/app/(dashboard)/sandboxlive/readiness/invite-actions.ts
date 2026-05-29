"use server";

import { revalidatePath } from "next/cache";

import { canonicalPageUrl } from "@/lib/site-url";
import { createReadinessInvite, revokeReadinessInvite } from "@/lib/sandboxlive/readiness-invite.server";
import { resolveSandboxLiveOrgAdminGate } from "@/lib/sandboxlive/org-admin.server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export type CreateReadinessInviteResult =
  | { ok: true; url: string; inviteId: string }
  | { ok: false; reason: string };

export async function createReadinessInviteLinkAction(input: {
  orgSlug: string | undefined;
  label?: string | null;
}): Promise<CreateReadinessInviteResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return { ok: false, reason: "Not signed in." };
  }
  if ((await resolveSandboxLiveOrgAdminGate(user.id, input.orgSlug ?? null)) !== "admin") {
    return { ok: false, reason: "Only organization admins can create invite links." };
  }
  const resolved = await resolveActiveOrganizationId(user.id, input.orgSlug);
  if (!resolved.success) {
    return { ok: false, reason: "No active organization." };
  }

  let rawToken: string;
  let inviteId: string;
  try {
    ({ rawToken, inviteId } = await createReadinessInvite({
      organizationId: resolved.data.organizationId,
      createdBy: user.id,
      label: input.label ?? null,
      expiresAt: null,
    }));
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create invite link.";
    return { ok: false, reason: message };
  }

  const path = `/readiness-invite/${encodeURIComponent(rawToken)}`;
  revalidatePath("/sandboxlive/readiness");
  return { ok: true, url: canonicalPageUrl(path), inviteId };
}

export type RevokeReadinessInviteResult = { ok: true } | { ok: false; reason: string };

export async function revokeReadinessInviteLinkAction(input: {
  orgSlug: string | undefined;
  inviteId: string;
}): Promise<RevokeReadinessInviteResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return { ok: false, reason: "Not signed in." };
  }
  if ((await resolveSandboxLiveOrgAdminGate(user.id, input.orgSlug ?? null)) !== "admin") {
    return { ok: false, reason: "Only organization admins can revoke invite links." };
  }
  const resolved = await resolveActiveOrganizationId(user.id, input.orgSlug);
  if (!resolved.success) {
    return { ok: false, reason: "No active organization." };
  }

  const result = await revokeReadinessInvite({
    organizationId: resolved.data.organizationId,
    inviteId: input.inviteId,
  });
  if (!result.ok) {
    return { ok: false, reason: "Invite not found or already revoked." };
  }
  revalidatePath("/sandboxlive/readiness");
  return { ok: true };
}
