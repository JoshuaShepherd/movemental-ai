'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { TeamProfileLinks } from '@/lib/team-profiles'

interface TeamProfileDetailProps {
  bio: string
  focusAreas: string[]
  proof: string[]
  links: TeamProfileLinks
  className?: string
}

export function TeamProfileDetail({
  bio,
  focusAreas,
  proof,
  links,
  className,
}: TeamProfileDetailProps) {
  return (
    <div
      className={cn(
        'space-y-6 text-muted-foreground',
        className
      )}
    >
      <p className="text-base leading-relaxed">{bio}</p>

      {focusAreas.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Focus areas
          </h4>
          <ul className="space-y-1.5">
            {focusAreas.map((area, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {proof.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Proof / credibility
          </h4>
          <ul className="space-y-2">
            {proof.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button asChild size="sm">
          <a
            href={links.primary.url}
            target={links.primary.url.startsWith('http') ? '_blank' : undefined}
            rel={
              links.primary.url.startsWith('http')
                ? 'noopener noreferrer'
                : undefined
            }
          >
            {links.primary.label}
          </a>
        </Button>
        {links.secondary?.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
