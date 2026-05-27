'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Bold,
  Italic,
  List,
  Link2,
  Image,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { LINK_SUGGESTIONS, getLeader, ARTICLES } from './mock-data'

export function PublishTimeSuggestions() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <SectionWrapper
      title="Publish-Time Link Suggestions"
      subtitle="As you write, the platform suggests relevant content from across the network."
      badge="Rank #3 · Score 82"
      id="publish-time-suggestions"
    >
      <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left: Mock editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-white/10 overflow-hidden"
          style={{ backgroundColor: 'rgba(110, 145, 110, 0.06)' }}
        >
          {/* Toolbar */}
          <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
            {[Bold, Italic, List, Link2, Image].map((Icon, i) => (
              <span
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded opacity-40"
              >
                <Icon className="h-3.5 w-3.5 text-white" />
              </span>
            ))}
          </div>
          {/* Content */}
          <div className="p-4">
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-40"
              style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
            >
              Draft — Understanding mDNA
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-bright-snow, #f0f4f0)', opacity: 0.7 }}
            >
              Every significant movement in history carries a core set of
              ideas — a missional DNA — that defines its identity and drives
              its growth. This mDNA includes six critical elements that, when
              activated together, generate the conditions for exponential
              multiplication.
            </p>
            <span
              className="mt-2 inline-block h-4 w-0.5 animate-pulse"
              style={{ backgroundColor: 'var(--color-sage-400, #8fb38f)' }}
            />
          </div>
        </motion.div>

        {/* Right: Suggestion panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg border border-white/10 overflow-hidden"
          style={{ backgroundColor: 'rgba(110, 145, 110, 0.06)' }}
        >
          <div className="border-b border-white/10 px-4 py-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
            >
              Suggested Network Links
            </h3>
            <p className="text-xs opacity-50" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>
              5 suggestions found
            </p>
          </div>

          <div className="space-y-1 p-2">
            {LINK_SUGGESTIONS.map((sug, i) => {
              const leader = getLeader(sug.leaderId)
              const article = ARTICLES.find((a) => a.id === sug.articleId)
              const isExpanded = expandedId === sug.id

              return (
                <motion.div
                  key={sug.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  className="rounded-lg border border-white/5 p-3"
                  style={{ backgroundColor: 'rgba(110, 145, 110, 0.04)' }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: leader.color }}
                    >
                      {leader.initials}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className="text-xs font-medium leading-snug"
                        style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                      >
                        {article?.title}
                      </p>
                      <p
                        className="mt-0.5 text-[10px] opacity-50"
                        style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                      >
                        {leader.name}
                      </p>

                      {/* Relevance bar */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${sug.relevance}%` } : { width: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: leader.color }}
                          />
                        </div>
                        <span
                          className="text-[10px] tabular-nums"
                          style={{
                            fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
                            color: leader.color,
                          }}
                        >
                          {sug.relevance}%
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor:
                          sug.type === 'auto-applied'
                            ? 'rgba(110, 145, 110, 0.2)'
                            : 'rgba(140, 80, 175, 0.2)',
                        color:
                          sug.type === 'auto-applied'
                            ? 'var(--color-sage-400, #8fb38f)'
                            : 'var(--color-velvet-orchid, #8c50af)',
                      }}
                    >
                      {sug.type === 'auto-applied' ? 'Auto' : 'Suggested'}
                    </span>
                  </div>

                  {/* Why toggle */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : sug.id)}
                    className="mt-2 flex items-center gap-1 text-[10px] font-medium opacity-50 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                    Why this link?
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden text-[11px] leading-relaxed opacity-60"
                        style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                      >
                        <span className="block pt-1">{sug.reason}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
