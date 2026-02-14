import { Metadata } from 'next'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { AuthLayout, AuthModalCard } from '@/components/auth'
import { SignInForm } from './SignInForm'

export const metadata: Metadata = {
  title: 'Sign in | Movemental',
  description: 'Sign in to your Movemental account.',
}

type Props = { searchParams: Promise<{ next?: string; error?: string }> }

export default async function SignInPage({ searchParams }: Props) {
  const params = await searchParams
  return (
    <AuthLayout>
      <AuthModalCard
        icon={<Send className="w-8 h-8" />}
        title="Welcome to Movemental"
        titleId="sign-in-title"
      >
        <SignInForm next={params.next} error={params.error} />
      </AuthModalCard>
    </AuthLayout>
  )
}
