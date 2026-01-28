'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollRevealBlock } from './ScrollRevealBlock'
import { cn } from '@/lib/utils'

interface AIVisionCTAProps {
  className?: string
}

export function AIVisionCTA({ className }: AIVisionCTAProps) {
  return (
    <section
      className={cn(
        'py-24 sm:py-32 px-4 bg-gradient-to-br from-sage-900 via-velvet-orchid-950 to-sage-900 text-white',
        className
      )}
    >
      <div className="max-w-3xl mx-auto text-center">
        <ScrollRevealBlock>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            AI that serves
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Kingdom advancement
            </span>
            , not platform extraction.
          </h2>

          <p className="text-lg text-sage-300 mb-10 max-w-xl mx-auto">
            Ready to see how Movemental Intelligence can amplify your authentic
            voice while maintaining theological depth?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg bg-white text-sage-900 hover:bg-white/90"
            >
              <Link href="/book">
                <BookOpen className="mr-2 h-5 w-5" />
                Read the AI Book
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10"
            >
              <Link href="/network">
                <Users className="mr-2 h-5 w-5" />
                Explore the Network
              </Link>
            </Button>
          </div>
        </ScrollRevealBlock>
      </div>
    </section>
  )
}
