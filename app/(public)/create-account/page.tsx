import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

/**
 * Alias for sign-up. Matches html/main-flow/create-account.html.
 */
export const metadata: Metadata = {
  title: 'Create Account — Movemental',
  description: 'Create your Movemental account.',
}

export default function CreateAccountPage() {
  redirect('/sign-up')
}
