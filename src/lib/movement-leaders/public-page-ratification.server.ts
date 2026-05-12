import "server-only";

import { and, desc, eq, max, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  leaderRevisionRequests,
  movementLeaderPublicPages,
  movementLeaderPublicPageVersions,
  movementLeaders,
} from "@/lib/db/schema";
import type { MovementLeaderRow } from "@/lib/movement-leaders/movement-leaders.server";
import type { PublicPageSnapshot } from "@/lib/movement-leaders/public-page-model";

export type PublicPageVersionRow = {
  id: string;
  leader_id: string;
  version_number: number;
  status: string;
  snapshot: PublicPageSnapshot;
  created_at: string;
};

export type MovementLeaderPublicPageRow = {
  leader_id: string;
  approved_at: string | null;
  published_at: string | null;
  unpublished_at: string | null;
  approved_by_movement_leader_email: string | null;
  updated_at: string;
};

export async function getMovementLeaderPublicPageGate(
  leaderId: string,
): Promise<MovementLeaderPublicPageRow | null> {
  const [row] = await db
    .select()
    .from(movementLeaderPublicPages)
    .where(eq(movementLeaderPublicPages.leader_id, leaderId))
    .limit(1);
  return row ?? null;
}

export async function isMovementLeaderPubliclyVisible(leader: MovementLeaderRow): Promise<boolean> {
  if (!leader.public_page_published_at) return false;
  const gate = await getMovementLeaderPublicPageGate(leader.id);
  if (gate?.unpublished_at) return false;
  return true;
}

export async function nextPublicPageVersionNumber(leaderId: string): Promise<number> {
  const [row] = await db
    .select({ max: max(movementLeaderPublicPageVersions.version_number) })
    .from(movementLeaderPublicPageVersions)
    .where(eq(movementLeaderPublicPageVersions.leader_id, leaderId));
  return Number(row?.max ?? 0) + 1;
}

export async function getLatestDraftSnapshot(leaderId: string): Promise<PublicPageSnapshot | null> {
  const [row] = await db
    .select({ snapshot: movementLeaderPublicPageVersions.snapshot })
    .from(movementLeaderPublicPageVersions)
    .where(
      and(
        eq(movementLeaderPublicPageVersions.leader_id, leaderId),
        eq(movementLeaderPublicPageVersions.status, "draft"),
      ),
    )
    .orderBy(desc(movementLeaderPublicPageVersions.version_number))
    .limit(1);
  return row ? (row.snapshot as PublicPageSnapshot) : null;
}

export async function listPublicPageVersions(leaderId: string): Promise<PublicPageVersionRow[]> {
  const rows = await db
    .select()
    .from(movementLeaderPublicPageVersions)
    .where(eq(movementLeaderPublicPageVersions.leader_id, leaderId))
    .orderBy(desc(movementLeaderPublicPageVersions.version_number));
  return rows.map((r) => ({
    id: r.id,
    leader_id: r.leader_id,
    version_number: r.version_number,
    status: r.status,
    snapshot: r.snapshot as PublicPageSnapshot,
    created_at: r.created_at,
  }));
}

export async function insertPublicPageVersion(input: {
  leaderId: string;
  versionNumber: number;
  status: "draft" | "published" | "superseded";
  snapshot: PublicPageSnapshot;
}): Promise<string> {
  const [row] = await db
    .insert(movementLeaderPublicPageVersions)
    .values({
      leader_id: input.leaderId,
      version_number: input.versionNumber,
      status: input.status,
      snapshot: input.snapshot,
    })
    .returning({ id: movementLeaderPublicPageVersions.id });
  return row.id;
}

export async function supersedeDraftVersions(leaderId: string): Promise<void> {
  await db
    .update(movementLeaderPublicPageVersions)
    .set({ status: "superseded" })
    .where(
      and(
        eq(movementLeaderPublicPageVersions.leader_id, leaderId),
        eq(movementLeaderPublicPageVersions.status, "draft"),
      ),
    );
}

export async function supersedePublishedVersions(leaderId: string): Promise<void> {
  await db
    .update(movementLeaderPublicPageVersions)
    .set({ status: "superseded" })
    .where(
      and(
        eq(movementLeaderPublicPageVersions.leader_id, leaderId),
        eq(movementLeaderPublicPageVersions.status, "published"),
      ),
    );
}

export async function upsertPublicPageGate(input: {
  leaderId: string;
  approvedAt: string;
  publishedAt: string;
  approvedByEmail: string;
  clearUnpublished?: boolean;
}): Promise<void> {
  await db
    .insert(movementLeaderPublicPages)
    .values({
      leader_id: input.leaderId,
      approved_at: input.approvedAt,
      published_at: input.publishedAt,
      unpublished_at: null,
      approved_by_movement_leader_email: input.approvedByEmail,
    })
    .onConflictDoUpdate({
      target: movementLeaderPublicPages.leader_id,
      set: {
        approved_at: input.approvedAt,
        published_at: input.publishedAt,
        ...(input.clearUnpublished ? { unpublished_at: null } : {}),
        approved_by_movement_leader_email: input.approvedByEmail,
        updated_at: sql`now()`,
      },
    });
}

export async function markPublicPageUnpublished(leaderId: string, at: string): Promise<void> {
  await db
    .insert(movementLeaderPublicPages)
    .values({
      leader_id: leaderId,
      approved_at: null,
      published_at: null,
      unpublished_at: at,
      approved_by_movement_leader_email: null,
    })
    .onConflictDoUpdate({
      target: movementLeaderPublicPages.leader_id,
      set: {
        unpublished_at: at,
        updated_at: sql`now()`,
      },
    });
}

export async function applySnapshotToMovementLeader(
  leaderId: string,
  snapshot: PublicPageSnapshot,
): Promise<void> {
  const [current] = await db
    .select({ movement_leader_data: movementLeaders.movement_leader_data })
    .from(movementLeaders)
    .where(eq(movementLeaders.id, leaderId))
    .limit(1);
  const prev = (current?.movement_leader_data ?? {}) as Record<string, unknown>;
  const merged = {
    ...prev,
    public_frameworks_markdown: snapshot.frameworks_markdown,
    public_organizational_footprint_markdown: snapshot.organizational_footprint_markdown,
    public_endorsements_markdown: snapshot.endorsements_markdown,
  };
  await db
    .update(movementLeaders)
    .set({
      bio_short: snapshot.bio_short,
      bio_long: snapshot.bio_long,
      personal_piece: snapshot.personal_piece,
      movement_leader_data: merged,
      updated_at: sql`now()`,
    })
    .where(eq(movementLeaders.id, leaderId));
}

export async function setMovementLeaderPublishTimestamps(
  leaderId: string,
  approvedAt: string,
  publishedAt: string,
): Promise<void> {
  await db
    .update(movementLeaders)
    .set({
      public_page_approved_at: approvedAt,
      public_page_published_at: publishedAt,
      updated_at: sql`now()`,
    })
    .where(eq(movementLeaders.id, leaderId));
}

export async function clearMovementLeaderPublish(leaderId: string): Promise<void> {
  await db
    .update(movementLeaders)
    .set({
      public_page_published_at: null,
      updated_at: sql`now()`,
    })
    .where(eq(movementLeaders.id, leaderId));
}

export async function insertRevisionRequest(input: {
  leaderId: string;
  requesterEmail: string;
  requestText: string;
}): Promise<void> {
  await db.insert(leaderRevisionRequests).values({
    leader_id: input.leaderId,
    section: "public_page",
    requester_email: input.requesterEmail,
    request_text: input.requestText,
    status: "open",
  });
}
