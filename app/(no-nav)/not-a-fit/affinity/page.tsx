import { Metadata } from 'next'
import { NotAFitPage } from '@/components/main-flow'

export const metadata: Metadata = {
  title: "You're in the right neighborhood | Movemental",
  description:
    "We're focused on movement leaders first. You're the kind of person their platforms are for. Explore our book and stay in the loop.",
}

export default function NotAFitAffinityPage() {
  return <NotAFitPage variant="affinity" />
}
