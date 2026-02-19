import { Metadata } from 'next'
import Link from 'next/link'
import { getTourSteps } from '@/lib/tour/pastoral-warm-tour'

export const metadata: Metadata = {
  title: 'Guided Tour — Pastoral Warm | Movemental',
  description:
    'Walk through the Pastoral Warm template: see the layout, content pages, and features step by step.',
}

export default function PastoralWarmTourPage() {
  const steps = getTourSteps('pastoral-warm')
  const startHref = `${steps[0].href}?tour=pastoral-warm&step=1`

  return (
    <section
      className="mx-auto w-full max-w-3xl px-5 py-16 sm:py-24"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: '#2c2420',
      }}
    >
      {/* Heading */}
      <h1
        className="text-3xl sm:text-4xl font-semibold leading-tight mb-3"
        style={{ fontFamily: "'Lora', Georgia, serif" }}
      >
        Guided Tour
      </h1>
      <p className="text-base sm:text-lg leading-relaxed mb-10" style={{ color: '#7a6e63' }}>
        A short, narrated walkthrough of the key pages. Each stop highlights
        what to look for — layout choices, content strategy, and design
        details. Use the floating panel to move between steps.
      </p>

      {/* Start button */}
      <div className="mb-12">
        <Link
          href={startHref}
          className="
            inline-flex items-center gap-2 px-6 py-3
            text-sm font-medium rounded-xl
            transition-colors no-underline
          "
          style={{
            background: '#b58c4c',
            color: '#ffffff',
            border: '1px solid #b58c4c',
          }}
        >
          Start Tour &rarr;
        </Link>
      </div>

      {/* Step list */}
      <ol className="flex flex-col gap-4 m-0 p-0 list-none">
        {steps.map((step) => (
          <li
            key={step.id}
            className="
              flex gap-4 items-start
              rounded-xl border p-5
              transition-colors
            "
            style={{
              background: '#ffffff',
              borderColor: '#e8e0d4',
            }}
          >
            {/* Step number */}
            <span
              className="
                flex items-center justify-center shrink-0
                w-8 h-8 rounded-full text-sm font-semibold
              "
              style={{
                background: 'rgba(181,140,76,0.1)',
                color: '#9a7640',
              }}
            >
              {step.id}
            </span>

            <div className="flex-1 min-w-0">
              <h2
                className="text-base font-semibold leading-snug m-0 mb-1"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              >
                {step.title}
              </h2>
              <p className="text-sm leading-relaxed m-0 mb-2" style={{ color: '#7a6e63' }}>
                {step.description}
              </p>
              <Link
                href={`${step.href}?tour=pastoral-warm&step=${step.id}`}
                className="text-sm font-medium no-underline transition-colors"
                style={{ color: '#b58c4c' }}
              >
                Open step &rarr;
              </Link>
            </div>
          </li>
        ))}
      </ol>

      {/* Customization note */}
      <p className="mt-10 text-xs leading-relaxed" style={{ color: '#7a6e63' }}>
        Steps are configurable. Edit{' '}
        <code
          className="px-1.5 py-0.5 rounded text-xs"
          style={{ background: '#f5efe6' }}
        >
          lib/tour/pastoral-warm-tour.ts
        </code>{' '}
        to change which pages appear, the descriptions, and the order.
      </p>
    </section>
  )
}
