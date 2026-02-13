'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { FileText, Youtube, BookOpen, StickyNote, FolderArchive, ArrowRight } from 'lucide-react'

const SOURCES = [
  { label: 'PDFs', icon: FileText },
  { label: 'YouTube sermons', icon: Youtube },
  { label: 'Books', icon: BookOpen },
  { label: 'Notes', icon: StickyNote },
  { label: 'Archives', icon: FolderArchive },
]

const VISION_ITEMS = [
  'One platform you control',
  'Findable & linked',
  'Evergreen articles & courses',
  'Ready to translate',
  'Part of the scenius',
]

/**
 * Your work is here (sources) → It should also be here (our digital vision).
 * Stewardship: cheap and fast.
 */
export function WorkHereVisionSection({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('max-w-4xl mx-auto', className)}
    >
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-stretch">
        {/* Your work is here */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-xl border-2 border-muted-foreground/20 bg-muted/30"
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Your work is here
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            Where it currently exists
          </p>
          <ul className="space-y-3">
            {SOURCES.map((item, i) => (
              <li key={item.label} className="flex items-center gap-3 text-foreground">
                <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Arrow + stewardship */}
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="rounded-full p-2 bg-primary/10 text-primary hidden md:flex"
          >
            <ArrowRight className="h-6 w-6" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="text-center"
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              If it&apos;s cheap & fast
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">(stewardship)</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="md:hidden"
          >
            <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground/50" />
          </motion.div>
        </div>

        {/* It should also be here */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 rounded-xl border-2 border-primary/40 bg-primary/5"
        >
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            It should also be here
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            Our digital vision
          </p>
          <ul className="space-y-2.5">
            {VISION_ITEMS.map((item) => (
              <li key={item} className="text-foreground flex items-start gap-2">
                <span className="text-primary mt-1.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}
