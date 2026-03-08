'use client'

import { useLinkedWriters } from '@/hooks/simplified/useLinkedWriters'
import { fontHeading, fontBody, fontAccent } from './typography'

const sectionBg = 'var(--color-sage-950, #161d16)'
const textPrimary = 'var(--color-bright-snow-100, #f8faf8)'
const textMuted = 'var(--color-sage-400, #8a9a8a)'

function avatarUrl(name: string, existingUrl: string | null): string {
  if (existingUrl) return existingUrl
  const encoded = encodeURIComponent(name.replace(/\s+/g, '+'))
  return `https://ui-avatars.com/api/?name=${encoded}&background=6e916e&color=fff&size=128`
}

/**
 * "Voices joining" — shows linked prospective writers who have created an account.
 * Renders only when there is at least one linked writer. Placed after Network, before Sound Familiar.
 */
export function VoicesJoiningSection() {
  const { data: writers, isLoading, isError } = useLinkedWriters()

  if (isLoading || isError || !writers?.length) {
    return null
  }

  return (
    <section
      id="voices-joining"
      className="relative py-24 sm:py-32 md:py-40 px-4"
      style={{ background: sectionBg }}
      aria-label="Voices joining the network"
    >
      <div className="container max-w-5xl mx-auto">
        <h2
          className="text-lg uppercase tracking-widest mb-12 sm:mb-16 text-center"
          style={{ fontFamily: fontAccent, color: textMuted }}
        >
          Voices joining
        </h2>
        <p
          className="text-lg sm:text-xl text-center max-w-2xl mx-auto mb-16"
          style={{ fontFamily: fontBody, color: textPrimary }}
        >
          These movement leaders are now on the platform—one home, author legible, content as nodes.
        </p>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {writers.map((w) => (
            <li
              key={w.id}
              className="rounded-xl border border-sage-700/50 bg-sage-900/50 p-6 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={avatarUrl(w.fullName, w.avatarUrl)}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3
                    className="text-lg font-semibold truncate"
                    style={{ fontFamily: fontHeading, color: textPrimary }}
                  >
                    {w.fullName}
                  </h3>
                  {(w.role || w.organization) && (
                    <p
                      className="text-sm truncate"
                      style={{ fontFamily: fontBody, color: textMuted }}
                    >
                      {[w.role, w.organization].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </div>
              {w.bio && (
                <p
                  className="text-sm text-sage-300 line-clamp-3 flex-1"
                  style={{ fontFamily: fontBody }}
                >
                  {w.bio}
                </p>
              )}
              {w.featuredContent && (
                <div className="mt-4 pt-4 border-t border-sage-700/50">
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ fontFamily: fontAccent, color: textMuted }}
                  >
                    {w.featuredContent.contentType}
                  </p>
                  {w.featuredContent.url ? (
                    <a
                      href={w.featuredContent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-sage-200 hover:text-white underline underline-offset-2"
                      style={{ fontFamily: fontBody }}
                    >
                      {w.featuredContent.title}
                    </a>
                  ) : (
                    <p
                      className="text-sm text-sage-200"
                      style={{ fontFamily: fontBody }}
                    >
                      {w.featuredContent.title}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
