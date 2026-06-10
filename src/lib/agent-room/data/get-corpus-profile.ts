"use server";

/**
 * INT-06 — the corpus side of the `getProfile` seam.
 *
 * A **server action** (never bundled to the client → no DB credentials or
 * service key reach the browser) that reads one approved leader row from
 * Supabase `movement_leader_corpus_data` and maps the honestly-derivable
 * dimensions to a `Profile` patch. Per the operator decision ("enrich, curated
 * wins") and the substrate honesty doctrine, this returns **only** what the
 * corpus actually holds — `bio` (from `biography`/`identity` markdown) and
 * `work[]` (from the structured `books` / `frameworks` lists). The editorial
 * one-liners (`lede`, `connection`, `workSay`, `connectSay`) have no corpus
 * field and are never synthesized here; the caller keeps the local curated
 * values for those. A missing row or unreachable DB returns `null` (the caller
 * then keeps the local record / honest stub).
 */
import { sql } from "drizzle-orm";

import { db } from "@/lib/db";
import type { ProfileWork } from "./profiles";

/** The subset of `Profile` the corpus can honestly supply. */
export interface CorpusProfilePatch {
  bio?: string;
  work?: ProfileWork[];
}

type Json = unknown;

function asArray(v: Json): Array<Record<string, unknown>> {
  return Array.isArray(v) ? (v as Array<Record<string, unknown>>) : [];
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Pull the first real prose paragraph from a `{ markdown }` JSONB doc. Skips the
 * metadata preamble some rows carry (`**Status**: …`, `**Last updated**: …`),
 * headings (`#`), rules (`---`), tables (`|`), quotes (`>`), and list items
 * (`-`). Returns "" when there's no prose — the caller then keeps the local
 * curated bio (no fabrication).
 */
function extractBio(doc: Json): string {
  if (!doc || typeof doc !== "object") return "";
  const md = str((doc as Record<string, unknown>).markdown);
  if (!md) return "";
  const para = md
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find(
      (p) =>
        p.length > 40 &&
        p.includes(" ") &&
        !/^[#>|\-]/.test(p) &&
        !p.startsWith("**") &&
        !p.startsWith("---"),
    );
  return (para ?? "").replace(/\s+/g, " ").trim();
}

/** Join the first `n` non-empty values into one grounded line ending in a period. */
function joinLine(values: string[], n: number): string {
  const kept = values.filter(Boolean).slice(0, n);
  if (!kept.length) return "";
  const more = values.filter(Boolean).length > n;
  return `${kept.join(", ")}${more ? ", and more." : "."}`;
}

/** Build `work[]` from the structured corpus lists (books, frameworks). */
function buildWork(row: Record<string, Json>): ProfileWork[] {
  const work: ProfileWork[] = [];
  const titles = asArray(row.books).map((b) => str(b.title));
  const books = joinLine(titles, 8);
  if (books) work.push({ t: "Books", g: books });
  const names = asArray(row.frameworks).map((f) => str(f.name));
  const frameworks = joinLine(names, 8);
  if (frameworks) work.push({ t: "Frameworks", g: frameworks });
  return work;
}

export async function getCorpusProfile(slug: string): Promise<CorpusProfilePatch | null> {
  const s = slug.trim().toLowerCase();
  if (!s) return null;
  try {
    const rows = (await db.execute(sql`
      select biography, identity, books, frameworks
      from movement_leader_corpus_data
      where lower(trim(corpus_slug)) = ${s}
      limit 1
    `)) as unknown as Array<Record<string, Json>>;
    const row = rows[0];
    if (!row) return null;

    const bio = extractBio(row.biography) || extractBio(row.identity);
    const work = buildWork(row);

    const patch: CorpusProfilePatch = {};
    if (bio) patch.bio = bio;
    if (work.length) patch.work = work;
    return Object.keys(patch).length ? patch : null;
  } catch {
    // Unreachable DB / missing table → honest local fallback (caller handles null).
    return null;
  }
}
