'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CTASectionProps {
  /** Optional additional class names */
  className?: string
}

interface PricingTier {
  name: string
  description: string
  link: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Platform Launch',
    description: 'Your complete publishing platform, structured for discovery and linking.',
    link: '/pricing#platform-launch',
  },
  {
    name: 'Content Migration',
    description: 'Bring your existing books, articles, and courses into a unified presence.',
    link: '/pricing#content-migration',
  },
  {
    name: 'Credibility Network',
    description: 'Join a peer network where trust and amplification compound together.',
    link: '/pricing#network',
  },
]

export function CTASection({ className }: CTASectionProps) {
  const [expandedTier, setExpandedTier] = useState<number | null>(null)

  return (
    <section
      className={cn(
        'relative py-24 sm:py-32',
        'bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900',
        className
      )}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column - CTA content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Start moving your content.
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Take the Fit Check to discover if Movemental is right for you. 
              60 seconds to clarity—no trial, no credit card, no commitment.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
            >
              <Link href="/fit-check">
                Take the Fit Check
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Right column - Pricing tier accordions */}
          <div className="space-y-3">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={cn(
                  'rounded-xl overflow-hidden transition-all',
                  'bg-white/5 border border-white/10',
                  'hover:bg-white/10 hover:border-white/20'
                )}
              >
                <button
                  onClick={() => setExpandedTier(expandedTier === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {tier.name}
                    </h3>
                    {expandedTier === index && (
                      <p className="text-sm text-slate-400 mt-1">
                        {tier.description}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-slate-400 transition-transform',
                      expandedTier === index && 'rotate-180'
                    )}
                  />
                </button>
                {expandedTier === index && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <Link
                      href={tier.link}
                      className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Learn more
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Removed placeholder logo bar - replaced with credibility statement */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <p className="text-center text-slate-400 max-w-2xl mx-auto">
            Movemental is building a network of movement leaders whose content reinforces and amplifies one another. 
            When you join, your work doesn&apos;t move alone.
          </p>
        </div>
      </div>
    </section>
  )
}
