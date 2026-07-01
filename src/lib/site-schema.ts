import { canonicalPageUrl } from "@/lib/site-url";

/** Organization + WebSite JSON-LD for stable trust surfaces. */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  const url = canonicalPageUrl("/agent/about");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        name: "Movemental",
        url: canonicalPageUrl("/agent"),
        description:
          "Movemental helps mission-driven organizations see where they stand with AI and what to do next.",
        sameAs: [] as string[],
      },
      {
        "@type": "WebSite",
        "@id": `${canonicalPageUrl("/agent")}#website`,
        name: "Movemental",
        url: canonicalPageUrl("/agent"),
        publisher: { "@id": `${url}#organization` },
      },
    ],
  };
}
