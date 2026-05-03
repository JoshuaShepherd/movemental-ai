import type { Metadata } from "next";

import { OrganizationsHubContent } from "@/components/sections/organizations/organizations-hub-content";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Organizations";
const description =
  "Churches, nonprofits, and institutions — the same formation-first path with different integration points. Choose your context and go deeper.";
const ogTitle = "Organizations — Movemental";
const ogDescription =
  "Where are you leading? Doorways for churches, nonprofits, and institutions navigating AI with mission at stake.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/organizations") },
  openGraph: {
    url: canonicalPageUrl("/organizations"),
    title: ogTitle,
    description: ogDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function OrganizationsPage() {
  return <OrganizationsHubContent />;
}
