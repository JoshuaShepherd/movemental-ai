import "server-only";

import { and, desc, eq, isNotNull, isNull, or } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  movementLeaderApplications,
  movementLeaderPublicPages,
  movementLeaderSignings,
  movementLeaders,
} from "@/lib/db/schema";

import { MOVEMENT_VOICE_COMMITMENTS_SLUG } from "./commitments-doc";
import type { MovementLeaderDataJson } from "./types";

export type MovementLeaderRow = {
  id: string;
  slug: string;
  full_name: string;
  email: string;
  photo_url: string | null;
  primary_role: string | null;
  primary_organization: string | null;
  bio_short: string | null;
  bio_long: string | null;
  personal_piece: string | null;
  movement_leader_data: MovementLeaderDataJson;
  reflected_understanding_endorsed_at: string | null;
  public_page_approved_at: string | null;
  public_page_published_at: string | null;
  status: string;
};

function mapLeaderRow(r: typeof movementLeaders.$inferSelect): MovementLeaderRow {
  return {
    id: r.id,
    slug: r.slug,
    full_name: r.full_name,
    email: r.email,
    photo_url: r.photo_url,
    primary_role: r.primary_role,
    primary_organization: r.primary_organization,
    bio_short: r.bio_short,
    bio_long: r.bio_long,
    personal_piece: r.personal_piece,
    movement_leader_data: (r.movement_leader_data ?? {}) as MovementLeaderDataJson,
    reflected_understanding_endorsed_at: r.reflected_understanding_endorsed_at,
    public_page_approved_at: r.public_page_approved_at,
    public_page_published_at: r.public_page_published_at,
    status: r.status,
  };
}

/**
 * Resolves a movement leader row by email (trimmed; second pass exact match if needed).
 * Returns `null` when the table is missing or no row matches.
 */
export async function getMovementLeaderByEmail(
  email: string | null | undefined,
): Promise<MovementLeaderRow | null> {
  if (!email?.trim()) return null;
  const trimmed = email.trim();
  try {
    const [row] = await db
      .select()
      .from(movementLeaders)
      .where(eq(movementLeaders.email, trimmed))
      .limit(1);
    if (row) return mapLeaderRow(row);

    const [rowLower] = await db
      .select()
      .from(movementLeaders)
      .where(eq(movementLeaders.email, trimmed.toLowerCase()))
      .limit(1);
    return rowLower ? mapLeaderRow(rowLower) : null;
  } catch {
    return null;
  }
}

export async function getMovementLeaderBySlug(
  slug: string,
): Promise<MovementLeaderRow | null> {
  try {
    const [row] = await db
      .select()
      .from(movementLeaders)
      .where(eq(movementLeaders.slug, slug))
      .limit(1);
    return row ? mapLeaderRow(row) : null;
  } catch {
    return null;
  }
}

export async function listPublishedMovementLeaders(): Promise<MovementLeaderRow[]> {
  try {
    const rows = await db
      .select({ leader: movementLeaders })
      .from(movementLeaders)
      .leftJoin(movementLeaderPublicPages, eq(movementLeaders.id, movementLeaderPublicPages.leader_id))
      .where(
        and(
          isNotNull(movementLeaders.public_page_published_at),
          or(isNull(movementLeaderPublicPages.unpublished_at), isNull(movementLeaderPublicPages.leader_id)),
        ),
      )
      .orderBy(desc(movementLeaders.public_page_published_at));
    return rows.map((r) => mapLeaderRow(r.leader));
  } catch {
    return [];
  }
}

export type MovementVoiceCommitmentSigner = {
  full_name: string;
  slug: string;
  signed_at: string;
  version_signed: string;
};

export async function listMovementVoiceCommitmentSigners(): Promise<
  MovementVoiceCommitmentSigner[]
> {
  try {
    const rows = await db
      .select({
        full_name: movementLeaders.full_name,
        slug: movementLeaders.slug,
        signed_at: movementLeaderSignings.signed_at,
        version_signed: movementLeaderSignings.version_signed,
      })
      .from(movementLeaderSignings)
      .innerJoin(movementLeaders, eq(movementLeaderSignings.leader_id, movementLeaders.id))
      .where(eq(movementLeaderSignings.document_slug, MOVEMENT_VOICE_COMMITMENTS_SLUG))
      .orderBy(desc(movementLeaderSignings.signed_at));
    return rows;
  } catch {
    return [];
  }
}

export async function listMovementLeadersForAdmin(): Promise<MovementLeaderRow[]> {
  try {
    const rows = await db
      .select()
      .from(movementLeaders)
      .orderBy(desc(movementLeaders.updated_at));
    return rows.map(mapLeaderRow);
  } catch {
    return [];
  }
}

export type MovementLeaderApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  organization: string | null;
  role: string | null;
  status: string;
  created_at: string;
};

export async function listMovementLeaderApplicationsForAdmin(): Promise<
  MovementLeaderApplicationRow[]
> {
  try {
    const rows = await db
      .select({
        id: movementLeaderApplications.id,
        full_name: movementLeaderApplications.full_name,
        email: movementLeaderApplications.email,
        organization: movementLeaderApplications.organization,
        role: movementLeaderApplications.role,
        status: movementLeaderApplications.status,
        created_at: movementLeaderApplications.created_at,
      })
      .from(movementLeaderApplications)
      .orderBy(desc(movementLeaderApplications.created_at));
    return rows;
  } catch {
    return [];
  }
}

export async function hasSignedVoiceCommitments(leaderId: string): Promise<boolean> {
  try {
    const [row] = await db
      .select({ id: movementLeaderSignings.id })
      .from(movementLeaderSignings)
      .where(
        and(
          eq(movementLeaderSignings.leader_id, leaderId),
          eq(movementLeaderSignings.document_slug, MOVEMENT_VOICE_COMMITMENTS_SLUG),
        ),
      )
      .limit(1);
    return Boolean(row);
  } catch {
    return false;
  }
}
