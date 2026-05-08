"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Service | Movemental";
  }, []);

  return (
    <div className="py-24">
      <Container width="narrow">
        <div className="prose prose-neutral max-w-none">
          <SectionHead eyebrow="Legal" display="Terms of Service" />
          <p className="font-medium">Last updated: April 11, 2026</p>

          <h2 className="text-xl mt-8 mb-4">Use of the Service</h2>
          <p className="mb-4">
             By accessing and using the Movemental website, including any diagnostic tools, guides, or resources published on the site ("the Service"), you agree to abide by these Terms. The Service is provided for informational and educational scaffolding regarding organizational adoption of AI.
          </p>

          <h2 className="text-xl mt-8 mb-4">Intellectual property</h2>
          <p className="mb-4">
             All frameworks, content, phrasing, structure (including the "Movemental AI Path" and "AI Stewardship Sequence"), and design on this site are the intellectual property of Movemental. You may not reproduce, distribute, or create derivative works from this content for commercial purposes without explicit, written permission from Movemental.
          </p>

          <h2 className="text-xl mt-8 mb-4">User content</h2>
          <p className="mb-4">
             If you submit form responses, messages, or diagnostic inputs, you retain ownership of that context. By submitting it, you grant us permission to use it strictly for the purpose of communicating with you and delivering our services securely.
          </p>

          <h2 className="text-xl mt-8 mb-4">Disclaimers</h2>
          <p className="mb-4">
             The guidance provided on this website does not constitute legal, medical, or technical operational insurance. Our frameworks are provided "as is." We disclaim all warranties, express or implied, including the fitness for a particular organizational context unless we are explicitly contracted via a Separate Agreement.
          </p>

          <h2 className="text-xl mt-8 mb-4">Limitation of liability</h2>
          <p className="mb-4">
             In no event shall Movemental, its founders, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service, or from the implementation of independent AI tools by your organization.
          </p>

          <h2 className="text-xl mt-8 mb-4">Separate agreements</h2>
          <p className="mb-4">
             If your organization enters into a formal engagement (e.g., a Safety Session or Guided Pathway) with Movemental, that engagement will be governed by a separate Master Services Agreement (MSA) or Statement of Work (SOW). In the event of a conflict between these website Terms and the separate agreement, the separate agreement will take precedence.
          </p>

          <h2 className="text-xl mt-8 mb-4">Changes</h2>
          <p className="mb-4">
             We reserve the right to modify these Terms at any time. Material changes will be indicated by an updated date at the top of this page. Continued use of the Service constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-xl mt-8 mb-4">Governing law</h2>
          <p className="mb-4">
             These Terms and any dispute arising out of them shall be governed by and construed in accordance with the standard commercial laws applicable in our jurisdiction of operation, without regard to conflict of law principles.
          </p>

          <h2 className="text-xl mt-8 mb-4">Contact</h2>
          <p className="mb-4">
             For any questions regarding these Terms, please reach out via our <Link href="/contact" className="text-primary hover:underline">Contact page</Link>.
          </p>
        </div>
      </Container>
    </div>
  );
}
