import { Metadata } from 'next'
import { DocsCallout } from '@/components/legal-support'

export const metadata: Metadata = {
  title: 'Privacy Policy | Movemental',
  description: 'How Movemental collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <article>
      <header className="mb-12">
        <p className="text-sm text-muted-foreground mb-2">Last updated: January 2026</p>
        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
      </header>

      <DocsCallout type="info" title="Our Commitment">
        We respect your privacy and are committed to protecting your personal data. 
        This policy explains how we collect, use, and safeguard your information.
      </DocsCallout>

      <section className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Information We Collect</h2>
        <p className="text-muted-foreground mb-4">
          We collect information you provide directly to us, including your name, email address, 
          and payment information when you create an account or subscribe to our services.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">How We Use Your Information</h2>
        <p className="text-muted-foreground mb-4">
          We use the information we collect to provide, maintain, and improve our services, 
          process transactions, and communicate with you about products, services, and events.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Data Security</h2>
        <p className="text-muted-foreground mb-4">
          We implement appropriate technical and organizational measures to protect your 
          personal data against unauthorized access, alteration, or destruction.
        </p>

        <DocsCallout type="tip" title="Your Data Rights">
          You have the right to access, correct, or delete your personal data at any time. 
          Contact us at privacy@movemental.ai to exercise these rights.
        </DocsCallout>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Contact Us</h2>
        <p className="text-muted-foreground mb-4">
          If you have questions about this privacy policy, please contact us at privacy@movemental.ai.
        </p>
      </section>
    </article>
  )
}
