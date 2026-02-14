import { Metadata } from 'next'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { AuthLayout, AuthModalCard } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Reset password | Movemental',
  description: 'Request a password reset link for your Movemental account.',
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthModalCard
        icon={<Send className="w-8 h-8" />}
        title="Reset password"
        body="Enter your email and we’ll send you a link to reset your password."
        titleId="forgot-password-title"
      >
        <form className="flex flex-col gap-3.5" action="#" method="post">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full py-3 px-4 text-[0.9375rem] text-white placeholder:text-sage-400 rounded-full bg-sage-800 border border-white/[0.08] outline-none focus:border-sage-600 focus:ring-2 focus:ring-sage-600/20 transition-colors"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 text-[0.9375rem] font-semibold text-white rounded-full bg-scarlet-rush-500 hover:bg-scarlet-rush-600 transition-colors"
          >
            Send reset link
          </button>
          <p className="text-center text-sm text-sage-300 mt-2">
            <Link href="/sign-in" className="text-scarlet-rush-400 hover:underline">
              Back to sign in
            </Link>
          </p>
        </form>
      </AuthModalCard>
    </AuthLayout>
  )
}
