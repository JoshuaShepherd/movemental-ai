'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface FitCheckInfoStepProps {
  className?: string
}

/** Informational page after Full Fit. Placeholder copy; CTA goes to sign-up. */
export function FitCheckInfoStep({ className }: FitCheckInfoStepProps) {
  const handleCreateAccount = () => {
    window.location.href = '/sign-up?next=/tour'
  }

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4 py-12',
        'bg-gradient-to-b from-sage-50 to-white',
        className
      )}
    >
      <div className="w-full max-w-xl mx-auto text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          You&apos;re a fit. Here&apos;s what happens next.
        </h1>
        <p className="text-muted-foreground text-lg">
          {/* Placeholder: replace with final copy */}
          Movemental helps movement leaders structure their content for discoverability and longevity. 
          Create an account to start the tour and see how it works.
        </p>
        <Button
          onClick={handleCreateAccount}
          size="lg"
          className="group h-12 px-8 text-base font-semibold bg-scarlet-rush-500 text-white hover:bg-scarlet-rush-600"
        >
          Create an account
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
