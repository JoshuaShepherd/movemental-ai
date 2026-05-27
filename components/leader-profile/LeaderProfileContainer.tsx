'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { LeaderProfileHeader } from './LeaderProfileHeader'
import { ProfileTabs } from './ProfileTabs'
import { TopContributions } from './TopContributions'
import { ActivityTimeline } from './ActivityTimeline'
import { BadgeDisplay } from './BadgeDisplay'
import { AuthorCard } from './AuthorCard'
import { FollowingList } from './FollowingList'
import { ProfileEditModal } from './ProfileEditModal'

interface LeaderProfileContainerProps {
  /** Leader data */
  leader: {
    id: string
    displayName: string
    realName?: string
    avatarUrl?: string
    bio?: string
    location?: string
    role?: string
    joinedAt?: string
    lastActive?: string
    followerCount: number
    followingCount: number
    socialLinks?: Array<{
      type: 'twitter' | 'github' | 'linkedin' | 'website'
      url: string
    }>
    badges?: Array<{
      id: string
      name: string
      description?: string
      type: 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'
      level?: number
    }>
    stats?: Array<{
      label: string
      value: string | number
      icon?: 'heart' | 'eye' | 'message' | 'clock' | 'calendar' | 'award'
      accent?: boolean
    }>
    topContributions?: {
      replies: Array<{ id: string; title: string; url: string; date: string; likes?: number }>
      topics: Array<{ id: string; title: string; url: string; date: string; likes?: number }>
      links: Array<{ id: string; title: string; url: string; date: string }>
    }
    recentActivity?: Array<{
      id: string
      type: 'like' | 'comment' | 'share' | 'publish' | 'badge' | 'follow' | 'post'
      title: string
      description?: string
      url?: string
      timestamp: string
      relativeTime: string
    }>
    following?: Array<{
      id: string
      name: string
      avatarUrl?: string
      profileUrl: string
    }>
  }
  /** Is the current user viewing their own profile */
  isOwnProfile?: boolean
  /** Is currently following this leader */
  isFollowing?: boolean
  /** Custom class name */
  className?: string
}

export function LeaderProfileContainer({
  leader,
  isOwnProfile = false,
  isFollowing: initialFollowing = false,
  className,
}: LeaderProfileContainerProps) {
  const [activeTab, setActiveTab] = useState('summary')
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'activity', label: 'Activity', count: leader.recentActivity?.length },
    { id: 'badges', label: 'Badges', count: leader.badges?.length },
  ]

  return (
    <div className={cn('max-w-6xl mx-auto px-4 py-8', className)}>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <LeaderProfileHeader
            displayName={leader.displayName}
            realName={leader.realName}
            avatarUrl={leader.avatarUrl}
            bio={leader.bio}
            location={leader.location}
            role={leader.role}
            joinedAt={leader.joinedAt}
            lastActive={leader.lastActive}
            socialLinks={leader.socialLinks}
            badges={leader.badges?.slice(0, 3)}
            stats={leader.stats}
            followerCount={leader.followerCount}
            followingCount={leader.followingCount}
            isOwnProfile={isOwnProfile}
            isFollowing={isFollowing}
            onEditClick={() => setIsEditModalOpen(true)}
            onFollowChange={setIsFollowing}
          />

          {/* Tabs */}
          <ProfileTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab content */}
          <div className="bg-card rounded-lg border p-6">
            {activeTab === 'summary' && (
              <div className="grid md:grid-cols-2 gap-6">
                {leader.topContributions?.replies && (
                  <TopContributions
                    title="Top Replies"
                    contributions={leader.topContributions.replies.map((r) => ({
                      ...r,
                      type: 'reply' as const,
                    }))}
                  />
                )}
                {leader.topContributions?.topics && (
                  <TopContributions
                    title="Top Topics"
                    contributions={leader.topContributions.topics.map((t) => ({
                      ...t,
                      type: 'topic' as const,
                    }))}
                  />
                )}
                {leader.topContributions?.links && (
                  <TopContributions
                    title="Top Links"
                    contributions={leader.topContributions.links.map((l) => ({
                      ...l,
                      type: 'link' as const,
                    }))}
                    className="md:col-span-2"
                  />
                )}
              </div>
            )}

            {activeTab === 'activity' && (
              <ActivityTimeline
                activities={leader.recentActivity || []}
                showLoadMore
              />
            )}

            {activeTab === 'badges' && (
              <BadgeDisplay
                badges={leader.badges || []}
                variant="list"
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author card (for non-own profiles) */}
          {!isOwnProfile && (
            <AuthorCard
              name={leader.displayName}
              avatarUrl={leader.avatarUrl}
              followerCount={leader.followerCount}
              bio={leader.bio}
              badge={leader.badges?.[0]}
              isFollowing={isFollowing}
              onFollowChange={setIsFollowing}
              profileUrl={`/profile/${leader.id}`}
            />
          )}

          {/* Following list */}
          {leader.following && leader.following.length > 0 && (
            <div className="bg-card rounded-lg border p-4">
              <FollowingList
                title="Following"
                count={leader.followingCount}
                users={leader.following}
                maxVisible={5}
                onSeeAll={() => console.log('See all following')}
              />
            </div>
          )}
        </div>
      </div>

      {/* Edit modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => {
          console.log('Save profile:', data)
          setIsEditModalOpen(false)
        }}
        initialValues={{
          fullName: leader.displayName,
          tagline: leader.role || '',
          bio: leader.bio || '',
          featuredVideo: '',
          socialLinks: [],
          avatarUrl: leader.avatarUrl,
        }}
      />
    </div>
  )
}
