'use client'

import { cn } from '@/lib/utils'

interface BookDescriptionProps {
  description: string
  learningPoints?: string[]
  className?: string
}

export function BookDescription({
  description,
  learningPoints,
  className,
}: BookDescriptionProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-4">About This Book</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>

      {/* Learning Points */}
      {learningPoints && learningPoints.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">What You&apos;ll Learn</h2>
          <ul className="space-y-3">
            {learningPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
