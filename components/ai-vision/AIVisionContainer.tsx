'use client'

import {
  Brain,
  Mic,
  Globe,
  Network,
  Sparkles,
  Shield,
  Users,
  TrendingUp,
} from 'lucide-react'
import { AIVisionHero } from './AIVisionHero'
import { PillarNavigation } from './PillarNavigation'
import { PillarSection } from './PillarSection'
import { ComparisonTable } from './ComparisonTable'
import { NetworkVisualization } from './NetworkVisualization'
import { AIVisionCTA } from './AIVisionCTA'
import { MobileNavTabs } from './MobileNavTabs'
import { ScrollProgressBar } from './ScrollProgressBar'
import { ScrollRevealBlock } from './ScrollRevealBlock'
import { useScrollProgress } from './useScrollProgress'
import { useActiveSection } from './useActiveSection'
import { cn } from '@/lib/utils'

const PILLARS = [
  { id: 'scenius', label: 'Scenius Intelligence' },
  { id: 'amplification', label: 'Amplification' },
  { id: 'network', label: 'Network Aware' },
  { id: 'credibility', label: 'Credibility' },
]

const PILLAR_CONTENT = {
  scenius: {
    title: 'Scenius-Enhanced Intelligence',
    subtitle: 'Pillar 1',
    description:
      'AI trained on the collective knowledge of movement leaders. It understands movemental frameworks, recognizes authentic voice, and maintains theological depth while being practically applicable.',
    features: [
      {
        icon: Brain,
        title: 'Theologically Grounded',
        description:
          'Understands movemental principles like APEST, mDNA, and incarnational theology—not just keywords.',
      },
      {
        icon: Mic,
        title: 'Voice-Aware',
        description:
          'Recognizes and preserves your authentic leader voice across all content creation.',
      },
      {
        icon: Globe,
        title: 'Context-Sensitive',
        description:
          'Adapts to different domains (psychology, tech, worship, justice) while maintaining movemental DNA.',
      },
      {
        icon: Network,
        title: 'Network-Enabled',
        description:
          'Benefits from collective knowledge while serving individual leaders.',
      },
    ],
  },
  amplification: {
    title: 'Amplification, Not Replacement',
    subtitle: 'Pillar 2',
    description:
      'AI creates both the problem (infinite generated content drowning out real expertise) and the opportunity (amplification tools that multiply legitimate voices). Our approach ensures AI amplifies what makes you credible.',
    features: [
      {
        icon: Sparkles,
        title: 'Amplifies Human Creativity',
        description:
          'AI enhances your creative process without replacing the human insight and discernment that makes your work valuable.',
      },
      {
        icon: Shield,
        title: 'Preserves Authenticity',
        description:
          'Maintains authentic voice, theological depth, and relational connection in everything you create.',
      },
      {
        icon: TrendingUp,
        title: 'Helps Expertise Stand Out',
        description:
          'In an AI-saturated world, real expertise needs tools to compete. We help you stand out.',
      },
      {
        icon: Users,
        title: 'Serves Calling, Not Empire',
        description:
          'Tools designed to serve movemental calling, not individual empire-building or platform extraction.',
      },
    ],
  },
  network: {
    title: 'Network-Aware Intelligence',
    subtitle: 'Pillar 3',
    description:
      'AI that understands cross-pollination opportunities between leaders. It identifies connections, facilitates scenius conversations, and enables discovery of adjacent ideas readers didn\'t know they needed.',
    features: [
      {
        icon: Network,
        title: 'Cross-Pollination',
        description:
          'AI-powered recommendations connecting leaders across domains and identifying collaboration opportunities.',
      },
      {
        icon: Users,
        title: 'Scenius Conversations',
        description:
          'Facilitates collective genius through multi-voice dialogues and cross-pollination of ideas.',
      },
      {
        icon: TrendingUp,
        title: '28-500x Amplification',
        description:
          'Content reaches exponentially more people through network effects than isolated platforms.',
      },
      {
        icon: Globe,
        title: 'Adjacent Discovery',
        description:
          'Readers discover voices and ideas they\'d never find on their own through intelligent recommendations.',
      },
    ],
  },
  credibility: {
    title: 'Credibility Through Quality',
    subtitle: 'Pillar 4',
    description:
      'In an AI-saturated world where 40-60% of content is AI-generated, quality and curation build credibility. Movemental Intelligence helps real expertise stand out from synthetic fluency.',
    features: [
      {
        icon: Shield,
        title: 'Quality Over Volume',
        description:
          'Credibility guaranteed by curation and editorial standards, not algorithms or volume metrics.',
      },
      {
        icon: Brain,
        title: 'Real Expertise',
        description:
          'AI designed to distinguish and elevate authentic expertise over AI-generated content.',
      },
      {
        icon: Sparkles,
        title: 'Movemental DNA',
        description:
          'Ensures substantive depth and transformational orientation in everything published.',
      },
      {
        icon: Users,
        title: 'Human Verification',
        description:
          'Editorial standards and human verification maintained throughout the platform.',
      },
    ],
  },
}

const COMPARISON_ITEMS = [
  { generic: 'Keyword-based understanding', movemental: 'Movemental DNA-aware' },
  { generic: 'Voice-agnostic generation', movemental: 'Voice-preserving amplification' },
  { generic: 'Isolated content tools', movemental: 'Network-enabled intelligence' },
  { generic: 'Volume-focused metrics', movemental: 'Quality-focused curation' },
  { generic: 'Platform extraction model', movemental: 'Kingdom advancement focus' },
]

interface AIVisionContainerProps {
  className?: string
}

export function AIVisionContainer({ className }: AIVisionContainerProps) {
  const progress = useScrollProgress()
  const activeId = useActiveSection(PILLARS.map((p) => p.id))

  return (
    <div className={cn('', className)}>
      {/* Scroll Progress */}
      <ScrollProgressBar progress={progress} />

      {/* Hero */}
      <AIVisionHero />

      {/* Mobile Navigation */}
      <MobileNavTabs pillars={PILLARS} activeId={activeId} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <PillarNavigation
                pillars={PILLARS}
                activeId={activeId}
                progress={progress}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Pillar Sections */}
            {PILLARS.map((pillar) => (
              <PillarSection
                key={pillar.id}
                id={pillar.id}
                {...PILLAR_CONTENT[pillar.id as keyof typeof PILLAR_CONTENT]}
              />
            ))}

            {/* Comparison Section */}
            <section className="py-24 sm:py-32">
              <ScrollRevealBlock>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                  Movemental Intelligence vs. Generic AI
                </h2>
                <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  See the difference between AI tools that extract value and AI
                  that amplifies authentic expertise.
                </p>
              </ScrollRevealBlock>
              <ComparisonTable items={COMPARISON_ITEMS} />
            </section>

            {/* Network Visualization */}
            <section className="py-24 sm:py-32">
              <ScrollRevealBlock>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                  The Power of Network Intelligence
                </h2>
                <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  Individual platforms grow stronger through network participation.
                  Your success strengthens the entire network.
                </p>
              </ScrollRevealBlock>
              <NetworkVisualization />
            </section>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <AIVisionCTA />
    </div>
  )
}
