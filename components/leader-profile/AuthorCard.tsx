'use client'

import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { BadgeDisplay } from './BadgeDisplay'
import { FollowButton } from './FollowButton'

interface AuthorCardProps {
  /** Author's display name */
  name: string
  /** Avatar URL */
  avatarUrl?: string
  /** Follower count */
  followerCount?: number
  /** Bio/description */
  bio?: string
  /** Badge to display */
  badge?: {
    id: string
    name: string
    type: 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'
  }
  /** External links */
  externalLinks?: Array<{ label: string; url: string }>
  /** Is currently following */
  isFollowing?: boolean
  /** Follow change handler */
  onFollowChange?: (isFollowing: boolean) => void
  /** Profile URL */
  profileUrl?: string
  /** Custom class name */
  className?: string
}

export function AuthorCard({
  name,
  avatarUrl,
  followerCount = 0,
  bio,
  badge,
  externalLinks = [],
  isFollowing = false,
  onFollowChange,
  profileUrl,
  className,
}: AuthorCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={cn('bg-card rounded-lg border p-4', className)}>
      {/* Avatar and basic info */}
      <div className="flex items-center gap-3">
        <a
          href={profileUrl}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-primary">{initials}</span>
          )}
        </a>
        <div className="flex-1 min-w-0">
          <a
            href={profileUrl}
            className="font-semibold text-sm hover:text-primary hover:underline block truncate"
          >
            {name}
          </a>
          <p className="text-xs text-muted-foreground">
            {followerCount.toLocaleString()} Followers
          </p>
        </div>
      </div>

      {/* Badge */}
      {badge && (
        <div className="mt-3">
          <BadgeDisplay badges={[badge]} size="sm" />
        </div>
      )}

      {/* Bio */}
      {bio && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{bio}</p>
      )}

      {/* External links */}
      {externalLinks.length > 0 && (
        <div className="mt-3 space-y-1">
          {externalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              {link.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}

      {/* Follow button */}
      <div className="mt-4">
        <FollowButton
          isFollowing={isFollowing}
          onFollowChange={onFollowChange}
          size="sm"
          className="w-full justify-center"
        />
      </div>
    </div>
  )
}
