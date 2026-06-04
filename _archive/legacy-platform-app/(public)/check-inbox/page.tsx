import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

/**
 * Alias for confirm (check your inbox). Matches html/main-flow/check-inbox.html.
 */
export const metadata: Metadata = {
  title: 'Check your inbox — Movemental',
  description: 'We sent you an activation link. Please be sure to check your spam folder too.',
}

export default function CheckInboxPage() {
  redirect('/confirm')
}
