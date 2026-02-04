"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface HowGeneratedModalProps {
  trigger?: React.ReactNode
}

export function HowGeneratedModal({ trigger }: HowGeneratedModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto">
            How this was generated
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>How we built this profile</DialogTitle>
          <DialogDescription className="sr-only">
            Information about how this profile was generated
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            We generate this profile by reading your published work, public bios,
            and the content you&apos;ve shared with us. We look for patterns in your
            voice, themes in your writing, and signals about who your work serves.
          </p>

          <div className="space-y-2">
            <p className="font-medium text-foreground">What we might miss:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Work published under different names or in private contexts</li>
              <li>Recent shifts in your thinking or focus</li>
              <li>Nuances that don&apos;t appear in text form</li>
              <li>Audience segments outside your primary channels</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-foreground">What we never do:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Fabricate quotes or citations</li>
              <li>Claim certainty where we don&apos;t have it</li>
              <li>Present interpretation as fact</li>
              <li>Share your profile data without permission</li>
            </ul>
          </div>

          <p className="pt-2 border-t">
            This is a first draft. You are the authority on yourself. Use the
            feedback options throughout to help us refine what we&apos;ve understood.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
