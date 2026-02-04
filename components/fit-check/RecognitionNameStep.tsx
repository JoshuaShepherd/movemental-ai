'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface RecognitionNameStepProps {
  transparencyCopy: string
  onSubmit: (data: { name: string; bodyOfWork?: string }) => void
  className?: string
}

const inputClass =
  'flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

export function RecognitionNameStep({
  transparencyCopy,
  onSubmit,
  className,
}: RecognitionNameStepProps) {
  const [name, setName] = useState('')
  const [bodyOfWork, setBodyOfWork] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onSubmit({ name: trimmed, bodyOfWork: bodyOfWork.trim() || undefined })
  }

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4 py-12',
        'bg-gradient-to-b from-sage-50 to-white',
        className
      )}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto space-y-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Share your name & body of work
          </h1>
          <p className="text-muted-foreground text-sm">
            {transparencyCopy}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="recognition-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name (required)
          </label>
          <input
            id="recognition-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="recognition-body" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Is there a book, organization, or body of work you&apos;re most associated with?
          </label>
          <input
            id="recognition-body"
            type="text"
            value={bodyOfWork}
            onChange={(e) => setBodyOfWork(e.target.value)}
            placeholder="Optional"
            className={inputClass}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full group h-12 font-semibold"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </div>
  )
}
