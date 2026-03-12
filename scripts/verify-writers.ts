#!/usr/bin/env tsx
import postgres from 'postgres'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const url = process.env.DRIZZLE_DATABASE_URL || process.env.DATABASE_URL
if (!url) { console.error('No DB URL'); process.exit(1) }

const parsedUrl = new URL(url)
const sql = postgres(url, {
  prepare: false,
  username: decodeURIComponent(parsedUrl.username),
  password: decodeURIComponent(parsedUrl.password),
})

async function main() {
  const rows = await sql`SELECT count(*) as total FROM write`
  console.log('Total writers in DB:', rows[0].total)

  const writers = await sql`SELECT full_name, slug, role FROM write ORDER BY full_name`
  for (const w of writers) {
    console.log(`  ${w.full_name} [${w.slug}] — ${w.role}`)
  }

  await sql.end()
}

main().catch((err) => { console.error(err); process.exit(1) })
