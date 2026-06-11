import type { Metadata } from "next";

import { MovementVoicesExperience } from "@/components/agent-room/movement-voices/movement-voices-experience";

export const metadata: Metadata = {
  title: "Movement Voices — Movemental",
  description:
    "The authorship break, the scenius we are hosting, and the invitation to movement leaders whose life-work deserves a coherent home — gathered, linked, and verifiable.",
  alternates: {
    canonical: "/agent/movement-voices",
  },
};

/** `/agent/movement-voices` — leader-facing front door for the scenius network. */
export default function MovementVoicesPage() {
  return <MovementVoicesExperience />;
}
