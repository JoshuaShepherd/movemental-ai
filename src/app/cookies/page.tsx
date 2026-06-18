import type { Metadata } from "next";

import { LegalPageContent } from "@/components/ink-band/legal-page-content";
import { previewRobotsMetadata } from "@/lib/site-launch";

const previewRobots = previewRobotsMetadata();

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: "How movemental.ai uses cookies and similar technologies.",
  ...(previewRobots ? { robots: previewRobots } : {}),
};

/** Short cookie notice; privacy policy §cookies has the full treatment. */
export default function CookiesPage() {
  return (
    <LegalPageContent
      eyebrow="Legal"
      title="Cookie Notice"
      lede="We use a small set of cookies to keep the site working and to understand usage. You can control non-essential cookies through your browser settings."
      sections={[
        {
          id: "essential",
          title: "Essential cookies",
          paragraphs: [
            "Authentication and session cookies keep you signed in and maintain agent-room state. These are required for dashboard and assessment flows.",
          ],
        },
        {
          id: "analytics",
          title: "Analytics",
          paragraphs: [
            "We may use privacy-conscious analytics to measure page views and feature usage. These help us improve the preview without identifying you across unrelated sites.",
          ],
        },
        {
          id: "choices",
          title: "Your choices",
          paragraphs: [
            "Most browsers let you block or delete cookies. Blocking essential cookies may prevent sign-in or form submissions from working correctly.",
            "For full detail on data collection, see the Privacy Policy.",
          ],
        },
      ]}
      footerLinks={[
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
      ]}
    />
  );
}
