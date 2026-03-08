"use client"

import { cn } from "@/lib/utils"

interface SpecialYoureInProps {
  className?: string
}

export function SpecialYoureIn({ className }: SpecialYoureInProps) {
  return (
    <div
      className={cn(
        "bg-mvmt-surface-dark min-h-[80vh] flex flex-col items-center justify-center px-6 text-center",
        className
      )}
    >
      <span className="text-mvmt-accent text-3xl font-bold italic">M</span>

      <h1 className="text-mvmt-on-dark-primary text-4xl md:text-5xl font-bold font-mvmt-heading mt-16">
        You&rsquo;re in.
      </h1>

      <p className="text-mvmt-on-dark-secondary text-lg md:text-xl max-w-xl leading-relaxed mt-6">
        Welcome to the first day of building movements that matter. Launch that
        network. Equip those leaders. Plant that church and multiply that impact.
      </p>

      <button className="bg-mvmt-accent text-mvmt-cta-text rounded-lg px-8 py-3 text-base font-semibold mt-10">
        Let&rsquo;s Get Started
      </button>

      <div className="h-32" />
    </div>
  )
}

SpecialYoureIn.displayName = "SpecialYoureIn"
