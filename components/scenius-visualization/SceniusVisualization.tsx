'use client'

import { useRef, useState, useCallback, useMemo } from 'react'
import { fontHeading, fontBody, fontAccent } from '@/components/why-movemental-final/typography'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SCENIUS_DATA, TIERS } from './network-data'
import { useNetworkLayout, type PositionedNode } from './useNetworkLayout'
import { NetworkNode } from './NetworkNode'
import { NetworkEdge } from './NetworkEdge'
import { NodeModal } from './NodeModal'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WORLD_SIZE = 2000
const CENTER = WORLD_SIZE / 2

/**
 * Camera scales for each tier reveal (except final tier, which is computed from bounds).
 * Tier 0 = single Alan node; tier 1 = Alan + Brad; … tier 12 = full network.
 */
const TIER_SCALES: Record<number, number> = {
  0: 13.5,
  1: 9.0,
  2: 6.6,
  3: 4.8,
  4: 3.6,
  5: 3.15,
  6: 2.85,
  7: 2.64,
  8: 2.46,
  9: 2.34,
  10: 2.22,
  11: 2.1,
  12: 2.0, // overridden by scaleForFullNetwork so full network fits in view
}

/** Total scroll height (vh) for the pinned network panel. Long enough to complete full reveal of ~100 nodes and leave the full network on screen for interaction. */
const SCROLL_VH = 1000

/** Anchor node id for camera focus; camera stays on this node until the final "fit full network" tier. */
const ANCHOR_NODE_ID = 'alan-hirsch'

/** Duration (timeline units) per tier: slow Alan→Brad, faster through the rest, smooth final hold. */
function getTierDuration(tierIndex: number, totalTiers: number): number {
  if (tierIndex === 1) return 2.0 // Alan → two nodes: slow so user can take it in
  if (tierIndex === totalTiers - 1) return 1.1 // final zoom: smooth and hold
  return 0.55 // tiers 2–11: advance faster, still user-controlled via scrub
}

/** Narrative beats shown on scroll (one line per beat). Synced to timeline. */
const NARRATIVE_BEATS = [
  'One voice.',
  'Two. The graph begins—who points to you.',
  'Connected voices. Each addition makes the whole more findable.',
  'The scenius grows.',
  'At 100: a real credibility graph.',
  'Your content discoverable through the people who already trust you. Click a node to explore.',
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Compute bounding box center of a set of nodes */
function getBoundsCenter(nodes: PositionedNode[]): { cx: number; cy: number } {
  if (nodes.length === 0) return { cx: CENTER, cy: CENTER }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const n of nodes) {
    if (n.x < minX) minX = n.x
    if (n.x > maxX) maxX = n.x
    if (n.y < minY) minY = n.y
    if (n.y > maxY) maxY = n.y
  }
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 }
}

/** Bounding box size with padding so we can compute scale-to-fit for the full network */
function getBoundsSize(nodes: PositionedNode[], padding = 120): { width: number; height: number } {
  if (nodes.length === 0) return { width: WORLD_SIZE, height: WORLD_SIZE }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const n of nodes) {
    if (n.x < minX) minX = n.x
    if (n.x > maxX) maxX = n.x
    if (n.y < minY) minY = n.y
    if (n.y > maxY) maxY = n.y
  }
  return {
    width: Math.max(200, maxX - minX + padding * 2),
    height: Math.max(200, maxY - minY + padding * 2),
  }
}

/** Compute the SVG transform for camera: scale + translate to center visible nodes */
function getCameraTransform(
  scale: number,
  focus: { cx: number; cy: number },
  viewW: number,
  viewH: number
): string {
  // We want `focus` to appear at the center of the viewBox.
  // transform: translate(tx, ty) scale(s) where tx,ty shift before scale.
  // After scale: screenX = (worldX + tx) * s = viewW/2 when worldX = cx
  // So tx = viewW/(2*s) - cx, ty = viewH/(2*s) - cy
  const tx = viewW / (2 * scale) - focus.cx
  const ty = viewH / (2 * scale) - focus.cy
  return `scale(${scale}) translate(${tx}, ${ty})`
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SceniusVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const narrativeStripRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const cameraRef = useRef<SVGGElement>(null)
  const nodeGroupRef = useRef<SVGGElement>(null)
  const edgeGroupRef = useRef<SVGGElement>(null)

  const [selectedNode, setSelectedNode] = useState<PositionedNode | null>(null)

  const layout = useNetworkLayout(SCENIUS_DATA)

  // Pre-compute per-tier node groups
  const nodeLookup = useMemo(() => {
    const map = new Map<number, PositionedNode[]>()
    for (const tier of TIERS) {
      map.set(tier, layout.nodes.filter((n) => n.tier === tier))
    }
    return map
  }, [layout.nodes])

  // Which links belong to which tier (a link appears at the max tier of its endpoints)
  const linkTierMap = useMemo(() => {
    const nodeById = new Map(layout.nodes.map((n) => [n.id, n]))
    const map = new Map<number, typeof layout.links>()
    for (const tier of TIERS) {
      map.set(tier, [])
    }
    for (const link of layout.links) {
      const srcTier = nodeById.get(link.source.id)?.tier ?? 0
      const tgtTier = nodeById.get(link.target.id)?.tier ?? 0
      const linkTier = Math.max(srcTier, tgtTier)
      map.get(linkTier)?.push(link)
    }
    return map
  }, [layout])

  const handleNodeClick = useCallback((node: PositionedNode) => {
    setSelectedNode(node)
  }, [])

  /** Scale so the full network fits in the viewBox with padding (proportionate final frame) */
  const scaleForFullNetwork = useMemo(() => {
    const { width, height } = getBoundsSize(layout.nodes)
    const view = WORLD_SIZE
    const scale = Math.min(view / width, view / height) * 0.88
    return Math.max(1.2, Math.min(3, scale)) // clamp so we don't zoom too far in/out
  }, [layout.nodes])

  // ---------------------------------------------------------------------------
  // GSAP Master Timeline
  // ---------------------------------------------------------------------------

  useGSAP(
    () => {
      const container = containerRef.current
      const camera = cameraRef.current
      const nodeGroup = nodeGroupRef.current
      const edgeGroup = edgeGroupRef.current
      if (!container || !camera || !nodeGroup || !edgeGroup) return

      const scrollLength = `+=${SCROLL_VH}vh`

      // Anchor: keep camera centered on Alan until the final tier
      const anchorNode = layout.nodes.find((n) => n.id === ANCHOR_NODE_ID)
      const anchorFocus = anchorNode
        ? { cx: anchorNode.x, cy: anchorNode.y }
        : { cx: CENTER, cy: CENTER }

      // Use a dummy object to tween camera via onUpdate; start centered on anchor
      const cameraState = {
        scale: TIER_SCALES[0],
        cx: anchorFocus.cx,
        cy: anchorFocus.cy,
      }

      // Apply initial camera
      const viewW = WORLD_SIZE
      const viewH = WORLD_SIZE
      camera.setAttribute(
        'transform',
        getCameraTransform(cameraState.scale, { cx: cameraState.cx, cy: cameraState.cy }, viewW, viewH)
      )

      // Make tier-0 nodes visible immediately
      const tier0Nodes = nodeGroup.querySelectorAll<SVGGElement>('[data-tier="0"]')
      gsap.set(tier0Nodes, { opacity: 1 })

      // Make tier-0 edges visible
      const tier0EdgeEls = edgeGroup.querySelectorAll<SVGPathElement>(
        SCENIUS_DATA.links
          .filter((l) => {
            const srcNode = SCENIUS_DATA.nodes.find((n) => n.id === l.source)
            const tgtNode = SCENIUS_DATA.nodes.find((n) => n.id === l.target)
            return (srcNode?.tier ?? 99) === 0 && (tgtNode?.tier ?? 99) === 0
          })
          .map((l) => `[data-source="${l.source}"][data-target="${l.target}"]`)
          .join(',') || '[data-void]'
      )
      tier0EdgeEls.forEach((el) => {
        const len = el.getTotalLength()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: 0 })
      })

      // Build master timeline (full panel lock: one pinned viewport for the whole experience)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: scrollLength,
          pin: true,
          scrub: 0.6,
        },
      })

      // Narrative strip: beat elements (opacity 0 initially), then show beat 0 at start
      const narrativeStrip = narrativeStripRef.current
      const beats = narrativeStrip
        ? NARRATIVE_BEATS.map((_, idx) =>
            narrativeStrip.querySelector(`[data-beat="${idx}"]`) as HTMLElement
          ).filter(Boolean)
        : []
      if (beats.length > 0) {
        gsap.set(beats, { opacity: 0 })
        tl.to(beats[0], { opacity: 1, duration: 0.35, ease: 'power1.out' }, 0.22)
      }

      // Cumulative visible nodes for bounding-box calculation
      const visibleNodes: PositionedNode[] = [...(nodeLookup.get(0) || [])]
      const lastTier = TIERS[TIERS.length - 1]

      // Per-tier reveal sequence
      for (let i = 1; i < TIERS.length; i++) {
        const tier = TIERS[i]
        const tierNodes = nodeLookup.get(tier) || []
        const tierLinks = linkTierMap.get(tier) || []

        // Add these to visible pool
        visibleNodes.push(...tierNodes)
        const currentVisible = [...visibleNodes] // snapshot
        // Use anchor (Alan) as focus for all tiers except the last; last tier centers on full graph so it fits
        const focus =
          tier === lastTier ? getBoundsCenter(currentVisible) : anchorFocus
        const { cx, cy } = focus
        // Final tier: scale so full network fits and stays proportionate in view
        const targetScale =
          tier === lastTier ? scaleForFullNetwork : (TIER_SCALES[tier] ?? 0.65)
        const duration = getTierDuration(i, TIERS.length)

        // 1. Camera tween
        const cameraTween = gsap.to(cameraState, {
          scale: targetScale,
          cx,
          cy,
          duration,
          ease: 'power1.inOut',
          onUpdate() {
            camera.setAttribute(
              'transform',
              getCameraTransform(cameraState.scale, { cx: cameraState.cx, cy: cameraState.cy }, viewW, viewH)
            )
          },
        })
        tl.add(cameraTween)

        // 2. Fade in new nodes
        const nodeSelector = tierNodes.map((n) => `[data-node-id="${n.id}"]`).join(',')
        if (nodeSelector) {
          tl.to(
            nodeGroup.querySelectorAll<SVGGElement>(nodeSelector),
            { opacity: 1, duration: 0.5, stagger: 0.03, ease: 'power1.out' },
            '<+0.2'
          )
        }

        // 3. Draw edges
        const edgeSelector = tierLinks
          .map((l) => `[data-source="${l.source.id}"][data-target="${l.target.id}"]`)
          .join(',')
        if (edgeSelector) {
          const edgeEls = edgeGroup.querySelectorAll<SVGPathElement>(edgeSelector)
          // Set initial stroke-dash
          edgeEls.forEach((el) => {
            const len = el.getTotalLength()
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
          })
          tl.to(edgeEls, { strokeDashoffset: 0, duration: 0.6, stagger: 0.02, ease: 'none' }, '<+0.1')
        }

        // Narrative: at key tiers, switch to the next beat (fade out previous, fade in next)
        if (beats.length >= 6) {
          if (i === 1) {
            tl.to(beats[0], { opacity: 0, duration: 0.25, ease: 'power1.in' }, '+=0.15')
            tl.to(beats[1], { opacity: 1, duration: 0.4, ease: 'power1.out' }, '<')
          } else if (i === 4) {
            tl.to(beats[1], { opacity: 0, duration: 0.25 }, '+=0.1')
            tl.to(beats[2], { opacity: 1, duration: 0.4 }, '<')
          } else if (i === 7) {
            tl.to(beats[2], { opacity: 0, duration: 0.25 }, '+=0.1')
            tl.to(beats[3], { opacity: 1, duration: 0.4 }, '<')
          } else if (i === TIERS.length - 1) {
            tl.to(beats[3], { opacity: 0, duration: 0.25 }, '+=0.1')
            tl.to(beats[4], { opacity: 1, duration: 0.4 }, '<')
          }
        }
      }

      // End pad: hold the full network; show final narrative beat (click to explore)
      if (beats.length >= 6) {
        tl.to(beats[4], { opacity: 0, duration: 0.3 }, '+=0.2')
        tl.to(beats[5], { opacity: 1, duration: 0.5 }, '<')
      }
      tl.to({}, { duration: 6 })
    },
    { scope: containerRef, dependencies: [layout, nodeLookup, linkTierMap, scaleForFullNetwork] }
  )

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* Full panel lock: one viewport pinned for the whole network experience (Alan → two → full network) */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          position: 'relative',
          background: 'var(--color-sage-950, #161d16)',
        }}
      >
        {/* Narrative strip: story beats that update on scroll (synced to timeline) */}
        <div
          ref={narrativeStripRef}
          className="absolute bottom-0 left-0 right-0 z-20 flex justify-center px-6 pb-8 pt-4 md:px-10 md:pb-10"
          style={{
            background: 'linear-gradient(to top, var(--color-sage-950, #161d16) 60%, transparent)',
            pointerEvents: 'none',
          }}
          aria-live="polite"
          aria-atomic
        >
          <div className="relative mx-auto max-w-2xl text-center">
            {NARRATIVE_BEATS.map((text, idx) => (
              <p
                key={idx}
                data-beat={idx}
                className="absolute left-0 right-0 top-0 mx-auto max-w-2xl px-4 text-center text-base font-medium leading-relaxed md:text-lg"
                style={{
                  fontFamily: fontHeading,
                  color: 'var(--color-bright-snow-100, #f0f4f0)',
                  opacity: 0,
                }}
              >
                {text}
              </p>
            ))}
            {/* Spacer so the container has height; beat text is absolutely positioned over it */}
            <p className="invisible text-base font-medium md:text-lg" style={{ fontFamily: fontHeading }}>
              {NARRATIVE_BEATS[0]}
            </p>
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${WORLD_SIZE} ${WORLD_SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          style={{ display: 'block' }}
        >
          <g ref={cameraRef}>
            {/* Edges layer */}
            <g ref={edgeGroupRef} className="edges">
              {layout.links.map((link, i) => (
                <NetworkEdge key={`${link.source.id}-${link.target.id}-${i}`} link={link} />
              ))}
            </g>

            {/* Nodes layer */}
            <g ref={nodeGroupRef} className="nodes">
              {layout.nodes.map((node) => (
                <NetworkNode key={node.id} node={node} onClick={handleNodeClick} />
              ))}
            </g>
          </g>
        </svg>
      </div>

      <NodeModal node={selectedNode} onClose={() => setSelectedNode(null)} />
    </>
  )
}
