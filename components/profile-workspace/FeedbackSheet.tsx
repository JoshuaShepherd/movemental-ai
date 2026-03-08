"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface FeedbackSheetProps {
  context: "Author" | "Audience" | "Content"
  trigger?: React.ReactNode
}

export function FeedbackSheet({ context, trigger }: FeedbackSheetProps) {
  const [feedback, setFeedback] = React.useState("")
  const [alternativeSource, setAlternativeSource] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSubmit = async () => {
    // For MVP: log to console and show confirmation
    // In production: POST to /api/profile-feedback
    console.log("Profile Feedback Submitted:", {
      context,
      feedback,
      alternativeSource,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsSubmitted(false)
      setFeedback("")
      setAlternativeSource("")
    }, 2000)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Tell us what&apos;s wrong
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-left">Help us improve</SheetTitle>
          <SheetDescription className="text-left">
            This profile is a working draft. Your input helps us get it right.
          </SheetDescription>
        </SheetHeader>

        {isSubmitted ? (
          <div className="mt-8 text-center py-12">
            <p className="text-lg font-medium text-foreground">Thank you</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your feedback has been saved.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Feedback about:</span>
              <Badge variant="secondary">{context}</Badge>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="feedback"
                className="text-sm font-medium text-foreground"
              >
                What feels wrong, missing, or incomplete?
              </label>
              <Textarea
                id="feedback"
                placeholder="Describe what we got wrong or what's missing..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="alternativeSource"
                className="text-sm font-medium text-foreground"
              >
                What should we look at instead?
                <span className="text-muted-foreground font-normal ml-1">
                  (optional)
                </span>
              </label>
              <Textarea
                id="alternativeSource"
                placeholder="A URL, document, or description of better source material..."
                value={alternativeSource}
                onChange={(e) => setAlternativeSource(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!feedback.trim()}
              className="w-full"
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
