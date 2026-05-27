'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DarkHeroSectionProps {
  /** Optional additional class names */
  className?: string
}

export function DarkHeroSection({ className }: DarkHeroSectionProps) {
  return (
    <section
      className={cn(
        'relative min-h-screen flex flex-col items-center justify-center',
        'bg-gradient-to-b from-sage-900 via-sage-900 to-sage-950',
        'px-4 sm:px-6 lg:px-8 pt-24 pb-16',
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sage-900/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow text */}
        <p className="text-scarlet-rush-400 text-sm sm:text-base font-medium tracking-wide uppercase mb-6">
          For Movement Leaders
        </p>

        {/* Main headline with gradient text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
          <span className="text-white">
            Your content is powerful.
          </span>
          <br />
          <span className="bg-gradient-to-r from-scarlet-rush-400 via-cyan-400 to-scarlet-rush-300 bg-clip-text text-transparent">
            It just isn&apos;t moving.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl text-sage-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          We&apos;re focused on movement leaders. We&apos;ve made it easy to self-screen—see if we&apos;re built for you in one short step.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-scarlet-rush-500 hover:bg-scarlet-rush-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-scarlet-rush-500/25 transition-all hover:shadow-xl hover:shadow-scarlet-rush-500/30"
          >
            <Link href="/fit-check">
              Take the Self-Screen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-sage-300 hover:text-white hover:bg-white/10 px-6 py-6 text-lg"
          >
            <Link href="/why-movemental">
              Why Movemental <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Bottom hint text */}
        <div className="mt-16 flex items-center justify-center gap-2 text-sage-300 text-sm">
          <span>one question, multiple choices</span>
          <svg
            className="w-6 h-6 text-sage-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>we&apos;ll point you to the right next step</span>
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
