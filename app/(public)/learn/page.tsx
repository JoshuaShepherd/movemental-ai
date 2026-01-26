import { Metadata } from 'next'
import { VideoLearningCard, GradientResourceCard, CategoryCard } from '@/components/course-enrollment'

export const metadata: Metadata = {
  title: 'Learn | Movemental',
  description: 'Discover courses, tutorials, and resources to help you create content that moves.',
}

const FEATURED_VIDEOS = [
  { id: '1', title: 'Getting Started with Movemental', duration: '15m', href: '/learn/getting-started' },
  { id: '2', title: 'Creating Your First Course', duration: '10m', href: '/learn/first-course' },
  { id: '3', title: 'Platform Ownership Explained', duration: '12m', href: '/learn/ownership' },
]

const RESOURCE_CARDS = [
  { title: 'In-App Tour', description: 'A guided walkthrough of the platform', gradient: 'blue-teal' as const, href: '/learn/tour' },
  { title: '3 Hour Course', description: 'Comprehensive platform mastery', gradient: 'purple-pink' as const, href: '/learn/mastery' },
  { title: 'Video Library', description: 'All tutorials in one place', gradient: 'orange-red' as const, href: '/learn/videos' },
  { title: 'Examples', description: 'Real platforms built with Movemental', gradient: 'blue-purple' as const, href: '/learn/examples' },
]

const CATEGORIES = [
  { id: '1', title: 'Content Strategy', subtitle: 'Plan and organize your content', href: '/learn/content-strategy' },
  { id: '2', title: 'Course Creation', subtitle: 'Build engaging courses', href: '/learn/course-creation' },
  { id: '3', title: 'Audience Growth', subtitle: 'Grow your following', href: '/learn/audience-growth' },
  { id: '4', title: 'Monetization', subtitle: 'Revenue strategies', href: '/learn/monetization' },
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Learn Movemental
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to create content that moves—from quick tutorials 
          to comprehensive courses.
        </p>
      </section>

      {/* Featured videos */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Get Started</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_VIDEOS.map((video) => (
              <VideoLearningCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </section>

      {/* Resource cards */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Resources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {RESOURCE_CARDS.map((card) => (
              <GradientResourceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Topic</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
