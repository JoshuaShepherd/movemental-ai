import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * POST /auth/signout — sign out and redirect to sign-in.
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/sign-in', req.url), { status: 302 })
}
