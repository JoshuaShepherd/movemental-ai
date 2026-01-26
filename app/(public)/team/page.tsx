import { Metadata } from 'next'
import { TeamCredibilityContainer } from '@/components/team-credibility'
import { getTeamMembers } from '@/lib/authors'

export const metadata: Metadata = {
  title: 'Our Team | Movemental',
  description: 'Meet the people behind Movemental—builders, movement authorities, and practitioners committed to helping movement leaders ship their vision.',
  openGraph: {
    title: 'The People Behind Movemental',
    description: 'Real people, real expertise, committed to helping movement leaders succeed.',
    type: 'website',
  },
}

export default async function TeamPage() {
  // Load team members from the canonical author registry
  const teamMembers = await getTeamMembers()

  return <TeamCredibilityContainer teamMembers={teamMembers} />
}
