import { Metadata } from 'next'
import { DocsCallout } from '@/components/legal-support'

export const metadata: Metadata = {
  title: 'Terms of Service | Movemental',
  description: 'Movemental terms of service and user agreement.',
}

export default function TermsPage() {
  return (
    <article>
      <header className="mb-12">
        <p className="text-sm text-muted-foreground mb-2">Last updated: January 2026</p>
        <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
      </header>

      <DocsCallout type="info" title="Summary">
        These terms govern your use of the Movemental platform. By using Movemental, 
        you agree to these terms.
      </DocsCallout>

      <section className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4">
          By accessing or using Movemental, you agree to be bound by these Terms of Service 
          and all applicable laws and regulations. If you do not agree with any of these terms, 
          you are prohibited from using or accessing this platform.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. Use License</h2>
        <p className="text-muted-foreground mb-4">
          Permission is granted to temporarily access the materials on Movemental for personal, 
          non-commercial transitory viewing only. This is the grant of a license, not a transfer 
          of title.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Content Ownership</h2>
        <p className="text-muted-foreground mb-4">
          You retain full ownership of all content you create and publish on Movemental. 
          By publishing content, you grant Movemental a license to display and distribute 
          your content as part of the platform services.
        </p>

        <DocsCallout type="important" title="Your Content, Your Rights">
          We believe in platform ownership. Your content is yours—we will never claim 
          ownership of your work or hold your content hostage.
        </DocsCallout>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Account Responsibilities</h2>
        <p className="text-muted-foreground mb-4">
          You are responsible for maintaining the confidentiality of your account credentials 
          and for all activities that occur under your account. You agree to notify us 
          immediately of any unauthorized use.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. Termination</h2>
        <p className="text-muted-foreground mb-4">
          We may terminate or suspend your account at any time for violation of these terms. 
          Upon termination, you will have 30 days to export your content.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">6. Contact</h2>
        <p className="text-muted-foreground mb-4">
          If you have any questions about these Terms, please contact us at legal@movemental.ai.
        </p>
      </section>
    </article>
  )
}
