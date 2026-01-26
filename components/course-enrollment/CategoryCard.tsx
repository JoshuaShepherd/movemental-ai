'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface CategoryCardProps {
  title: string
  subtitle: string
  previews?: string[]
  href: string
  className?: string
}

export function CategoryCard({
  title,
  subtitle,
  previews = [],
  href,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'block p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/30 transition-all group',
        className
      )}
    >
      {/* Stacked previews */}
      <div className="relative h-32 mb-4">
        {previews.length > 0 ? (
          previews.slice(0, 3).map((preview, index) => (
            <div
              key={index}
              className={cn(
                'absolute w-full h-24 rounded-lg overflow-hidden border bg-muted shadow-sm',
                'transition-transform group-hover:scale-[1.02]'
              )}
              style={{
                top: `${index * 8}px`,
                left: `${index * 4}px`,
                zIndex: 3 - index,
              }}
            >
              <Image src={preview} alt="" fill className="object-cover" />
            </div>
          ))
        ) : (
          <div className="w-full h-24 rounded-lg bg-muted flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground/30">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </Link>
  )
}
