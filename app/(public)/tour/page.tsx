import { Metadata } from 'next'
import { TourScrollytelling } from '@/components/tour'

export const metadata: Metadata = {
  title: 'Tour | Movemental',
  description:
    'Explore how Movemental helps movement leaders structure their content and reach their audience.',
  openGraph: {
    title: 'Tour | Movemental',
    description: 'Post-auth scrollytelling tour of the Movemental platform.',
    type: 'website',
  },
  alternates: {
    canonical: '/tour',
  },
}

/**
 * Post-auth tour: GSAP scrollytelling experience.
 * Referenced by fit-check → sign-up → next=/tour and by sign-in redirects.
 */
export default function TourPage() {
  return <TourScrollytelling />
}
