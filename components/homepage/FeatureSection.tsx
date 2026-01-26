'use client'

import Link from 'next/link'
import { 
  BookOpen, 
  DollarSign, 
  Users, 
  BarChart3,
  Sparkles,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  /** Feature icon */
  icon: LucideIcon
  /** Feature title */
  title: string
  /** Feature description */
  description: string
  /** Learn more link */
  link?: string
}

interface FeatureSectionProps {
  /** Optional additional class names */
  className?: string
}

const features: Feature[] = [
  {
    icon: BookOpen,
    title: 'Complete Publishing Platform',
    description:
      'Books, courses, articles, and multimedia content—all in one integrated platform you own. No more fractured tool ecosystems.',
    link: '/onboarding',
  },
  {
    icon: DollarSign,
    title: '90% Revenue Retention',
    description:
      'Keep 90% of your revenue instead of losing 85-90% to traditional publishers and digital platforms. Your content, your revenue.',
    link: '/pricing',
  },
  {
    icon: Users,
    title: 'Audience Ownership',
    description:
      'Own your audience data and relationships. Direct communication, no platform intermediaries, full control over your community.',
    link: '/what-is-movemental',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Content',
    description:
      'AI support tailored to your voice and theology. Create content faster while maintaining authenticity and alignment.',
    link: '/ai-vision',
  },
  {
    icon: Globe,
    title: 'Network Effects',
    description:
      'Shared infrastructure creates collective SEO benefits and cross-platform amplification. Rise together with the network.',
    link: '/network',
  },
  {
    icon: BarChart3,
    title: 'Built-in Analytics',
    description:
      'Understand your audience with integrated analytics. Track engagement, measure impact, and grow strategically.',
    link: '/onboarding',
  },
]

export function FeatureSection({ className }: FeatureSectionProps) {
  return (
    <section
      className={cn(
        'py-20 sm:py-28 bg-background',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">
            Platform Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{' '}
            <span className="text-blue-600">Move</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete digital publishing infrastructure—content, commerce, community, and analytics—built for movement leaders.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'group p-6 sm:p-8 rounded-2xl',
                'bg-card border border-border',
                'hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5',
                'transition-all duration-300'
              )}
            >
              {/* Icon */}
              <div className="mb-5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-500 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Learn more link */}
              {feature.link && (
                <Link
                  href={feature.link}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Learn more
                  <svg
                    className="ml-1 w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 12L10 8L6 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
