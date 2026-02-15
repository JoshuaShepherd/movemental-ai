import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { TourScrollytelling } from '@/components/tour/TourScrollytelling'

export const metadata: Metadata = {
  title: 'Tour | Movemental',
  description:
    'Post-auth tour: orient, clarify, and introduce the decision path.',
  openGraph: {
    title: 'Tour | Movemental',
    description: 'Post-auth scrollytelling tour of the Movemental platform.',
    type: 'website',
  },
  alternates: {
    canonical: '/tour',
  },
}

function getFirstName(user: { user_metadata?: { full_name?: string } } | null): string {
  const fullName = user?.user_metadata?.full_name as string | undefined
  if (!fullName || typeof fullName !== 'string') return ''
  const first = fullName.trim().split(/\s+/)[0]
  return first || ''
}

/**
 * Post-auth tour: GSAP scrollytelling experience.
 * Referenced by fit-check → sign-up → next=/tour and by sign-in redirects.
 */
export default async function TourPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const firstName = getFirstName(user)
  return <TourScrollytelling firstName={firstName} />
}
