'use client'

import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type GradientType = 'blue-teal' | 'purple-pink' | 'orange-red' | 'blue-purple'

interface GradientResourceCardProps {
  title: string
  description: string
  gradient: GradientType
  href: string
  className?: string
}

const gradientClasses: Record<GradientType, string> = {
  'blue-teal': 'from-blue-500 to-teal-500',
  'purple-pink': 'from-purple-500 to-pink-500',
  'orange-red': 'from-orange-500 to-red-500',
  'blue-purple': 'from-blue-600 to-purple-600',
}

export function GradientResourceCard({
  title,
  description,
  gradient,
  href,
  className,
}: GradientResourceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'block p-6 rounded-xl bg-gradient-to-br',
        gradientClasses[gradient],
        'hover:scale-[1.02] transition-transform',
        'group',
        className
      )}
    >
      <div className="flex flex-col h-full min-h-[160px]">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/80 flex-1">{description}</p>
        <div className="flex items-center gap-1 text-white/80 text-sm mt-4 group-hover:text-white transition-colors">
          <span>Explore</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
