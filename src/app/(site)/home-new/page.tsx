import type { Metadata } from "next";

import { HomeContentNew } from "@/components/safety/_new/HomeContentNew";

/**
 * `/home-new` — the new home page with cleaned-up Safety CTAs.
 *
 * Identical to `/` except:
 *   – The Path fold's Safety CTA points at `/pathway/safety-new`.
 *   – The bottom midnight CTA band ships two CTAs (Get the Field Guide,
 *     Talk about SafeStart) instead of three.
 *
 * Metadata mirrors `src/app/(site)/page.tsx` so SERP / OG metadata stays
 * consistent between the existing home and the new home. The two non-
 * destructive carry-overs (footer "Read the field guide" link and nav
 * "Field Guide" CTA) are documented in `docs/_new/safety-new-changelog.md`
 * as migration-step items.
 */
export const metadata: Metadata = {
  title: "A wiser way to navigate AI",
  description:
    "Movemental walks church and nonprofit leaders through the Movemental Path: Safety, Sandbox, Skills, Solutions, in order.",
};

export default function Page() {
  return <HomeContentNew />;
}
