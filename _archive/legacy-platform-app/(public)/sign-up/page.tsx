import { Metadata } from 'next'
import { Send } from 'lucide-react'
import { AuthLayout, AuthModalCard } from '@/components/auth'
import { SignUpForm } from './SignUpForm'

export const metadata: Metadata = {
  title: 'Sign up | Movemental',
  description: 'Create your Movemental account.',
}

type Props = { searchParams: Promise<{ next?: string }> }

export default async function SignUpPage({ searchParams }: Props) {
  const params = await searchParams
  return (
    <AuthLayout>
      <AuthModalCard
        icon={<Send className="w-8 h-8" />}
        title="Create Account"
        titleId="sign-up-title"
      >
        <SignUpForm next={params.next} />
      </AuthModalCard>
    </AuthLayout>
  )
}
