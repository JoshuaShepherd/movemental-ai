import { Metadata } from 'next'
import { NotAFitPage } from '@/components/main-flow'

export const metadata: Metadata = {
  title: 'Not a fit right now | Movemental',
  description:
    "We're focused on movement leaders first. Get our AI book and stay in the loop for creators like you.",
}

export default function NotAFitContentPage() {
  return <NotAFitPage variant="content" />
}
