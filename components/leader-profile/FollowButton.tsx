'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { UserPlus, UserCheck, Bell } from 'lucide-react'

interface FollowButtonProps {
  /** Initial following state */
  isFollowing?: boolean
  /** Callback when follow state changes */
  onFollowChange?: (isFollowing: boolean) => void
  /** Size variant */
  size?: 'sm' | 'default' | 'lg'
  /** Show notification bell option when following */
  showNotifyOption?: boolean
  /** Custom class name */
  className?: string
}

export function FollowButton({
  isFollowing: initialFollowing = false,
  onFollowChange,
  size = 'default',
  showNotifyOption = false,
  className,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [isHovering, setIsHovering] = useState(false)
  const [isNotifying, setIsNotifying] = useState(false)

  const handleClick = () => {
    const newState = !isFollowing
    setIsFollowing(newState)
    onFollowChange?.(newState)
    if (!newState) {
      setIsNotifying(false)
    }
  }

  const handleNotifyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsNotifying(!isNotifying)
  }

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-9 px-4 text-sm',
    lg: 'h-10 px-5 text-sm',
  }

  if (isFollowing) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <Button
          variant={isHovering ? 'destructive' : 'outline'}
          className={cn(
            sizeClasses[size],
            'transition-all duration-200',
            isHovering ? 'border-destructive' : 'border-primary text-primary'
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleClick}
        >
          {isHovering ? (
            'Unfollow'
          ) : (
            <>
              <UserCheck className="h-4 w-4 mr-1.5" />
              Following
            </>
          )}
        </Button>
        {showNotifyOption && (
          <Button
            variant={isNotifying ? 'default' : 'outline'}
            size="icon"
            className={cn(
              'h-9 w-9',
              isNotifying && 'bg-primary text-primary-foreground'
            )}
            onClick={handleNotifyClick}
          >
            <Bell className={cn('h-4 w-4', isNotifying && 'fill-current')} />
          </Button>
        )}
      </div>
    )
  }

  return (
    <Button
      className={cn(sizeClasses[size], className)}
      onClick={handleClick}
    >
      <UserPlus className="h-4 w-4 mr-1.5" />
      Follow
    </Button>
  )
}
