'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FitCheckLanding } from './FitCheckLanding'
import { FitCheckProgress } from './FitCheckProgress'
import { FitCheckResults } from './FitCheckResults'
import { FitCheckInfoStep } from './FitCheckInfoStep'
import { RecognitionGate } from './RecognitionGate'
import {
  getRecognitionOptions,
  getRecognitionPrompt,
  RECOGNITION_MICROCOPY,
  getPathway,
  type AssessmentState,
  type RecognitionResult,
  type SelfScreenContext,
} from '@/lib/schemas/fit-check'

interface FitCheckContainerProps {
  className?: string
}

export function FitCheckContainer({ className }: FitCheckContainerProps) {
  const [state, setState] = useState<AssessmentState>('landing')
  const [context, setContext] = useState<SelfScreenContext>('individual')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [result, setResult] = useState<RecognitionResult | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalSteps = 1

  const handleStart = useCallback(() => {
    setState('in-progress')
  }, [])

  const handleContextChange = useCallback((next: SelfScreenContext) => {
    setContext(next)
    setSelectedIds(new Set())
  }, [])

  const handleToggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleContinue = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      const pathway = getPathway(Array.from(selectedIds))
      setResult({
        pathway,
        selectedIds: Array.from(selectedIds),
        completedAt: new Date(),
      })
      setState('results')
      setIsTransitioning(false)
    }, 300)
  }, [selectedIds])

  const handleGoToInfo = useCallback(() => {
    setState('info-step')
  }, [])

  const handleResultsSecondary = useCallback(() => {
    window.location.href = '/why-movemental'
  }, [])

  if (state === 'landing') {
    return (
      <FitCheckLanding
        onStart={handleStart}
        context={context}
        onContextChange={handleContextChange}
        className={className}
      />
    )
  }

  if (state === 'results' && result) {
    return (
      <FitCheckResults
        result={result}
        onShareName={result.pathway === 'full-fit' ? handleGoToInfo : undefined}
        onSecondary={handleResultsSecondary}
        className={className}
      />
    )
  }

  if (state === 'info-step') {
    return <FitCheckInfoStep className={className} />
  }

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-sage-950',
        className
      )}
    >
      <header className="fixed top-0 left-0 right-0 z-10 bg-sage-950/95 backdrop-blur border-b border-white/[0.06]">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <FitCheckProgress
          currentQuestion={1}
          totalQuestions={totalSteps}
          className="[&_span]:text-sage-300"
        />
        </div>
      </header>

      <main
        className={cn(
          'flex-1 flex items-center justify-center pt-20 pb-24',
          'transition-opacity duration-300',
          isTransitioning && 'opacity-0'
        )}
      >
        <RecognitionGate
          options={getRecognitionOptions(context)}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          promptText={getRecognitionPrompt(context)}
          microcopy={RECOGNITION_MICROCOPY}
        />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-sage-950/95 backdrop-blur border-t border-white/[0.06]">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="invisible gap-2 text-sage-300" disabled>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={isTransitioning}
              className="gap-2 bg-scarlet-rush-500 text-white hover:bg-scarlet-rush-600"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
