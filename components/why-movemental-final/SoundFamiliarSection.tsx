'use client'

import { fontHeading, fontBody, fontAccent } from './typography'

const sectionBg = 'var(--color-sage-950, #161d16)'
const textPrimary = 'var(--color-bright-snow-100, #f8faf8)'
const textMuted = 'var(--color-sage-400, #8a9a8a)'

/**
 * Compact "sound familiar?" moment — 2–3 statements that create resonance,
 * then pivot to "this is structural, not personal." Placed after network,
 * before Trust Collapse on why-movemental-final.
 */
export function SoundFamiliarSection() {
  const statements = [
    'My best work already exists. Almost nobody can find it.',
    'I have credibility in the room. Online I\'m invisible.',
    'The people I\'m called to form can\'t get what would form them.',
  ]

  return (
    <section
      id="sound-familiar"
      className="relative py-24 sm:py-32 md:py-40 px-4"
      style={{ background: sectionBg }}
      aria-label="Sound familiar?"
    >
      <div className="container max-w-3xl mx-auto text-center space-y-10 sm:space-y-12">
        <h2
          className="text-lg uppercase tracking-widest"
          style={{ fontFamily: fontAccent, color: textMuted }}
        >
          Sound familiar?
        </h2>
        <ul className="space-y-6 sm:space-y-8">
          {statements.map((text, i) => (
            <li
              key={i}
              className="text-xl sm:text-2xl md:text-3xl leading-relaxed"
              style={{ fontFamily: fontHeading, color: textPrimary }}
            >
              {text}
            </li>
          ))}
        </ul>
        <p
          className="text-lg sm:text-xl text-sage-300 pt-4"
          style={{ fontFamily: fontBody }}
        >
          This is structural, not personal. The middle—where publication and wisdom used to
          travel—has collapsed. Rebuilding it is the work. What was impossible is now possible;
          there&apos;s a scenius for this time.
        </p>
      </div>
    </section>
  )
}
