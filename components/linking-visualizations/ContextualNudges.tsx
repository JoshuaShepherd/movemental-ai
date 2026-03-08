'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Bell, Link2, TrendingUp, UserPlus, X } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { NUDGES } from './mock-data'

const ICON_MAP: Record<string, typeof Bell> = {
  Bell,
  Link: Link2,
  TrendingUp,
  UserPlus,
}

export function ContextualNudges() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [visibleNudges, setVisibleNudges] = useState<string[]>([])
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  // Sequentially show nudges
  useEffect(() => {
    if (!isInView) return
    const timers: ReturnType<typeof setTimeout>[] = []
    NUDGES.forEach((nudge, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleNudges((prev) => [...prev, nudge.id])
        }, 800 + i * 1500)
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id))
  }

  return (
    <SectionWrapper
      title="Contextual Nudges"
      subtitle="Real-time notifications that surface relevant network activity while you work."
      badge="Section 6.3"
      id="contextual-nudges"
    >
      <div ref={ref} className="relative min-h-[280px]">
        {/* Background mock editor (faint) */}
        <div
          className="rounded-lg border border-white/5 p-5 opacity-30"
          style={{ backgroundColor: 'rgba(110, 145, 110, 0.04)' }}
        >
          <div className="mb-3 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-5 rounded border border-white/10"
              />
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-3 w-3/4 rounded bg-white/5" />
            <div className="h-3 w-full rounded bg-white/5" />
            <div className="h-3 w-5/6 rounded bg-white/5" />
            <div className="h-3 w-2/3 rounded bg-white/5" />
            <div className="h-3 w-full rounded bg-white/5" />
            <div className="h-3 w-4/5 rounded bg-white/5" />
          </div>
        </div>

        {/* Toast notifications overlay */}
        <div className="absolute right-2 top-2 flex w-72 flex-col gap-2 sm:right-4 sm:top-4">
          <AnimatePresence>
            {NUDGES.filter(
              (n) => visibleNudges.includes(n.id) && !dismissed.has(n.id)
            ).map((nudge) => {
              const Icon = ICON_MAP[nudge.icon] ?? Bell
              return (
                <motion.div
                  key={nudge.id}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border border-white/10 p-3 shadow-xl"
                  style={{ backgroundColor: 'rgba(22, 29, 22, 0.95)' }}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: 'rgba(110, 145, 110, 0.2)' }}
                    >
                      <Icon className="h-3 w-3" style={{ color: 'var(--color-sage-400, #8fb38f)' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-xs font-medium leading-snug"
                        style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                      >
                        {nudge.message}
                      </p>
                      <button
                        className="mt-1.5 rounded px-2 py-0.5 text-[10px] font-semibold text-white"
                        style={{ backgroundColor: 'var(--color-scarlet-rush, #cb3437)' }}
                      >
                        {nudge.action}
                      </button>
                    </div>
                    <button
                      onClick={() => handleDismiss(nudge.id)}
                      className="shrink-0 opacity-40 hover:opacity-80 transition-opacity"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  )
}
