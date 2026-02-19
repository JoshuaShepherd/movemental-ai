/**
 * Themes data and helpers.
 * Source: lib/data/themes.json (extracted from leader content).
 */

import themesData from '@/lib/data/themes.json'

export interface Theme {
  slug: string
  title: string
  description: string
  coverImage: string | null
  order: number
}

export const themes: Theme[] = themesData.themes as Theme[]

export function getThemes(): Theme[] {
  return [...themes].sort((a, b) => a.order - b.order)
}

export function getThemeBySlug(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug)
}

export function getThemeSlugs(): string[] {
  return themes.map((t) => t.slug)
}

/** Accent gradient classes by theme slug for ThemeCard styling (design chain) */
export const themeAccentGradients: Record<string, string> = {
  'missional-church': 'from-sage-600 to-sage-800',
  formation: 'from-velvet-orchid-500 to-velvet-orchid-700',
  'disciple-making': 'from-sage-500 to-sage-700',
  apest: 'from-scarlet-rush-500 to-scarlet-rush-700',
  'kingdom-mission': 'from-velvet-orchid-600 to-velvet-orchid-800',
  christocentric: 'from-sage-600 to-sage-800',
}

export function getThemeAccentGradient(slug: string): string {
  return themeAccentGradients[slug] ?? 'from-sage-500 to-sage-700'
}
