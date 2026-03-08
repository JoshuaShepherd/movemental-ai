'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface OnboardingCTAProps {
  className?: string
}

export function OnboardingCTA({ className }: OnboardingCTAProps) {
  return (
    <section
      className={cn(
        'py-16 sm:py-24 px-4 bg-muted/30',
        className
      )}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready to Begin?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Schedule a discovery call to explore if Movemental is right for your ministry 
          and movement work.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="group h-14 px-8 text-lg font-semibold"
            asChild
          >
            <Link href="/fit-check">
              <Calendar className="mr-2 h-5 w-5" />
              Start with Self-Screen
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-lg font-semibold"
            asChild
          >
            <Link href="/fit-check">
              <MessageCircle className="mr-2 h-5 w-5" />
              Is This You?
            </Link>
          </Button>
        </div>

        {/* Trust note */}
        <p className="mt-8 text-sm text-muted-foreground">
          No commitment required. Let&apos;s explore together.
        </p>
      </div>
    </section>
  )
}
