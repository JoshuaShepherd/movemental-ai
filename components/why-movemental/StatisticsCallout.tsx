'use client'

import { cn } from '@/lib/utils'
import { DollarSign, Users, TrendingUp, Zap, Heart, Star } from 'lucide-react'

type IconType = 'dollar' | 'users' | 'trending' | 'zap' | 'heart' | 'star'

interface StatisticsCalloutProps {
  /** Large statistic value (e.g., "66%", "3x", "10M") */
  value: string
  /** Context text explaining the statistic */
  context: string
  /** Gradient preset or custom gradient */
  gradient?: 'yellow-green' | 'blue-purple' | 'pink-orange' | 'teal-blue' | string
  /** Optional decorative icons */
  icons?: IconType[]
  /** Text alignment */
  align?: 'left' | 'center'
  /** Custom class name */
  className?: string
}

const iconMap = {
  dollar: DollarSign,
  users: Users,
  trending: TrendingUp,
  zap: Zap,
  heart: Heart,
  star: Star,
}

const gradientPresets: Record<string, string> = {
  'yellow-green': 'from-yellow-200 via-lime-200 to-green-200',
  'blue-purple': 'from-blue-200 via-indigo-200 to-purple-200',
  'pink-orange': 'from-pink-200 via-rose-200 to-orange-200',
  'teal-blue': 'from-teal-200 via-cyan-200 to-blue-200',
}

export function StatisticsCallout({
  value,
  context,
  gradient = 'yellow-green',
  icons = [],
  align = 'center',
  className,
}: StatisticsCalloutProps) {
  const gradientClass = gradientPresets[gradient] || gradient

  return (
    <div
      className={cn(
        'relative py-16 px-8 rounded-2xl overflow-hidden',
        'bg-gradient-to-br',
        gradientClass,
        className
      )}
    >
      {/* Decorative icons */}
      {icons.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {icons.map((iconType, index) => {
            const Icon = iconMap[iconType]
            const positions = [
              { top: '10%', left: '5%', rotate: -15 },
              { top: '15%', right: '8%', rotate: 20 },
              { bottom: '20%', left: '10%', rotate: 10 },
              { bottom: '10%', right: '5%', rotate: -10 },
            ]
            const pos = positions[index % positions.length]
            
            return (
              <Icon
                key={index}
                className="absolute h-8 w-8 text-primary/30"
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  transform: `rotate(${pos.rotate}deg)`,
                }}
              />
            )
          })}
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          'relative z-10 max-w-3xl',
          align === 'center' && 'mx-auto text-center'
        )}
      >
        <div className="flex items-baseline gap-4 justify-center flex-wrap">
          <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary leading-none">
            {value}
          </span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground/90 max-w-md">
            {context}
          </p>
        </div>
      </div>
    </div>
  )
}
