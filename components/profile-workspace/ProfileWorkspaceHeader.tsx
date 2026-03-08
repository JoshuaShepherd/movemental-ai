"use client"

import { HowGeneratedModal } from "./HowGeneratedModal"
import { FeedbackSheet } from "./FeedbackSheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ProfileWorkspaceHeaderProps {
  lastUpdated: string
  sourcesCount: number
}

export function ProfileWorkspaceHeader({
  lastUpdated,
  sourcesCount,
}: ProfileWorkspaceHeaderProps) {
  return (
    <header className="space-y-6 mb-12">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          A working profile of your voice and work
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          This is a first draft. You are the authority on yourself.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span>Last updated: {lastUpdated}</span>
        <Separator orientation="vertical" className="h-4 hidden sm:block" />
        <span>Sources: {sourcesCount} items</span>
        <Separator orientation="vertical" className="h-4 hidden sm:block" />
        <HowGeneratedModal />
        <Separator orientation="vertical" className="h-4 hidden sm:block" />
        <FeedbackSheet
          context="Author"
          trigger={
            <Button
              variant="link"
              size="sm"
              className="text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              Tell us what&apos;s wrong or incomplete
            </Button>
          }
        />
      </div>
    </header>
  )
}
