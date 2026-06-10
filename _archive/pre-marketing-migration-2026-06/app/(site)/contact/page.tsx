import type { Metadata } from "next";

import { ContactPageContent } from "@/components/sections/contact/contact-page-content";
import { normalizeContactInterest } from "@/lib/contact-interest";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Contact";
const description =
  "Tell us what you're working on — a 30-minute conversation with a founder. We respond within one business day.";
const ogTitle = "Contact — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/contact") },
  openGraph: {
    url: canonicalPageUrl("/contact"),
    title: ogTitle,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string | string[] }>;
}) {
  const sp = await searchParams;
  const contactInterest = normalizeContactInterest(sp.interest);
  return <ContactPageContent contactInterest={contactInterest} />;
}
