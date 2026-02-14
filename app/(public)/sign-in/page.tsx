import { Metadata } from 'next'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { AuthLayout, AuthModalCard } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Sign in | Movemental',
  description: 'Sign in to your Movemental account.',
}

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthModalCard
        icon={<Send className="w-8 h-8" />}
        title="Welcome to Movemental"
        titleId="sign-in-title"
      >
        <SignInForm />
      </AuthModalCard>
    </AuthLayout>
  )
}

function SignInForm() {
  return (
    <form className="flex flex-col gap-3.5" action="#" method="post">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 text-[0.9375rem] font-semibold text-white rounded-full bg-scarlet-rush-500 hover:bg-scarlet-rush-600 transition-colors"
      >
        <GoogleIcon className="w-[18px] h-[18px]" />
        Continue with Google
      </button>
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        autoComplete="email"
        className="w-full py-3 px-4 text-[0.9375rem] text-white placeholder:text-sage-400 rounded-full bg-sage-800 border border-white/[0.08] outline-none focus:border-sage-600 focus:ring-2 focus:ring-sage-600/20 transition-colors"
      />
      <button
        type="submit"
        className="w-full py-3 px-4 text-[0.9375rem] font-semibold text-white rounded-full bg-sage-800 border border-white/10 hover:bg-sage-700 transition-colors"
      >
        Continue
      </button>
      <p className="text-center text-sm text-sage-300 mt-2">
        <Link href="/forgot-password" className="text-scarlet-rush-400 hover:underline">
          Forgot password?
        </Link>
      </p>
      <p className="text-center text-sm text-sage-300 mt-1">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="text-scarlet-rush-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
        fill="#fff"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
        fill="#fff"
      />
      <path
        d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.658H.957C.347 5.89 0 7.22 0 8.5c0 1.28.348 2.61.957 3.842l3.007-2.332z"
        fill="#fff"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.658L3.964 6.99C4.672 4.864 6.656 3.28 9 3.28V3.58z"
        fill="#fff"
      />
    </svg>
  )
}
