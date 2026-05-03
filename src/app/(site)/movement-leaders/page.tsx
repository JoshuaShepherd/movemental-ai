import type { Metadata } from "next";

import { MovementLeadersPage as StudioMovementLeadersPage } from "@/components/studio/pages/MovementLeadersPage";

export const metadata: Metadata = {
  title: "Movement leaders",
  description: "Movement leaders as a distinct ecosystem layer — definition and fit.",
};

export default function Page() {
  return (
    <StudioMovementLeadersPage />
  );
}
