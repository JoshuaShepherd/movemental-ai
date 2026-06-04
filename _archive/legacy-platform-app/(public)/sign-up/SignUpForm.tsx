'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signUp } from '@/app/(public)/auth/actions'

type SignUpFormProps = { next?: string }

type AuthState = { success: false; error: string } | null

export function SignUpForm({ next }: SignUpFormProps) {
  const [state, formAction] = useActionState<AuthState, FormData>(
    async (_prev, formData) => signUp(formData),
    null
  )

  const errorMessage = state?.success === false ? state.error : null

  return (
    <form className="flex flex-col gap-3.5" action={formAction}>
      {next ? <input type="hidden" name="next" value={next} /> : null}
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
        required
        className="w-full py-3 px-4 text-[0.9375rem] text-white placeholder:text-sage-400 rounded-full bg-sage-800 border border-white/[0.08] outline-none focus:border-sage-600 focus:ring-2 focus:ring-sage-600/20 transition-colors"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        autoComplete="new-password"
        required
        minLength={6}
        className="w-full py-3 px-4 text-[0.9375rem] text-white placeholder:text-sage-400 rounded-full bg-sage-800 border border-white/[0.08] outline-none focus:border-sage-600 focus:ring-2 focus:ring-sage-600/20 transition-colors"
      />
      {errorMessage && (
        <p className="text-sm text-red-400 text-center" role="alert">
          {errorMessage}
        </p>
      )}
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
            required
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
        <Link href={next ? `/sign-in?next=${encodeURIComponent(next)}` : '/sign-in'} className="text-scarlet-rush-400 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
