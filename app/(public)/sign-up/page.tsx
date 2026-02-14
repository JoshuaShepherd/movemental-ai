import { Metadata } from 'next'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { AuthLayout, AuthModalCard } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Create Account — Movemental',
  description: 'Create your Movemental account. First name, last name, email.',
}

export default function SignUpPage() {
  return (
    <AuthLayout>
      <AuthModalCard
        icon={<Send className="w-8 h-8" />}
        title="Create Account"
        titleId="sign-up-title"
      >
        <SignUpForm />
      </AuthModalCard>
    </AuthLayout>
  )
}

function SignUpForm() {
  return (
    <form className="flex flex-col gap-3.5" action="#" method="post">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First name"
          autoComplete="given-name"
          className="w-full py-3 px-4 text-[0.9375rem] text-white placeholder:text-sage-400 rounded-full bg-sage-800 border border-white/[0.08] outline-none focus:border-sage-600 focus:ring-2 focus:ring-sage-600/20 transition-colors"
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
          autoComplete="family-name"
          className="w-full py-3 px-4 text-[0.9375rem] text-white placeholder:text-sage-400 rounded-full bg-sage-800 border border-white/[0.08] outline-none focus:border-sage-600 focus:ring-2 focus:ring-sage-600/20 transition-colors"
        />
      </div>
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
        Continue
      </button>

      <div className="flex flex-col gap-3 mt-2">
        <label className="flex items-start gap-3 text-[0.8125rem] text-sage-300 cursor-pointer">
          <input
            type="checkbox"
            name="terms"
            className="mt-0.5 w-[18px] h-[18px] min-w-[18px] accent-scarlet-rush-500 cursor-pointer"
          />
          <span>
            I agree to the{' '}
            <Link href="/legal/terms" className="text-scarlet-rush-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="text-scarlet-rush-400 hover:underline">
              Privacy Statement
            </Link>
          </span>
        </label>
        <label className="flex items-start gap-3 text-[0.8125rem] text-sage-300 cursor-pointer">
          <input
            type="checkbox"
            name="updates"
            className="mt-0.5 w-[18px] h-[18px] min-w-[18px] accent-scarlet-rush-500 cursor-pointer"
          />
          <span>Send me updates via email. Unsubscribe any time</span>
        </label>
      </div>

      <p className="text-center text-sm text-sage-300 mt-2">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-scarlet-rush-400 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
