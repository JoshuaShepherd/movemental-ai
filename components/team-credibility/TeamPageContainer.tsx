'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GradientHero } from './GradientHero'
import { TeamProfileCard } from './TeamProfileCard'
import { TeamProfileDetail } from './TeamProfileDetail'
import type { TeamProfile } from '@/lib/team-profiles'

export interface MergedTeamMember extends TeamProfile {
  avatarUrl?: string
}

interface TeamPageContainerProps {
  members: MergedTeamMember[]
  className?: string
}

export function TeamPageContainer({
  members,
  className,
}: TeamPageContainerProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  // Open profile from hash on mount (e.g. /team#josh-shepherd)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.slice(1)
    if (hash && members.some((m) => m.slug === hash)) {
      setExpandedSlug(hash)
    }
  }, [members])

  // Scroll expanded block into view when opening
  useEffect(() => {
    if (!expandedSlug) return
    const el = document.getElementById(expandedSlug)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [expandedSlug])

  const toggle = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug))
  }

  return (
    <div className={className ?? 'min-h-screen'}>
      <GradientHero
        headline="The people behind Movemental."
        subheadline="We build the platform and the network that amplifies it."
      />

      <section className="py-16 sm:py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <div key={member.slug} className="flex flex-col gap-6">
                <TeamProfileCard
                  member={{
                    slug: member.slug,
                    name: member.name,
                    role: member.role,
                    tagline: member.tagline,
                    avatarUrl: member.avatarUrl,
                    photoAlt: member.photoAlt,
                  }}
                  isExpanded={expandedSlug === member.slug}
                  onToggle={() => toggle(member.slug)}
                />
                {expandedSlug === member.slug && (
                  <div
                    id={member.slug}
                    className="rounded-lg border bg-card p-6 scroll-mt-8"
                  >
                    <TeamProfileDetail
                      bio={member.bio}
                      focusAreas={member.focusAreas}
                      proof={member.proof}
                      links={member.links}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to explore the platform?
          </p>
          <Button asChild size="lg">
            <Link href="/fit-check">Get started</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
