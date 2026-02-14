/**
 * Supabase client for Node/test environments.
 * Uses @supabase/supabase-js (no cookies). For auth tests and scripts.
 * Load env from .env.local (or Vite test env) before calling.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function getTestSupabaseClient(): SupabaseClient {
  if (!url || !key) {
    throw new Error(
      'Missing Supabase env for tests: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY). Load .env.local or use vitest env.'
    )
  }
  return createClient(url, key)
}

export function hasSupabaseEnv(): boolean {
  return Boolean(
    (process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL) &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  )
}
