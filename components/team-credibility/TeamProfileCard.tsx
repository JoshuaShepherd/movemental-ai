'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'

export interface TeamProfileCardMember {
  slug: string
  name: string
  role: string
  tagline: string
  avatarUrl?: string
  photoAlt: string
}

interface TeamProfileCardProps {
  member: TeamProfileCardMember
  isExpanded: boolean
  onToggle: () => void
  className?: string
}

export function TeamProfileCard({
  member,
  isExpanded,
  onToggle,
  className,
}: TeamProfileCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Photo: 4:5 aspect ratio */}
      <div className="relative aspect-[4/5] w-full bg-muted">
        {member.avatarUrl ? (
          <Image
            src={member.avatarUrl}
            alt={member.photoAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-5xl font-bold text-primary/50">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="font-semibold text-lg text-foreground">{member.name}</h2>
        <p className="text-sm text-primary font-medium mt-0.5">{member.role}</p>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
          {member.tagline}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4 w-full justify-center gap-1"
          onClick={onToggle}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              Close
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Read more
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
