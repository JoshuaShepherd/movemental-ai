import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Topics | Movemental',
  description: 'Explore content by topic across the Movemental network. From formation to leadership, psychology to theology.',
}

// Sample topics data - in production this would come from database
const TOPICS = [
  {
    title: 'Formation & Discipleship',
    slug: 'formation',
    description: 'Spiritual formation, discipleship practices, and personal transformation.',
    icon: '🌱',
    color: 'from-green-500 to-green-700',
    articleCount: 142,
    contributorCount: 28,
  },
  {
    title: 'Leadership',
    slug: 'leadership',
    description: 'Church leadership, organizational development, and team building.',
    icon: '🎯',
    color: 'from-blue-500 to-blue-700',
    articleCount: 198,
    contributorCount: 45,
  },
  {
    title: 'Psychology & Soul Care',
    slug: 'psychology',
    description: 'Integration of psychology, faith, and emotional health.',
    icon: '🧠',
    color: 'from-purple-500 to-purple-700',
    articleCount: 89,
    contributorCount: 18,
  },
  {
    title: 'Movement & Mission',
    slug: 'movement',
    description: 'Missional living, church planting, and movement multiplication.',
    icon: '🔥',
    color: 'from-orange-500 to-orange-700',
    articleCount: 167,
    contributorCount: 34,
  },
  {
    title: 'Theology',
    slug: 'theology',
    description: 'Biblical theology, doctrine, and theological reflection.',
    icon: '📖',
    color: 'from-indigo-500 to-indigo-700',
    articleCount: 234,
    contributorCount: 52,
  },
  {
    title: 'Creativity & Culture',
    slug: 'creativity',
    description: 'Art, creativity, and cultural engagement.',
    icon: '🎨',
    color: 'from-pink-500 to-pink-700',
    articleCount: 67,
    contributorCount: 15,
  },
  {
    title: 'Justice & Reconciliation',
    slug: 'justice',
    description: 'Social justice, racial reconciliation, and community transformation.',
    icon: '⚖️',
    color: 'from-amber-500 to-amber-700',
    articleCount: 78,
    contributorCount: 21,
  },
  {
    title: 'Worship & Liturgy',
    slug: 'worship',
    description: 'Worship practices, liturgical renewal, and sacred arts.',
    icon: '🙏',
    color: 'from-teal-500 to-teal-700',
    articleCount: 56,
    contributorCount: 12,
  },
]

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Explore by Topic
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Discover content across the Movemental network organized by theme. 
            From formation to leadership, find the ideas that matter to you.
          </p>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group block p-6 bg-card border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                      {topic.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{topic.articleCount} pieces</span>
                      <span>{topic.contributorCount} contributors</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
