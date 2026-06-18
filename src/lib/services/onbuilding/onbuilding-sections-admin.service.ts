import "server-only";

import { asc, count, eq, max, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  movementLeaders,
  onbuildingProfileSections,
} from "@/lib/db/schema";
import type {
  OnbuildingAdminLeader,
  OnbuildingAdminSection,
  OnbuildingSectionCreate,
  OnbuildingSectionUpdate,
} from "@/lib/schemas/onbuilding-admin";
import type { Result } from "@/lib/services/simplified/base.service";

const ok = <T>(data: T): Result<T> => ({ success: true, data });
const fail = (code: string, message: string): Result<never> => ({
  success: false,
  error: { code, message },
});

function mapSection(row: typeof onbuildingProfileSections.$inferSelect): OnbuildingAdminSection {
  return {
    id: row.id,
    movementLeaderId: row.movement_leader_id,
    sectionKey: row.section_key,
    ordinal: row.ordinal,
    title: row.title,
    bodyMd: row.body_md,
    sourceSectionKey: row.source_section_key,
    status: row.status,
    lastEditedBy: row.last_edited_by,
    lastEditedAt: row.last_edited_at,
    ratifiedBy: row.ratified_by,
    ratifiedAt: row.ratified_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listLeadersWithSectionCounts(): Promise<Result<{ leaders: OnbuildingAdminLeader[] }>> {
  try {
    const rows = await db
      .select({
        id: movementLeaders.id,
        slug: movementLeaders.slug,
        fullName: movementLeaders.full_name,
        sectionCount: count(onbuildingProfileSections.id),
      })
      .from(movementLeaders)
      .leftJoin(
        onbuildingProfileSections,
        eq(onbuildingProfileSections.movement_leader_id, movementLeaders.id),
      )
      .groupBy(movementLeaders.id, movementLeaders.slug, movementLeaders.full_name)
      .orderBy(asc(movementLeaders.full_name));

    return ok({
      leaders: rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        fullName: r.fullName,
        sectionCount: Number(r.sectionCount),
      })),
    });
  } catch {
    return fail("INTERNAL", "Failed to list leaders.");
  }
}

export async function listSections(
  movementLeaderId: string,
): Promise<Result<{ sections: OnbuildingAdminSection[] }>> {
  try {
    const rows = await db
      .select()
      .from(onbuildingProfileSections)
      .where(eq(onbuildingProfileSections.movement_leader_id, movementLeaderId))
      .orderBy(asc(onbuildingProfileSections.ordinal), asc(onbuildingProfileSections.section_key));

    return ok({ sections: rows.map(mapSection) });
  } catch {
    return fail("INTERNAL", "Failed to list sections.");
  }
}

export async function getSection(sectionId: string): Promise<Result<{ section: OnbuildingAdminSection }>> {
  try {
    const [row] = await db
      .select()
      .from(onbuildingProfileSections)
      .where(eq(onbuildingProfileSections.id, sectionId))
      .limit(1);

    if (!row) return fail("NOT_FOUND", "Section not found.");
    return ok({ section: mapSection(row) });
  } catch {
    return fail("INTERNAL", "Failed to load section.");
  }
}

export async function createSection(
  actorId: string,
  input: OnbuildingSectionCreate,
): Promise<Result<{ section: OnbuildingAdminSection }>> {
  try {
    let ordinal = input.ordinal;
    if (ordinal === undefined) {
      const [maxRow] = await db
        .select({ maxOrdinal: max(onbuildingProfileSections.ordinal) })
        .from(onbuildingProfileSections)
        .where(eq(onbuildingProfileSections.movement_leader_id, input.movementLeaderId));
      ordinal = (maxRow?.maxOrdinal ?? -1) + 1;
    }

    const now = new Date().toISOString();
    const [row] = await db
      .insert(onbuildingProfileSections)
      .values({
        movement_leader_id: input.movementLeaderId,
        section_key: input.sectionKey,
        title: input.title,
        body_md: input.bodyMd,
        ordinal,
        source_section_key: input.sourceSectionKey ?? null,
        status: input.status,
        last_edited_by: actorId,
        last_edited_at: now,
      })
      .returning();

    return ok({ section: mapSection(row) });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to create section.";
    if (message.includes("unique") || message.includes("duplicate")) {
      return fail("CONFLICT", "A section with this key already exists for this leader.");
    }
    return fail("INTERNAL", "Failed to create section.");
  }
}

export async function updateSection(
  actorId: string,
  sectionId: string,
  patch: OnbuildingSectionUpdate,
): Promise<Result<{ section: OnbuildingAdminSection }>> {
  try {
    const [existing] = await db
      .select()
      .from(onbuildingProfileSections)
      .where(eq(onbuildingProfileSections.id, sectionId))
      .limit(1);

    if (!existing) return fail("NOT_FOUND", "Section not found.");

    const now = new Date().toISOString();
    const updates: Partial<typeof onbuildingProfileSections.$inferInsert> = {
      last_edited_by: actorId,
      last_edited_at: now,
    };

    if (patch.title !== undefined) updates.title = patch.title;
    if (patch.bodyMd !== undefined) {
      updates.body_md = patch.bodyMd;
      if (patch.status === undefined) {
        updates.status = "edited";
      }
    }
    if (patch.ordinal !== undefined) updates.ordinal = patch.ordinal;
    if (patch.sectionKey !== undefined) updates.section_key = patch.sectionKey;
    if (patch.status !== undefined) updates.status = patch.status;

    if (patch.clearRatification) {
      updates.ratified_by = null;
      updates.ratified_at = null;
      if (patch.status === undefined) {
        updates.status = "edited";
      }
    } else if (patch.status && patch.status !== "ratified" && existing.status === "ratified") {
      updates.ratified_by = null;
      updates.ratified_at = null;
    }

    const [row] = await db
      .update(onbuildingProfileSections)
      .set(updates)
      .where(eq(onbuildingProfileSections.id, sectionId))
      .returning();

    return ok({ section: mapSection(row) });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to update section.";
    if (message.includes("unique") || message.includes("duplicate")) {
      return fail("CONFLICT", "A section with this key already exists for this leader.");
    }
    return fail("INTERNAL", "Failed to update section.");
  }
}

export async function deleteSection(sectionId: string): Promise<Result<{ id: string }>> {
  try {
    const [row] = await db
      .delete(onbuildingProfileSections)
      .where(eq(onbuildingProfileSections.id, sectionId))
      .returning({ id: onbuildingProfileSections.id });

    if (!row) return fail("NOT_FOUND", "Section not found.");
    return ok({ id: row.id });
  } catch {
    return fail("INTERNAL", "Failed to delete section.");
  }
}

export async function reorderSections(
  actorId: string,
  movementLeaderId: string,
  orderedSectionIds: string[],
): Promise<Result<{ sections: OnbuildingAdminSection[] }>> {
  try {
    const existing = await db
      .select({ id: onbuildingProfileSections.id })
      .from(onbuildingProfileSections)
      .where(eq(onbuildingProfileSections.movement_leader_id, movementLeaderId));

    const existingIds = new Set(existing.map((r) => r.id));
    if (
      orderedSectionIds.length !== existing.length ||
      orderedSectionIds.some((id) => !existingIds.has(id))
    ) {
      return fail("VALIDATION_ERROR", "Ordered section ids must match all sections for this leader.");
    }

    const now = new Date().toISOString();
    await db.transaction(async (tx) => {
      for (let i = 0; i < orderedSectionIds.length; i += 1) {
        await tx
          .update(onbuildingProfileSections)
          .set({
            ordinal: i,
            last_edited_by: actorId,
            last_edited_at: now,
          })
          .where(eq(onbuildingProfileSections.id, orderedSectionIds[i]!));
      }
    });

    return listSections(movementLeaderId);
  } catch {
    return fail("INTERNAL", "Failed to reorder sections.");
  }
}

export async function reseedSectionsFromCorpus(
  actorId: string,
  movementLeaderId: string,
): Promise<Result<{ inserted: number }>> {
  try {
    const result = await db.execute<{ inserted: number }>(sql`
      with inserted as (
        insert into public.onbuilding_profile_sections
          (movement_leader_id, section_key, ordinal, title, body_md, source_section_key, status, last_edited_by, last_edited_at)
        select
          c.movement_leader_id,
          s.key,
          coalesce((regexp_match(s.key, '^\\s*(\\d+)\\.'))[1]::int, 9999) as ordinal,
          coalesce(nullif(btrim(regexp_replace(s.key, '^\\s*\\d+\\.\\s*', '')), ''), s.key) as title,
          case
            when jsonb_typeof(s.value) = 'string' then s.value #>> '{}'
            when jsonb_typeof(s.value) = 'object' and s.value ? 'markdown' then s.value ->> 'markdown'
            else s.value::text
          end as body_md,
          s.key,
          'draft',
          ${actorId}::uuid,
          now()
        from public.movement_leader_corpus_data c
        cross join lateral jsonb_each(c.substrate_sections) as s(key, value)
        where c.movement_leader_id = ${movementLeaderId}::uuid
        on conflict (movement_leader_id, section_key) do nothing
        returning id
      )
      select count(*)::int as inserted from inserted
    `);

    const inserted = Number(result[0]?.inserted ?? 0);
    return ok({ inserted });
  } catch {
    return fail("INTERNAL", "Failed to reseed sections from corpus.");
  }
}

export async function leaderHasCorpusData(movementLeaderId: string): Promise<boolean> {
  const result = await db.execute<{ exists: boolean }>(sql`
    select exists(
      select 1 from public.movement_leader_corpus_data
      where movement_leader_id = ${movementLeaderId}::uuid
        and substrate_sections is not null
        and substrate_sections <> '{}'::jsonb
    ) as exists
  `);
  return Boolean(result[0]?.exists);
}
