import type { Metadata } from "next";

import { FieldGuideSafetyNewLanding } from "@/components/safety/_new/FieldGuideSafetyNewLanding";
import { getFieldGuide } from "@/lib/field-guide";
import { SAFETY_FIELD_GUIDE_COVER_IMAGE } from "@/lib/safety-field-guide";
import { canonicalPageUrl } from "@/lib/site-url";

const SLUG = "it-starts-with-safety";
const PATH = "/field-guides/safety";

const guide = getFieldGuide(SLUG);

const TITLE = "Field Guide: It Starts With Safety — Movemental";
const DESCRIPTION =
  "Free 33-page field guide for senior leaders. Five layers, ratifiable by your board, walkable in one to two months.";

const ogTitle = TITLE;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonicalPageUrl(PATH) },
  openGraph: {
    type: "article",
    url: canonicalPageUrl(PATH),
    title: ogTitle,
    description: DESCRIPTION,
    authors: guide.authors,
    images: [{ url: SAFETY_FIELD_GUIDE_COVER_IMAGE, width: 1600, height: 873, alt: ogTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: DESCRIPTION,
    images: [SAFETY_FIELD_GUIDE_COVER_IMAGE],
  },
};

export default function FieldGuideSafetyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${guide.title}: ${guide.subtitle}`,
    description: DESCRIPTION,
    author: guide.authors.map((name) => ({ "@type": "Person", name })),
    publisher: {
      "@type": "Organization",
      name: guide.publisher,
      url: canonicalPageUrl("/"),
    },
    datePublished: guide.date,
    dateModified: guide.date,
    inLanguage: "en-US",
    image: canonicalPageUrl(SAFETY_FIELD_GUIDE_COVER_IMAGE),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalPageUrl(PATH) },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <FieldGuideSafetyNewLanding />
    </>
  );
}
