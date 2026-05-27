'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface GradientHeroProps {
  headline: string
  subheadline?: string
  cta?: {
    label: string
    href: string
  }
  className?: string
}

export function GradientHero({
  headline,
  subheadline,
  cta,
  className,
}: GradientHeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center px-4 py-16',
        'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600',
        className
      )}
    >
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-6">
          {headline}
        </h1>

        {subheadline && (
          <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-8">
            {subheadline}
          </p>
        )}

        {cta && (
          <Button
            asChild
            size="lg"
            className="group h-14 px-8 text-lg font-semibold bg-white text-sage-900 hover:bg-white/90"
          >
            <a href={cta.href}>
              {cta.label}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        )}
      </div>
    </section>
  )
}
