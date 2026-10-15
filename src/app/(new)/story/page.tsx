import type { Metadata } from "next";

import { StoryPage } from "@/components/mv/about/about-views";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "We met this problem first in one person’s body of work. What we learned there is what we now offer churches, nonprofits and institutions.",
  alternates: { canonical: "/story" },
};

/** Board: LongForm (the long-form template, /story sample). */
export default function StoryNewPage() {
  return (
    <>
      <MvHeader />
      <StoryPage />
      <MvFooter />
    </>
  );
}
