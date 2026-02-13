'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CONTENT_PIPELINE_SOURCES, type ContentSourceId } from '@/lib/content-pipeline-sources'
import { Sparkles, ChevronRight, Loader2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const API_ROUTE = '/api/content-pipeline-preview'

export function ContentPipelinePreviewAgent() {
  const [selected, setSelected] = useState<Set<ContentSourceId>>(new Set())
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggle = useCallback((id: ContentSourceId) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setPreview(null)
    setError(null)
  }, [])

  const generate = useCallback(async () => {
    if (selected.size === 0) return
    setLoading(true)
    setError(null)
    setPreview(null)
    try {
      const res = await fetch(API_ROUTE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentSources: Array.from(selected).map(
            (id) => CONTENT_PIPELINE_SOURCES.find((s) => s.id === id)?.label ?? id
          ),
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error?.message ?? 'Something went wrong.')
        return
      }
      if (json?.success && json?.data?.preview) {
        setPreview(json.data.preview)
      } else {
        setError('No preview was returned.')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed.')
    } finally {
      setLoading(false)
    }
  }, [selected])

  const canSubmit = selected.size > 0 && !loading

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Where does your content live? */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Where does your content live?
        </h3>
        <p className="text-sm text-muted-foreground">
          Select everything that applies. We&apos;ll show you how the Movemental pipeline would
          work for your situation.
        </p>
        <div className="flex flex-wrap gap-2">
          {CONTENT_PIPELINE_SOURCES.map((source) => {
            const isSelected = selected.has(source.id)
            return (
              <button
                key={source.id}
                type="button"
                onClick={() => toggle(source.id)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border bg-muted/50 text-muted-foreground hover:border-muted-foreground/30 hover:bg-muted hover:text-foreground'
                )}
              >
                {source.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Generate CTA */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          size="lg"
          onClick={generate}
          disabled={!canSubmit}
          className="group h-12 px-6 font-semibold"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate my pipeline preview
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
        {selected.size > 0 && !loading && (
          <span className="text-sm text-muted-foreground">
            {selected.size} source{selected.size !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview card */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 sm:p-8"
          >
            <h4 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Your pipeline preview
            </h4>
            <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-ul:my-3 prose-li:my-1 prose-strong:text-foreground text-muted-foreground">
              {(() => {
                const lines = preview.split('\n')
                const nodes: React.ReactNode[] = []
                let i = 0
                while (i < lines.length) {
                  const trimmed = lines[i]!.trim()
                  if (!trimmed) {
                    nodes.push(<br key={i} />)
                    i++
                    continue
                  }
                  if (trimmed.startsWith('### ')) {
                    nodes.push(
                      <h4 key={i} className="mt-4 text-sm font-semibold text-foreground first:mt-0">
                        {trimmed.slice(4)}
                      </h4>
                    )
                    i++
                    continue
                  }
                  if (trimmed.startsWith('## ')) {
                    nodes.push(
                      <h3 key={i} className="mt-4 text-base font-semibold text-foreground first:mt-0">
                        {trimmed.slice(3)}
                      </h3>
                    )
                    i++
                    continue
                  }
                  if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                    const listItems: string[] = []
                    while (i < lines.length) {
                      const t = lines[i]!.trim()
                      if (!t) break
                      if (t.startsWith('- ') || t.startsWith('* ')) {
                        listItems.push(t.slice(2))
                        i++
                      } else break
                    }
                    nodes.push(
                      <ul key={i} className="list-disc pl-5">
                        {listItems.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )
                    continue
                  }
                  nodes.push(
                    <p key={i} className="mb-2 last:mb-0">
                      {trimmed}
                    </p>
                  )
                  i++
                }
                return nodes
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
