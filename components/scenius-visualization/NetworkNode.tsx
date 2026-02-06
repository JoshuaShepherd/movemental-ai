'use client'

import { forwardRef } from 'react'
import type { PositionedNode } from './useNetworkLayout'

interface NetworkNodeProps {
  node: PositionedNode
  onClick?: (node: PositionedNode) => void
}

/** Radius by tier: tier 0 is largest, higher tiers shrink */
function getRadius(tier: number): number {
  if (tier === 0) return 28
  if (tier === 1) return 22
  if (tier <= 3) return 16
  if (tier <= 5) return 12
  return 9
}

/** Extract initials from a name */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/** Font size scales with radius */
function getFontSize(radius: number): number {
  return Math.max(6, radius * 0.65)
}

export const NetworkNode = forwardRef<SVGGElement, NetworkNodeProps>(
  function NetworkNode({ node, onClick }, ref) {
    const r = getRadius(node.tier)
    const initials = getInitials(node.name)
    const fontSize = getFontSize(r)

    // Tier-based coloring
    const fillColor =
      node.tier === 0
        ? '#cb3437' // Scarlet Rush for Alan
        : node.tier <= 2
          ? '#6e916e' // Sage for inner circle
          : node.tier <= 4
            ? '#8c50af' // Velvet Orchid for known authors
            : '#3a5a3a' // Darker sage for mock

    return (
      <g
        ref={ref}
        data-node-id={node.id}
        data-tier={node.tier}
        style={{ cursor: 'pointer', opacity: 0 }}
        onClick={() => onClick?.(node)}
      >
        {/* Background circle */}
        <circle cx={node.x} cy={node.y} r={r} fill={fillColor} stroke="#f0f4f0" strokeWidth={1.5} />

        {/* Avatar image or initials fallback */}
        {node.avatarUrl ? (
          <>
            <clipPath id={`clip-${node.id}`}>
              <circle cx={node.x} cy={node.y} r={r - 1} />
            </clipPath>
            <image
              href={node.avatarUrl}
              x={node.x - r + 1}
              y={node.y - r + 1}
              width={(r - 1) * 2}
              height={(r - 1) * 2}
              clipPath={`url(#clip-${node.id})`}
              preserveAspectRatio="xMidYMid slice"
            />
          </>
        ) : (
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#f0f4f0"
            fontSize={fontSize}
            fontFamily="var(--font-space-grotesk, monospace)"
            fontWeight={600}
          >
            {initials}
          </text>
        )}

        {/* Name label below */}
        <text
          x={node.x}
          y={node.y + r + 10}
          textAnchor="middle"
          fill="#f0f4f0"
          fontSize={Math.max(6, r * 0.5)}
          fontFamily="var(--font-inter, sans-serif)"
          fontWeight={400}
          style={{ pointerEvents: 'none' }}
        >
          {node.name}
        </text>
      </g>
    )
  }
)
