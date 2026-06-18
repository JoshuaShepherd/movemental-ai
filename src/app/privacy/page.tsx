import type { Metadata } from "next";

import { LegalPageContent } from "@/components/ink-band/legal-page-content";
import { previewRobotsMetadata } from "@/lib/site-launch";

const previewRobots = previewRobotsMetadata();

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How movemental.ai collects and uses personal data.",
  ...(previewRobots ? { robots: previewRobots } : {}),
};

export default function PrivacyPage() {
  return (
    <LegalPageContent
      eyebrow="Legal"
      title="Privacy Policy"
      lede="This policy describes what we collect when you use movemental.ai, why we collect it, and how to reach us. Counsel review is pending before public launch."
      sections={[
        {
          id: "collect",
          title: "Data we collect",
          paragraphs: [
            "When you submit a form (contact, field guide download, agent-room capture, newsletter signup, or enrollment inquiry), we collect the fields you provide: typically name, email, organization, and message content.",
            "We use analytics tools to understand how visitors use the site (page views, referrers, device type). We do not sell personal data.",
          ],
        },
        {
          id: "use",
          title: "How we use data",
          paragraphs: [
            "We use submissions to respond to you, deliver requested resources, notify our team of high-intent inquiries, and improve the product. Newsletter subscribers receive occasional updates; you may unsubscribe at any time.",
            "Assessment and agent-room session data may be stored to personalize your experience and to improve our methodology. Tenant-scoped data is isolated by organization.",
          ],
        },
        {
          id: "cookies",
          title: "Cookies and similar technologies",
          paragraphs: [
            "We use essential cookies for authentication and session management. Analytics cookies help us understand usage patterns. See the Cookie notice for details.",
          ],
        },
        {
          id: "retention",
          title: "Retention and security",
          paragraphs: [
            "We retain form submissions and account data as long as needed to serve you and meet legal obligations. Data is stored in encrypted Postgres (Supabase) with row-level security where applicable.",
          ],
        },
        {
          id: "rights",
          title: "Your choices",
          paragraphs: [
            "You may request access, correction, or deletion of your data by emailing josh@movemental.ai. We will respond within a reasonable timeframe.",
          ],
        },
        {
          id: "contact",
          title: "Contact",
          paragraphs: [
            "Questions about this policy: josh@movemental.ai.",
          ],
        },
      ]}
      footerLinks={[
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookies", label: "Cookie notice" },
      ]}
    />
  );
}
