import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const LOGO_SRC = '/media-library/images/logo/movemental-logo-transparent.png'

/** Intrinsic logo dimensions (749 x 239) — aspect ratio ~3.13:1 */
const ASPECT = 749 / 239

type LogoSize = 'sm' | 'md' | 'lg'

const heights: Record<LogoSize, number> = {
  sm: 24,
  md: 32,
  lg: 48,
}

interface LogoProps {
  /** Predefined height: sm (24px), md (32px), lg (48px). Default: md */
  size?: LogoSize
  /** Invert to white for dark backgrounds */
  invert?: boolean
  /** Wrap in a link to home. Default: true */
  asLink?: boolean
  className?: string
}

export function Logo({ size = 'md', invert = false, asLink = true, className }: LogoProps) {
  const h = heights[size]
  const w = Math.round(h * ASPECT)

  const img = (
    <Image
      src={LOGO_SRC}
      alt="Movemental"
      width={w}
      height={h}
      className={cn(
        'h-auto w-auto',
        invert && 'brightness-0 invert',
        className
      )}
      style={{ height: h, width: 'auto' }}
      priority
    />
  )

  if (!asLink) return img

  return (
    <Link
      href="/"
      className="inline-flex items-center shrink-0"
      aria-label="Movemental home"
    >
      {img}
    </Link>
  )
}
