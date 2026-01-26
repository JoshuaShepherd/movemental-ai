'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react'

interface FitCheckLandingProps {
  onStart: () => void
  className?: string
}

export function FitCheckLanding({ onStart, className }: FitCheckLandingProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4 py-12',
        'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800',
        className
      )}
    >
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Time badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
          <Clock className="h-4 w-4" />
          <span>~60 seconds</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
          Is Movemental
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            right for you?
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed">
          Before we tell you about Movemental, let&apos;s make sure it&apos;s built for you.
          Six questions. One minute. Complete clarity.
        </p>

        {/* What we'll assess */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left">
          {[
            'Movement alignment',
            'Audience reach',
            'Content consistency',
            'Revenue potential',
            'Platform ownership',
            'Network value',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <Button
          onClick={onStart}
          size="lg"
          className={cn(
            'group h-14 px-8 text-lg font-semibold',
            'bg-white text-slate-900 hover:bg-slate-100',
            'transition-all duration-200'
          )}
        >
          Begin Fit Check
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* Privacy note */}
        <p className="mt-6 text-xs text-slate-500">
          Your responses help us serve you better. No email required.
        </p>
      </div>
    </div>
  )
}
