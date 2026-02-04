'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircle2, ArrowRight, BookOpen, FileText } from 'lucide-react'
import type { RecognitionResult } from '@/lib/schemas/fit-check'
import { getRecognitionResultCopy } from '@/lib/schemas/fit-check'

interface FitCheckResultsProps {
  result: RecognitionResult
  onShareName?: () => void
  onSecondary?: () => void
  className?: string
}

export function FitCheckResults({
  result,
  onShareName,
  onSecondary,
  className,
}: FitCheckResultsProps) {
  const copy = getRecognitionResultCopy(result.recognized)

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4 py-12',
        result.recognized
          ? 'bg-gradient-to-b from-sage-50 to-white'
          : 'bg-gradient-to-b from-sage-100 to-sage-50',
        className
      )}
    >
      <div className="w-full max-w-xl mx-auto text-center">
        <div
          className={cn(
            'mb-6 inline-flex items-center justify-center h-24 w-24 rounded-full',
            result.recognized
              ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20'
              : 'bg-gradient-to-br from-sage-500/20 to-sage-600/20'
          )}
        >
          {result.recognized ? (
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          ) : (
            <BookOpen className="h-12 w-12 text-sage-400" />
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {copy.headline}
        </h1>

        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {copy.body}
        </p>

        {result.recognized ? (
          <div className="space-y-3">
            {copy.primaryCta && onShareName && (
              <Button
                onClick={onShareName}
                size="lg"
                className="w-full sm:w-auto group h-12 px-6 text-base font-semibold bg-primary hover:bg-primary/90"
              >
                {copy.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
            {copy.secondaryCta && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSecondary}
                  asChild
                  className="text-muted-foreground"
                >
                  <a href={copy.secondaryCta.href}>{copy.secondaryCta.label}</a>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {copy.links?.map((link) => (
              <Button
                key={link.href}
                variant="outline"
                size="lg"
                asChild
                className="gap-2 h-12 px-6"
              >
                <a href={link.href}>
                  {link.label === 'Explore the Book' ? (
                    <BookOpen className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
