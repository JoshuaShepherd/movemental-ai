"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Movemental";
  }, []);

  return (
    <div className="py-24">
      <Container width="narrow">
        <div className="prose prose-neutral max-w-none">
          <SectionHead eyebrow="Legal" display="Privacy Policy" />
          <p className="font-medium">Last updated: April 11, 2026</p>

          <h2 className="text-xl mt-8 mb-4">Summary</h2>
          <ul className="list-disc pl-5 mb-6">
             <li>We collect only what is necessary to evaluate your organization's context.</li>
             <li>We never sell your data, nor do we train AI models on your private information.</li>
             <li>You have the right to request deletion of your information at any time.</li>
          </ul>

          <p className="mb-8">
             Movemental is committed to protecting the privacy and security of your information. 
             We believe mission-driven organizations should have a secure space to diagnose their 
             AI realities without fearing that their internal friction will be monetized.
          </p>

          <h2 className="text-xl mt-8 mb-4">Information we collect</h2>
          
          <h3 className="mt-4 mb-2">Information you provide</h3>
          <p className="mb-4">
             When you fill out our contact forms or diagnostic assessments, we collect your name, email, 
             role, and organizational context. We only collect details you voluntarily share.
          </p>

          <h3 className="mt-4 mb-2">Automatic information</h3>
          <p className="mb-4">
             Our servers automatically log basic requests (IP address, browser type, referring URL) to 
             ensure site security and to diagnose technical issues.
          </p>

          <h3 className="mt-4 mb-2">Cookies</h3>
          <p className="mb-4">
             We use strictly necessary cookies to run our site. Please see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for details.
          </p>

          <h2 className="text-xl mt-8 mb-4">How we use your information</h2>
          <p className="mb-4">
             We use your information exclusively to reply to your inquiries, provide accurately scoped 
             engagements, and fulfill contractual obligations if you become a partner.
          </p>

          <h2 className="text-xl mt-8 mb-4">Legal bases</h2>
          <p className="mb-4">
             We process your data based on your explicit consent (when submitting a form) or 
             for the legitimate interest of operating a secure, functional business engagement.
          </p>

          <h2 className="text-xl mt-8 mb-4">How we share</h2>
          <p className="mb-4">
             We do not share your data with advertisers, third-party marketing agencies, or public 
             generative AI systems for training. We only share data with essential service providers 
             (like secure hosting and email delivery) bound by strict confidentiality.
          </p>

          <h2 className="text-xl mt-8 mb-4">Retention</h2>
          <p className="mb-4">
             We hold your contact information only as long as necessary to fulfill the purposes outlined 
             in this policy, or to comply with legal obligations.
          </p>

          <h2 className="text-xl mt-8 mb-4">Security</h2>
          <p className="mb-4">
             We employ industry-standard security measures (including encryption in transit and at rest) 
             to safeguard your information.
          </p>

          <h2 className="text-xl mt-8 mb-4">Your choices</h2>
          <p className="mb-4">
             You may request access to, correction of, or deletion of your personal data at any time.
          </p>

          <h2 className="text-xl mt-8 mb-4">International</h2>
          <p className="mb-4">
             We process data primarily in the United States. By using our site, you consent to the transfer of 
             information to the U.S. under these terms.
          </p>

          <h2 className="text-xl mt-8 mb-4">Children</h2>
          <p className="mb-4">
             Our services are intended for organizational leaders and professionals. We do not knowingly collect 
             data from individuals under 18 years of age.
          </p>

          <h2 className="text-xl mt-8 mb-4">Changes</h2>
          <p className="mb-4">
             We may update this policy if our practices change. Major changes will be summarized at the top of the page.
          </p>

          <h2 className="text-xl mt-8 mb-4">Contact</h2>
          <p className="mb-4">
             If you have questions about this policy, please reach out via our <Link href="/contact" className="text-primary hover:underline">Contact page</Link>.
          </p>
        </div>
      </Container>
    </div>
  );
}
