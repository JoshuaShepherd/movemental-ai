'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface FitCheckLandingProps {
  onStart: () => void
  className?: string
}

export function FitCheckLanding({ onStart, className }: FitCheckLandingProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4 py-12',
        'bg-gradient-to-b from-sage-900 via-sage-900 to-sage-800',
        className
      )}
    >
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
          Is Movemental
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            built for you?
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-sage-300 mb-10 max-w-lg mx-auto leading-relaxed">
          A moment of recognition — not an application.
        </p>

        {/* CTA button */}
        <Button
          onClick={onStart}
          size="lg"
          className={cn(
            'group h-14 px-8 text-lg font-semibold',
            'bg-white text-sage-900 hover:bg-sage-100',
            'transition-all duration-200'
          )}
        >
          Begin
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>

        <p className="mt-6 text-xs text-sage-300">
          No scoring. No qualification. Just recognition.
        </p>
      </div>
    </div>
  )
}
