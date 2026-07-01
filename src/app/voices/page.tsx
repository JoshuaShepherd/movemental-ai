import type { Metadata } from "next";

import { VoicesHubPage } from "@/components/voices/voices-hub-page";
import { VOICES_HUB_PATH } from "@/lib/committed-voices";
import { buildOrganizationJsonLd } from "@/lib/site-schema";

export const metadata: Metadata = {
  title: "Trusted voices",
  description:
    "Movement leaders whose public work Movemental helps gather, link, and verify — profiles with stable URLs and links to primary sites.",
  alternates: {
    canonical: VOICES_HUB_PATH,
  },
};

export default function VoicesPage() {
  const jsonLd = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VoicesHubPage />
    </>
  );
}
