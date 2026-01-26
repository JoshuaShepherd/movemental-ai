'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollProgressProps {
  className?: string
}

/**
 * ScrollProgress - A progress indicator showing reading progress
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50',
        className
      )}
      style={{ scaleX }}
    />
  )
}
