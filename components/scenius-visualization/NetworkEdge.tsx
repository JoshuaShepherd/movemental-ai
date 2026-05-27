'use client'

import { forwardRef } from 'react'
import type { PositionedLink } from './useNetworkLayout'

interface NetworkEdgeProps {
  link: PositionedLink
}

export const NetworkEdge = forwardRef<SVGPathElement, NetworkEdgeProps>(
  function NetworkEdge({ link }, ref) {
    const { source, target, strength } = link

    // Straight line path
    const d = `M ${source.x} ${source.y} L ${target.x} ${target.y}`

    // Opacity and width based on strength
    const strokeOpacity = 0.15 + strength * 0.35
    const strokeWidth = 0.5 + strength * 1.5

    return (
      <path
        ref={ref}
        d={d}
        data-source={source.id}
        data-target={target.id}
        stroke="#6e916e"
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        fill="none"
        // strokeDasharray and strokeDashoffset will be set by GSAP
      />
    )
  }
)
