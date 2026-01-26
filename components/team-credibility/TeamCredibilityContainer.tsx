'use client'

import { cn } from '@/lib/utils'
import { Rocket, Users, Globe, Award, Lightbulb, Target } from 'lucide-react'
import { GradientHero } from './GradientHero'
import { Timeline } from './Timeline'
import { TeamGrid } from './TeamGrid'
import { TestimonialQuote } from './TestimonialQuote'
import { NetworkVisualization } from './NetworkVisualization'
import type { Milestone } from './TimelineMilestone'
import type { TeamMember } from './TeamMemberCard'
import type { NetworkMember } from './NetworkVisualization'

interface TeamCredibilityContainerProps {
  className?: string
}

// Sample data - in production this would come from a database or CMS
const MILESTONES: Milestone[] = [
  {
    id: 'founding',
    year: '2023',
    label: 'Vision Formed',
    description: 'Movemental concept developed from years of movement leadership research',
    icon: Lightbulb,
    type: 'milestone',
  },
  {
    id: 'research',
    year: '2024',
    label: 'Research Phase',
    description: 'Deep research into 50+ movement leaders and their platform needs',
    icon: Target,
    type: 'event',
  },
  {
    id: 'beta',
    year: '2025',
    label: 'Platform Beta',
    description: 'First movement leaders onboarded to test the platform',
    icon: Rocket,
    type: 'product',
  },
  {
    id: 'network',
    year: '2025',
    label: 'Network Launch',
    description: 'Movemental network officially launched with founding members',
    icon: Users,
    type: 'event',
  },
  {
    id: 'global',
    year: '2026',
    label: 'Global Expansion',
    description: 'Movement leaders from 20+ countries now on the platform',
    icon: Globe,
    type: 'milestone',
  },
  {
    id: 'today',
    year: 'Today',
    label: 'Growing Network',
    description: 'Continuing to support movement leaders in shipping their vision',
    icon: Award,
    type: 'milestone',
  },
]

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'builder',
    name: 'Platform Team',
    role: 'The Builders',
    bio: 'Technical expertise combined with deep understanding of movement leadership needs. Building tools that serve the mission.',
    socialLinks: [
      { platform: 'twitter', url: '#' },
      { platform: 'linkedin', url: '#' },
    ],
  },
  {
    id: 'authority',
    name: 'Movement Council',
    role: 'Movement Authority',
    bio: 'Decades of experience in missional theology, church planting, and discipleship movements. Guiding the platform direction.',
    socialLinks: [
      { platform: 'website', url: '#' },
    ],
  },
  {
    id: 'practitioners',
    name: 'Pioneer Leaders',
    role: 'Practitioners',
    bio: 'Movement leaders actively using Movemental to reach their communities. Their results shape our roadmap.',
    socialLinks: [
      { platform: 'twitter', url: '#' },
    ],
  },
]

const NETWORK_MEMBERS: NetworkMember[] = [
  { id: 'n1', name: 'Alan H.', role: 'Movement Catalyst', position: { x: 30, y: 20 }, size: 'lg' },
  { id: 'n2', name: 'Brad B.', role: 'Church Planter', position: { x: 70, y: 25 }, size: 'md' },
  { id: 'n3', name: 'Deb H.', role: 'Author', position: { x: 85, y: 50 }, size: 'lg' },
  { id: 'n4', name: 'Dave F.', role: 'Speaker', position: { x: 75, y: 80 }, size: 'sm' },
  { id: 'n5', name: 'Michael F.', role: 'Theologian', position: { x: 15, y: 55 }, size: 'lg' },
  { id: 'n6', name: 'Jeff V.', role: 'Pastor', position: { x: 25, y: 85 }, size: 'md' },
  { id: 'n7', name: 'Hugh H.', role: 'Trainer', position: { x: 55, y: 90 }, size: 'sm' },
  { id: 'n8', name: 'Steve A.', role: 'Researcher', position: { x: 45, y: 15 }, size: 'md' },
]

export function TeamCredibilityContainer({ className }: TeamCredibilityContainerProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      {/* Hero */}
      <GradientHero
        headline="The People Behind Movemental"
        subheadline="Real people, real expertise, committed to helping movement leaders ship their vision"
        cta={{ label: 'Join the Network', href: '/fit-check' }}
      />

      {/* Timeline Section */}
      <section className="py-16 sm:py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From vision to platform—built by practitioners, for practitioners
            </p>
          </div>
          <Timeline milestones={MILESTONES} />
        </div>
      </section>

      {/* Testimonial */}
      <TestimonialQuote
        quote="Movemental understood what we needed before we could articulate it. They've built something that actually serves the mission, not just the metrics."
        author={{
          name: 'Movement Leader',
          title: 'Founding Member',
          company: 'Movemental Network',
          socialHandle: '@movementalleader',
        }}
        backgroundColor="bg-slate-900"
      />

      {/* Team Grid */}
      <TeamGrid
        title="Who We Are"
        subtitle="Builders, movement authorities, and practitioners working together"
        members={TEAM_MEMBERS}
      />

      {/* Network Visualization */}
      <section className="bg-muted/30">
        <NetworkVisualization
          members={NETWORK_MEMBERS}
        />
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Join?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take 60 seconds to see if Movemental is right for you.
          </p>
          <a
            href="/fit-check"
            className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Fit Check
          </a>
        </div>
      </section>
    </div>
  )
}
