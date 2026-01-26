'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FitCheckLanding } from './FitCheckLanding'
import { FitCheckProgress } from './FitCheckProgress'
import { FitCheckQuestion } from './FitCheckQuestion'
import { FitCheckResults } from './FitCheckResults'
import {
  FIT_CHECK_QUESTIONS,
  calculateFitResult,
  type AssessmentState,
  type AnswerOption,
  type QuestionResponse,
  type FitCheckResult,
} from '@/lib/schemas/fit-check'

interface FitCheckContainerProps {
  className?: string
}

export function FitCheckContainer({ className }: FitCheckContainerProps) {
  const [state, setState] = useState<AssessmentState>('landing')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Map<string, QuestionResponse>>(new Map())
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [result, setResult] = useState<FitCheckResult | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const startTimeRef = useRef<Date | null>(null)

  const currentQuestion = FIT_CHECK_QUESTIONS[currentQuestionIndex]
  const totalQuestions = FIT_CHECK_QUESTIONS.length
  const hasSelectedOption = selectedOptionId !== null
  const canGoBack = currentQuestionIndex > 0
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  // Start the assessment
  const handleStart = useCallback(() => {
    setState('in-progress')
    startTimeRef.current = new Date()
  }, [])

  // Select an option
  const handleSelectOption = useCallback((option: AnswerOption) => {
    setSelectedOptionId(option.id)
  }, [])

  // Go to next question or complete
  const handleNext = useCallback(() => {
    if (!selectedOptionId || !currentQuestion) return

    const selectedOption = currentQuestion.options.find(o => o.id === selectedOptionId)
    if (!selectedOption) return

    // Save the response
    const response: QuestionResponse = {
      questionId: currentQuestion.id,
      selectedOptionId,
      value: selectedOption.value,
      timestamp: new Date(),
    }

    setResponses(prev => {
      const newResponses = new Map(prev)
      newResponses.set(currentQuestion.id, response)
      return newResponses
    })

    // Transition animation
    setIsTransitioning(true)

    setTimeout(() => {
      if (isLastQuestion) {
        // Calculate and show results
        const allResponses = Array.from(responses.values())
        allResponses.push(response) // Include current response
        const finalResult = calculateFitResult(allResponses)
        setResult(finalResult)
        setState('results')
      } else {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedOptionId(null)
      }
      setIsTransitioning(false)
    }, 300)
  }, [selectedOptionId, currentQuestion, isLastQuestion, responses])

  // Go to previous question
  const handleBack = useCallback(() => {
    if (!canGoBack) return

    setIsTransitioning(true)
    setTimeout(() => {
      const prevIndex = currentQuestionIndex - 1
      const prevQuestion = FIT_CHECK_QUESTIONS[prevIndex]
      const prevResponse = responses.get(prevQuestion.id)
      
      setCurrentQuestionIndex(prevIndex)
      setSelectedOptionId(prevResponse?.selectedOptionId ?? null)
      setIsTransitioning(false)
    }, 200)
  }, [canGoBack, currentQuestionIndex, responses])

  // Handle results CTA
  const handleContinue = useCallback(() => {
    if (!result) return
    
    const isFit = result.tier === 'tier1' || result.tier === 'tier2' || result.tier === 'tier3'
    const href = isFit ? '/why-movemental' : '/about'
    
    // Navigate (could also use Next.js router)
    window.location.href = href
  }, [result])

  // Keyboard navigation
  useEffect(() => {
    if (state !== 'in-progress' || !currentQuestion) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const key = e.key.toUpperCase()

      // Handle letter keys (A-E) for likert/single questions
      if (currentQuestion.type !== 'numeric') {
        const letterIndex = key.charCodeAt(0) - 65 // A=0, B=1, etc.
        if (letterIndex >= 0 && letterIndex < currentQuestion.options.length) {
          e.preventDefault()
          const option = currentQuestion.options[letterIndex]
          handleSelectOption(option)
        }
      }

      // Handle number keys (0-9) for numeric questions
      if (currentQuestion.type === 'numeric') {
        const num = parseInt(key)
        if (!isNaN(num) && num >= 0 && num <= 10) {
          e.preventDefault()
          const option = currentQuestion.options.find(o => o.label === num.toString())
          if (option) {
            handleSelectOption(option)
          }
        }
      }

      // Enter to continue
      if (e.key === 'Enter' && hasSelectedOption && !isTransitioning) {
        e.preventDefault()
        handleNext()
      }

      // Escape or left arrow to go back
      if ((e.key === 'Escape' || e.key === 'ArrowLeft') && canGoBack && !isTransitioning) {
        e.preventDefault()
        handleBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state, currentQuestion, hasSelectedOption, canGoBack, isTransitioning, handleSelectOption, handleNext, handleBack])

  // Auto-advance after selection (with delay)
  useEffect(() => {
    if (!hasSelectedOption || isTransitioning) return

    // Auto-advance after 500ms delay for better UX
    const timer = setTimeout(() => {
      handleNext()
    }, 500)

    return () => clearTimeout(timer)
  }, [hasSelectedOption, isTransitioning, handleNext])

  // Render based on state
  if (state === 'landing') {
    return <FitCheckLanding onStart={handleStart} className={className} />
  }

  if (state === 'results' && result) {
    return <FitCheckResults result={result} onContinue={handleContinue} className={className} />
  }

  // In-progress state
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-background',
        className
      )}
    >
      {/* Fixed header with progress */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <FitCheckProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />
        </div>
      </header>

      {/* Main content area */}
      <main
        className={cn(
          'flex-1 flex items-center justify-center pt-20 pb-24',
          'transition-opacity duration-300',
          isTransitioning && 'opacity-0'
        )}
      >
        {currentQuestion && (
          <FitCheckQuestion
            question={currentQuestion}
            selectedOptionId={selectedOptionId}
            onSelect={handleSelectOption}
          />
        )}
      </main>

      {/* Fixed footer with navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={!canGoBack || isTransitioning}
              className={cn(
                'gap-2',
                !canGoBack && 'invisible'
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {/* Next/Complete button */}
            <Button
              onClick={handleNext}
              disabled={!hasSelectedOption || isTransitioning}
              className="gap-2"
            >
              {isLastQuestion ? 'See Results' : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
