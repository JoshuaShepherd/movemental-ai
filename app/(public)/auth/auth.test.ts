/**
 * Auth tests: Supabase Auth via client (sign in, sign out, session).
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or ANON_KEY) in .env.local.
 * Optional: PLAYWRIGHT_TEST_EMAIL and PLAYWRIGHT_TEST_PASSWORD for signed-in tests.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { getTestSupabaseClient, hasSupabaseEnv } from '@/lib/supabase/test-client'

const supabase = hasSupabaseEnv() ? getTestSupabaseClient() : null

describe('auth', () => {
  beforeAll(async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
  })

  afterAll(async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
  })

  describe('when Supabase env is configured', () => {
    it('rejects invalid sign-in credentials', async () => {
      if (!supabase) {
        return
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'invalid-auth-test@example.com',
        password: 'wrong-password',
      })
      expect(error).toBeDefined()
      expect(error?.message).toMatch(/invalid|credentials|email|password/i)
      expect(data.session).toBeNull()
      expect(data.user).toBeNull()
    })

    it('returns null session when signed out', async () => {
      if (!supabase) {
        return
      }
      await supabase.auth.signOut()
      const { data: { session } } = await supabase.auth.getSession()
      expect(session).toBeNull()
    })

    it('signs in and returns session when valid credentials are provided', async () => {
      const email = process.env.PLAYWRIGHT_TEST_EMAIL
      const password = process.env.PLAYWRIGHT_TEST_PASSWORD
      if (!supabase || !email || !password) {
        return
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      expect(error).toBeNull()
      expect(data.session).toBeDefined()
      expect(data.user).toBeDefined()
      expect(data.user?.email).toBe(email)
    })

    it('signs out and clears session', async () => {
      const email = process.env.PLAYWRIGHT_TEST_EMAIL
      const password = process.env.PLAYWRIGHT_TEST_PASSWORD
      if (!supabase || !email || !password) {
        return
      }
      await supabase.auth.signInWithPassword({ email, password })
      await supabase.auth.signOut()
      const { data: { session } } = await supabase.auth.getSession()
      expect(session).toBeNull()
    })
  })

  describe('when Supabase env is not configured', () => {
    it('skips integration tests without env', () => {
      if (!hasSupabaseEnv()) {
        expect(supabase).toBeNull()
      }
    })
  })
})
