import { permanentRedirect } from 'next/navigation'

/**
 * Tour alias: post-auth landing page. Redirects to How It Works
 * (the onboarding path overview). Referenced by fit-check → sign-up → next=/tour
 * and by sign-in redirects.
 */
export default function TourPage() {
  permanentRedirect('/how-it-works')
}
