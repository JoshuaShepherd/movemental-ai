import type { Metadata } from "next";

import { LegalPageContent } from "@/components/ink-band/legal-page-content";
import { previewRobotsMetadata } from "@/lib/site-launch";

const previewRobots = previewRobotsMetadata();

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for movemental.ai.",
  ...(previewRobots ? { robots: previewRobots } : {}),
};

export default function TermsPage() {
  return (
    <LegalPageContent
      eyebrow="Legal"
      title="Terms of Service"
      lede="These terms govern your use of movemental.ai during our preview period. Full counsel review is pending before public launch."
      sections={[
        {
          id: "use",
          title: "Use of the site",
          paragraphs: [
            "Movemental.ai is an experimental preview of our agentic platform for mission-driven organizations. You may browse and interact with the agent room for evaluation purposes. Do not rely on preview copy, pricing, or features as final product commitments.",
            "You agree not to misuse the site, attempt unauthorized access, scrape at scale, or submit false information through our forms.",
          ],
        },
        {
          id: "content",
          title: "Content and intellectual property",
          paragraphs: [
            "Research articles, field guides, and agent-room copy are owned by Movemental or our licensors unless otherwise noted. Movement-leader portraits and biographies are published with consent and may not be reused without permission.",
          ],
        },
        {
          id: "privacy",
          title: "Privacy",
          paragraphs: [
            "Our collection and use of personal data is described in the Privacy Policy. By submitting a form on this site, you consent to the processing described there.",
          ],
        },
        {
          id: "disclaimer",
          title: "Disclaimer",
          paragraphs: [
            "The site is provided as-is during preview. We make no warranty that the service will be uninterrupted or error-free. AI-generated responses in the agent room are informational and do not constitute professional, legal, or pastoral advice.",
          ],
        },
        {
          id: "contact",
          title: "Contact",
          paragraphs: [
            "For questions about these terms, contact josh@movemental.ai. We will update this page when counsel completes review.",
          ],
        },
      ]}
      footerLinks={[
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/cookies", label: "Cookie notice" },
      ]}
    />
  );
}
