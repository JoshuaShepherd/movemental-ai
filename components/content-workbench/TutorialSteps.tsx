'use client'

import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'

interface Step {
  number: number
  text: string
  link?: { text: string; url: string }
}

interface TutorialStepsProps {
  /** Tutorial title */
  title: string
  /** Array of steps */
  steps: Step[]
  /** Pro tip text */
  proTip?: string
  /** Screenshot/demo image */
  screenshotUrl?: string
  /** Screenshot alt text */
  screenshotAlt?: string
  /** Custom class name */
  className?: string
}

export function TutorialSteps({
  title,
  steps,
  proTip,
  screenshotUrl,
  screenshotAlt,
  className,
}: TutorialStepsProps) {
  return (
    <article className={cn('max-w-3xl mx-auto', className)}>
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      {/* Steps */}
      <ol className="space-y-4 mb-8">
        {steps.map((step) => (
          <li key={step.number} className="flex gap-4">
            <span className="font-mono text-lg font-bold text-muted-foreground">
              {step.number}.
            </span>
            <p className="text-lg">
              {step.text}
              {step.link && (
                <>
                  {' '}
                  <a
                    href={step.link.url}
                    className="text-primary hover:underline"
                  >
                    {step.link.text}
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ol>

      {/* Pro tip */}
      {proTip && (
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-8">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Pro Tip</p>
            <p className="text-sm text-blue-800 mt-1">{proTip}</p>
          </div>
        </div>
      )}

      {/* Screenshot */}
      {screenshotUrl && (
        <div className="rounded-lg overflow-hidden border shadow-lg">
          <img
            src={screenshotUrl}
            alt={screenshotAlt || title}
            className="w-full"
          />
        </div>
      )}
    </article>
  )
}
