'use client'

import { cn } from '@/lib/utils'
import { MapPin, Twitter, Github, Linkedin, Globe, Calendar, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BadgeDisplay } from './BadgeDisplay'
import { ProfileStatsRow } from './ProfileStatsRow'
import { FollowButton } from './FollowButton'

interface SocialLink {
  type: 'twitter' | 'github' | 'linkedin' | 'website'
  url: string
  username?: string
}

interface LeaderProfileHeaderProps {
  /** Leader's display name */
  displayName: string
  /** Leader's real name (optional) */
  realName?: string
  /** Avatar URL */
  avatarUrl?: string
  /** Bio/tagline */
  bio?: string
  /** Location */
  location?: string
  /** Role/title */
  role?: string
  /** Social links */
  socialLinks?: SocialLink[]
  /** Join date */
  joinedAt?: string
  /** Last active */
  lastActive?: string
  /** Badges to display */
  badges?: Array<{
    id: string
    name: string
    type: 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'
  }>
  /** Stats to display */
  stats?: Array<{
    label: string
    value: string | number
    icon?: 'heart' | 'eye' | 'message' | 'clock' | 'calendar' | 'award'
    accent?: boolean
  }>
  /** Follower count */
  followerCount?: number
  /** Following count */
  followingCount?: number
  /** Is the current user viewing their own profile */
  isOwnProfile?: boolean
  /** Is currently following this leader */
  isFollowing?: boolean
  /** Edit button click handler */
  onEditClick?: () => void
  /** Follow change handler */
  onFollowChange?: (isFollowing: boolean) => void
  /** Follower count click handler */
  onFollowersClick?: () => void
  /** Following count click handler */
  onFollowingClick?: () => void
  /** Custom class name */
  className?: string
}

const socialIconMap = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  website: Globe,
}

export function LeaderProfileHeader({
  displayName,
  realName,
  avatarUrl,
  bio,
  location,
  role,
  socialLinks = [],
  joinedAt,
  lastActive,
  badges = [],
  stats = [],
  followerCount = 0,
  followingCount = 0,
  isOwnProfile = false,
  isFollowing = false,
  onEditClick,
  onFollowChange,
  onFollowersClick,
  onFollowingClick,
  className,
}: LeaderProfileHeaderProps) {
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={cn('bg-card rounded-lg border p-6', className)}>
      {/* Top section - Avatar and main info */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-4 ring-background">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {initials}
              </span>
            )}
          </div>
          {isOwnProfile && (
            <button
              className="absolute bottom-0 right-0 p-2 bg-background border rounded-full shadow-sm hover:bg-accent transition-colors"
              onClick={onEditClick}
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              {/* Name and role */}
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold">{displayName}</h1>
                {badges.length > 0 && (
                  <BadgeDisplay badges={badges} size="sm" maxVisible={2} />
                )}
              </div>
              {realName && realName !== displayName && (
                <p className="text-muted-foreground">{realName}</p>
              )}
              {role && (
                <p className="text-sm font-medium text-primary mt-1">{role}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {isOwnProfile ? (
                <Button variant="outline" onClick={onEditClick}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <FollowButton
                  isFollowing={isFollowing}
                  onFollowChange={onFollowChange}
                  showNotifyOption
                />
              )}
            </div>
          </div>

          {/* Bio */}
          {bio && (
            <p className="mt-3 text-muted-foreground max-w-2xl">{bio}</p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {location}
              </span>
            )}
            {joinedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {joinedAt}
              </span>
            )}
            {lastActive && (
              <span>Last active {lastActive}</span>
            )}
          </div>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              {socialLinks.map((link, index) => {
                const Icon = socialIconMap[link.type]
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          )}

          {/* Follower/Following counts */}
          <div className="flex items-center gap-4 mt-4">
            <button
              className="text-sm hover:underline"
              onClick={onFollowersClick}
            >
              <span className="font-semibold">{followerCount.toLocaleString()}</span>{' '}
              <span className="text-muted-foreground">Followers</span>
            </button>
            <button
              className="text-sm hover:underline"
              onClick={onFollowingClick}
            >
              <span className="font-semibold">{followingCount.toLocaleString()}</span>{' '}
              <span className="text-muted-foreground">Following</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      {stats.length > 0 && (
        <div className="mt-6 pt-6 border-t">
          <ProfileStatsRow stats={stats} size="sm" />
        </div>
      )}
    </div>
  )
}
