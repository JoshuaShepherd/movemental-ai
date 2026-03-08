import { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Movemental',
  description:
    'Thoughtful conversation for movement leaders considering Movemental. Request a human conversation.',
  openGraph: {
    title: 'Contact | Movemental',
    description: 'A calm invitation to conversation for those seriously considering participation.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-sage-950 text-white">
      {/* Subtle gradient overlay (reference: depth behind content) */}
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            'linear-gradient(135deg, var(--color-sage-950) 0%, var(--color-sage-900) 50%, var(--color-sage-800) 100%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column: headline + intro */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              Let&apos;s talk.
            </h1>
            <p className="text-lg text-sage-300 leading-relaxed space-y-4">
              Conversation here is for thoughtful discernment, not persuasion.
              Movemental is not for everyone. If you are seriously considering
              participation in the commons, we invite you to reach out. This is
              a human conversation, not a sales funnel.
            </p>
          </div>

          {/* Right column: form in distinct container */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-sage-900/80 border border-white/[0.06] p-6 sm:p-8 backdrop-blur-sm">
              <ContactForm />
            </div>

            {/* What to expect (below form) */}
            <section className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-3">
                What to expect
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-sage-300 pl-1">
                <li>We review every request carefully.</li>
                <li>If it appears aligned, we&apos;ll respond with next steps.</li>
                <li>Conversations are direct and focused.</li>
                <li>We may suggest the Self-Screen first if appropriate.</li>
              </ul>
            </section>

            {/* Alternative path (subtle) */}
            <p className="mt-8 text-sm text-sage-400">
              If you&apos;re still exploring, you may prefer to{' '}
              <Link href="/tour" className="text-sage-300 underline underline-offset-2 hover:text-white">
                return to the tour
              </Link>
              {' '}or use the{' '}
              <Link href="/decide" className="text-sage-300 underline underline-offset-2 hover:text-white">
                discernment companion
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
