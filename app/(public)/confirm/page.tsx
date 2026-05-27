import { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { AuthLayout, AuthModalCard } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Check your inbox | Movemental',
  description: 'We sent you an activation link. Check your inbox and spam folder.',
}

export default function ConfirmPage() {
  return (
    <AuthLayout>
      <AuthModalCard
        icon={<Mail className="w-8 h-8" />}
        title="Check your inbox"
        body="We sent you an activation link. Please be sure to check your spam folder too."
        titleId="confirm-title"
      >
        <div className="flex flex-col gap-3">
          <Link
            href="/sign-in"
            className="w-full py-3 px-4 text-[0.9375rem] font-semibold text-white text-center rounded-full bg-scarlet-rush-500 hover:bg-scarlet-rush-600 transition-colors"
          >
            Back to sign in
          </Link>
          <p className="text-center text-sm text-sage-300">
            Didn’t receive the email?{' '}
            <button type="button" className="text-scarlet-rush-400 hover:underline">
              Resend
            </button>
          </p>
        </div>
      </AuthModalCard>
    </AuthLayout>
  )
}
