'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { ARTICLES, getLeader } from './mock-data'

const RELATED = ARTICLES.slice(1, 5) // 4 articles from different leaders

export function RelatedFromNetwork() {
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px' })
  const [accepted, setAccepted] = useState(false)

  return (
    <SectionWrapper
      title="Related from the Network"
      subtitle="Auto-generated widget that surfaces relevant content from other leaders' platforms."
      badge="Rank #4 · Score 79"
      id="related-from-network"
    >
      {/* Mock article ending */}
      <div
        className="mb-6 rounded-lg p-5"
        style={{ backgroundColor: 'rgba(110, 145, 110, 0.06)' }}
      >
        <p
          className="text-sm leading-relaxed opacity-60"
          style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
        >
          ...and so the mDNA framework provides the theological grammar for
          understanding how movements replicate their core identity across
          diverse cultural contexts. The implications for network-based
          leadership are significant.
        </p>
        <hr className="my-4 border-white/10" />

        <h3
          className="mb-4 text-lg font-semibold"
          style={{
            fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
            color: 'var(--color-bright-snow, #f0f4f0)',
          }}
        >
          Related from the Network
        </h3>

        <div ref={gridRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {RELATED.map((article, i) => {
            const leader = getLeader(article.leaderId)
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={cn(
                  'group relative cursor-pointer rounded-lg border p-4 transition-all duration-200',
                  accepted
                    ? 'border-green-500/40'
                    : 'border-white/10 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg'
                )}
                style={{ backgroundColor: 'rgba(110, 145, 110, 0.08)' }}
              >
                {accepted && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                )}

                {/* Thumbnail placeholder */}
                <div
                  className="mb-3 h-20 rounded"
                  style={{
                    background: `linear-gradient(135deg, ${leader.color}20, ${leader.color}08)`,
                  }}
                />

                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                >
                  {article.title}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {/* Avatar */}
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: leader.color }}
                  >
                    {leader.initials}
                  </span>
                  <span
                    className="text-xs opacity-60"
                    style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
                  >
                    {leader.name}
                  </span>
                  <span
                    className="ml-auto rounded-full px-2 py-0.5 text-[10px]"
                    style={{
                      backgroundColor: 'rgba(110, 145, 110, 0.15)',
                      color: 'var(--color-sage-400, #8fb38f)',
                    }}
                  >
                    {article.theme}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setAccepted(!accepted)}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: accepted
                ? 'rgba(34, 197, 94, 0.15)'
                : 'var(--color-scarlet-rush, #cb3437)',
              color: accepted ? '#4ade80' : '#fff',
            }}
          >
            {accepted ? '✓ Accepted' : 'Accept All'}
          </button>
        </div>
      </div>
    </SectionWrapper>
  )
}
