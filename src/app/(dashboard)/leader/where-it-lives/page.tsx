import type { Metadata } from "next";

import { LeaderSectionPage } from "../_components/leader-section-page";

export const metadata: Metadata = {
  title: "Where it lives",
};

export default function Page() {
  return <LeaderSectionPage section="where_it_lives" />;
}
