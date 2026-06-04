'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { resetPassword } from '@/app/(public)/auth/actions'

type AuthState = { success: false; error: string } | null

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    async (_prev, formData) => resetPassword(formData),
    null
  )

  const errorMessage = state?.success === false ? state.error : null

  return (
    <form className="flex flex-col gap-3.5" action={formAction}>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="you@example.com"
        autoComplete="email"
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
  )
}
