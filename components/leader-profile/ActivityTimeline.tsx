'use client'

import { cn } from '@/lib/utils'
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  BookOpen, 
  Award,
  UserPlus,
  FileText
} from 'lucide-react'

type ActivityType = 'like' | 'comment' | 'share' | 'publish' | 'badge' | 'follow' | 'post'

interface Activity {
  id: string
  type: ActivityType
  title: string
  description?: string
  url?: string
  timestamp: string
  relativeTime: string
}

interface ActivityTimelineProps {
  /** Array of activities */
  activities: Activity[]
  /** Max items to show */
  maxItems?: number
  /** Show "load more" button */
  showLoadMore?: boolean
  /** Load more click handler */
  onLoadMore?: () => void
  /** Custom class name */
  className?: string
}

const activityConfig: Record<ActivityType, { icon: typeof Heart; color: string; bgColor: string }> = {
  like: { icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-100' },
  comment: { icon: MessageSquare, color: 'text-blue-500', bgColor: 'bg-blue-100' },
  share: { icon: Share2, color: 'text-green-500', bgColor: 'bg-green-100' },
  publish: { icon: BookOpen, color: 'text-purple-500', bgColor: 'bg-purple-100' },
  badge: { icon: Award, color: 'text-amber-500', bgColor: 'bg-amber-100' },
  follow: { icon: UserPlus, color: 'text-cyan-500', bgColor: 'bg-cyan-100' },
  post: { icon: FileText, color: 'text-indigo-500', bgColor: 'bg-indigo-100' },
}

export function ActivityTimeline({
  activities,
  maxItems = 10,
  showLoadMore = false,
  onLoadMore,
  className,
}: ActivityTimelineProps) {
  const visibleActivities = activities.slice(0, maxItems)

  if (visibleActivities.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-muted-foreground">No recent activity.</p>
      </div>
    )
  }

  return (
    <div className={cn('', className)}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

        {/* Activities */}
        <div className="space-y-4">
          {visibleActivities.map((activity, index) => {
            const config = activityConfig[activity.type]
            const Icon = config.icon

            return (
              <div key={activity.id} className="relative flex gap-4 pl-0">
                {/* Icon */}
                <div
                  className={cn(
                    'relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                    config.bgColor
                  )}
                >
                  <Icon className={cn('h-4 w-4', config.color)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {activity.url ? (
                        <a
                          href={activity.url}
                          className="text-sm font-medium hover:text-primary hover:underline"
                        >
                          {activity.title}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{activity.title}</p>
                      )}
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {activity.description}
                        </p>
                      )}
                    </div>
                    <time
                      className="text-xs text-muted-foreground whitespace-nowrap"
                      title={activity.timestamp}
                    >
                      {activity.relativeTime}
                    </time>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showLoadMore && activities.length > maxItems && (
        <button
          onClick={onLoadMore}
          className="mt-4 w-full py-2 text-sm text-primary hover:underline"
        >
          Load more activity
        </button>
      )}
    </div>
  )
}
