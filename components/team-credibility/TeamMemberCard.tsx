'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Twitter, Linkedin, Globe } from 'lucide-react'
import Image from 'next/image'

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  avatarUrl?: string
  socialLinks?: {
    platform: 'twitter' | 'linkedin' | 'website'
    url: string
  }[]
}

interface TeamMemberCardProps {
  member: TeamMember
  className?: string
}

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  website: Globe,
}

export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Avatar */}
      <div className="relative h-48 sm:h-56 bg-muted">
        {member.avatarUrl ? (
          <Image
            src={member.avatarUrl}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-5xl font-bold text-primary/50">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
        <p className="text-sm text-primary font-medium">{member.role}</p>

        {member.bio && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
            {member.bio}
          </p>
        )}

        {/* Social links */}
        {member.socialLinks && member.socialLinks.length > 0 && (
          <div className="mt-4 flex gap-2">
            {member.socialLinks.map((link) => {
              const Icon = socialIcons[link.platform]
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
