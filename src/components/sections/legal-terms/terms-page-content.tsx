import Link from "next/link";

import { Container, Display, Eyebrow, Prose, Section } from "@/components/primitives";

export function TermsPageContent() {
  return (
    <Section spacing="lg">
      <Container>
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <Display size="lg" className="max-w-3xl">Terms of Service</Display>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 11, 2026</p>

        <Prose className="mt-8 max-w-3xl">
          <p>These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Movemental website and any related services (collectively, the &quot;Service&quot;). By using the Service, you agree to these Terms.</p>

          <h2>Use of the Service</h2>
          <p>The Service is provided for informational purposes and to facilitate conversations about potential engagements with Movemental. You agree to use the Service only for lawful purposes and in accordance with these Terms.</p>

          <h2>Intellectual property</h2>
          <p>All content on the Service — including text, design, graphics, and code — is owned by Movemental or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.</p>

          <h2>User content</h2>
          <p>If you submit content to us through the Service (such as via a contact form), you retain ownership of that content. By submitting it, you grant Movemental a limited license to use it for the purpose of responding to your inquiry and evaluating a potential engagement.</p>

          <h2>Disclaimers</h2>
          <p>The Service is provided &quot;as is&quot; without warranties of any kind, either express or implied. Movemental does not warrant that the Service will be uninterrupted, error-free, or free of harmful components.</p>

          <h2>Limitation of liability</h2>
          <p>To the fullest extent permitted by law, Movemental shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service.</p>

          <h2>Separate agreements</h2>
          <p>If you engage Movemental under a separate agreement (such as a statement of work or service agreement), the terms of that agreement will govern the engagement and will prevail over these Terms to the extent of any conflict.</p>

          <h2>Changes to these Terms</h2>
          <p>We may update these Terms from time to time. We will post the revised version and update the &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>

          <h2>Governing law</h2>
          <p>These Terms are governed by and construed in accordance with applicable law. Any disputes will be resolved in a manner consistent with the principles outlined in any separate agreement, or through good-faith negotiation.</p>

          <h2>Contact</h2>
          <p>Questions about these Terms? Please reach out via our <Link href="/contact">contact page</Link>.</p>
        </Prose>
      </Container>
    </Section>
  );
}
