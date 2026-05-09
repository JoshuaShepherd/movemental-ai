import type { Metadata } from "next";

import { AboutPageContent } from "@/components/sections/about/about-page-content";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "About";
const description =
  "A company built by movement leaders, for movement leaders. Meet the founders — Brad Brisco, Alan Hirsch, and Joshua Shepherd — read the origin story, and see the five commitments that bind the network.";
const ogTitle = "About — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/about") },
  openGraph: {
    url: canonicalPageUrl("/about"),
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

export default function Page() {
  return <AboutPageContent />;
}
