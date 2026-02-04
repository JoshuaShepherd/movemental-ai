'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FitCheckLanding } from './FitCheckLanding'
import { FitCheckProgress } from './FitCheckProgress'
import { FitCheckResults } from './FitCheckResults'
import { RecognitionGate } from './RecognitionGate'
import { RecognitionNameStep } from './RecognitionNameStep'
import {
  RECOGNITION_OPTIONS,
  RECOGNITION_PROMPT,
  RECOGNITION_MICROCOPY,
  NAME_STEP_TRANSPARENCY,
  isRecognized,
  type AssessmentState,
  type RecognitionResult,
} from '@/lib/schemas/fit-check'

interface FitCheckContainerProps {
  className?: string
}

export function FitCheckContainer({ className }: FitCheckContainerProps) {
  const [state, setState] = useState<AssessmentState>('landing')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [result, setResult] = useState<RecognitionResult | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalSteps = 1

  const handleStart = useCallback(() => {
    setState('in-progress')
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
      const recognized = isRecognized(Array.from(selectedIds))
      setResult({
        recognized,
        selectedIds: Array.from(selectedIds),
        completedAt: new Date(),
      })
      setState('results')
      setIsTransitioning(false)
    }, 300)
  }, [selectedIds])

  const handleShareName = useCallback(() => {
    setState('name-step')
  }, [])

  const handleNameStepSubmit = useCallback(
    (data: { name: string; bodyOfWork?: string }) => {
      // TODO: submit to API when backend is ready; for now redirect
      window.location.href = '/why-movemental'
    },
    []
  )

  const handleResultsSecondary = useCallback(() => {
    window.location.href = '/why-movemental'
  }, [])

  if (state === 'landing') {
    return <FitCheckLanding onStart={handleStart} className={className} />
  }

  if (state === 'results' && result) {
    return (
      <FitCheckResults
        result={result}
        onShareName={result.recognized ? handleShareName : undefined}
        onSecondary={handleResultsSecondary}
        className={className}
      />
    )
  }

  if (state === 'name-step') {
    return (
      <RecognitionNameStep
        transparencyCopy={NAME_STEP_TRANSPARENCY}
        onSubmit={handleNameStepSubmit}
        className={className}
      />
    )
  }

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-background',
        className
      )}
    >
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <FitCheckProgress currentQuestion={1} totalQuestions={totalSteps} />
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
          options={RECOGNITION_OPTIONS}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          promptText={RECOGNITION_PROMPT}
          microcopy={RECOGNITION_MICROCOPY}
        />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="invisible gap-2" disabled>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={isTransitioning}
              className="gap-2"
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
