'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export interface NetworkMember {
  id: string
  name: string
  role: string
  avatarUrl?: string
  position: { x: number; y: number }
  size: 'sm' | 'md' | 'lg'
}

interface NetworkVisualizationProps {
  members: NetworkMember[]
  onMemberClick?: (memberId: string) => void
  className?: string
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-18 h-18',
}

export function NetworkVisualization({
  members,
  onMemberClick,
  className,
}: NetworkVisualizationProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className={cn('relative aspect-square bg-background', className)}>
      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[25, 50, 75, 100].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-border/20"
            style={{ width: `${size}%`, height: `${size}%` }}
          />
        ))}
      </div>

      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          M
        </div>
      </div>

      {/* Network nodes */}
      {members.map((member) => (
        <div
          key={member.id}
          className={cn(
            'absolute rounded-full overflow-hidden cursor-pointer transition-all duration-200',
            'ring-2 ring-background shadow-md',
            sizeClasses[member.size],
            hoveredId === member.id && 'ring-primary scale-110 z-20'
          )}
          style={{
            left: `${member.position.x}%`,
            top: `${member.position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onMouseEnter={() => setHoveredId(member.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onMemberClick?.(member.id)}
        >
          {member.avatarUrl ? (
            <Image src={member.avatarUrl} alt={member.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
              {member.name.charAt(0)}
            </div>
          )}

          {/* Tooltip */}
          {hoveredId === member.id && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap z-30 pointer-events-none">
              <div className="bg-popover text-popover-foreground px-3 py-1.5 rounded shadow-lg text-sm">
                <p className="font-semibold">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
