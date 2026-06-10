import type { Metadata } from "next";

import { ThePathPage } from "@/components/studio/pages/ThePathPage";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "The Movemental Path",
  description:
    "A long-form field guide on the four-stage path — Safety, Sandbox, Skills, Solutions. Why the order is load-bearing, what each stage means in practice, and the boundaries that keep mission intact.",
  alternates: { canonical: canonicalPageUrl("/the-path") },
  openGraph: {
    url: canonicalPageUrl("/the-path"),
    title: "The Movemental Path — Movemental",
  },
};

export default function Page() {
  return <ThePathPage />;
}
