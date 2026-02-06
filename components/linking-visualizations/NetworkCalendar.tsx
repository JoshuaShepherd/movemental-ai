'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { EVENTS, getLeader } from './mock-data'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// February 2025 starts on Saturday (6), has 28 days
const MONTH_START_DAY = 6
const DAYS_IN_MONTH = 28

function buildCalendarGrid() {
  const cells: (number | null)[] = []
  // Leading empty cells
  for (let i = 0; i < MONTH_START_DAY; i++) cells.push(null)
  // Days
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d)
  // Trailing empty cells
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function getEventsForDay(day: number) {
  const dateStr = `2025-02-${String(day).padStart(2, '0')}`
  return EVENTS.filter((e) => e.date === dateStr)
}

// Conflicts: days with 2+ events
const CONFLICTS = (() => {
  const dayMap = new Map<number, typeof EVENTS>()
  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    const evts = getEventsForDay(d)
    if (evts.length >= 2) dayMap.set(d, evts)
  }
  return dayMap
})()

export function NetworkCalendar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const cells = buildCalendarGrid()

  return (
    <SectionWrapper
      title="Network Calendar"
      subtitle="Shared calendar view across all leaders' platforms with collision detection."
      badge="Section 6.2"
      id="network-calendar"
    >
      <div ref={ref}>
        {/* Month header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex items-center justify-between"
        >
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 opacity-40">
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <h3
            className="text-lg font-semibold"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
              color: 'var(--color-bright-snow, #f0f4f0)',
            }}
          >
            February 2025
          </h3>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 opacity-40">
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </motion.div>

        {/* Day headers */}
        <div className="mb-1 grid grid-cols-7 gap-1">
          {DAYS_OF_WEEK.map((d) => (
            <div
              key={d}
              className="py-1 text-center text-[10px] font-medium uppercase tracking-wider opacity-40"
              style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />
            const dayEvents = getEventsForDay(day)
            const hasConflict = CONFLICTS.has(day)

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.01 }}
                className={cn(
                  'relative min-h-[60px] rounded-lg border p-1.5',
                  hasConflict
                    ? 'border-amber-500/30 bg-amber-500/5'
                    : 'border-white/5 bg-white/[0.02]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] tabular-nums opacity-50"
                    style={{
                      fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
                      color: 'var(--color-bright-snow, #f0f4f0)',
                    }}
                  >
                    {day}
                  </span>
                  {hasConflict && (
                    <AlertTriangle className="h-3 w-3 text-amber-400" />
                  )}
                </div>

                {/* Event pills */}
                <div className="mt-1 space-y-0.5">
                  {dayEvents.map((evt) => {
                    const leader = getLeader(evt.leaderId)
                    const isJoint = evt.type === 'joint'
                    const jointLeader = evt.jointLeaderId
                      ? getLeader(evt.jointLeaderId)
                      : null
                    return (
                      <motion.div
                        key={evt.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.02 }}
                        className="truncate rounded px-1 py-0.5 text-[8px] font-medium text-white"
                        title={evt.title}
                        style={{
                          background: isJoint
                            ? `linear-gradient(135deg, ${leader.color}, ${jointLeader?.color ?? leader.color})`
                            : leader.color,
                          border: isJoint
                            ? `1px solid rgba(255,255,255,0.2)`
                            : 'none',
                        }}
                      >
                        {evt.title.length > 12
                          ? evt.title.slice(0, 12) + '…'
                          : evt.title}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Conflicts summary */}
        {CONFLICTS.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-4 rounded-lg border border-amber-500/20 p-4"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.06)' }}
          >
            <h4
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
              style={{ color: '#fbbf24' }}
            >
              <AlertTriangle className="h-4 w-4" />
              Scheduling Conflicts ({CONFLICTS.size})
            </h4>
            <div className="space-y-2">
              {Array.from(CONFLICTS.entries()).map(([day, events]) => (
                <div key={day} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>
                  <span className="font-medium opacity-60">Feb {day}:</span>
                  {events.map((evt) => {
                    const leader = getLeader(evt.leaderId)
                    return (
                      <span
                        key={evt.id}
                        className="rounded px-1.5 py-0.5 text-[10px]"
                        style={{
                          backgroundColor: `${leader.color}20`,
                          color: leader.color,
                        }}
                      >
                        {leader.initials} — {evt.title.slice(0, 25)}
                        {evt.title.length > 25 ? '…' : ''}
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}
