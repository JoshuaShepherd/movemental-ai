import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  bookEndorsements,
  bookMarginNotes,
  bookRevisions,
} from "@/lib/db/schema";
import type { AudienceLens } from "@/lib/book-types";
import type { Endorsement } from "@/components/book/endorsement-card";
import type { MarginNoteData } from "@/components/book/margin-column";

function mapEndorsementRow(row: typeof bookEndorsements.$inferSelect): Endorsement {
  return {
    id: row.id,
    quote: row.quote,
    endorserName: row.endorser_name,
    endorserTitle: row.endorser_title,
    endorserOrg: row.endorser_org ?? undefined,
    endorserAvatarUrl: row.endorser_avatar_url ?? undefined,
    featured: row.featured,
    audienceLens: (row.audience_lens as AudienceLens | "other" | null | undefined) ?? undefined,
    chapterSlug: row.chapter_slug ?? undefined,
  };
}

/** Approved endorsements marked featured (home + book hero strip). */
export async function getFeaturedEndorsements(limit = 6): Promise<Endorsement[]> {
  const rows = await db
    .select()
    .from(bookEndorsements)
    .where(and(eq(bookEndorsements.status, "approved"), eq(bookEndorsements.featured, true)))
    .orderBy(desc(bookEndorsements.created_at))
    .limit(limit);
  return rows.map(mapEndorsementRow);
}

/** Approved wall (optionally filter by lens on client; server returns all approved). */
export async function getApprovedEndorsements(): Promise<Endorsement[]> {
  const rows = await db
    .select()
    .from(bookEndorsements)
    .where(eq(bookEndorsements.status, "approved"))
    .orderBy(desc(bookEndorsements.featured), desc(bookEndorsements.created_at));
  return rows.map(mapEndorsementRow);
}

export async function getChapterEndorsements(chapterSlug: string): Promise<Endorsement[]> {
  const rows = await db
    .select()
    .from(bookEndorsements)
    .where(
      and(
        eq(bookEndorsements.status, "approved"),
        eq(bookEndorsements.chapter_slug, chapterSlug),
      ),
    )
    .orderBy(desc(bookEndorsements.created_at));
  return rows.map(mapEndorsementRow);
}

function mapNoteType(
  t: string,
): "author_note" | "question" | "feedback" | "criticism" | "revision_credit" {
  if (t === "author_note") return "author_note";
  if (t === "question") return "question";
  if (t === "feedback") return "feedback";
  if (t === "criticism") return "criticism";
  return "feedback";
}

export async function getApprovedMarginNotesForChapter(
  chapterSlug: string,
): Promise<MarginNoteData[]> {
  const rows = await db
    .select()
    .from(bookMarginNotes)
    .where(
      and(eq(bookMarginNotes.chapter_slug, chapterSlug), eq(bookMarginNotes.status, "approved")),
    )
    .orderBy(desc(bookMarginNotes.approved_at), desc(bookMarginNotes.created_at));

  return rows.map((r) => ({
    id: r.id,
    type: mapNoteType(r.type),
    body: r.body,
    anchorParagraphId: r.anchor_paragraph_id,
    contributorName: r.contributor_display_name,
    contributorTitle: r.contributor_title ?? undefined,
    date: (r.approved_at ?? r.created_at).slice(0, 10),
  }));
}

export type ContributorRow = {
  name: string;
  title?: string;
  chapterSlug: string;
  type: "question" | "feedback" | "criticism";
  date: string;
};

export async function getContributorsList(): Promise<ContributorRow[]> {
  const approved = await db
    .select()
    .from(bookMarginNotes)
    .where(eq(bookMarginNotes.status, "approved"));

  const revisionRows = await db.select().from(bookRevisions);
  const credited = new Set<string>();
  for (const rev of revisionRows) {
    for (const id of rev.credited_note_ids ?? []) credited.add(id);
  }

  const out: ContributorRow[] = [];
  for (const n of approved) {
    if (n.type === "author_note") continue;
    if (!credited.has(n.id)) continue;
    out.push({
      name: n.contributor_display_name,
      title: n.contributor_title ?? undefined,
      chapterSlug: n.chapter_slug,
      type: n.type === "criticism" ? "criticism" : n.type === "question" ? "question" : "feedback",
      date: (n.approved_at ?? n.created_at).slice(0, 10),
    });
  }
  return out;
}

export async function getRevisionsForChapter(chapterSlug: string) {
  return db
    .select()
    .from(bookRevisions)
    .where(eq(bookRevisions.chapter_slug, chapterSlug))
    .orderBy(desc(bookRevisions.revised_at));
}

/** Margin notes + revision credits for one chapter (approved only). */
export async function getChapterMarginNotes(chapterSlug: string): Promise<MarginNoteData[]> {
  const notes = await getApprovedMarginNotesForChapter(chapterSlug);
  const revs = await getRevisionsForChapter(chapterSlug);
  const revisionNotes: MarginNoteData[] = revs.map((r) => ({
    id: r.id,
    type: "revision_credit",
    body: r.revision_summary,
    anchorParagraphId: r.paragraph_id,
    date: r.revised_at.slice(0, 10),
  }));
  return [...notes, ...revisionNotes];
}

export async function getMarginNotesByStatus(status: "pending" | "approved" | "rejected") {
  return db
    .select()
    .from(bookMarginNotes)
    .where(eq(bookMarginNotes.status, status))
    .orderBy(desc(bookMarginNotes.created_at));
}

export async function getEndorsementsByStatus(status: "pending" | "approved") {
  return db
    .select()
    .from(bookEndorsements)
    .where(eq(bookEndorsements.status, status))
    .orderBy(desc(bookEndorsements.created_at));
}
