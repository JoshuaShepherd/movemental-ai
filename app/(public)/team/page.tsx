import { Metadata } from 'next'
import { TeamPageContainer, type MergedTeamMember } from '@/components/team-credibility'
import { getTeamMembers } from '@/lib/authors'
import { getTeamProfiles, TEAM_HEADSHOT_URLS } from '@/lib/team-profiles'

export const metadata: Metadata = {
  title: 'Team — Movemental | Josh Shepherd, Brad Brisco, Alan Hirsch',
  description:
    'Meet the people behind Movemental: Josh Shepherd (founder, AI & digital strategy), Brad Brisco (missional strategist, first tenant), and Alan Hirsch (100Movements, mDNA, APEST). We build the platform and the network that amplifies it.',
  openGraph: {
    title: 'Team — Movemental | Josh Shepherd, Brad Brisco, Alan Hirsch',
    description:
      'Meet the people behind Movemental: Josh Shepherd, Brad Brisco, and Alan Hirsch. We build the platform and the network that amplifies it.',
    type: 'website',
  },
}

export default async function TeamPage() {
  const authors = await getTeamMembers()
  const profiles = getTeamProfiles()

  const authorBySlug = Object.fromEntries(authors.map((a) => [a.slug, a]))
  const members: MergedTeamMember[] = profiles.map((profile) => ({
    ...profile,
    avatarUrl:
      authorBySlug[profile.slug]?.avatarUrl ?? TEAM_HEADSHOT_URLS[profile.slug],
  }))

  return <TeamPageContainer members={members} />
}
