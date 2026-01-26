'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface MemberCardProps {
  name: string
  role: string
  organization?: string
  bio?: string
  avatarUrl?: string
  profileUrl?: string
  className?: string
}

export function MemberCard({
  name,
  role,
  organization,
  bio,
  avatarUrl,
  profileUrl,
  className,
}: MemberCardProps) {
  return (
    <Card className={cn('overflow-hidden hover:shadow-md transition-shadow', className)}>
      <div className="p-6 flex gap-4">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted shrink-0">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-muted-foreground">
              {name.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-primary">{role}</p>
          {organization && (
            <p className="text-sm text-muted-foreground">{organization}</p>
          )}
          {bio && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{bio}</p>
          )}
          {profileUrl && (
            <Button variant="link" size="sm" className="px-0 mt-2" asChild>
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                View Profile <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
