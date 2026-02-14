import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkProspectiveWriter } from '@/lib/auth/link-prospective-writer'

const DEFAULT_REDIRECT = '/'
const SIGN_IN_PATH = '/sign-in'

/**
 * Auth callback: handles OAuth redirect (code) and email confirmation (token_hash + type).
 * Exchange code or verify OTP, then attempt to link a prospective writer by name,
 * then redirect to `next` or default.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? DEFAULT_REDIRECT

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next.startsWith('/') && !next.startsWith('//') ? next : DEFAULT_REDIRECT
  redirectTo.searchParams.delete('code')
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')
  redirectTo.searchParams.delete('next')

  // OAuth: exchange code for session
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const fullName = (user.user_metadata?.full_name as string) ?? null
        await linkProspectiveWriter(user.id, fullName).catch(() => {})
      }
      return NextResponse.redirect(redirectTo)
    }
    redirectTo.pathname = SIGN_IN_PATH
    redirectTo.searchParams.set('error', error.message)
    return NextResponse.redirect(redirectTo)
  }

  // Email confirmation / magic link
  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const fullName = (user.user_metadata?.full_name as string) ?? null
        await linkProspectiveWriter(user.id, fullName).catch(() => {})
      }
      return NextResponse.redirect(redirectTo)
    }
    redirectTo.pathname = SIGN_IN_PATH
    redirectTo.searchParams.set('error', error.message)
    return NextResponse.redirect(redirectTo)
  }

  return NextResponse.redirect(redirectTo)
}
