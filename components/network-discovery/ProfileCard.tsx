'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { FollowButton } from '@/components/leader-profile/FollowButton'
import { BadgeDisplay } from '@/components/leader-profile/BadgeDisplay'

interface ProfileCardProps {
  /** User ID */
  id: string
  /** Display name */
  name: string
  /** Role/title */
  role?: string
  /** Organization */
  organization?: string
  /** Bio/description */
  bio?: string
  /** Avatar URL */
  avatarUrl?: string
  /** Profile URL */
  profileUrl?: string
  /** Follower count */
  followerCount?: number
  /** Badge to display */
  badge?: {
    id: string
    name: string
    type: 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'
  }
  /** Is currently following */
  isFollowing?: boolean
  /** Follow change handler */
  onFollowChange?: (isFollowing: boolean) => void
  /** Card variant */
  variant?: 'default' | 'compact'
  /** Custom class name */
  className?: string
}

export function ProfileCard({
  id,
  name,
  role,
  organization,
  bio,
  avatarUrl,
  profileUrl,
  followerCount,
  badge,
  isFollowing = false,
  onFollowChange,
  variant = 'default',
  className,
}: ProfileCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (variant === 'compact') {
    return (
      <Card className={cn('p-4 hover:shadow-md transition-shadow', className)}>
        <div className="flex items-center gap-3">
          <a
            href={profileUrl}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-primary">{initials}</span>
            )}
          </a>
          <div className="flex-1 min-w-0">
            <a
              href={profileUrl}
              className="font-medium text-sm hover:text-primary hover:underline block truncate"
            >
              {name}
            </a>
            {role && (
              <p className="text-xs text-muted-foreground truncate">{role}</p>
            )}
          </div>
          <FollowButton
            isFollowing={isFollowing}
            onFollowChange={onFollowChange}
            size="sm"
          />
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn('overflow-hidden hover:shadow-md transition-shadow', className)}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <a
            href={profileUrl}
            className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-primary">{initials}</span>
            )}
          </a>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <a
                  href={profileUrl}
                  className="font-semibold hover:text-primary hover:underline"
                >
                  {name}
                </a>
                {badge && (
                  <div className="mt-1">
                    <BadgeDisplay badges={[badge]} size="sm" />
                  </div>
                )}
              </div>
              <FollowButton
                isFollowing={isFollowing}
                onFollowChange={onFollowChange}
                size="sm"
              />
            </div>
            {role && <p className="text-sm text-primary mt-1">{role}</p>}
            {organization && (
              <p className="text-sm text-muted-foreground">{organization}</p>
            )}
          </div>
        </div>

        {bio && (
          <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{bio}</p>
        )}

        {followerCount !== undefined && (
          <p className="text-xs text-muted-foreground mt-3">
            {followerCount.toLocaleString()} followers
          </p>
        )}
      </div>
    </Card>
  )
}
