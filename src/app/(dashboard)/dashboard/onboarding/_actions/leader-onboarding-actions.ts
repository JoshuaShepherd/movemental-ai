"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { movementLeaders } from "@/lib/db/schema";
import {
  getMovementLeaderByEmail,
  hasSignedVoiceCommitments,
} from "@/lib/movement-leaders/movement-leaders.server";
import { createClient } from "@/lib/supabase/server";

export type LeaderOnboardingActionResult = { ok: boolean; message?: string };

function nowIso(): string {
  return new Date().toISOString();
}

async function loadLeaderForUser(): Promise<{ leaderId: string } | { error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { error: "Sign in required." };
  const leader = await getMovementLeaderByEmail(user.email);
  if (!leader) return { error: "No movement leader profile is linked to this account." };
  return { leaderId: leader.id };
}

function bumpLeaderPaths() {
  revalidatePath("/leader");
  revalidatePath("/dashboard/onboarding/leader", "layout");
}

export async function persistLeaderBio(input: {
  bioShort: string;
  bioLong: string;
}): Promise<LeaderOnboardingActionResult> {
  const actor = await loadLeaderForUser();
  if ("error" in actor) return { ok: false, message: actor.error };
  try {
    await db
      .update(movementLeaders)
      .set({
        bio_short: input.bioShort.trim() || null,
        bio_long: input.bioLong.trim() || null,
        updated_at: nowIso(),
      })
      .where(eq(movementLeaders.id, actor.leaderId));
  } catch {
    return { ok: false, message: "Could not save your bio yet." };
  }
  bumpLeaderPaths();
  return { ok: true };
}

export async function persistLeaderPhotoUrl(input: { photoUrl: string }): Promise<LeaderOnboardingActionResult> {
  const actor = await loadLeaderForUser();
  if ("error" in actor) return { ok: false, message: actor.error };
  const url = input.photoUrl.trim();
  if (!url) return { ok: false, message: "Add a public image URL before continuing." };
  try {
    await db
      .update(movementLeaders)
      .set({ photo_url: url, updated_at: nowIso() })
      .where(eq(movementLeaders.id, actor.leaderId));
  } catch {
    return { ok: false, message: "Could not save your headshot URL yet." };
  }
  bumpLeaderPaths();
  return { ok: true };
}

export async function persistLeaderPersonalPiece(input: {
  personalPiece: string;
}): Promise<LeaderOnboardingActionResult> {
  const actor = await loadLeaderForUser();
  if ("error" in actor) return { ok: false, message: actor.error };
  const text = input.personalPiece.trim();
  if (text.length < 80) {
    return { ok: false, message: "Please write at least a short intro (about 80+ characters)." };
  }
  try {
    await db
      .update(movementLeaders)
      .set({ personal_piece: text, updated_at: nowIso() })
      .where(eq(movementLeaders.id, actor.leaderId));
  } catch {
    return { ok: false, message: "Could not save your personal piece yet." };
  }
  bumpLeaderPaths();
  return { ok: true };
}

export async function endorseReflectedUnderstanding(): Promise<LeaderOnboardingActionResult> {
  const actor = await loadLeaderForUser();
  if ("error" in actor) return { ok: false, message: actor.error };
  try {
    await db
      .update(movementLeaders)
      .set({ reflected_understanding_endorsed_at: nowIso(), updated_at: nowIso() })
      .where(eq(movementLeaders.id, actor.leaderId));
  } catch {
    return { ok: false, message: "Could not record your endorsement yet." };
  }
  bumpLeaderPaths();
  return { ok: true };
}

export async function assertLeaderSignedVoiceCommitments(): Promise<LeaderOnboardingActionResult> {
  const actor = await loadLeaderForUser();
  if ("error" in actor) return { ok: false, message: actor.error };
  const signed = await hasSignedVoiceCommitments(actor.leaderId);
  if (!signed) {
    return {
      ok: false,
      message: "Sign the Movemental Voice Commitments first, then return here.",
    };
  }
  return { ok: true };
}

export async function approveLeaderPublicPage(): Promise<LeaderOnboardingActionResult> {
  const actor = await loadLeaderForUser();
  if ("error" in actor) return { ok: false, message: actor.error };
  try {
    await db
      .update(movementLeaders)
      .set({ public_page_approved_at: nowIso(), updated_at: nowIso() })
      .where(eq(movementLeaders.id, actor.leaderId));
  } catch {
    return { ok: false, message: "Could not record approval yet." };
  }
  bumpLeaderPaths();
  return { ok: true };
}

export async function publishLeaderPublicPage(): Promise<LeaderOnboardingActionResult> {
  const actor = await loadLeaderForUser();
  if ("error" in actor) return { ok: false, message: actor.error };
  try {
    await db
      .update(movementLeaders)
      .set({
        public_page_published_at: nowIso(),
        updated_at: nowIso(),
      })
      .where(eq(movementLeaders.id, actor.leaderId));
  } catch {
    return { ok: false, message: "Could not publish yet." };
  }
  bumpLeaderPaths();
  return { ok: true };
}
