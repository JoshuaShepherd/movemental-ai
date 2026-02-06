'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { PositionedNode } from './useNetworkLayout'

interface NodeModalProps {
  node: PositionedNode | null
  onClose: () => void
}

export function NodeModal({ node, onClose }: NodeModalProps) {
  return (
    <Dialog open={!!node} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="border-sage-800 sm:max-w-md"
        style={{
          background: 'var(--color-sage-900, #1a2a1a)',
          color: 'var(--color-bright-snow-100, #f0f4f0)',
        }}
      >
        {node && (
          <>
            <DialogHeader>
              <DialogTitle
                style={{
                  fontFamily: 'var(--font-playfair, Georgia, serif)',
                  color: 'var(--color-bright-snow-50, #fff)',
                  fontSize: '1.25rem',
                }}
              >
                {node.name}
              </DialogTitle>
              {node.role && (
                <DialogDescription
                  style={{
                    color: 'var(--color-sage-300, #a3bea3)',
                    fontFamily: 'var(--font-space-grotesk, monospace)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {node.role}
                  {node.organization && ` · ${node.organization}`}
                </DialogDescription>
              )}
            </DialogHeader>

            {node.bio && (
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{
                  color: 'var(--color-bright-snow-300, #d0d8d0)',
                  fontFamily: 'var(--font-inter, sans-serif)',
                }}
              >
                {node.bio}
              </p>
            )}

            {node.tags && node.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {node.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full px-2.5 py-0.5 text-xs"
                    style={{
                      background: 'var(--color-sage-800, #2a3e2a)',
                      color: 'var(--color-sage-200, #c4dac4)',
                      fontFamily: 'var(--font-space-grotesk, monospace)',
                      border: '1px solid rgba(110, 145, 110, 0.3)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
