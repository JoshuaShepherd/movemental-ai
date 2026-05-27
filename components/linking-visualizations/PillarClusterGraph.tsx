'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from './SectionWrapper'
import { LEADERS, getLeader } from './mock-data'

interface ClusterNode {
  id: string
  label: string
  leaderId: string
  angle: number // radians
}

const PILLAR = { id: 'mdna', label: 'mDNA', x: 200, y: 200 }

const CLUSTERS: ClusterNode[] = [
  { id: 'c1', label: 'Multiplication', leaderId: 'brad-brisco', angle: 0 },
  { id: 'c2', label: 'Incarnational', leaderId: 'michael-frost', angle: Math.PI * 0.25 },
  { id: 'c3', label: 'APEST', leaderId: 'tim-catchim', angle: Math.PI * 0.5 },
  { id: 'c4', label: 'Communitas', leaderId: 'alan-hirsch', angle: Math.PI * 0.75 },
  { id: 'c5', label: 'Polycentric', leaderId: 'jr-woodward', angle: Math.PI },
  { id: 'c6', label: 'Organic Systems', leaderId: 'lance-ford', angle: Math.PI * 1.25 },
  { id: 'c7', label: 'Disciple-Making', leaderId: 'brad-brisco', angle: Math.PI * 1.5 },
  { id: 'c8', label: 'Missio Dei', leaderId: 'michael-frost', angle: Math.PI * 1.75 },
]

const RADIUS = 140
const CENTER = 200
const VIEW_SIZE = 400

function getNodePos(angle: number) {
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  }
}

export function PillarClusterGraph() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <SectionWrapper
      title="Pillar-Cluster Topology"
      subtitle="Visual map of how a central pillar topic connects to cluster content across tenants."
      badge="Rank #2 · Score 84"
      id="pillar-cluster-graph"
    >
      <div ref={ref} className="flex justify-center">
        <svg
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          className="w-full max-w-lg"
          style={{ maxHeight: 420 }}
        >
          {/* Connection lines */}
          {CLUSTERS.map((cluster, i) => {
            const pos = getNodePos(cluster.angle)
            const leader = getLeader(cluster.leaderId)
            const isSameTenant = cluster.leaderId === 'alan-hirsch'
            return (
              <motion.line
                key={`line-${cluster.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={pos.x}
                y2={pos.y}
                stroke={isSameTenant ? '#6e916e' : '#8c50af'}
                strokeWidth={hovered === cluster.id ? 2 : 1}
                strokeDasharray={isSameTenant ? 'none' : '6 3'}
                opacity={hovered && hovered !== cluster.id ? 0.2 : 0.6}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
              />
            )
          })}

          {/* Pillar node (center) */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={28}
              fill="#cb3437"
              opacity={0.9}
            />
            <text
              x={CENTER}
              y={CENTER + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="13"
              fontWeight="700"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {PILLAR.label}
            </text>
          </motion.g>

          {/* Cluster nodes */}
          {CLUSTERS.map((cluster, i) => {
            const pos = getNodePos(cluster.angle)
            const leader = getLeader(cluster.leaderId)
            const isHovered = hovered === cluster.id
            return (
              <motion.g
                key={cluster.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                onMouseEnter={() => setHovered(cluster.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered ? 22 : 18}
                  fill={leader.color}
                  opacity={hovered && !isHovered ? 0.3 : 0.85}
                  style={{ transition: 'all 0.2s' }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="8"
                  fontWeight="600"
                >
                  {cluster.label}
                </text>

                {/* Tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={pos.x - 55}
                      y={pos.y - 48}
                      width={110}
                      height={24}
                      rx={4}
                      fill="rgba(0,0,0,0.85)"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 36}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="8"
                    >
                      {leader.name} · {leader.org}
                    </text>
                  </g>
                )}
              </motion.g>
            )
          })}

          {/* Legend */}
          <g transform="translate(10, 370)">
            <line x1={0} y1={0} x2={20} y2={0} stroke="#6e916e" strokeWidth={1.5} />
            <text x={25} y={4} fill="rgba(240,244,240,0.5)" fontSize="9">
              Same tenant
            </text>
            <line x1={100} y1={0} x2={120} y2={0} stroke="#8c50af" strokeWidth={1.5} strokeDasharray="6 3" />
            <text x={125} y={4} fill="rgba(240,244,240,0.5)" fontSize="9">
              Cross-tenant
            </text>
          </g>
        </svg>
      </div>
    </SectionWrapper>
  )
}
