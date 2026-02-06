'use client'

import { useRef, useState, useCallback, useMemo } from 'react'
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
 * Camera scales for each tier reveal.
 * Index = tier number. Zooms from tight (tier 0) to full network (tier 12).
 */
const TIER_SCALES: Record<number, number> = {
  0: 4.5,
  1: 3.0,
  2: 2.2,
  3: 1.6,
  4: 1.2,
  5: 1.05,
  6: 0.95,
  7: 0.88,
  8: 0.82,
  9: 0.78,
  10: 0.74,
  11: 0.7,
  12: 0.68,
}

/** Total scroll height as viewport heights */
const SCROLL_VH = 500

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

      // Use a dummy object to tween camera via onUpdate
      const cameraState = { scale: TIER_SCALES[0], cx: CENTER, cy: CENTER }

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

      // Build master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: scrollLength,
          pin: true,
          scrub: 0.5,
        },
      })

      // Cumulative visible nodes for bounding-box calculation
      const visibleNodes: PositionedNode[] = [...(nodeLookup.get(0) || [])]

      // Per-tier reveal sequence
      for (let i = 1; i < TIERS.length; i++) {
        const tier = TIERS[i]
        const tierNodes = nodeLookup.get(tier) || []
        const tierLinks = linkTierMap.get(tier) || []

        // Add these to visible pool
        visibleNodes.push(...tierNodes)
        const currentVisible = [...visibleNodes] // snapshot
        const { cx, cy } = getBoundsCenter(currentVisible)
        const targetScale = TIER_SCALES[tier] ?? 0.65

        // 1. Camera tween
        const cameraTween = gsap.to(cameraState, {
          scale: targetScale,
          cx,
          cy,
          duration: 0.8,
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
      }

      // Pad end so the final state holds
      tl.to({}, { duration: 0.5 })
    },
    { scope: containerRef, dependencies: [layout, nodeLookup, linkTierMap] }
  )

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'var(--color-sage-950, #161d16)',
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WORLD_SIZE} ${WORLD_SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          className="h-screen w-full"
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
