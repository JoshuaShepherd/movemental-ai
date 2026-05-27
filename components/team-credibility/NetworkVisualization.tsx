'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export interface NetworkMember {
  id: string
  name: string
  role: string
  avatarUrl?: string
  position: { x: number; y: number } // Percentage 0-100
  size: 'sm' | 'md' | 'lg'
}

interface NetworkVisualizationProps {
  members: NetworkMember[]
  centerElement?: React.ReactNode
  className?: string
}

const sizeClasses = {
  sm: 'w-10 h-10 sm:w-12 sm:h-12',
  md: 'w-14 h-14 sm:w-16 sm:h-16',
  lg: 'w-18 h-18 sm:w-20 sm:h-20',
}

export function NetworkVisualization({
  members,
  centerElement,
  className,
}: NetworkVisualizationProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredId(id)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null)
  }, [])

  return (
    <section className={cn('py-16 sm:py-24 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Network
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Movement leaders connected through shared mission and collaborative growth
          </p>
        </div>

        {/* Visualization */}
        <div className="relative aspect-square max-w-2xl mx-auto">
          {/* Concentric rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[25%] h-[25%] rounded-full border border-border/30" />
            <div className="absolute w-[50%] h-[50%] rounded-full border border-border/30" />
            <div className="absolute w-[75%] h-[75%] rounded-full border border-border/30" />
            <div className="absolute w-full h-full rounded-full border border-border/30" />
          </div>

          {/* Center element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            {centerElement || (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg">
                M
              </div>
            )}
          </div>

          {/* Network members */}
          {members.map((member) => (
            <div
              key={member.id}
              className={cn(
                'absolute rounded-full overflow-hidden cursor-pointer transition-all duration-200',
                'ring-2 ring-background shadow-md',
                sizeClasses[member.size],
                hoveredId === member.id && 'ring-primary scale-110 z-20 shadow-lg'
              )}
              style={{
                left: `${member.position.x}%`,
                top: `${member.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => handleMouseEnter(member.id)}
              onMouseLeave={handleMouseLeave}
            >
              {member.avatarUrl ? (
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                  {member.name.charAt(0)}
                </div>
              )}

              {/* Tooltip */}
              {hoveredId === member.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap z-30">
                  <div className="bg-popover text-popover-foreground px-3 py-1.5 rounded shadow-lg text-sm">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
