'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { PositionedNode } from './useNetworkLayout'

const cardStyles = {
  background: 'var(--color-sage-900, #1a2a1a)',
  color: 'var(--color-bright-snow-100, #f0f4f0)',
  border: 'border-sage-800',
}
const titleFont = { fontFamily: 'var(--font-playfair, Georgia, serif)', color: 'var(--color-bright-snow-50, #fff)', fontSize: '1.25rem' }
const metaFont = { fontFamily: 'var(--font-space-grotesk, monospace)', color: 'var(--color-sage-300, #a3bea3)', fontSize: '0.8rem', letterSpacing: '0.02em' }
const bodyFont = { color: 'var(--color-bright-snow-300, #d0d8d0)', fontFamily: 'var(--font-inter, sans-serif)' }
const tagStyle = 'inline-block rounded-full px-2.5 py-0.5 text-xs font-[var(--font-space-grotesk)] border border-sage-600/50'
const tagBg = 'var(--color-sage-800, #2a3e2a)'
const tagColor = 'var(--color-sage-200, #c4dac4)'

interface NodeModalProps {
  node: PositionedNode | null
  onClose: () => void
}

export function NodeModal({ node, onClose }: NodeModalProps) {
  return (
    <Dialog open={!!node} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`${cardStyles.border} sm:max-w-md`}
        style={{ background: cardStyles.background, color: cardStyles.color }}
      >
        {node && (
          <>
            <DialogHeader>
              <DialogTitle style={titleFont}>
                {node.name}
              </DialogTitle>
              {node.role && (
                <DialogDescription style={metaFont}>
                  {node.role}
                  {node.organization && ` · ${node.organization}`}
                </DialogDescription>
              )}
            </DialogHeader>

            {node.inNetwork ? (
              /* In-network card: distributed credibility + story */
              <>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-md px-2 py-0.5 text-xs font-medium"
                    style={{
                      background: 'rgba(110, 145, 110, 0.25)',
                      color: 'var(--color-sage-200, #c4dac4)',
                      fontFamily: 'var(--font-space-grotesk, monospace)',
                    }}
                  >
                    In the Movemental network
                  </span>
                  {node.connectionCount != null && node.connectionCount > 0 && (
                    <span className="text-sm" style={bodyFont}>
                      Connected to <strong>{node.connectionCount}</strong> {node.connectionCount === 1 ? 'leader' : 'leaders'} in this scenius
                    </span>
                  )}
                </div>
                {node.citedByCount != null && node.citedByCount > 0 && (
                  <p className="mt-1.5 text-sm" style={bodyFont}>
                    Cited by <strong>{node.citedByCount}</strong> network {node.citedByCount === 1 ? 'piece' : 'pieces'}—credibility amplified through the graph.
                  </p>
                )}
                {node.bio && (
                  <p className="mt-3 text-sm leading-relaxed" style={bodyFont}>
                    {node.bio}
                  </p>
                )}
                <p className="mt-2 text-xs italic" style={{ ...bodyFont, opacity: 0.9 }}>
                  Content linked and discoverable with the movement.
                </p>
                {node.tags && node.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {node.tags.map((tag) => (
                      <span
                        key={tag}
                        className={tagStyle}
                        style={{ background: tagBg, color: tagColor }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Persona card: who's next */
              <>
                <div className="mt-2">
                  <span
                    className="rounded-md px-2 py-0.5 text-xs font-medium"
                    style={{
                      background: 'rgba(140, 80, 175, 0.2)',
                      color: 'var(--color-sage-200, #c4dac4)',
                      fontFamily: 'var(--font-space-grotesk, monospace)',
                    }}
                  >
                    Who&apos;s next in the scenius
                  </span>
                </div>
                {node.personaStory && (
                  <p className="mt-3 text-sm leading-relaxed" style={bodyFont}>
                    {node.personaStory}
                  </p>
                )}
                <p className="mt-2 text-xs" style={{ ...bodyFont, opacity: 0.85 }}>
                  Join as the next voice in the network—your content discoverable and amplified alongside trusted peers.
                </p>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
