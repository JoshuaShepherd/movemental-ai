"use client"

import { cn } from "@/lib/utils"

interface SpecialFounderStoryProps {
  className?: string
}

export function SpecialFounderStory({ className }: SpecialFounderStoryProps) {
  return (
    <div className={cn(className)}>
      {/* Top section */}
      <div className="bg-mvmt-surface-dark min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <span className="text-mvmt-on-dark-muted text-xs uppercase tracking-widest">
          Our Story
        </span>
        <span className="text-mvmt-on-dark-secondary text-sm mt-2">
          as told by Founder Brad Brisco
        </span>
        <blockquote className="text-mvmt-on-dark-primary text-xl md:text-2xl lg:text-3xl font-medium italic max-w-3xl leading-relaxed mt-8">
          &ldquo;I was leading a small church in the midwest and I wanted to see
          multiplication happen organically. I connected with other leaders who
          shared the same vision, but in the end the old models never worked —
          it was just too institutional...&rdquo;
        </blockquote>
        <button className="border border-mvmt-border-on-dark rounded-full px-6 py-2 text-sm text-mvmt-on-dark-primary mt-10">
          Read the full story ↓
        </button>
      </div>

      {/* Bottom section */}
      <div className="bg-mvmt-surface-light py-16 px-6 text-center">
        <h2 className="text-mvmt-text-primary text-2xl font-bold">
          Movemental.
        </h2>
        <p className="text-mvmt-text-secondary text-sm max-w-xl mx-auto mt-4">
          We exist to equip movement leaders like Brad Brisco, Alan Hirsch, Dave
          Ferguson, Neil Cole, and Mike Breen with the tools and community they
          need to catalyze multiplication movements through networks like
          Exponential, Forge, NewThing, V3, and Missio.
        </p>
      </div>
    </div>
  )
}

SpecialFounderStory.displayName = "SpecialFounderStory"
