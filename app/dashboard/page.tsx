'use client'

import { useState } from 'react'
import { ProjectGrid } from '@/components/dashboard'
import { NudgePopup } from '@/components/dashboard'

// Sample data - in production would come from API
const SAMPLE_PROJECTS = [
  {
    id: '1',
    title: 'The Art of Movement Leadership',
    description: 'A deep dive into what it means to lead movements in the modern age.',
    type: 'article' as const,
    status: 'published' as const,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    href: '/dashboard/articles/1',
  },
  {
    id: '2',
    title: 'Introduction to Platform Ownership',
    description: 'Understanding why owning your platform matters.',
    type: 'video' as const,
    status: 'draft' as const,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 3),
    href: '/dashboard/videos/2',
  },
  {
    id: '3',
    title: 'Movement Leadership Fundamentals',
    description: 'A comprehensive course on building and leading movements.',
    type: 'course' as const,
    status: 'published' as const,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    href: '/dashboard/courses/3',
  },
]

export default function DashboardPage() {
  const [showNudge, setShowNudge] = useState(true)

  return (
    <div>
      {/* Nudge popup for new users */}
      {showNudge && (
        <NudgePopup
          id="welcome-tour"
          headline="Welcome to Movemental!"
          description="Take a quick tour to learn how to create and manage your content."
          primaryAction={{
            label: 'Start Tour',
            onClick: () => {
              setShowNudge(false)
              // Start tour
            },
          }}
          secondaryAction={{
            label: 'Maybe Later',
            onClick: () => setShowNudge(false),
          }}
          position="top-center"
          onDismiss={() => setShowNudge(false)}
        />
      )}

      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your Content
        </h2>
        <p className="text-muted-foreground">
          Manage your articles, videos, and courses from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Content', value: '12' },
          { label: 'Published', value: '8' },
          { label: 'Drafts', value: '4' },
          { label: 'Views This Month', value: '1.2K' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 bg-card border rounded-lg"
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <ProjectGrid
        projects={SAMPLE_PROJECTS}
        emptyStateTitle="No content yet"
        emptyStateDescription="Create your first piece of content to start reaching your audience."
        onCreateNew={() => {
          // Navigate to create page
        }}
      />
    </div>
  )
}
