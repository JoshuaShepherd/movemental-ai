'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { TiptapEditorPanel } from '@/components/tiptap-editor/TiptapEditorPanel'
import '@/components/tiptap-editor/tiptap-editor.css'

export default function TiptapEditorPage() {
  const panelRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const panel = panelRef.current
      const content = contentRef.current
      if (!panel || !content) return

      gsap.fromTo(
        content,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        }
      )
    },
    { scope: panelRef }
  )

  return (
    <section
      ref={panelRef}
      className="relative flex min-h-[calc(100vh-120px)] w-full overflow-hidden"
      style={{
        background: 'var(--color-sage-950)',
      }}
    >
      <div
        ref={contentRef}
        className="flex h-full w-full flex-col"
        style={{ opacity: 0 }}
      >
        <TiptapEditorPanel />
      </div>
    </section>
  )
}
