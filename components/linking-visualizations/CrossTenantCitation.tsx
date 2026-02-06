'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from './SectionWrapper'
import { ARTICLES, getLeader, LINK_SUGGESTIONS } from './mock-data'

const BEFORE_TEXT = `Every significant movement in history carries a core set of ideas — a missional DNA — that defines its identity and drives its growth. This mDNA includes six critical elements that, when activated together, generate the conditions for exponential multiplication. Understanding these elements is not merely academic; it is the practical key to catalyzing movement in any context.

The first element is Jesus as Lord — the radical, subversive claim at the heart of every apostolic movement. The second is disciple-making, the irreducible practice that transfers mDNA from person to person. The third is the missional-incarnational impulse that propels the community outward into its surrounding culture.`

const CITATION_SEGMENTS = [
  {
    before: 'generate the conditions for exponential multiplication',
    after: 'generate the conditions for exponential multiplication',
    citation: {
      leaderId: 'brad-brisco',
      articleId: 'art-2',
      text: 'Brad Brisco explores this in "Multiplication Through Missional Engagement"',
    },
  },
  {
    before: 'the missional-incarnational impulse that propels the community outward',
    after: 'the missional-incarnational impulse that propels the community outward',
    citation: {
      leaderId: 'michael-frost',
      articleId: 'art-3',
      text: 'See Michael Frost\'s "Incarnational Presence in Post-Christendom"',
    },
  },
]

const CANDIDATES = LINK_SUGGESTIONS.slice(0, 4)

export function CrossTenantCitation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [showAfter, setShowAfter] = useState(false)

  const renderText = () => {
    if (!showAfter) {
      return (
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-bright-snow, #f0f4f0)', opacity: 0.8 }}
        >
          {BEFORE_TEXT}
        </p>
      )
    }

    // Build annotated text
    let text = BEFORE_TEXT
    const parts: { text: string; citation?: (typeof CITATION_SEGMENTS)[0]['citation'] }[] = []

    // Simple approach: split by citation anchors
    let remaining = text
    for (const seg of CITATION_SEGMENTS) {
      const idx = remaining.indexOf(seg.before)
      if (idx === -1) continue
      if (idx > 0) parts.push({ text: remaining.slice(0, idx) })
      parts.push({ text: seg.before, citation: seg.citation })
      remaining = remaining.slice(idx + seg.before.length)
    }
    if (remaining) parts.push({ text: remaining })

    return (
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-bright-snow, #f0f4f0)', opacity: 0.8 }}>
        {parts.map((part, i) => {
          if (!part.citation) return <span key={i}>{part.text}</span>
          const leader = getLeader(part.citation.leaderId)
          return (
            <span key={i}>
              <motion.span
                initial={{ backgroundSize: '0% 2px' }}
                animate={{ backgroundSize: '100% 2px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--color-velvet-orchid, #8c50af), var(--color-velvet-orchid, #8c50af))',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'left bottom',
                }}
              >
                {part.text}
              </motion.span>
              <span className="ml-1 inline-flex items-center gap-1 align-baseline">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                  style={{ backgroundColor: leader.color }}
                >
                  {leader.initials}
                </span>
                <span
                  className="text-xs italic"
                  style={{ color: 'var(--color-velvet-orchid, #8c50af)' }}
                >
                  [{part.citation.text}]
                </span>
              </span>
            </span>
          )
        })}
      </p>
    )
  }

  return (
    <SectionWrapper
      title="Cross-Tenant Citations"
      subtitle="Inline citations that link directly to content on other leaders' platforms."
      badge="Rank #1 · Score 87"
      id="cross-tenant-citation"
    >
      <div ref={ref}>
        {/* Toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setShowAfter(false)}
            className={cn(
              'rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
              !showAfter ? 'text-white' : 'text-white/50'
            )}
            style={{
              backgroundColor: !showAfter
                ? 'rgba(110, 145, 110, 0.25)'
                : 'transparent',
            }}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={cn(
              'rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
              showAfter ? 'text-white' : 'text-white/50'
            )}
            style={{
              backgroundColor: showAfter
                ? 'rgba(140, 80, 175, 0.25)'
                : 'transparent',
            }}
          >
            After
          </button>
        </div>

        {/* Article text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg p-5"
          style={{ backgroundColor: 'rgba(110, 145, 110, 0.06)' }}
        >
          {renderText()}
        </motion.div>

        {/* Candidate cards */}
        {showAfter && (
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {CANDIDATES.map((sug, i) => {
              const leader = getLeader(sug.leaderId)
              const article = ARTICLES.find((a) => a.id === sug.articleId)
              return (
                <motion.div
                  key={sug.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-lg border border-white/10 p-3"
                  style={{ backgroundColor: 'rgba(110, 145, 110, 0.06)' }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: leader.color }}
                  >
                    {leader.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-xs font-medium"
                      style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                    >
                      {article?.title}
                    </p>
                    <p className="text-[10px] opacity-50" style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}>
                      {leader.name} · {leader.org}
                    </p>
                  </div>
                  <button
                    className="shrink-0 rounded px-2 py-1 text-[10px] font-semibold text-white"
                    style={{ backgroundColor: 'var(--color-scarlet-rush, #cb3437)' }}
                  >
                    Insert
                  </button>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
