'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { CategorySidebar } from './CategorySidebar'
import { ProfileGrid } from './ProfileGrid'
import { NetworkVisualization } from './NetworkVisualization'
import { Button } from '@/components/ui/button'
import { Grid, List, Sparkles } from 'lucide-react'

interface Category {
  id: string
  name: string
  color: string
  count?: number
}

interface TagItem {
  id: string
  name: string
}

interface Profile {
  id: string
  name: string
  role?: string
  organization?: string
  bio?: string
  avatarUrl?: string
  profileUrl?: string
  followerCount?: number
  categoryIds?: string[]
  tagIds?: string[]
  badge?: {
    id: string
    name: string
    type: 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'
  }
  isFollowing?: boolean
}

interface NetworkDiscoveryContainerProps {
  /** Categories for filtering */
  categories: Category[]
  /** Tags for filtering */
  tags?: TagItem[]
  /** Profiles to display */
  profiles: Profile[]
  /** Show network visualization hero */
  showVisualization?: boolean
  /** Follow change handler */
  onFollowChange?: (profileId: string, isFollowing: boolean) => void
  /** Custom class name */
  className?: string
}

export function NetworkDiscoveryContainer({
  categories,
  tags = [],
  profiles,
  showVisualization = true,
  onFollowChange,
  className,
}: NetworkDiscoveryContainerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleTagSelect = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    )
  }

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      // Category filter
      if (selectedCategory && !profile.categoryIds?.includes(selectedCategory)) {
        return false
      }

      // Tags filter
      if (
        selectedTags.length > 0 &&
        !selectedTags.some((tagId) => profile.tagIds?.includes(tagId))
      ) {
        return false
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          profile.name.toLowerCase().includes(query) ||
          profile.role?.toLowerCase().includes(query) ||
          profile.organization?.toLowerCase().includes(query) ||
          profile.bio?.toLowerCase().includes(query)
        )
      }

      return true
    })
  }, [profiles, selectedCategory, selectedTags, searchQuery])

  // Convert profiles to network members for visualization
  const networkMembers = profiles.slice(0, 20).map((p, i) => ({
    id: p.id,
    name: p.name,
    role: p.role || 'Member',
    avatarUrl: p.avatarUrl,
    position: {
      x: 50 + Math.cos((i / 20) * Math.PI * 2) * 35 + Math.random() * 10,
      y: 50 + Math.sin((i / 20) * Math.PI * 2) * 35 + Math.random() * 10,
    },
    size: (['sm', 'md', 'lg'] as const)[Math.floor(Math.random() * 3)],
  }))

  return (
    <div className={cn('', className)}>
      {/* Network visualization hero */}
      {showVisualization && (
        <section className="mb-8">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">Network Discovery</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Find Your Community</h1>
              <p className="text-muted-foreground">
                Connect with movement leaders, practitioners, and like-minded individuals
                building the future of wellness.
              </p>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-50">
              <NetworkVisualization members={networkMembers} />
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          className="hidden lg:block"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.name
                  : 'All Members'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredProfiles.length} members
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Profile grid */}
          <ProfileGrid
            profiles={filteredProfiles}
            onFollowChange={onFollowChange}
            variant={viewMode === 'list' ? 'compact' : 'default'}
            columns={viewMode === 'list' ? 2 : 3}
          />
        </div>
      </div>
    </div>
  )
}
