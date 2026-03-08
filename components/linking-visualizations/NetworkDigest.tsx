'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link2, Eye, TrendingUp } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { DIGEST_ITEMS, getLeader } from './mock-data'

const METRICS = [
  { label: 'Inbound Links', value: 47, icon: Link2, color: '#6e916e' },
  { label: 'Content Views', value: 2340, icon: Eye, color: '#cb3437' },
  { label: 'Network Reach', value: 156, icon: TrendingUp, color: '#8c50af' },
]

function AnimatedNumber({ target, isInView }: { target: number; isInView: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1200
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, target])

  return <>{value.toLocaleString()}</>
}

export function NetworkDigest() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const linkedByItems = DIGEST_ITEMS.filter((d) => d.section === 'linked-by')
  const newInThemes = DIGEST_ITEMS.filter((d) => d.section === 'new-in-themes')
  const suggestedCollabs = DIGEST_ITEMS.filter((d) => d.section === 'suggested-collabs')

  const sections = [
    { title: 'Your content was linked by', items: linkedByItems, delay: 0.2 },
    { title: 'New in your themes', items: newInThemes, delay: 0.5 },
    { title: 'Suggested collaborations', items: suggestedCollabs, delay: 0.8 },
  ]

  return (
    <SectionWrapper
      title="Weekly Network Digest"
      subtitle="Automated weekly summary of network activity, linking impact, and collaboration opportunities."
      badge="Section 6.3"
      id="network-digest"
    >
      <div
        ref={ref}
        className="rounded-xl border border-white/10 p-5 md:p-6"
        style={{ backgroundColor: 'rgba(110, 145, 110, 0.08)' }}
      >
        {/* Digest header */}
        <div className="mb-5 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-wider opacity-40"
            style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
          >
            Network Digest — Week of Feb 3
          </p>
        </div>

        {/* Metrics row */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {METRICS.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-lg border border-white/5 p-3 text-center"
                style={{ backgroundColor: 'rgba(110, 145, 110, 0.04)' }}
              >
                <Icon className="mx-auto mb-1 h-4 w-4" style={{ color: m.color }} />
                <p
                  className="text-xl font-bold tabular-nums"
                  style={{
                    fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
                    color: m.color,
                  }}
                >
                  <AnimatedNumber target={m.value} isInView={isInView} />
                </p>
                <p
                  className="text-[10px] opacity-50"
                  style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                >
                  {m.label}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Digest sections */}
        {sections.map((section) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: section.delay }}
            className="mb-4 last:mb-0"
          >
            <h4
              className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-50"
              style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
            >
              {section.title}
            </h4>
            <div className="space-y-1.5">
              {section.items.map((item) => {
                const leader = getLeader(item.leaderId)
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg border border-white/5 p-3"
                    style={{ backgroundColor: 'rgba(110, 145, 110, 0.04)' }}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: leader.color }}
                    >
                      {leader.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-xs font-medium"
                        style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="truncate text-[10px] opacity-50"
                        style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                      >
                        {item.description}
                      </p>
                    </div>
                    {item.section === 'suggested-collabs' && (
                      <button
                        className="shrink-0 rounded px-2 py-1 text-[10px] font-semibold text-white"
                        style={{ backgroundColor: 'var(--color-scarlet-rush, #cb3437)' }}
                      >
                        Explore
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
