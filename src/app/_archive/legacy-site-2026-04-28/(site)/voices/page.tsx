import type { Metadata } from "next";

import { VoicesPageContent } from "@/components/sections/voices/voices-page-content";
import { canonicalPageUrl } from "@/lib/site-url";
import { VOICES_HUB_PATH } from "@/lib/committed-voices";

const title = "Trusted voices — movement leaders shaping the work";
const description =
  "Movemental is built with and within a real movement-leadership ecosystem. This page names the trusted voices whose public work shapes the platform — a credibility and corpus layer, not an audience funnel or a partner wall.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl(VOICES_HUB_PATH) },
  openGraph: {
    url: canonicalPageUrl(VOICES_HUB_PATH),
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function VoicesPage() {
  return <VoicesPageContent />;
}
