'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { MoreHorizontal, UserMinus, BellOff, Flag } from 'lucide-react'

interface FollowingUser {
  id: string
  name: string
  avatarUrl?: string
  profileUrl: string
}

interface FollowingListProps {
  /** Section title */
  title: string
  /** Total count */
  count: number
  /** Array of users */
  users: FollowingUser[]
  /** Max users to show */
  maxVisible?: number
  /** "See all" click handler */
  onSeeAll?: () => void
  /** Unfollow handler */
  onUnfollow?: (userId: string) => void
  /** Mute handler */
  onMute?: (userId: string) => void
  /** Report handler */
  onReport?: (userId: string) => void
  /** Custom class name */
  className?: string
}

export function FollowingList({
  title,
  count,
  users,
  maxVisible = 5,
  onSeeAll,
  onUnfollow,
  onMute,
  onReport,
  className,
}: FollowingListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const visibleUsers = users.slice(0, maxVisible)

  const handleMenuToggle = (userId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenMenuId(openMenuId === userId ? null : userId)
  }

  return (
    <div className={cn('', className)}>
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      
      <div className="space-y-1">
        {visibleUsers.map((user) => {
          const initials = user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)

          return (
            <div key={user.id} className="relative">
              <div className="flex items-center gap-3 py-1.5 group">
                <a
                  href={user.profileUrl}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium text-primary">
                      {initials}
                    </span>
                  )}
                </a>
                <a
                  href={user.profileUrl}
                  className="flex-1 min-w-0 text-sm hover:text-primary hover:underline truncate"
                >
                  {user.name}
                </a>
                <button
                  onClick={(e) => handleMenuToggle(user.id, e)}
                  className="p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-all"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Dropdown menu */}
              {openMenuId === user.id && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenuId(null)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-40 bg-popover border rounded-lg shadow-lg z-50 py-1">
                    {onUnfollow && (
                      <button
                        onClick={() => {
                          onUnfollow(user.id)
                          setOpenMenuId(null)
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
                      >
                        <UserMinus className="h-4 w-4" />
                        Unfollow
                      </button>
                    )}
                    {onMute && (
                      <button
                        onClick={() => {
                          onMute(user.id)
                          setOpenMenuId(null)
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
                      >
                        <BellOff className="h-4 w-4" />
                        Mute
                      </button>
                    )}
                    {onReport && (
                      <button
                        onClick={() => {
                          onReport(user.id)
                          setOpenMenuId(null)
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors w-full text-left text-destructive"
                      >
                        <Flag className="h-4 w-4" />
                        Report
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {count > maxVisible && onSeeAll && (
        <button
          onClick={onSeeAll}
          className="mt-3 text-sm text-primary hover:underline"
        >
          See all ({count})
        </button>
      )}
    </div>
  )
}
