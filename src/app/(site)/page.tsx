import type { Metadata } from "next";

import { HomeContentNew } from "@/components/safety/_new/HomeContentNew";

/**
 * `/` — home page. Promoted from `/home-new` during the Safety-stage migration
 * (2026-05-21). The previous home is archived at `/home-old`. See
 * `docs/_new/safety-new-changelog.md` for the migration log.
 */
export const metadata: Metadata = {
  title: "A wiser way to navigate AI",
  description:
    "Movemental walks church and nonprofit leaders through the Movemental Path: Safety, Sandbox, Skills, Solutions, in order.",
};

export default function Page() {
  return <HomeContentNew />;
}
