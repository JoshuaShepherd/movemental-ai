'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { getTourStep, getTourLength, type TourId } from '@/lib/tour/pastoral-warm-tour'

/**
 * Floating guided-tour panel.
 *
 * Renders only when `?tour=pastoral-warm&step=N` is present in the URL.
 * Provides narrative guidance for each page — no DOM-targeting overlays.
 *
 * Styled to match the pastoral-warm template tokens.
 */
export function TourPanel() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const tourId = searchParams.get('tour') as TourId | null
  const stepParam = searchParams.get('step')

  if (tourId !== 'pastoral-warm' || !stepParam) return null

  const stepNumber = parseInt(stepParam, 10)
  if (Number.isNaN(stepNumber)) return null

  const step = getTourStep(tourId, stepNumber)
  const totalSteps = getTourLength(tourId)
  if (!step) return null

  const isFirst = stepNumber === 1
  const isLast = stepNumber === totalSteps

  function navigate(nextStep: number) {
    const target = getTourStep(tourId!, nextStep)
    if (!target) return
    router.push(`${target.href}?tour=${tourId}&step=${nextStep}`)
  }

  function exit() {
    // Stay on current page but strip tour params
    router.push(pathname)
  }

  return (
    <div
      data-tour-panel
      className="
        fixed bottom-4 right-4 z-[200]
        w-[calc(100vw-2rem)] max-w-sm
        rounded-2xl border shadow-xl
        flex flex-col gap-3 p-5
        animate-in slide-in-from-bottom-4 fade-in duration-300
        sm:bottom-6 sm:right-6
      "
      style={{
        background: '#ffffff',
        borderColor: '#e8e0d4',
        color: '#2c2420',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        boxShadow: '0 8px 32px rgba(44,36,32,0.12), 0 2px 8px rgba(44,36,32,0.08)',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: 'rgba(181,140,76,0.1)',
            color: '#9a7640',
          }}
        >
          Tour
        </span>
        <span
          className="text-xs tabular-nums"
          style={{ color: '#7a6e63' }}
        >
          {stepNumber} / {totalSteps}
        </span>
        <button
          onClick={exit}
          aria-label="Exit tour"
          className="ml-auto p-1 rounded-lg transition-colors hover:bg-black/5"
          style={{ color: '#7a6e63' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <h3
        className="text-base font-semibold leading-snug m-0"
        style={{ fontFamily: "'Lora', Georgia, serif", color: '#2c2420' }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed m-0"
        style={{ color: '#7a6e63' }}
      >
        {step.description}
      </p>

      {/* Bullets */}
      <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
        {step.bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed"
            style={{ color: '#2c2420' }}
          >
            <span
              className="mt-1.5 block h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: '#b58c4c' }}
              aria-hidden
            />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Navigation buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => navigate(stepNumber - 1)}
          disabled={isFirst}
          className="
            flex-1 px-3 py-2 text-sm font-medium rounded-lg
            border transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed
          "
          style={{
            borderColor: '#e8e0d4',
            color: '#7a6e63',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            if (!isFirst) e.currentTarget.style.background = '#f5efe6'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          &larr; Prev
        </button>
        <button
          onClick={() => isLast ? exit() : navigate(stepNumber + 1)}
          className="
            flex-1 px-3 py-2 text-sm font-medium rounded-lg
            border transition-colors
          "
          style={{
            background: '#b58c4c',
            borderColor: '#b58c4c',
            color: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#9a7640'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#b58c4c'
          }}
        >
          {isLast ? 'Finish' : 'Next \u2192'}
        </button>
      </div>
    </div>
  )
}
