'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Placeholder playbook steps — replace with real copy later */
const PLAYBOOK_ITEMS = [
  { label: 'Discover', description: 'Placeholder: Find and gather existing content across books, talks, and orgs.' },
  { label: 'Structure', description: 'Placeholder: Organize, tag, and connect so it’s findable and reusable.' },
  { label: 'Publish', description: 'Placeholder: Get content live in the right formats and channels.' },
  { label: 'Amplify', description: 'Placeholder: SEO, GEO, and distribution so the right people find it.' },
  { label: 'Measure', description: 'Placeholder: See what works and where your audience engages.' },
  { label: 'Iterate', description: 'Placeholder: Refine and repurpose based on feedback and impact.' },
] as const

const ITEM_COUNT = PLAYBOOK_ITEMS.length

/** Placeholder image block — same aspect ratio, replace with real images later */
function PlaceholderImage({ index }: { index: number }) {
  return (
    <div
      className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border"
      style={{
        background: 'linear-gradient(135deg, var(--color-sage-800) 0%, var(--color-sage-900) 100%)',
        borderColor: 'rgba(255,255,255,0.15)',
        color: 'var(--color-bright-snow-400)',
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
        fontWeight: 500,
      }}
    >
      Image {index + 1}
    </div>
  )
}

export function PlaybookPinSection() {
  const pinSectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const fill = fillRef.current
      const listItems = listItemRefs.current.filter(Boolean) as HTMLLIElement[]
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[]

      if (!fill || listItems.length !== ITEM_COUNT || images.length !== ITEM_COUNT) {
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: `+=${ITEM_COUNT * 50}%`,
          pin: true,
          scrub: true,
        },
      })

      gsap.set(fill, {
        scaleY: 1 / ITEM_COUNT,
        transformOrigin: 'top left',
      })

      for (let i = 0; i < ITEM_COUNT; i++) {
        const previousItem = listItems[i - 1]
        if (previousItem) {
          tl.set(
            listItems[i],
            { color: 'var(--color-scarlet-rush-400)' },
            0.5 * i
          )
            .to(images[i], { autoAlpha: 1, duration: 0.2 }, '<')
            .set(previousItem, { color: 'var(--color-bright-snow-400)' }, '<')
            .to(images[i - 1], { autoAlpha: 0, duration: 0.2 }, '<')
        } else {
          gsap.set(listItems[i], { color: 'var(--color-scarlet-rush-400)' })
          gsap.set(images[i], { autoAlpha: 1 })
        }
      }

      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: 'top left',
          ease: 'none',
          duration: tl.duration(),
        },
        0
      ).to({}, {})
    },
    { scope: pinSectionRef, dependencies: [ITEM_COUNT] }
  )

  return (
    <>
      {/* Brief intro: same background as previous block for flow */}
      <section
        className="flex min-h-[40vh] w-full items-center justify-center border-t border-dashed px-4"
        style={{
          background: 'var(--color-sage-950)',
          borderColor: 'rgba(255,255,255,0.15)',
        }}
      >
        <h2
          className="text-center text-2xl font-semibold md:text-3xl"
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            color: 'var(--color-bright-snow-100)',
            maxWidth: 560,
          }}
        >
          The Digital & AI Playbook
        </h2>
      </section>

      <section
        ref={pinSectionRef}
        className="border-t border-b border-dashed"
        style={{
          minHeight: '100vh',
          background: 'var(--color-sage-950)',
          borderColor: 'rgba(255,255,255,0.15)',
        }}
      >
        <div
          className="mx-auto flex w-full max-w-[1200px] flex-wrap gap-8 px-4 py-12 md:flex-nowrap"
          style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        >
          {/* LEFT: Image column (flipped layout for symmetry with block above) */}
          <div className="relative min-h-[280px] w-full flex-1 md:min-h-[320px]">
            {PLAYBOOK_ITEMS.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => {
                  imageRefs.current[i] = el
                }}
                className="absolute inset-0 flex items-center opacity-0"
                style={{
                  visibility: 'hidden',
                  paddingRight: '1rem',
                }}
              >
                <div className="w-full max-w-[420px]">
                  <PlaceholderImage index={i} />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Playbook list + fill bar */}
          <div className="relative shrink-0">
            <div
              ref={fillRef}
              className="absolute right-0 top-0 h-full w-0.5"
              style={{
                width: 2,
                background: 'var(--color-scarlet-rush-400)',
                transformOrigin: 'top left',
              }}
            />
            <ul
              ref={listRef}
              className="flex list-none flex-col gap-2 pl-2 pr-3 text-right"
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                color: 'var(--color-bright-snow-100)',
                margin: 0,
                padding: 0,
              }}
            >
              {PLAYBOOK_ITEMS.map((item, i) => (
                <li
                  key={item.label}
                  ref={(el) => {
                    listItemRefs.current[i] = el
                  }}
                  style={{
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="min-h-screen w-full"
        style={{ background: 'var(--color-sage-950)' }}
      />
    </>
  )
}
