import Link from "next/link";

import { Container, Display, Eyebrow, Prose, Section } from "@/components/primitives";

export function PrivacyPageContent() {
  return (
    <Section spacing="lg">
      <Container>
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <Display size="lg" className="max-w-3xl">Privacy Policy</Display>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 11, 2026</p>

        <Prose className="mt-8 max-w-3xl">
          <h2>Summary (non-binding)</h2>
          <ul>
            <li>We handle site visits, inquiries, and pre-engagement communication with professional care.</li>
            <li>We do not sell your personal information.</li>
            <li>We use service providers under contract where needed (e.g. hosting, infrastructure).</li>
            <li>Cookie details are in the <Link href="/cookies">Cookie Policy</Link>.</li>
            <li>Questions: <Link href="/contact">contact</Link> us.</li>
          </ul>

          <p>Movemental (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This policy describes how we handle information when you visit <strong>movemental</strong> websites or properties we operate (collectively, the &quot;Site&quot;), when you request information, or when you otherwise communicate with us about our work building systems with movement leaders, nonprofits, churches, and similar organizations.</p>

          <p>If you engage us under a separate agreement (for example, a statement of work or client services agreement), additional or different terms may apply to data we process on your behalf as a service provider. This policy focuses on our own website and pre-engagement communications.</p>

          <h2>Information we collect</h2>
          <p>We collect information in three broad ways: information you provide directly, information collected automatically when you use the Site, and information from cookies or similar technologies.</p>

          <h3>Information you provide</h3>
          <ul>
            <li>Contact details and message content when you use our contact flows, email, or similar channels (for example, name, email address, organization, and the substance of your inquiry).</li>
            <li>Email address when you join the site newsletter (double opt-in) or request updates related to our book reading experience; we store this to send the messages you asked for and to honor unsubscribe requests.</li>
            <li>Any other information you choose to share with us before or during a conversation about a potential engagement.</li>
          </ul>

          <h3>Information collected automatically</h3>
          <ul>
            <li>Technical and usage data such as IP address, device type, browser type, general geographic region derived from IP, pages viewed, referring URLs, and timestamps. We use this to operate, secure, and improve the Site.</li>
          </ul>

          <h3>Cookies and similar technologies</h3>
          <p>We use cookies and similar technologies for essential Site operation, security, and (where enabled) analytics or preferences. For more detail, see our <Link href="/cookies">Cookie Policy</Link>.</p>

          <h2>How we use information</h2>
          <ul>
            <li>To respond to inquiries and schedule or hold conversations.</li>
            <li>To operate, maintain, secure, debug, and improve the Site and our infrastructure.</li>
            <li>To understand aggregate usage patterns and measure the effectiveness of our content (where permitted by law and your settings).</li>
            <li>To comply with law, enforce our terms, and protect the rights, safety, and property of Movemental, our visitors, and others.</li>
          </ul>

          <h2>Legal bases (EEA, UK, and similar regions)</h2>
          <p>Where applicable privacy laws require a &quot;legal basis,&quot; we rely on one or more of the following:</p>
          <ul>
            <li><strong>Legitimate interests</strong> in operating a professional website, communicating with prospective clients, securing our systems, and understanding how the Site is used.</li>
            <li><strong>Contract</strong> when processing is necessary to take steps at your request before entering an agreement.</li>
            <li><strong>Consent</strong> where we ask for it (for example, for certain non-essential cookies).</li>
            <li><strong>Legal obligation</strong> where we must retain or disclose information to comply with law.</li>
          </ul>

          <h2>How we share information</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul>
            <li><strong>Service providers</strong> who assist us under contract—for example, hosting and deployment (such as Vercel), database or authentication infrastructure (such as Supabase), analytics providers, or email delivery services.</li>
            <li><strong>Professional advisors</strong> (lawyers, accountants) where needed and subject to professional obligations of confidentiality.</li>
            <li><strong>Authorities</strong> when required by law, legal process, or to protect rights and safety.</li>
            <li><strong>Business transfers</strong> in connection with a merger, acquisition, or sale of assets.</li>
          </ul>

          <h2>Retention</h2>
          <p>We retain information for as long as needed to fulfill the purposes described in this policy, including maintaining business records, resolving disputes, and enforcing agreements.</p>

          <h2>Security</h2>
          <p>We implement reasonable administrative, technical, and organizational measures designed to protect information against unauthorized access, loss, or alteration.</p>

          <h2>Your choices and rights</h2>
          <p>Depending on where you live, you may have rights to access, correct, delete, or port your personal information, or to object to or restrict certain processing. To exercise rights or ask questions, <Link href="/contact">contact us</Link>.</p>
          <p>For the optional email list, you can leave using the unsubscribe link we include in the confirmation message (or ask us to remove you via the contact page).</p>

          <h2>International visitors</h2>
          <p>We may process and store information in the United States and other countries where we or our service providers operate. Where required, we use appropriate safeguards for cross-border transfers.</p>

          <h2>Children</h2>
          <p>The Site is not directed to children under 16, and we do not knowingly collect personal information from children.</p>

          <h2>Changes to this policy</h2>
          <p>We may update this policy from time to time. We will post the revised version on this page and update the &quot;Last updated&quot; date.</p>

          <h2>Contact</h2>
          <p>For privacy-related requests or questions, please reach out through our <Link href="/contact">contact page</Link>.</p>
        </Prose>
      </Container>
    </Section>
  );
}
