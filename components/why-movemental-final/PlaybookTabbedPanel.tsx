'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type MediaType = 'image' | 'gif' | 'video'

/** Alan Hirsch playbook-to-platform steps from content-marketing-playbook */
const PLAYBOOK_STEPS: Array<{
  id: string
  label: string
  text: string
  mediaType?: MediaType
}> = [
  {
    id: 'aggregate',
    label: 'Aggregate',
    text: 'Bring everything into one place. Your books. Your organizational resources. Your academic content. Your conference talks. Your articles. Everything. The foundation is built; the content exists. Now it\'s time to connect it all.',
    mediaType: 'image',
  },
  {
    id: 'interconnect',
    label: 'Interconnect',
    text: 'Link related content. Create pathways. Build the connective tissue between your books and your organizations and your academic work and your speaking. When your content is interconnected, other people start connecting to it—thought leaders reference your work, content creators link to your articles.',
    mediaType: 'gif',
  },
  {
    id: 'repurpose',
    label: 'Repurpose',
    text: 'Turn conference talks into articles. Turn academic lectures into blog posts. Turn book concepts into courses. Turn organizational training into published content. You don\'t need to create more content—you need to make what exists work harder.',
    mediaType: 'video',
  },
  {
    id: 'amplify',
    label: 'Amplify',
    text: 'Use SEO. Use network effects. Use the platform. Make discovery inevitable. When your content is discoverable and part of a larger ecosystem, it starts multiplying not just through your efforts, but through the efforts of others who discover it, engage with it, and share it.',
    mediaType: 'image',
  },
]

/** Placeholder for platform media — replace with real gifs, video, or images later */
function MediaPlaceholder({
  stepIndex,
  mediaType = 'image',
}: {
  stepIndex: number
  mediaType?: MediaType
}) {
  const label =
    mediaType === 'gif'
      ? 'GIF placeholder'
      : mediaType === 'video'
        ? 'Video placeholder'
        : 'Image placeholder'
  return (
    <div
      className="flex aspect-video w-full items-center justify-center rounded-xl border"
      style={{
        background: 'linear-gradient(135deg, var(--color-sage-800) 0%, var(--color-sage-900) 100%)',
        borderColor: 'rgba(255,255,255,0.15)',
        color: 'var(--color-bright-snow-400)',
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
        fontWeight: 500,
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <span>{label}</span>
        <span className="text-xs opacity-70">Step {stepIndex + 1} — Platform view</span>
      </div>
    </div>
  )
}

export function PlaybookTabbedPanel() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef(0)

  const goToTab = (index: number) => {
    if (index === activeIndex) return
    prevIndexRef.current = activeIndex
    setActiveIndex(index)
  }

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
      })
    },
    { scope: sectionRef }
  )

  useGSAP(
    () => {
      const content = contentRef.current
      if (!content) return

      const panels = content.querySelectorAll<HTMLElement>('[data-tab-panel]')
      const prev = prevIndexRef.current
      const next = activeIndex

      if (prev === next || !panels[next]) return

      const prevEl = panels[prev]
      const nextEl = panels[next]

      const tl = gsap.timeline()
      tl.to(prevEl, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      }).to(
        nextEl,
        {
          opacity: 1,
          duration: 0.25,
          ease: 'power2.inOut',
        },
        '-=0.1'
      )
    },
    { scope: contentRef, dependencies: [activeIndex] }
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col overflow-hidden"
      style={{ background: 'var(--color-sage-950)' }}
    >
      {/* Header */}
      <div
        className="flex shrink-0 flex-col items-center gap-2 border-b border-white/[0.08] px-4 py-4 md:px-6 md:py-5"
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          background: 'var(--color-sage-900)',
        }}
      >
        <h2
          className="text-center text-xl font-semibold md:text-2xl"
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            color: 'var(--color-bright-snow-100)',
          }}
        >
          The Alan Hirsch Playbook → Platform
        </h2>
        {/* Tab bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-1 md:gap-2"
          style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
        >
          {PLAYBOOK_STEPS.map((step, i) => (
            <button
              key={step.id}
              type="button"
              onClick={() => goToTab(i)}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:px-4 md:py-2 md:text-sm',
                i === activeIndex
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
              style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area: text left, media placeholder right */}
      <div ref={contentRef} className="relative flex-1 overflow-hidden">
        {PLAYBOOK_STEPS.map((step, i) => (
          <div
            key={step.id}
            data-tab-panel
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              pointerEvents: i === activeIndex ? 'auto' : 'none',
            }}
          >
            <div className="mx-auto flex h-full max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:items-center md:gap-10 md:px-8 md:py-10">
              {/* Left: Text */}
              <div
                className="flex-1 md:min-w-0"
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  color: 'var(--color-bright-snow-200)',
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                  lineHeight: 1.7,
                }}
              >
                <h3
                  className="mb-3 font-semibold"
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    color: 'var(--color-bright-snow-50)',
                    fontSize: '1.25rem',
                  }}
                >
                  {step.label}
                </h3>
                <p className="m-0">{step.text}</p>
              </div>

              {/* Right: Media placeholder (gif, video, or image) */}
              <div className="shrink-0 md:w-[55%] md:max-w-[520px]">
                <MediaPlaceholder stepIndex={i} mediaType={step.mediaType ?? 'image'} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-40"
        style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          color: 'var(--color-bright-snow, #f0f4f0)',
        }}
      >
        Scroll down to continue
      </p>
    </section>
  )
}
