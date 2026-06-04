import { Metadata } from 'next'
import { Send } from 'lucide-react'
import { AuthLayout, AuthModalCard } from '@/components/auth'
import { ForgotPasswordForm } from './ForgotPasswordForm'

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
        <ForgotPasswordForm />
      </AuthModalCard>
    </AuthLayout>
  )
}
