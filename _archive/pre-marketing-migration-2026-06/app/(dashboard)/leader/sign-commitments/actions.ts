"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { movementLeaderSignings } from "@/lib/db/schema";
import {
  MOVEMENT_VOICE_COMMITMENTS_SLUG,
  MOVEMENT_VOICE_COMMITMENTS_VERSION,
} from "@/lib/movement-leaders/commitments-doc";
import {
  getMovementLeaderByEmail,
  hasSignedVoiceCommitments,
} from "@/lib/movement-leaders/movement-leaders.server";
import { createClient } from "@/lib/supabase/server";

export type SignVoiceCommitmentsState = { ok: boolean; message?: string };

export async function signVoiceCommitmentsAction(): Promise<SignVoiceCommitmentsState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return { ok: false, message: "You need to be signed in." };
  }

  const leader = await getMovementLeaderByEmail(user.email);
  if (!leader) {
    return { ok: false, message: "No movement leader profile is linked to this account." };
  }

  if (await hasSignedVoiceCommitments(leader.id)) {
    return { ok: true, message: "Your signature is already on file." };
  }

  try {
    await db.insert(movementLeaderSignings).values({
      leader_id: leader.id,
      document_slug: MOVEMENT_VOICE_COMMITMENTS_SLUG,
      version_signed: MOVEMENT_VOICE_COMMITMENTS_VERSION,
    });
  } catch {
    return {
      ok: false,
      message:
        "Could not save your signing yet. If migrations are not applied, ask an admin to run drizzle push.",
    };
  }

  revalidatePath("/leader/sign-commitments");
  revalidatePath("/movement-voice-commitments");
  return { ok: true, message: "Thank you — your commitment is recorded." };
}
