'use client'

import { cn } from '@/lib/utils'
import { ProfileCard } from './ProfileCard'
import { Users } from 'lucide-react'

interface Profile {
  id: string
  name: string
  role?: string
  organization?: string
  bio?: string
  avatarUrl?: string
  profileUrl?: string
  followerCount?: number
  badge?: {
    id: string
    name: string
    type: 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'
  }
  isFollowing?: boolean
}

interface ProfileGridProps {
  /** Array of profiles */
  profiles: Profile[]
  /** Follow change handler */
  onFollowChange?: (profileId: string, isFollowing: boolean) => void
  /** Card variant */
  variant?: 'default' | 'compact'
  /** Grid columns */
  columns?: 2 | 3 | 4
  /** Loading state */
  isLoading?: boolean
  /** Custom class name */
  className?: string
}

export function ProfileGrid({
  profiles,
  onFollowChange,
  variant = 'default',
  columns = 3,
  isLoading = false,
  className,
}: ProfileGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (isLoading) {
    return (
      <div className={cn('grid gap-4', columnClasses[columns], className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-muted rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (profiles.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">No members found</h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Try adjusting your filters or search query
        </p>
      </div>
    )
  }

  return (
    <div className={cn('grid gap-4', columnClasses[columns], className)}>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          {...profile}
          onFollowChange={
            onFollowChange
              ? (isFollowing) => onFollowChange(profile.id, isFollowing)
              : undefined
          }
          variant={variant}
        />
      ))}
    </div>
  )
}
