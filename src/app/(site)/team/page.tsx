import type { Metadata } from "next";

import { TeamPage as StudioTeamPage } from "@/components/studio/pages/TeamPage";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind Movemental.",
};

export default function Page() {
  return (
    <StudioTeamPage />
  );
}
