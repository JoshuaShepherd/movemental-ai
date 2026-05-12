import type { MovementLeaderRow } from "@/lib/movement-leaders/movement-leaders.server";

export const PUBLIC_PAGE_SNAPSHOT_KEYS = [
  "bio_short",
  "bio_long",
  "personal_piece",
  "frameworks_markdown",
  "organizational_footprint_markdown",
  "endorsements_markdown",
] as const;

export type PublicPageSnapshotKey = (typeof PUBLIC_PAGE_SNAPSHOT_KEYS)[number];

export type PublicPageSnapshot = Record<PublicPageSnapshotKey, string | null>;

export type PublicLeaderIdentity = {
  full_name: string;
  slug: string;
  photo_url: string | null;
  primary_role: string | null;
  primary_organization: string | null;
};

export type PublicLeaderPageModel = PublicLeaderIdentity & PublicPageSnapshot;

export type PublicPageSectionId =
  | "bio"
  | "personal_piece"
  | "frameworks"
  | "organizational_footprint"
  | "endorsements";

export function pickString(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t : null;
}

export function emptyPublicPageSnapshot(): PublicPageSnapshot {
  return {
    bio_short: null,
    bio_long: null,
    personal_piece: null,
    frameworks_markdown: null,
    organizational_footprint_markdown: null,
    endorsements_markdown: null,
  };
}

export function snapshotFromLeader(leader: MovementLeaderRow): PublicPageSnapshot {
  const d = (leader.movement_leader_data ?? {}) as Record<string, unknown>;
  return {
    bio_short: leader.bio_short,
    bio_long: leader.bio_long,
    personal_piece: leader.personal_piece,
    frameworks_markdown: pickString(d.public_frameworks_markdown),
    organizational_footprint_markdown: pickString(d.public_organizational_footprint_markdown),
    endorsements_markdown: pickString(d.public_endorsements_markdown),
  };
}

export function publicLeaderPageModelFromSnapshot(
  identity: PublicLeaderIdentity,
  snapshot: PublicPageSnapshot,
): PublicLeaderPageModel {
  return {
    full_name: identity.full_name,
    slug: identity.slug,
    photo_url: identity.photo_url,
    primary_role: identity.primary_role,
    primary_organization: identity.primary_organization,
    ...snapshot,
  };
}

export function publicLeaderPageModelFromLeader(leader: MovementLeaderRow): PublicLeaderPageModel {
  return publicLeaderPageModelFromSnapshot(
    {
      full_name: leader.full_name,
      slug: leader.slug,
      photo_url: leader.photo_url,
      primary_role: leader.primary_role,
      primary_organization: leader.primary_organization,
    },
    snapshotFromLeader(leader),
  );
}

export const BIO_SECTION_DELIMITER = "\n---\n";

export function formatBioSectionEdit(snapshot: PublicPageSnapshot): string {
  const short = snapshot.bio_short ?? "";
  const long = snapshot.bio_long ?? "";
  if (!short && !long) return "";
  if (!short) return long;
  if (!long) return short;
  return `${short}${BIO_SECTION_DELIMITER}${long}`;
}

export function parseBioSectionEdit(raw: string): Pick<PublicPageSnapshot, "bio_short" | "bio_long"> {
  const t = raw.trim();
  if (!t) return { bio_short: null, bio_long: null };
  const parts = raw.split(BIO_SECTION_DELIMITER);
  if (parts.length >= 2) {
    return {
      bio_short: parts[0]?.trim() || null,
      bio_long: parts.slice(1).join(BIO_SECTION_DELIMITER).trim() || null,
    };
  }
  return { bio_short: null, bio_long: raw.trim() || null };
}
