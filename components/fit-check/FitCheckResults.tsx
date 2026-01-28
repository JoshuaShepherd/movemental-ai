'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  AlertCircle,
  XCircle,
  Clock
} from 'lucide-react'
import type { FitCheckResult, FitResultTier } from '@/lib/schemas/fit-check'
import { getTierInfo, FIT_CHECK_QUESTIONS } from '@/lib/schemas/fit-check'

interface FitCheckResultsProps {
  result: FitCheckResult
  onContinue?: () => void
  className?: string
}

const tierIcons: Record<FitResultTier, React.ReactNode> = {
  'tier1': <Sparkles className="h-12 w-12 text-emerald-500" />,
  'tier2': <CheckCircle2 className="h-12 w-12 text-blue-500" />,
  'tier3': <TrendingUp className="h-12 w-12 text-amber-500" />,
  'non-fit': <AlertCircle className="h-12 w-12 text-sage-400" />,
}

const tierColors: Record<FitResultTier, string> = {
  'tier1': 'from-emerald-500/20 to-cyan-500/20',
  'tier2': 'from-blue-500/20 to-indigo-500/20',
  'tier3': 'from-amber-500/20 to-orange-500/20',
  'non-fit': 'from-sage-500/20 to-sage-600/20',
}

export function FitCheckResults({ result, onContinue, className }: FitCheckResultsProps) {
  const tierInfo = getTierInfo(result.tier)

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4 py-12',
        tierInfo.isFit 
          ? 'bg-gradient-to-b from-sage-50 to-white' 
          : 'bg-gradient-to-b from-sage-100 to-sage-50',
        className
      )}
    >
      <div className="w-full max-w-xl mx-auto text-center">
        {/* Result icon with background gradient */}
        <div
          className={cn(
            'mb-6 inline-flex items-center justify-center',
            'h-24 w-24 rounded-full',
            `bg-gradient-to-br ${tierColors[result.tier]}`
          )}
        >
          {tierIcons[result.tier]}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          {tierInfo.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-primary font-medium mb-4">
          {tierInfo.subtitle}
        </p>

        {/* Description */}
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {tierInfo.description}
        </p>

        {/* Score card */}
        <Card className="p-6 mb-8 bg-card">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                {result.percentageScore}%
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Score</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                {FIT_CHECK_QUESTIONS.length}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Questions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-foreground flex items-center justify-center gap-1">
                <Clock className="h-5 w-5 text-muted-foreground" />
                {result.timeToComplete}s
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Time</p>
            </div>
          </div>
        </Card>

        {/* Category breakdown */}
        {tierInfo.isFit && (
          <Card className="p-4 mb-8 bg-muted/30">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Your alignment areas
            </h3>
            <div className="space-y-2">
              {result.responses.map((response, index) => {
                const maxForQuestion = 20 // Approximate max
                const percentage = Math.min(100, (response.value / maxForQuestion) * 100)
                const questionNames = [
                  'Movement Alignment',
                  'Audience Size',
                  'Content Quality',
                  'Revenue Potential',
                  'Platform Ownership',
                  'Network Value',
                ]
                return (
                  <div key={response.questionId} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-32 text-left shrink-0">
                      {questionNames[index]}
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          percentage >= 75 && 'bg-emerald-500',
                          percentage >= 50 && percentage < 75 && 'bg-scarlet-rush-500',
                          percentage >= 25 && percentage < 50 && 'bg-amber-500',
                          percentage < 25 && 'bg-sage-400'
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* CTA button */}
        <Button
          onClick={onContinue}
          size="lg"
          variant={tierInfo.isFit ? 'default' : 'outline'}
          className={cn(
            'group h-12 px-6 text-base font-semibold',
            tierInfo.isFit && 'bg-primary hover:bg-primary/90'
          )}
        >
          {tierInfo.ctaText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:transage-x-1" />
        </Button>

        {/* Secondary action for non-fits */}
        {!tierInfo.isFit && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">
              Still curious about what we&apos;re building?
            </p>
            <Button variant="ghost" size="sm" asChild>
              <a href="/about">Learn About Our Mission</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
