'use client'

import { cn } from '@/lib/utils'
import {
  FileText,
  Youtube,
  Archive,
  BookOpen,
  FolderOpen,
  BookMarked,
  Layers,
  Search,
  PenTool,
  LayoutDashboard,
} from 'lucide-react'
import { NarrativeSection } from '../NarrativeSection'
import { NarrativeStatement } from '../NarrativeStatement'

const BEFORE_ITEMS = [
  { icon: FileText, label: 'Scattered PDFs', sublabel: 'Multiple drives, no index' },
  { icon: Youtube, label: 'YouTube Sermons', sublabel: 'Buried in playlists' },
  { icon: Archive, label: 'Blog Archives', sublabel: 'Chronological, unsearchable' },
  { icon: BookOpen, label: 'Static Book', sublabel: 'Print-only, no discoverability' },
  { icon: FolderOpen, label: 'Document Folders', sublabel: 'Local files, no structure' },
]

const AFTER_ITEMS = [
  { icon: BookMarked, label: 'Structured Books', sublabel: 'Chapters, search, cross-links' },
  { icon: Layers, label: 'Modular Courses', sublabel: 'Nested modules, progression' },
  { icon: Search, label: 'Searchable Articles', sublabel: 'Tagged, categorized, discoverable' },
  { icon: PenTool, label: 'AI Writing Assistant', sublabel: 'Voice-matched, context-aware' },
  { icon: LayoutDashboard, label: 'Unified Dashboard', sublabel: 'One view, full control' },
]

function MockCard({
  icon: Icon,
  label,
  sublabel,
  variant = 'before',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  sublabel: string
  variant?: 'before' | 'after'
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border transition-colors',
        variant === 'before'
          ? 'bg-muted/40 border-border/50 text-muted-foreground'
          : 'bg-background border-primary/20'
      )}
    >
      <Icon
        className={cn(
          'h-5 w-5 mt-0.5 shrink-0',
          variant === 'before' ? 'text-muted-foreground/60' : 'text-primary'
        )}
      />
      <div>
        <p
          className={cn(
            'font-medium text-sm',
            variant === 'before' ? 'text-muted-foreground' : 'text-foreground'
          )}
        >
          {label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
      </div>
    </div>
  )
}

export function FragmentedToPlatform() {
  return (
    <NarrativeSection background="dark">
      <div className="space-y-16 sm:space-y-24">
        <NarrativeStatement alignment="center" variant="dark">
          From <strong>Fragmented</strong> to <strong>Platform</strong>
        </NarrativeStatement>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Before */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-sage-400">
                Before
              </span>
              <span className="h-px flex-1 bg-sage-700" />
            </div>
            <div className="space-y-3">
              {BEFORE_ITEMS.map((item) => (
                <MockCard key={item.label} {...item} variant="before" />
              ))}
            </div>
          </div>

          {/* After */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-sage-300">
                After
              </span>
              <span className="h-px flex-1 bg-sage-600" />
            </div>
            <div className="space-y-3">
              {AFTER_ITEMS.map((item) => (
                <MockCard key={item.label} {...item} variant="after" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </NarrativeSection>
  )
}
