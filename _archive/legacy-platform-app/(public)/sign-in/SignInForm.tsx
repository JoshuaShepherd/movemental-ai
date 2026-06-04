'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signInWithPassword, signInWithOAuth } from '@/app/(public)/auth/actions'
import { GoogleIcon } from './GoogleIcon'

type SignInFormProps = { next?: string; error?: string }

export function SignInForm({ next, error: initialError }: SignInFormProps) {
  type AuthState = { success: false; error: string } | null
  const [state, formAction] = useActionState<AuthState, FormData>(
    async (_prev, formData) => signInWithPassword(formData),
    null
  )

  const errorMessage = (state?.success === false && state?.error)
    ? state.error
    : initialError

  return (
    <form className="flex flex-col gap-3.5" action={formAction}>
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <GoogleSignInButton next={next} />
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        className="w-full py-3 px-4 text-[0.9375rem] text-white placeholder:text-sage-400 rounded-full bg-sage-800 border border-white/[0.08] outline-none focus:border-sage-600 focus:ring-2 focus:ring-sage-600/20 transition-colors"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        className="w-full py-3 px-4 text-[0.9375rem] text-white placeholder:text-sage-400 rounded-full bg-sage-800 border border-white/[0.08] outline-none focus:border-sage-600 focus:ring-2 focus:ring-sage-600/20 transition-colors"
      />
      {errorMessage && (
        <p className="text-sm text-red-400 text-center" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        className="w-full py-3 px-4 text-[0.9375rem] font-semibold text-white rounded-full bg-sage-800 border border-white/10 hover:bg-sage-700 transition-colors"
      >
        Continue
      </button>
      <p className="text-center text-sm text-sage-300 mt-2">
        <Link href={next ? `/forgot-password?next=${encodeURIComponent(next)}` : '/forgot-password'} className="text-scarlet-rush-400 hover:underline">
          Forgot password?
        </Link>
      </p>
      <p className="text-center text-sm text-sage-300 mt-1">
        Don&apos;t have an account?{' '}
        <Link href={next ? `/sign-up?next=${encodeURIComponent(next)}` : '/sign-up'} className="text-scarlet-rush-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}

function GoogleSignInButton({ next }: { next?: string }) {
  return (
    <GoogleOAuthButton next={next} />
  )
}

function GoogleOAuthButton({ next }: { next?: string }) {
  const handleGoogle = async () => {
    const nextPath = next ?? ''
    const result = await signInWithOAuth('google', nextPath)
    if (result.success === false && result.error) {
      window.location.href = `/sign-in?error=${encodeURIComponent(result.error)}${next ? `&next=${encodeURIComponent(next)}` : ''}`
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 text-[0.9375rem] font-semibold text-white rounded-full bg-scarlet-rush-500 hover:bg-scarlet-rush-600 transition-colors"
    >
      <GoogleIcon className="w-[18px] h-[18px]" />
      Continue with Google
    </button>
  )
}
