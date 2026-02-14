'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, User, Building2 } from 'lucide-react'
import type { SelfScreenContext } from '@/lib/schemas/fit-check'

interface FitCheckLandingProps {
  onStart: () => void
  context: SelfScreenContext
  onContextChange: (context: SelfScreenContext) => void
  className?: string
}

export function FitCheckLanding({
  onStart,
  context,
  onContextChange,
  className,
}: FitCheckLandingProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4 py-12',
        'bg-gradient-to-b from-sage-900 via-sage-900 to-sage-800',
        className
      )}
    >
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Context switcher: Individual vs Organization */}
        <div className="flex items-center justify-center gap-2 mb-8 p-1.5 rounded-full bg-white/10 border border-white/20">
          <button
            type="button"
            onClick={() => onContextChange('individual')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
              context === 'individual'
                ? 'bg-white text-sage-900'
                : 'text-sage-200 hover:text-white hover:bg-white/10'
            )}
          >
            <User className="h-4 w-4" />
            Individual
          </button>
          <button
            type="button"
            onClick={() => onContextChange('organization')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
              context === 'organization'
                ? 'bg-white text-sage-900'
                : 'text-sage-200 hover:text-white hover:bg-white/10'
            )}
          >
            <Building2 className="h-4 w-4" />
            Organization
          </button>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
          Is Movemental
          <br />
          <span className="text-scarlet-rush-400">
            built for you?
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-sage-300 mb-10 max-w-lg mx-auto leading-relaxed">
          {context === 'organization'
            ? 'A quick self-screen for organizations. Pick what describes you; we’ll point you to the right next step.'
            : 'A quick self-screen. Pick what describes you; we’ll point you to the right next step.'}
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
          One question, multiple choices. We use your answers to point you to the right path.
        </p>
      </div>
    </div>
  )
}
