import type { Metadata } from "next";

import { SandboxPage } from "@/components/studio/pages/pathway/SandboxPage";
import { canonicalPageUrl } from "@/lib/site-url";

const TITLE = "Movemental | Sandbox — Stage 02 of the Movemental Path";
const DESCRIPTION =
  "Volume Two of the Movemental Field Guides — It Continues With Exploration. A 48-page field guide for running your AI Sandbox in eight phases, producing a board-ready Future Plan. Gated to organizations that have completed Safety. SandboxLive is the facilitated version ($15,000).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonicalPageUrl("/pathway/sandbox") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonicalPageUrl("/pathway/sandbox"),
  },
};

export default function Page() {
  return <SandboxPage />;
}
