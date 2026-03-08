import { notFound } from 'next/navigation'
import { LeaderProfileContainer } from '@/components/leader-profile'
import { getAuthorBySlug, getAuthorSlugs } from '@/lib/content'

// Generate static params for all known authors
export async function generateStaticParams() {
  const slugs = getAuthorSlugs()
  return slugs.map((slug) => ({ id: slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const author = await getAuthorBySlug(id)
  
  if (!author) {
    return { title: 'Profile Not Found' }
  }

  return {
    title: `${author.displayName} | Movemental`,
    description: author.bio || `Profile of ${author.displayName}`,
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // Handle special "me" case for own profile
  if (id === 'me') {
    // In a real app, you would get the current user's profile
    // For now, redirect to a default or show a placeholder
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
          <p className="text-muted-foreground">Sign in to view your profile</p>
        </div>
      </main>
    )
  }

  // Fetch author data from markdown files
  const author = await getAuthorBySlug(id)

  if (!author) {
    notFound()
  }

  // Transform author data to match LeaderProfileContainer props
  const leaderData = {
    id: author.id,
    displayName: author.displayName,
    realName: author.realName,
    avatarUrl: author.avatarUrl,
    bio: author.bio,
    location: author.location,
    role: author.role,
    joinedAt: author.joinedAt,
    lastActive: author.lastActive,
    followerCount: author.followerCount,
    followingCount: author.followingCount,
    socialLinks: author.socialLinks,
    badges: author.badges,
    stats: author.stats,
    topContributions: author.topContributions,
    recentActivity: author.recentActivity,
    following: author.following,
  }

  return (
    <main className="min-h-screen bg-background">
      <LeaderProfileContainer
        leader={leaderData}
        isOwnProfile={false}
        isFollowing={false}
      />
      
      {/* Extended profile content from markdown */}
      {author.executiveSummary && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-card rounded-lg border p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">About {author.displayName}</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {author.executiveSummary}
            </p>
          </div>
        </div>
      )}

      {/* Books section */}
      {author.books && author.books.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Published Works</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {author.books.map((book, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {[book.year, book.publisher].filter(Boolean).join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Organizations section */}
      {author.organizations && author.organizations.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Organizations & Roles</h2>
            <div className="space-y-3">
              {author.organizations.map((org, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <h3 className="font-medium">{org.name}</h3>
                  {org.description && (
                    <p className="text-sm text-muted-foreground">{org.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Core Competencies */}
      {author.coreCompetencies && author.coreCompetencies.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {author.coreCompetencies.map((competency, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {competency}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
