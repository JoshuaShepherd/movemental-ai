import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

/**
 * Alias for sign-in (welcome screen). Matches html/main-flow/welcome.html.
 */
export const metadata: Metadata = {
  title: 'Welcome to Movemental',
  description: 'Continue with Google or email.',
}

export default function WelcomePage() {
  redirect('/sign-in')
}
