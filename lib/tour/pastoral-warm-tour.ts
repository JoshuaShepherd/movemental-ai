/**
 * Pastoral-Warm guided tour configuration.
 *
 * Edit the STEPS array below to change what pages appear in the tour,
 * what narrative text is shown, and in what order.
 */

export type TourId = 'pastoral-warm'

export interface TourStep {
  /** 1-based step number */
  id: number
  /** Short heading shown in the panel */
  title: string
  /** One-sentence summary of what to notice on this page */
  description: string
  /** 2–5 bullets pointing out specifics */
  bullets: string[]
  /** Absolute internal path (may include hash fragment) */
  href: string
}

// ─── Editable step list ────────────────────────────────────────────
// Josh: change titles, descriptions, bullets, or swap hrefs as needed.
// The tour panel will adapt automatically.

const STEPS: TourStep[] = [
  {
    id: 1,
    title: 'Home',
    description: 'The front door — first impressions and value proposition.',
    bullets: [
      'Hero messaging and call-to-action placement',
      'How content is surfaced above the fold',
      'Navigation structure and sign-in flow',
    ],
    href: '/',
  },
  {
    id: 2,
    title: 'Book Catalog',
    description: 'Browse the full library of books from movement leaders.',
    bullets: [
      'Grid layout with covers, authors, and pricing',
      'Rating badges and social proof',
      'Filter / sort affordances (if any)',
    ],
    href: '/books',
  },
  {
    id: 3,
    title: 'Book Detail',
    description: 'A single book page — the purchase and reading experience.',
    bullets: [
      'Cover, synopsis, and author bio',
      'Pricing and purchase CTA',
      'Related content and reader reviews',
    ],
    href: '/books/forgotten-ways',
  },
  {
    id: 4,
    title: 'Themes',
    description: 'Thematic collections that tie content together.',
    bullets: [
      'How themes are organized and labelled',
      'Card layout and imagery style',
      'Connection to books, articles, and courses',
    ],
    href: '/themes',
  },
  {
    id: 5,
    title: 'AI Lab',
    description: 'The conversational AI assistant for formation questions.',
    bullets: [
      'Chat interface and prompt suggestions',
      'How AI integrates with library content',
      'Tone and pastoral voice',
    ],
    href: '/ai-lab',
  },
]

// ─── Helpers ───────────────────────────────────────────────────────

export function getTourSteps(_tourId: TourId): TourStep[] {
  // Currently only one tour; extend with a map if more tours are added.
  return STEPS
}

export function getTourStep(
  tourId: TourId,
  stepNumber: number,
): TourStep | undefined {
  return getTourSteps(tourId).find((s) => s.id === stepNumber)
}

export function getTourLength(tourId: TourId): number {
  return getTourSteps(tourId).length
}
