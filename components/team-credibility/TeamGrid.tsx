'use client'

import { cn } from '@/lib/utils'
import { TeamMemberCard, TeamMember } from './TeamMemberCard'

interface TeamGridProps {
  members: TeamMember[]
  title?: string
  subtitle?: string
  className?: string
}

export function TeamGrid({
  members,
  title = 'Our Team',
  subtitle,
  className,
}: TeamGridProps) {
  return (
    <section className={cn('py-16 sm:py-24 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
