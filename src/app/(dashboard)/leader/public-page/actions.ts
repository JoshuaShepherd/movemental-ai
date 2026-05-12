"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { movementLeaderPublicPageVersions } from "@/lib/db/schema";
import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";
import { sendPublicPageRatifiedEmail } from "@/lib/email/send-public-page-ratified";
import { env } from "@/lib/env";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import {
  emptyPublicPageSnapshot,
  type PublicPageSnapshot,
} from "@/lib/movement-leaders/public-page-model";
import {
  applySnapshotToMovementLeader,
  clearMovementLeaderPublish,
  insertPublicPageVersion,
  insertRevisionRequest,
  markPublicPageUnpublished,
  nextPublicPageVersionNumber,
  setMovementLeaderPublishTimestamps,
  supersedeDraftVersions,
  supersedePublishedVersions,
  upsertPublicPageGate,
} from "@/lib/movement-leaders/public-page-ratification.server";
import { createClient } from "@/lib/supabase/server";

const snapshotSchema = z.object({
  bio_short: z.string().nullable(),
  bio_long: z.string().nullable(),
  personal_piece: z.string().nullable(),
  frameworks_markdown: z.string().nullable(),
  organizational_footprint_markdown: z.string().nullable(),
  endorsements_markdown: z.string().nullable(),
});

function parseSnapshot(raw: unknown): PublicPageSnapshot {
  const parsed = snapshotSchema.safeParse(raw);
  if (!parsed.success) return emptyPublicPageSnapshot();
  return parsed.data;
}

async function requireLeaderSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) throw new Error("You need to be signed in.");
  const leader = await getMovementLeaderByEmail(user.email);
  if (!leader) throw new Error("No movement leader profile is linked to this account.");
  return { leader, email: user.email };
}

function revalidateLeaderPaths(slug: string) {
  revalidatePath("/leader/public-page");
  revalidatePath("/leader/public-page/history");
  revalidatePath(`/movement-leaders/${slug}`);
}

async function commitPublishedSnapshot(input: {
  leaderId: string;
  slug: string;
  email: string;
  fullName: string;
  snap: PublicPageSnapshot;
  sendRatifiedEmail: boolean;
}) {
  const now = new Date().toISOString();
  await supersedePublishedVersions(input.leaderId);
  await supersedeDraftVersions(input.leaderId);
  const vn = await nextPublicPageVersionNumber(input.leaderId);
  await insertPublicPageVersion({
    leaderId: input.leaderId,
    versionNumber: vn,
    status: "published",
    snapshot: input.snap,
  });
  await applySnapshotToMovementLeader(input.leaderId, input.snap);
  await setMovementLeaderPublishTimestamps(input.leaderId, now, now);
  await upsertPublicPageGate({
    leaderId: input.leaderId,
    approvedAt: now,
    publishedAt: now,
    approvedByEmail: input.email,
    clearUnpublished: true,
  });
  if (input.sendRatifiedEmail) {
    await sendPublicPageRatifiedEmail({
      leaderEmail: input.email,
      leaderName: input.fullName,
      publicPath: `/movement-leaders/${input.slug}`,
    });
  }
  revalidateLeaderPaths(input.slug);
}

export async function savePublicPageDraftAction(snapshot: unknown) {
  const { leader } = await requireLeaderSession();
  const snap = parseSnapshot(snapshot);
  const vn = await nextPublicPageVersionNumber(leader.id);
  await insertPublicPageVersion({ leaderId: leader.id, versionNumber: vn, status: "draft", snapshot: snap });
  revalidateLeaderPaths(leader.slug);
  return { ok: true as const };
}

export async function approvePublicPageAction(snapshot: unknown) {
  const { leader, email } = await requireLeaderSession();
  const snap = parseSnapshot(snapshot);
  await commitPublishedSnapshot({
    leaderId: leader.id,
    slug: leader.slug,
    email,
    fullName: leader.full_name,
    snap,
    sendRatifiedEmail: true,
  });
  return { ok: true as const };
}

export async function republishPublicPageAction(snapshot: unknown) {
  const { leader, email } = await requireLeaderSession();
  if (!leader.public_page_published_at) {
    throw new Error("Your page is not currently published.");
  }
  const snap = parseSnapshot(snapshot);
  await commitPublishedSnapshot({
    leaderId: leader.id,
    slug: leader.slug,
    email,
    fullName: leader.full_name,
    snap,
    sendRatifiedEmail: false,
  });
  return { ok: true as const };
}

export async function requestPublicPageEditsAction(message: string) {
  const { leader, email } = await requireLeaderSession();
  const text = message.trim();
  if (!text) throw new Error("Please describe what you would like the editorial team to change.");
  await insertRevisionRequest({
    leaderId: leader.id,
    requesterEmail: email,
    requestText: `[Public page] ${text}`,
  });
  const resend = getResend();
  if (resend && env.CONTACT_NOTIFY_EMAIL) {
    await resend.emails.send({
      from: resendFromHeader(),
      to: env.CONTACT_NOTIFY_EMAIL,
      subject: `Public page revision request — ${leader.full_name}`,
      text: [`From: ${email}`, `Leader: ${leader.full_name} (${leader.slug})`, "", text].join("\n"),
    });
  }
  revalidateLeaderPaths(leader.slug);
  return { ok: true as const };
}

export async function unpublishPublicPageAction() {
  const { leader } = await requireLeaderSession();
  const now = new Date().toISOString();
  await markPublicPageUnpublished(leader.id, now);
  await clearMovementLeaderPublish(leader.id);
  revalidateLeaderPaths(leader.slug);
  return { ok: true as const };
}

export async function revertPublicPageFormAction(formData: FormData) {
  const raw = formData.get("versionId");
  if (typeof raw !== "string" || !raw) throw new Error("Missing version.");
  await revertPublicPageVersionAction(raw);
}

export async function revertPublicPageVersionAction(versionId: string) {
  const { leader } = await requireLeaderSession();
  const [row] = await db
    .select()
    .from(movementLeaderPublicPageVersions)
    .where(
      and(
        eq(movementLeaderPublicPageVersions.id, versionId),
        eq(movementLeaderPublicPageVersions.leader_id, leader.id),
      ),
    )
    .limit(1);
  if (!row) throw new Error("That version could not be found.");
  const snap = parseSnapshot(row.snapshot);
  const vn = await nextPublicPageVersionNumber(leader.id);
  await insertPublicPageVersion({ leaderId: leader.id, versionNumber: vn, status: "draft", snapshot: snap });
  revalidateLeaderPaths(leader.slug);
  return { ok: true as const };
}
