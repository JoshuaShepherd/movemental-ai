'use client'

import type { ReactNode } from 'react'

interface AuthModalCardProps {
  /** Optional icon above the title (e.g. Send or Mail from lucide) */
  icon?: ReactNode
  /** Main heading */
  title: string
  /** Optional body text below title */
  body?: ReactNode
  /** Form or other content */
  children: ReactNode
  /** Accessibility: id for the title (used as aria-labelledby on the card) */
  titleId?: string
}

/**
 * Centered dark card for auth flows. Matches Framer-style modal: rounded, shadow, sage-900.
 */
export function AuthModalCard({
  icon,
  title,
  body,
  children,
  titleId = 'auth-modal-title',
}: AuthModalCardProps) {
  return (
    <main
      className="w-full max-w-[400px] rounded-2xl bg-sage-900 border border-white/[0.06] shadow-2xl px-7 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {icon && (
        <div className="flex justify-center mb-5 text-scarlet-rush-400 [&>svg]:w-8 [&>svg]:h-8">
          {icon}
        </div>
      )}
      <h1
        id={titleId}
        className="text-2xl font-bold text-center text-white tracking-tight mb-6"
      >
        {title}
      </h1>
      {body && (
        <p className="text-[0.9375rem] text-sage-300 text-center mb-6 leading-normal">
          {body}
        </p>
      )}
      {children}
    </main>
  )
}
