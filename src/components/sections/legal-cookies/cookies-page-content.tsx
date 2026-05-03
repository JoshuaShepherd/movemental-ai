import Link from "next/link";

import { Container, Display, Eyebrow, Prose, Section } from "@/components/primitives";

export function CookiesPageContent() {
  return (
    <Section spacing="lg">
      <Container>
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <Display size="lg" className="max-w-3xl">Cookie Policy</Display>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 11, 2026</p>

        <Prose className="mt-8 max-w-3xl">
          <p>This Cookie Policy explains how Movemental (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies on our website (the &quot;Site&quot;). It should be read together with our <Link href="/privacy">Privacy Policy</Link>, which describes how we handle personal information more broadly.</p>

          <h2>What are cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you signed in where applicable, understand how pages are used, and improve performance and security. Similar technologies include local storage, session storage, and pixels.</p>

          <h2>How we use cookies</h2>
          <ul>
            <li><strong>Essential operation</strong> — enabling core Site functionality, load balancing, fraud prevention, and security.</li>
            <li><strong>Preferences</strong> — remembering choices you make (such as language or display options), where we offer them.</li>
            <li><strong>Analytics</strong> — where enabled, understanding aggregate traffic, navigation paths, and feature usage so we can improve content and experience.</li>
          </ul>

          <h2>Categories of cookies</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-semibold">Category</th>
                  <th className="py-3 pr-4 font-semibold">Purpose</th>
                  <th className="py-3 font-semibold">Typical legal basis</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-foreground">Strictly necessary</td>
                  <td className="py-3 pr-4">Security, network management, accessibility, and other functions without which the Site cannot operate reliably.</td>
                  <td className="py-3">Legitimate interests / necessary for service</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-foreground">Functional</td>
                  <td className="py-3 pr-4">Remembering preferences to reduce friction on repeat visits.</td>
                  <td className="py-3">Legitimate interests or consent, as required</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Analytics</td>
                  <td className="py-3 pr-4">Measuring visits and engagement in aggregate to improve the Site.</td>
                  <td className="py-3">Consent where required; otherwise legitimate interests</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Third-party cookies</h2>
          <p>Some cookies are set by service providers who help us host, secure, or analyze the Site. Those providers may process data according to their own policies.</p>

          <h2>Your choices</h2>
          <ul>
            <li><strong>Browser settings.</strong> Most browsers let you refuse or delete cookies. Doing so may affect Site functionality.</li>
            <li><strong>Industry opt-outs.</strong> Where available, you can use tools provided by analytics vendors or industry groups to limit interest-based advertising.</li>
            <li><strong>Do Not Track.</strong> There is no consistent industry standard for &quot;Do Not Track&quot; signals. We treat privacy controls in line with applicable law.</li>
          </ul>

          <h2>Updates</h2>
          <p>We may update this Cookie Policy when we change our practices or add new tools. We will revise the &quot;Last updated&quot; date.</p>

          <h2>Contact</h2>
          <p>Questions about cookies? Please reach out via our <Link href="/contact">contact page</Link>. For broader privacy topics, see the <Link href="/privacy">Privacy Policy</Link>.</p>
        </Prose>
      </Container>
    </Section>
  );
}
