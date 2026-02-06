'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { FileText, Video, Headphones, GraduationCap } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { TOPIC_CONTENT, getLeader } from './mock-data'

const TYPE_ICONS: Record<string, typeof FileText> = {
  article: FileText,
  video: Video,
  podcast: Headphones,
  course: GraduationCap,
}

const TYPE_COLORS: Record<string, string> = {
  article: '#6e916e',
  video: '#cb3437',
  podcast: '#8c50af',
  course: '#4a7a8c',
}

export function TagAggregation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper
      title="Tag Aggregation Pages"
      subtitle="Theme-based pages that aggregate content from across the entire network."
      badge="Rank #8 · Score 70"
      id="tag-aggregation"
    >
      <div ref={ref}>
        {/* Topic header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 rounded-lg border border-white/10 p-5"
          style={{ backgroundColor: 'rgba(203, 52, 55, 0.08)' }}
        >
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: 'rgba(203, 52, 55, 0.2)',
              color: '#cb3437',
              fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
            }}
          >
            Theme Page
          </span>
          <h3
            className="text-xl font-bold"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
              color: 'var(--color-bright-snow, #f0f4f0)',
            }}
          >
            mDNA — Missional DNA
          </h3>
          <p
            className="mt-1 text-sm opacity-60"
            style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
          >
            {TOPIC_CONTENT.length} pieces of content from {new Set(TOPIC_CONTENT.map((c) => c.leaderId)).size} leaders across the network
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPIC_CONTENT.map((content, i) => {
            const leader = getLeader(content.leaderId)
            const Icon = TYPE_ICONS[content.type] ?? FileText
            const typeColor = TYPE_COLORS[content.type] ?? '#6e916e'
            return (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
                className="group rounded-lg border border-white/10 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg"
                style={{ backgroundColor: 'rgba(110, 145, 110, 0.06)' }}
              >
                {/* Type badge */}
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" style={{ color: typeColor }} />
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium capitalize"
                    style={{
                      backgroundColor: `${typeColor}20`,
                      color: typeColor,
                    }}
                  >
                    {content.type}
                  </span>
                </div>

                <h4
                  className="mb-2 text-sm font-semibold leading-snug"
                  style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                >
                  {content.title}
                </h4>

                <p
                  className="mb-3 text-xs leading-relaxed opacity-50"
                  style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                >
                  {content.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: leader.color }}
                  >
                    {leader.initials}
                  </span>
                  <span
                    className="text-[10px] opacity-60"
                    style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                  >
                    {leader.name} · {leader.org}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
