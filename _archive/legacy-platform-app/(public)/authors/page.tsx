import Link from 'next/link'
import { getAllAuthors } from '@/lib/content'
import { BadgeDisplay } from '@/components/leader-profile/BadgeDisplay'

export const metadata = {
  title: 'Movement Leaders | Movemental',
  description: 'Discover thought leaders in the missional movement - authors, teachers, and practitioners shaping the future of church and mission.',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Movement Leaders</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover thought leaders in the missional movement - authors, teachers, 
            and practitioners shaping the future of church and mission.
          </p>
        </div>

        {/* Authors Grid */}
        {authors.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/profile/${author.slug}`}
                className="group block"
              >
                <div className="bg-card rounded-lg border p-6 h-full transition-all hover:shadow-lg hover:border-primary/20">
                  {/* Avatar and Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {author.avatarUrl ? (
                        <img
                          src={author.avatarUrl}
                          alt={author.displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold text-primary">
                          {author.displayName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {author.displayName}
                      </h2>
                      {author.role && (
                        <p className="text-sm text-muted-foreground">{author.role}</p>
                      )}
                    </div>
                  </div>

                  {/* Badge */}
                  {author.badge && (
                    <div className="mb-3">
                      <BadgeDisplay badges={[author.badge]} size="sm" />
                    </div>
                  )}

                  {/* Bio */}
                  {author.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {author.bio}
                    </p>
                  )}

                  {/* View Profile Link */}
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm text-primary font-medium group-hover:underline">
                      View Profile →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No authors found.</p>
          </div>
        )}

        {/* Coming Soon / More Authors */}
        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-8">
            <h3 className="text-lg font-semibold mb-2">More Leaders Coming Soon</h3>
            <p className="text-muted-foreground">
              We&apos;re continuously adding profiles for movement leaders. 
              Check back soon for more thought leaders and practitioners.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
