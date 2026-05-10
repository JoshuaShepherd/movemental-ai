import type { Metadata } from "next";

import { FieldGuideSafetyLanding } from "@/components/field-guide/field-guide-safety-landing";
import { getFieldGuide } from "@/lib/field-guide";
import { canonicalPageUrl } from "@/lib/site-url";

const SLUG = "it-starts-with-safety";

const guide = getFieldGuide(SLUG);

const ogTitle = `${guide.title} — Movemental Field Guide`;

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: canonicalPageUrl("/field-guide/safety") },
  openGraph: {
    type: "article",
    url: canonicalPageUrl("/field-guide/safety"),
    title: ogTitle,
    description: guide.description,
    authors: guide.authors,
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: guide.description,
  },
};

export default function FieldGuideSafetyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${guide.title}: ${guide.subtitle}`,
    description: guide.description,
    author: guide.authors.map((name) => ({ "@type": "Person", name })),
    publisher: {
      "@type": "Organization",
      name: guide.publisher,
      url: canonicalPageUrl("/"),
    },
    datePublished: guide.date,
    dateModified: guide.date,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalPageUrl("/field-guide/safety") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <FieldGuideSafetyLanding />
    </>
  );
}
