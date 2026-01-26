'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react'
import { getTotalWeeks } from '@/lib/schemas/onboarding-path'

interface OnboardingHeroProps {
  onStartJourney?: () => void
  className?: string
}

export function OnboardingHero({ onStartJourney, className }: OnboardingHeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-16',
        'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800',
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/20" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        {/* Time badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
          <Clock className="h-4 w-4" />
          <span>{getTotalWeeks()} from fit to live</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
          Your Path to
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
            Platform Launch
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
          A collaborative journey from discovery to launch. No empty templates—your platform 
          launches with content, configured for your unique voice.
        </p>

        {/* Phase preview */}
        <div className="mb-10 flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {[
            { num: 1, label: 'Discovery' },
            { num: 2, label: 'Research' },
            { num: 3, label: 'Architecture' },
            { num: 4, label: 'Launch' },
          ].map((phase, index) => (
            <div key={phase.num} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white text-sm font-semibold">
                {phase.num}
              </div>
              <span className="text-slate-400 text-sm">{phase.label}</span>
              {index < 3 && (
                <div className="hidden sm:block w-8 h-px bg-slate-600 ml-2" />
              )}
            </div>
          ))}
        </div>

        {/* Key benefits */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto text-left">
          {[
            'Movement-first approach',
            'Evidence-based insights',
            'Launch-ready platform',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-slate-400 text-sm justify-center sm:justify-start">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onStartJourney}
            size="lg"
            className={cn(
              'group h-14 px-8 text-lg font-semibold',
              'bg-white text-slate-900 hover:bg-slate-100',
              'transition-all duration-200'
            )}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-lg font-semibold border-white/20 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <a href="#phases">Explore the Phases</a>
          </Button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 text-slate-500 animate-bounce">
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
