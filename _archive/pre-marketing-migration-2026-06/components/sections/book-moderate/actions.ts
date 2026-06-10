"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { bookEndorsements, bookMarginNotes } from "@/lib/db/schema";

function assertToken(token: string) {
  const expected = process.env.BOOK_MODERATION_TOKEN;
  if (!expected || token !== expected) {
    throw new Error("Unauthorized");
  }
}

export async function updateMarginNoteStatus(
  token: string,
  id: string,
  status: "pending" | "approved" | "rejected" | "archived",
) {
  assertToken(token);
  await db
    .update(bookMarginNotes)
    .set({
      status,
      approved_at: status === "approved" ? new Date().toISOString() : null,
    })
    .where(eq(bookMarginNotes.id, id));
  revalidatePath("/book");
  revalidatePath("/book/contributors");
  revalidatePath("/book/moderate");
}

export async function updateEndorsementStatus(
  token: string,
  id: string,
  status: "pending" | "approved",
  featured?: boolean,
) {
  assertToken(token);
  await db
    .update(bookEndorsements)
    .set({
      status,
      ...(typeof featured === "boolean" ? { featured } : {}),
    })
    .where(eq(bookEndorsements.id, id));
  revalidatePath("/book");
  revalidatePath("/");
  revalidatePath("/book/moderate");
}
