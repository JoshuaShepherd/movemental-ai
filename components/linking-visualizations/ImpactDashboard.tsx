'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from './SectionWrapper'
import { LINKING_ACTIONS } from './mock-data'

const BEFORE_AFTER = [
  { label: 'Domain Authority', before: 32, after: 54, unit: '' },
  { label: 'Organic Traffic', before: 1200, after: 4800, unit: '/mo' },
  { label: 'GEO Visibility', before: 18, after: 67, unit: '%' },
]

function AnimatedNumber({ target, isInView }: { target: number; isInView: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let frame: number
    const duration = 1000
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target])

  return <>{value.toLocaleString()}</>
}

function getBarColor(rank: number): string {
  if (rank <= 3) return 'var(--color-scarlet-rush, #cb3437)'
  if (rank <= 6) return 'var(--color-sage-500, #6e916e)'
  return 'rgba(110, 145, 110, 0.4)'
}

export function ImpactDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const sortedActions = [...LINKING_ACTIONS].sort((a, b) => a.rank - b.rank)
  const maxScore = Math.max(...sortedActions.map((a) => a.score))

  return (
    <SectionWrapper
      title="Impact Dashboard"
      subtitle="Ranked visualization of linking actions by their projected impact on discoverability."
      badge="Section 3"
      id="impact-dashboard"
    >
      <div ref={ref}>
        {/* Horizontal bar chart */}
        <div className="mb-8 space-y-2">
          {sortedActions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <span
                className="w-5 shrink-0 text-right text-xs tabular-nums font-medium opacity-40"
                style={{
                  fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
                  color: 'var(--color-bright-snow, #f0f4f0)',
                }}
              >
                {action.rank}
              </span>
              <span
                className="w-44 shrink-0 truncate text-xs font-medium"
                style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
              >
                {action.label}
              </span>
              <div className="flex-1">
                <div className="h-6 overflow-hidden rounded bg-white/5">
                  <motion.div
                    className="h-full rounded"
                    style={{ backgroundColor: getBarColor(action.rank) }}
                    initial={{ width: 0 }}
                    animate={
                      isInView
                        ? { width: `${(action.score / maxScore) * 100}%` }
                        : { width: 0 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <span
                className="w-8 shrink-0 text-right text-xs font-bold tabular-nums"
                style={{
                  fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
                  color: getBarColor(action.rank),
                }}
              >
                {action.score}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Before/After metrics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {BEFORE_AFTER.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-white/10 p-4 text-center"
              style={{ backgroundColor: 'rgba(110, 145, 110, 0.06)' }}
            >
              <p
                className="mb-2 text-xs font-medium uppercase tracking-wider opacity-40"
                style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
              >
                {metric.label}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div>
                  <p
                    className="text-sm opacity-40 line-through"
                    style={{
                      fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
                      color: 'var(--color-bright-snow, #f0f4f0)',
                    }}
                  >
                    {metric.before.toLocaleString()}
                    {metric.unit}
                  </p>
                </div>
                <span className="text-xs opacity-30" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>→</span>
                <div>
                  <p
                    className="text-lg font-bold"
                    style={{
                      fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
                      color: 'var(--color-scarlet-rush, #cb3437)',
                    }}
                  >
                    <AnimatedNumber target={metric.after} isInView={isInView} />
                    {metric.unit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
