import type { Metadata } from "next";

import { LeaderSectionPage } from "../_components/leader-section-page";

export const metadata: Metadata = {
  title: "Work",
};

export default function Page() {
  return <LeaderSectionPage section="work" />;
}
