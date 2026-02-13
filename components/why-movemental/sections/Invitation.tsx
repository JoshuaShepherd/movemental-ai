'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NarrativeSection } from '../NarrativeSection'
import { NarrativeStatement } from '../NarrativeStatement'

export function Invitation() {
  return (
    <NarrativeSection>
      <div className="space-y-12 sm:space-y-16 text-center">
        <NarrativeStatement alignment="center">
          What would it look like if <strong>yours was structured?</strong>
        </NarrativeStatement>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your content already exists. Your ideas already matter.
          The only question is whether they&apos;re structured to move.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="group h-14 px-8 text-lg font-semibold">
            <Link href="/fit-check">
              Start Structuring
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg">
            <Link href="/how-it-works">
              Explore the Platform
            </Link>
          </Button>
        </div>
      </div>
    </NarrativeSection>
  )
}
