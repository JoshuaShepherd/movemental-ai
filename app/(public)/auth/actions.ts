'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AuthActionResult = { success: false; error: string }

function getRedirectPath(nextPath: string | null | undefined, defaultPath: string): string {
  if (nextPath && typeof nextPath === 'string' && nextPath.startsWith('/') && !nextPath.startsWith('//')) {
    return nextPath
  }
  return defaultPath
}

/**
 * Sign in with email and password.
 */
export async function signInWithPassword(
  formData: FormData,
  nextPath?: string
): Promise<AuthActionResult> {
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const next = nextPath ?? (formData.get('next') as string) ?? ''

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      success: false,
      error: error.message === 'Invalid login credentials'
        ? 'Invalid email or password.'
        : error.message,
    }
  }

  revalidatePath('/', 'layout')
  redirect(getRedirectPath(next, '/'))
}

/**
 * Sign up with email and password.
 * Sends confirmation email if Supabase email confirmations are enabled.
 */
export async function signUp(
  formData: FormData,
  nextPath?: string
): Promise<AuthActionResult> {
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const firstName = (formData.get('firstName') as string)?.trim()
  const lastName = (formData.get('lastName') as string)?.trim()
  const next = nextPath ?? (formData.get('next') as string) ?? ''

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  const options: { emailRedirectTo?: string; data?: Record<string, unknown> } = {
    emailRedirectTo: `${baseUrl}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ''}`,
  }
  if (firstName || lastName) {
    options.data = {
      full_name: [firstName, lastName].filter(Boolean).join(' ').trim() || undefined,
    }
  }

  const { data, error } = await supabase.auth.signUp(
    { email, password, options }
  )

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  // If email confirmation is required, user may be unconfirmed
  if (data?.user && !data.session) {
    revalidatePath('/', 'layout')
    redirect('/confirm')
  }

  revalidatePath('/', 'layout')
  redirect(getRedirectPath(next, '/'))
}

/**
 * Sign in with OAuth (e.g. Google). Redirects to provider.
 * nextPath: path to redirect to after callback (e.g. /tour).
 */
export async function signInWithOAuth(
  provider: 'google' | 'github',
  nextPath?: string
): Promise<AuthActionResult> {
  const supabase = await createClient()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  const redirectTo = `${baseUrl}/auth/callback${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ''}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  })

  if (error) {
    return { success: false, error: error.message }
  }
  if (data?.url) {
    redirect(data.url)
  }
  return { success: false, error: 'Could not start sign in.' }
}

/**
 * Sign out and redirect to home (or sign-in).
 */
export async function signOut(): Promise<never> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/sign-in')
}

/**
 * Request a password reset email.
 */
export async function resetPassword(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim()
  if (!email) {
    return { success: false, error: 'Email is required.' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseUrl}/auth/callback?next=/sign-in`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  redirect('/confirm?type=reset')
}
