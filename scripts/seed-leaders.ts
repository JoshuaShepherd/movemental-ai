#!/usr/bin/env tsx

/**
 * Seed movement leaders into `write` table using session pooler connection.
 * Wraps seed-write-content logic but uses DRIZZLE_DATABASE_URL or SESSION_POOLER_DATABASE_URL
 * to avoid postgres.js issues with the transaction pooler.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'
import { write as writeTable, writeContent as writeContentTable } from '../db/schema'

dotenv.config({ path: '.env.local' })

const url =
  process.env.DRIZZLE_DATABASE_URL ||
  process.env.SESSION_POOLER_DATABASE_URL ||
  process.env.DATABASE_URL

if (!url) {
  console.error('No database URL found')
  process.exit(1)
}

// Extract username from URL to pass explicitly (postgres.js drops the .project-ref part)
const parsedUrl = new URL(url)
const username = decodeURIComponent(parsedUrl.username)
const password = decodeURIComponent(parsedUrl.password)

console.log('Connecting to:', url.replace(/:[^:@]*@/, ':***@'))
console.log('Username:', username)

const client = postgres(url, {
  prepare: false,
  username,
  password,
})
const db = drizzle(client)

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
  const filePath = process.argv[2] || './data/movement-leaders.json'
  const absPath = resolve(filePath)

  let raw: string
  try {
    raw = readFileSync(absPath, 'utf-8')
  } catch {
    console.error(`Could not read file: ${absPath}`)
    process.exit(1)
  }

  const parsed = JSON.parse(raw)
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

  await client.end()
  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
