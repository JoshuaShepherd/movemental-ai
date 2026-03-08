import { useMemo } from 'react'
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceLink,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from 'd3-force'
import type { SceniusNode, SceniusLink, SceniusData } from './network-data'

// ---------------------------------------------------------------------------
// Output types — nodes/links with computed positions
// ---------------------------------------------------------------------------

export interface PositionedNode extends SceniusNode {
  x: number
  y: number
}

export interface PositionedLink {
  source: PositionedNode
  target: PositionedNode
  strength: number
}

export interface NetworkLayout {
  nodes: PositionedNode[]
  links: PositionedLink[]
}

// ---------------------------------------------------------------------------
// Internal simulation types
// ---------------------------------------------------------------------------

interface SimNode extends SimulationNodeDatum {
  id: string
  tier: number
  fx?: number | null
  fy?: number | null
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  strength: number
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WORLD_SIZE = 2000
const CENTER = WORLD_SIZE / 2
const TICK_COUNT = 450

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useNetworkLayout(data: SceniusData): NetworkLayout {
  return useMemo(() => {
    // Build simulation nodes — shallow copies so d3 can mutate x/y
    const simNodes: SimNode[] = data.nodes.map((n) => ({
      id: n.id,
      tier: n.tier,
      // Pin Alan at center
      ...(n.tier === 0
        ? { fx: CENTER, fy: CENTER, x: CENTER, y: CENTER }
        : { x: CENTER + (Math.random() - 0.5) * 400, y: CENTER + (Math.random() - 0.5) * 400 }),
    }))

    const nodeById = new Map(simNodes.map((n) => [n.id, n]))

    // Build simulation links
    const simLinks: SimLink[] = data.links
      .filter((l) => nodeById.has(l.source) && nodeById.has(l.target))
      .map((l) => ({
        source: l.source,
        target: l.target,
        strength: l.strength ?? 0.5,
      }))

    // Run simulation synchronously
    const simulation = forceSimulation<SimNode>(simNodes)
      .force('center', forceCenter<SimNode>(CENTER, CENTER).strength(0.05))
      .force('charge', forceManyBody<SimNode>().strength(-200))
      .force(
        'link',
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((l) => 80 + (1 - l.strength) * 200)
          .strength((l) => 0.3 + l.strength * 0.5)
      )
      .force('collide', forceCollide<SimNode>(30))
      .stop()

    // Tick to convergence
    for (let i = 0; i < TICK_COUNT; i++) {
      simulation.tick()
    }

    // Build a lookup of original node data
    const origById = new Map(data.nodes.map((n) => [n.id, n]))

    // Merge positions back onto original node data
    const positionedNodes: PositionedNode[] = simNodes.map((sn) => ({
      ...origById.get(sn.id)!,
      x: sn.x ?? CENTER,
      y: sn.y ?? CENTER,
    }))

    const posNodeById = new Map(positionedNodes.map((n) => [n.id, n]))

    // Resolve links to positioned nodes
    const positionedLinks: PositionedLink[] = simLinks
      .map((sl) => {
        const src = typeof sl.source === 'object' ? (sl.source as SimNode).id : (sl.source as string)
        const tgt = typeof sl.target === 'object' ? (sl.target as SimNode).id : (sl.target as string)
        const sourceNode = posNodeById.get(src)
        const targetNode = posNodeById.get(tgt)
        if (!sourceNode || !targetNode) return null
        return { source: sourceNode, target: targetNode, strength: sl.strength }
      })
      .filter((l): l is PositionedLink => l !== null)

    return { nodes: positionedNodes, links: positionedLinks }
  }, [data])
}
