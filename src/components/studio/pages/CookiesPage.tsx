"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function CookiesPage() {
  useEffect(() => {
    document.title = "Cookie Policy | Movemental";
  }, []);

  return (
    <div className="py-24">
      <Container width="narrow">
        <div className="prose prose-neutral max-w-none">
          <SectionHead eyebrow="Legal" display="Cookie Policy" />
          <p className="font-medium">Last updated: April 11, 2026</p>

          <h2 className="text-xl font-bold mt-8 mb-4">What are cookies?</h2>
          <p className="mb-4">
             Cookies are small text files placed on your device when you visit our website. 
             They help us understand how you use our site, provide a customized experience, 
             and ensure basic functional operations work as expected.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">How we use cookies</h2>
          <ul className="list-disc pl-5 mb-4">
             <li>To authenticate your session if you use our diagnostic tools.</li>
             <li>To remember your preferences or navigation state securely.</li>
             <li>To analyze site performance anonymously so we can improve the experience.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">Categories</h2>
          <div className="overflow-x-auto my-6">
             <table className="w-full border-collapse border border-border">
                <thead>
                   <tr className="bg-section">
                      <th className="border border-border p-3 text-left">Category</th>
                      <th className="border border-border p-3 text-left">Description</th>
                   </tr>
                </thead>
                <tbody>
                   <tr>
                      <td className="border border-border p-3 font-medium">Strictly necessary</td>
                      <td className="border border-border p-3 text-muted-foreground">Required for the website to function securely and cannot be switched off.</td>
                   </tr>
                   <tr>
                      <td className="border border-border p-3 font-medium">Functional</td>
                      <td className="border border-border p-3 text-muted-foreground">Enable the website to provide enhanced functionality and personalization.</td>
                   </tr>
                   <tr>
                      <td className="border border-border p-3 font-medium">Analytics</td>
                      <td className="border border-border p-3 text-muted-foreground">Allow us to count visits and traffic sources so we can measure and improve performance.</td>
                   </tr>
                </tbody>
             </table>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">Third-party cookies</h2>
          <p className="mb-4">
             We limit third-party tracking severely. We may use privacy-respecting analytics tools 
             that only place strictly necessary metrics cookies on your device. We do not use advertising or retargeting cookies.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">Your choices</h2>
          <p className="mb-4">
             You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
             However, if you do not accept strictly necessary cookies, some functional parts of our diagnostic tools may not work.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">Updates to this policy</h2>
          <p className="mb-4">
             We may update this policy periodically to reflect changes in our technology or legal requirements.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">Contact</h2>
          <p className="mb-4">
             If you have questions about our use of cookies, please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> or send a note via our <Link href="/contact" className="text-primary hover:underline">Contact page</Link>.
          </p>
        </div>
      </Container>
    </div>
  );
}
