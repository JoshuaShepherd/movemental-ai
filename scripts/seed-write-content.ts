#!/usr/bin/env tsx

/**
 * Seed / import prospective writers and their content into `write` and `write_content`.
 *
 * Usage:
 *   npx tsx scripts/seed-write-content.ts ./data/prospective-writers-sample.json
 *
 * Source format: JSON file with shape { writers: WriterEntry[] }.
 * See _docs/guides/prospective-writers-content-format.md for full spec.
 *
 * Idempotent by slug: existing writers (matched by slug) are skipped.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { z } from 'zod'
import { db } from '../db/index'
import { write as writeTable, writeContent as writeContentTable } from '../db/schema'
import { eq } from 'drizzle-orm'

// ── Validation schemas ─────────────────────────────────────────────────

const ContentEntrySchema = z.object({
  title: z.string().min(1),
  content_type: z.string().min(1),
  body_excerpt: z.string().nullable().optional(),
  body_full: z.string().nullable().optional(),
  url: z.string().url().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
})

const WriterEntrySchema = z.object({
  full_name: z.string().min(1),
  email: z.string().email().nullable().optional(),
  slug: z.string().min(1),
  bio: z.string().nullable().optional(),
  avatar_url: z.string().url().nullable().optional(),
  role: z.string().nullable().optional(),
  organization: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  content: z.array(ContentEntrySchema).optional().default([]),
})

const SourceFileSchema = z.object({
  writers: z.array(WriterEntrySchema).min(1),
})

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    console.error('Usage: npx tsx scripts/seed-write-content.ts <path-to-json>')
    process.exit(1)
  }

  const absPath = resolve(filePath)
  let raw: string
  try {
    raw = readFileSync(absPath, 'utf-8')
  } catch {
    console.error(`Could not read file: ${absPath}`)
    process.exit(1)
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    console.error('File is not valid JSON.')
    process.exit(1)
  }

  const validated = SourceFileSchema.safeParse(parsed)
  if (!validated.success) {
    console.error('Validation errors:')
    for (const issue of validated.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`)
    }
    process.exit(1)
  }

  const { writers } = validated.data
  let writersInserted = 0
  let writersSkipped = 0
  let contentInserted = 0

  for (const entry of writers) {
    // Check for existing writer by slug (idempotent)
    const [existing] = await db
      .select({ id: writeTable.id })
      .from(writeTable)
      .where(eq(writeTable.slug, entry.slug))
      .limit(1)

    let writeId: string

    if (existing) {
      console.log(`  Skip (exists): ${entry.full_name} [${entry.slug}]`)
      writeId = existing.id
      writersSkipped++
    } else {
      const [inserted] = await db
        .insert(writeTable)
        .values({
          fullName: entry.full_name,
          email: entry.email ?? null,
          slug: entry.slug,
          bio: entry.bio ?? null,
          avatarUrl: entry.avatar_url ?? null,
          role: entry.role ?? null,
          organization: entry.organization ?? null,
          tags: entry.tags ?? null,
        })
        .returning({ id: writeTable.id })

      writeId = inserted.id
      console.log(`  Inserted writer: ${entry.full_name} [${entry.slug}] → ${writeId}`)
      writersInserted++
    }

    // Insert content items
    for (const c of entry.content) {
      await db.insert(writeContentTable).values({
        writeId,
        title: c.title,
        contentType: c.content_type,
        bodyExcerpt: c.body_excerpt ?? null,
        bodyFull: c.body_full ?? null,
        url: c.url ?? null,
        metadata: c.metadata ?? null,
      })
      contentInserted++
      console.log(`    Content: "${c.title}" (${c.content_type})`)
    }
  }

  console.log(
    `\nDone: ${writersInserted} writers inserted, ${writersSkipped} skipped, ${contentInserted} content items inserted.`
  )
  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
