'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle, FileEdit, BookOpen } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { getLeader } from './mock-data'

const STEPS = [
  {
    id: 0,
    label: 'Invite',
    icon: Send,
    description: 'Alan sends a co-authorship invite to Tim Catchim',
  },
  {
    id: 1,
    label: 'Accept',
    icon: CheckCircle,
    description: 'Tim accepts the invitation and joins the shared workspace',
  },
  {
    id: 2,
    label: 'Shared Draft',
    icon: FileEdit,
    description: 'Both authors collaborate on a shared draft with dual cursors',
  },
  {
    id: 3,
    label: 'Published',
    icon: BookOpen,
    description: 'Article published on both platforms with dual bylines',
  },
]

const ALAN = getLeader('alan-hirsch')
const TIM = getLeader('tim-catchim')

export function CoAuthorshipFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isInView || !isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isInView, isAutoPlaying])

  const handleStepClick = (step: number) => {
    setActiveStep(step)
    setIsAutoPlaying(false)
  }

  return (
    <SectionWrapper
      title="Co-Authorship Flow"
      subtitle="Step-by-step collaboration from invite to cross-platform publication."
      badge="Rank #6 · Score 79"
      id="co-authorship-flow"
    >
      <div ref={ref}>
        {/* Stepper */}
        <div className="mb-6 flex items-center gap-2">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isActive = i === activeStep
            const isPast = i < activeStep
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(i)}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                    isActive
                      ? 'border-[var(--color-scarlet-rush,#cb3437)] bg-[var(--color-scarlet-rush,#cb3437)]/20'
                      : isPast
                        ? 'border-[var(--color-sage-500,#6e916e)] bg-[var(--color-sage-500,#6e916e)]/20'
                        : 'border-white/10 bg-transparent'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 transition-colors',
                      isActive
                        ? 'text-[#cb3437]'
                        : isPast
                          ? 'text-[#6e916e]'
                          : 'text-white/30'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium transition-opacity',
                    isActive ? 'opacity-100' : 'opacity-40'
                  )}
                  style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                >
                  {step.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: 'var(--color-scarlet-rush, #cb3437)' }}
            animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Step content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg border border-white/10 p-5"
          style={{ backgroundColor: 'rgba(110, 145, 110, 0.06)' }}
        >
          <p
            className="mb-4 text-sm opacity-70"
            style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
          >
            {STEPS[activeStep].description}
          </p>

          {/* Step-specific mini mockups */}
          {activeStep === 0 && (
            <div className="rounded-lg border border-white/10 p-4" style={{ backgroundColor: 'rgba(110, 145, 110, 0.04)' }}>
              <p className="mb-3 text-xs font-semibold" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>
                Co-Authorship Invite
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: ALAN.color }}>{ALAN.initials}</span>
                <span className="text-xs opacity-60" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>From: {ALAN.name}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: TIM.color }}>{TIM.initials}</span>
                <span className="text-xs opacity-60" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>To: {TIM.name}</span>
              </div>
              <p className="text-xs opacity-50" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>
                Topic: &quot;APEST + mDNA — A Joint Exploration&quot;
              </p>
            </div>
          )}

          {activeStep === 1 && (
            <div className="rounded-lg border border-green-500/20 p-4" style={{ backgroundColor: 'rgba(34, 197, 94, 0.06)' }}>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-green-400">Invitation Accepted</p>
                  <p className="text-xs opacity-50" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>
                    {TIM.name} has joined the shared workspace
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="rounded-lg border border-white/10 p-4" style={{ backgroundColor: 'rgba(110, 145, 110, 0.04)' }}>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ALAN.color }} />
                <span className="text-[10px] opacity-50" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>{ALAN.name}&apos;s cursor</span>
                <span className="ml-3 h-2 w-2 rounded-full" style={{ backgroundColor: TIM.color }} />
                <span className="text-[10px] opacity-50" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>{TIM.name}&apos;s cursor</span>
              </div>
              <p className="text-xs leading-relaxed opacity-60" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>
                The intersection of APEST functions and mDNA elements reveals a
                powerful synergy<span className="inline-block h-3 w-0.5 animate-pulse align-middle" style={{ backgroundColor: ALAN.color }} />{' '}
                for movement multiplication. When the apostolic function
                activates<span className="inline-block h-3 w-0.5 animate-pulse align-middle" style={{ backgroundColor: TIM.color }} />{' '}
                mDNA, it catalyzes exponential growth...
              </p>
            </div>
          )}

          {activeStep === 3 && (
            <div className="rounded-lg border border-white/10 p-4" style={{ backgroundColor: 'rgba(110, 145, 110, 0.04)' }}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-40" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>Published Article</p>
              <h4
                className="mb-2 text-base font-bold"
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                  color: 'var(--color-bright-snow, #f0f4f0)',
                }}
              >
                APEST + mDNA: A Joint Exploration
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: ALAN.color }}>{ALAN.initials}</span>
                  <span className="text-xs" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>{ALAN.name}</span>
                </div>
                <span className="text-xs opacity-30" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>&</span>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: TIM.color }}>{TIM.initials}</span>
                  <span className="text-xs" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>{TIM.name}</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
