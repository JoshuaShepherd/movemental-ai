#!/usr/bin/env tsx

/**
 * Create tables and seed movement leaders.
 * Uses DRIZZLE_DATABASE_URL (session pooler) with explicit username to avoid postgres.js auth issues.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { z } from 'zod'
import postgres from 'postgres'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const url =
  process.env.DRIZZLE_DATABASE_URL ||
  process.env.SESSION_POOLER_DATABASE_URL ||
  process.env.DATABASE_URL

if (!url) {
  console.error('No database URL found')
  process.exit(1)
}

const parsedUrl = new URL(url)
const username = decodeURIComponent(parsedUrl.username)
const password = decodeURIComponent(parsedUrl.password)

console.log('Connecting to:', url.replace(/:[^:@]*@/, ':***@'))
console.log('Username:', username)

const sql = postgres(url, {
  prepare: false,
  username,
  password,
})

// ── Create tables ──────────────────────────────────────────────────────

async function createTables() {
  console.log('\n--- Creating tables if not exist ---')

  await sql`
    CREATE TABLE IF NOT EXISTS organizations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      organization_type TEXT NOT NULL,
      account_owner_id UUID NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('  organizations: OK')

  await sql`
    CREATE TABLE IF NOT EXISTS onboarding_responses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      organization_id UUID NOT NULL REFERENCES organizations(id),
      best_work_content JSONB,
      best_work_selected JSONB,
      brand_colors TEXT,
      font_preferences TEXT,
      admired_websites JSONB,
      site_feel_description TEXT,
      visitor_feeling TEXT,
      style_constraints JSONB,
      movemental_story TEXT,
      movemental_conversation TEXT,
      target_audience TEXT,
      three_year_impact TEXT,
      movemental_calling TEXT,
      twelve_month_success TEXT,
      what_excites_him TEXT,
      who_to_reach TEXT,
      audience_questions JSONB,
      current_content_locations JSONB,
      audience_needs TEXT,
      regular_content_types JSONB,
      archive_content_to_import JSONB,
      existing_blog_urls JSONB,
      content_sources JSONB,
      time_per_week TEXT,
      publishing_cadence TEXT,
      call_availability JSONB,
      timeline_expectations TEXT,
      income_goal TEXT,
      content_goals TEXT,
      audience_growth_goals TEXT,
      digital_publishing_concerns TEXT,
      quit_risk_factors TEXT,
      support_needs TEXT,
      design_review_preference TEXT,
      preferred_domain TEXT,
      domain_ownership TEXT,
      email_sending_domain TEXT,
      payment_processing_preferences JSONB,
      feature_preferences JSONB,
      network_participation BOOLEAN DEFAULT true,
      network_cross_references BOOLEAN DEFAULT true,
      network_discovery BOOLEAN DEFAULT true,
      network_introduction_preferences JSONB,
      collaboration_interests TEXT,
      bio TEXT,
      photo_url TEXT,
      social_media_links JSONB,
      email TEXT NOT NULL,
      contact_information JSONB,
      current_step TEXT,
      is_complete BOOLEAN DEFAULT false,
      submitted_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('  onboarding_responses: OK')

  await sql`
    CREATE TABLE IF NOT EXISTS write (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name TEXT NOT NULL,
      email TEXT,
      slug TEXT UNIQUE,
      bio TEXT,
      avatar_url TEXT,
      role TEXT,
      organization TEXT,
      tags JSONB,
      linked_user_id UUID,
      linked_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('  write: OK')

  await sql`
    CREATE TABLE IF NOT EXISTS write_content (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      write_id UUID NOT NULL REFERENCES write(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      content_type TEXT NOT NULL,
      body_excerpt TEXT,
      body_full TEXT,
      url TEXT,
      metadata JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('  write_content: OK')
}

// ── Seed writers ───────────────────────────────────────────────────────

const WriterEntrySchema = z.object({
  full_name: z.string().min(1),
  email: z.string().email().nullable().optional(),
  slug: z.string().min(1),
  bio: z.string().nullable().optional(),
  avatar_url: z.string().url().nullable().optional(),
  role: z.string().nullable().optional(),
  organization: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
})

const SourceFileSchema = z.object({
  writers: z.array(WriterEntrySchema).min(1),
})

async function seedWriters() {
  console.log('\n--- Seeding writers ---')

  const filePath = process.argv[2] || './data/movement-leaders.json'
  const absPath = resolve(filePath)
  const raw = readFileSync(absPath, 'utf-8')
  const parsed = JSON.parse(raw)
  const validated = SourceFileSchema.parse(parsed)

  let inserted = 0
  let skipped = 0

  for (const entry of validated.writers) {
    // Check if already exists
    const existing = await sql`
      SELECT id FROM write WHERE slug = ${entry.slug} LIMIT 1
    `

    if (existing.length > 0) {
      console.log(`  Skip (exists): ${entry.full_name} [${entry.slug}]`)
      skipped++
      continue
    }

    const [row] = await sql`
      INSERT INTO write (full_name, email, slug, bio, avatar_url, role, organization, tags)
      VALUES (
        ${entry.full_name},
        ${entry.email ?? null},
        ${entry.slug},
        ${entry.bio ?? null},
        ${entry.avatar_url ?? null},
        ${entry.role ?? null},
        ${entry.organization ?? null},
        ${entry.tags ? JSON.stringify(entry.tags) : null}::jsonb
      )
      RETURNING id
    `
    console.log(`  Inserted: ${entry.full_name} [${entry.slug}] → ${row.id}`)
    inserted++
  }

  console.log(`\nDone: ${inserted} writers inserted, ${skipped} skipped.`)
}

// ── Main ───────────────────────────────────────────────────────────────

async function main() {
  await createTables()
  await seedWriters()
  await sql.end()
  process.exit(0)
}

main().catch(async (err) => {
  console.error('Fatal error:', err)
  await sql.end()
  process.exit(1)
})
