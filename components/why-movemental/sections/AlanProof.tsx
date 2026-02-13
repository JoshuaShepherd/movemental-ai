'use client'

import { BookMarked, Layers, PenTool, LayoutDashboard } from 'lucide-react'
import { NarrativeSection } from '../NarrativeSection'
import { NarrativeStatement } from '../NarrativeStatement'

const PLATFORM_MODULES = [
  { icon: BookMarked, label: 'Structured Books' },
  { icon: Layers, label: 'Modular Courses' },
  { icon: PenTool, label: 'AI Writing Assistant' },
  { icon: LayoutDashboard, label: 'Unified Dashboard' },
]

export function AlanProof() {
  return (
    <NarrativeSection background="muted">
      <div className="space-y-16 sm:space-y-24">
        <NarrativeStatement alignment="center">
          <strong>The Alan Hirsch Platform</strong>
        </NarrativeStatement>

        {/* Device mock container */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border-2 border-border bg-background shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 rounded bg-muted/80 max-w-sm mx-auto flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    alanhirsch.movemental.ai
                  </span>
                </div>
              </div>
            </div>

            {/* Platform content */}
            <div className="p-8 sm:p-12">
              <div className="grid sm:grid-cols-2 gap-6">
                {PLATFORM_MODULES.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 p-6 rounded-lg border bg-muted/20"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xl sm:text-2xl font-light text-muted-foreground tracking-tight">
          Built. Structured. <strong className="text-foreground font-semibold">Live.</strong>
        </p>
      </div>
    </NarrativeSection>
  )
}
