'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SCROLL_SECTIONS = [
  {
    id: 'the-problem',
    headline: 'The Elephant in the Room',
    body: 'Everything you have just seen\u2014the playbook, the content intelligence, the network effects, the linking infrastructure\u2014would traditionally require a development budget that makes the whole proposition dead on arrival for a movement leader.',
    imageLabel: 'Traditional development cost estimates',
    imageHint: 'Agency scoping document or cost estimate screenshot',
    side: 'left' as const,
  },
  {
    id: 'agency-cost',
    headline: '$500,000. Conservatively.',
    body: 'That is the agency estimate for a platform of this scope\u2014custom CMS, AI orchestration, multi-tenant architecture, SEO engine, e-commerce, content scoring, and network visualization. Add twelve to eighteen months of build time. You have already lost the window.',
    imageLabel: 'Agency estimate breakdown',
    imageHint: 'Itemized agency quote showing line items and total',
    side: 'right' as const,
  },
  {
    id: 'saas-cost',
    headline: 'The SaaS Alternative Is Death by a Thousand Subscriptions',
    body: 'Stitch together a dozen tools\u2014Kajabi for courses, Mailchimp for email, WordPress for content, Ahrefs for SEO, a separate analytics suite, a separate community platform. $2,000 per month minimum. You still do not own the infrastructure, the data portability is a nightmare, and none of it talks to each other without custom glue code you will have to maintain forever.',
    imageLabel: 'SaaS stack cost breakdown',
    imageHint: 'Table of monthly SaaS costs totaling $2,000+/mo',
    side: 'left' as const,
  },
  {
    id: 'diy-route',
    headline: 'Or You Could Teach Yourself Everything',
    body: 'Learn to code. Learn SEO. Learn to build orchestrated AI agents. Learn content marketing, e-commerce, database design, deployment, and security. I know exactly what this costs in years of your life\u2014because I did it. It is not a viable path for most people, and it will not scale to every movement leader who needs what we are building.',
    imageLabel: 'Self-taught learning timeline',
    imageHint: 'Timeline showing years of required self-education',
    side: 'right' as const,
  },
  {
    id: 'what-changed',
    headline: 'What Changed',
    body: 'Among the many threats to humanity posed by artificial intelligence are also radical new capacities. We have aggressively leveraged an advanced approach to AI-assisted development\u2014context coding\u2014that allows a single person with domain expertise to direct AI systems to build production-grade software at a pace that was not possible twelve months ago.',
    imageLabel: 'AI context coding workflow',
    imageHint: 'Screenshot of AI-assisted development session',
    side: 'left' as const,
  },
  {
    id: 'the-receipt',
    headline: 'This Is Not a Claim. It Is a Receipt.',
    body: 'We have spent zero dollars on development building a platform that would cost half a million and a year of agency time. The codebase, the architecture, the AI integrations, the design system, the multi-tenant infrastructure\u2014all of it built with context coding and the investment of time, not capital. We can show every commit.',
    imageLabel: 'Development cost: $0',
    imageHint: 'Git commit history or cost comparison chart',
    side: 'right' as const,
  },
] as const

const SECTION_COUNT = SCROLL_SECTIONS.length

/* ------------------------------------------------------------------ */
/*  Placeholder image component                                        */
/* ------------------------------------------------------------------ */

function PlaceholderImage({ label, hint }: { label: string; hint: string }) {
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-xl border p-6"
      style={{
        background:
          'linear-gradient(135deg, var(--color-sage-800) 0%, var(--color-sage-900) 100%)',
        borderColor: 'rgba(255,255,255,0.15)',
      }}
    >
      <span
        style={{
          color: 'var(--color-bright-snow-200)',
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: 'var(--color-bright-snow-500)',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 'clamp(0.75rem, 1vw, 0.8125rem)',
          textAlign: 'center',
          maxWidth: 280,
        }}
      >
        {hint}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Big Text Hero — opening statement                                  */
/* ------------------------------------------------------------------ */

export function CostConstraintsHero() {
  const heroRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const line1 = line1Ref.current
      const line2 = line2Ref.current
      const line3 = line3Ref.current
      if (!line1 || !line2 || !line3) return

      gsap.set([line1, line2, line3], { autoAlpha: 0, y: 40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: true,
        },
      })

      tl.to(line1, { autoAlpha: 1, y: 0, duration: 1 })
        .to({}, { duration: 0.5 })
        .to(line1, { autoAlpha: 0.15, duration: 0.5 })
        .to(line2, { autoAlpha: 1, y: 0, duration: 1 }, '<')
        .to({}, { duration: 0.5 })
        .to(line2, { autoAlpha: 0.15, duration: 0.5 })
        .to(line3, { autoAlpha: 1, y: 0, duration: 1 }, '<')
        .to({}, { duration: 1 })
    },
    { scope: heroRef }
  )

  return (
    <section
      ref={heroRef}
      className="flex min-h-screen w-full items-center justify-center px-6"
      style={{ background: 'var(--color-sage-950)' }}
    >
      <div className="relative max-w-[900px] text-center">
        <div
          ref={line1Ref}
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: 'var(--color-bright-snow-100)',
          }}
        >
          But none of this matters
        </div>
        <div
          ref={line2Ref}
          className="mt-4"
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'var(--color-bright-snow-300)',
          }}
        >
          if the costs and constraints{' '}
          <span style={{ color: 'var(--color-scarlet-rush-400)' }}>
            in money and in time
          </span>{' '}
          would destroy not only our budgets, but our attention.
        </div>
        <div
          ref={line3Ref}
          className="mt-6"
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 'clamp(1rem, 1.8vw, 1.375rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--color-bright-snow-400)',
          }}
        >
          None of this was possible until now. And big claims should come with
          big evidence.
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Flip-flop scroll — alternating text & image                        */
/* ------------------------------------------------------------------ */

export function CostConstraintsScroll() {
  const pinSectionRef = useRef<HTMLElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]
      if (slides.length !== SECTION_COUNT) return

      // Hide all slides except the first
      gsap.set(slides.slice(1), { autoAlpha: 0 })
      gsap.set(slides[0], { autoAlpha: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: `+=${SECTION_COUNT * 80}%`,
          pin: true,
          scrub: true,
        },
      })

      for (let i = 1; i < SECTION_COUNT; i++) {
        tl.to(slides[i - 1], { autoAlpha: 0, duration: 0.3 }, i * 1)
          .to(slides[i], { autoAlpha: 1, duration: 0.3 }, '<+0.15')
      }

      // Hold on last slide
      tl.to({}, { duration: 0.5 })
    },
    { scope: pinSectionRef, dependencies: [SECTION_COUNT] }
  )

  return (
    <section
      ref={pinSectionRef}
      className="border-t border-dashed"
      style={{
        minHeight: '100vh',
        background: 'var(--color-sage-950)',
        borderColor: 'rgba(255,255,255,0.15)',
      }}
    >
      <div className="relative mx-auto min-h-screen w-full max-w-[1200px] px-4 py-12">
        {SCROLL_SECTIONS.map((section, i) => {
          const textBlock = (
            <div className="flex flex-1 flex-col justify-center">
              <span
                className="mb-3 inline-block"
                style={{
                  fontFamily:
                    'var(--font-space-grotesk), system-ui, sans-serif',
                  fontSize: 'clamp(0.6875rem, 1vw, 0.8125rem)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-scarlet-rush-400)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: 'var(--color-bright-snow-100)',
                }}
              >
                {section.headline}
              </h3>
              <p
                className="m-0"
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
                  lineHeight: 1.7,
                  color: 'var(--color-bright-snow-300)',
                  maxWidth: 480,
                }}
              >
                {section.body}
              </p>
            </div>
          )

          const imageBlock = (
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-[460px]">
                <PlaceholderImage
                  label={section.imageLabel}
                  hint={section.imageHint}
                />
              </div>
            </div>
          )

          return (
            <div
              key={section.id}
              ref={(el) => {
                slideRefs.current[i] = el
              }}
              className="absolute inset-0 flex min-h-screen items-center px-4 py-12"
              style={{ visibility: i === 0 ? 'visible' : 'hidden' }}
            >
              <div
                className={`flex w-full flex-col gap-8 md:flex-row md:gap-12 ${
                  section.side === 'right'
                    ? 'md:flex-row-reverse'
                    : ''
                }`}
              >
                {textBlock}
                {imageBlock}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Big pivot text — "None of this was possible until now"             */
/* ------------------------------------------------------------------ */

export function CostConstraintsPivot() {
  const pivotRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  const words = ['None', 'of', 'this', 'was', 'possible', 'until', 'now.']

  useGSAP(
    () => {
      const spans = wordRefs.current.filter(Boolean) as HTMLSpanElement[]
      if (spans.length !== words.length) return

      gsap.set(spans, { autoAlpha: 0.08 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pivotRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
        },
      })

      spans.forEach((span, i) => {
        tl.to(span, {
          autoAlpha: 1,
          duration: 0.4,
          color: i === words.length - 1
            ? 'var(--color-scarlet-rush-400)'
            : 'var(--color-bright-snow-100)',
        })
      })

      tl.to({}, { duration: 1 })
    },
    { scope: pivotRef }
  )

  return (
    <section
      ref={pivotRef}
      className="flex min-h-screen w-full items-center justify-center px-6"
      style={{ background: 'var(--color-sage-950)' }}
    >
      <div
        className="flex max-w-[900px] flex-wrap justify-center gap-x-[0.4em] gap-y-2"
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--color-bright-snow-100)',
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              wordRefs.current[i] = el
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Closing question                                                   */
/* ------------------------------------------------------------------ */

export function CostConstraintsClosing() {
  const closingRef = useRef<HTMLElement>(null)
  const questionRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const question = questionRef.current
      const sub = subRef.current
      if (!question || !sub) return

      gsap.set([question, sub], { autoAlpha: 0, y: 30 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: closingRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
        },
      })

      tl.to(question, { autoAlpha: 1, y: 0, duration: 1.5 })
        .to({}, { duration: 0.5 })
        .to(sub, { autoAlpha: 1, y: 0, duration: 1 })
        .to({}, { duration: 1.5 })
    },
    { scope: closingRef }
  )

  return (
    <section
      ref={closingRef}
      className="flex min-h-screen w-full items-center justify-center px-6"
      style={{ background: 'var(--color-sage-950)' }}
    >
      <div className="max-w-[800px] text-center">
        <div
          ref={questionRef}
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            color: 'var(--color-bright-snow-100)',
          }}
        >
          So what do you do with something that came{' '}
          <span style={{ color: 'var(--color-scarlet-rush-400)' }}>
            freely, by design
          </span>
          {' '}&mdash; and can be multiplied to every user in the system while
          retaining complete customization of each distinctive front end?
        </div>
        <div
          ref={subRef}
          className="mt-8"
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
            lineHeight: 1.6,
            color: 'var(--color-bright-snow-500)',
          }}
        >
          We leave it here. For now.
        </div>
      </div>
    </section>
  )
}
