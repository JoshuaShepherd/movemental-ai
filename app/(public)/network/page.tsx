import { Metadata } from 'next'
import { NetworkDiscoveryContainer } from '@/components/network-discovery'
import { listAuthors, type AuthorRecord } from '@/lib/authors'

export const metadata: Metadata = {
  title: 'Network | Movemental',
  description: 'Discover and connect with movement leaders in the Movemental network.',
}

// Categories for filtering (counts will be computed from authors)
const CATEGORIES = [
  { id: 'authors', name: 'Authors & Writers', color: '#10b981' },
  { id: 'speakers', name: 'Speakers', color: '#f59e0b' },
  { id: 'practitioners', name: 'Practitioners', color: '#3b82f6' },
  { id: 'trainers', name: 'Trainers & Coaches', color: '#8b5cf6' },
  { id: 'researchers', name: 'Researchers', color: '#ec4899' },
  { id: 'community', name: 'Community Leaders', color: '#14b8a6' },
]

// Tags for filtering (mission-focused rather than wellness)
const TAGS = [
  { id: 'mission', name: 'Mission' },
  { id: 'church-planting', name: 'Church Planting' },
  { id: 'formation', name: 'Formation' },
  { id: 'leadership', name: 'Leadership' },
  { id: 'theology', name: 'Theology' },
  { id: 'movements', name: 'Movements' },
  { id: 'training', name: 'Training' },
  { id: 'author', name: 'Author' },
]

/**
 * Convert AuthorRecord to profile format for NetworkDiscoveryContainer
 */
function authorToProfile(author: AuthorRecord) {
  // Derive category from tags or role
  const categoryIds: string[] = []
  if (author.tags?.includes('author') || author.badge?.type === 'author') {
    categoryIds.push('authors')
  }
  if (author.tags?.includes('training') || author.role?.toLowerCase().includes('trainer')) {
    categoryIds.push('trainers')
  }
  if (author.tags?.includes('research') || author.role?.toLowerCase().includes('research')) {
    categoryIds.push('researchers')
  }
  if (author.tags?.includes('pastoral') || author.role?.toLowerCase().includes('pastor')) {
    categoryIds.push('practitioners')
  }
  if (categoryIds.length === 0) {
    categoryIds.push('community')
  }

  return {
    id: author.slug,
    name: author.displayName,
    role: author.role,
    organization: author.organization,
    bio: author.bio,
    avatarUrl: author.avatarUrl,
    profileUrl: author.profileUrl || `/profile/${author.slug}`,
    followerCount: 0, // Would come from database in production
    categoryIds,
    tagIds: author.tags || [],
    badge: author.badge,
  }
}

export default async function NetworkPage() {
  // Load all authors from registry
  const authors = await listAuthors()

  // Convert to profile format and filter out platform-only entries
  const profiles = authors
    .filter((a) => a.slug !== 'movemental') // Exclude collective entries
    .map(authorToProfile)

  // Compute category counts
  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: profiles.filter((p) => p.categoryIds.includes(cat.id)).length,
  }))

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <NetworkDiscoveryContainer
          categories={categoriesWithCounts}
          tags={TAGS}
          profiles={profiles}
          showVisualization={true}
        />
      </div>
      
      {/* Join CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Join the Network
          </h2>
          <p className="text-muted-foreground mb-8">
            Connect with movement leaders, amplify your reach, and collaborate 
            on content that moves.
          </p>
          <a
            href="/fit-check"
            className="inline-flex items-center justify-center h-12 px-6 font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Check Your Fit
          </a>
        </div>
      </section>
    </div>
  )
}
