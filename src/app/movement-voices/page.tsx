import { permanentRedirect } from "next/navigation";

/** Canonical route lives under `/agent/movement-voices` (Ink Band shell). */
export default function MovementVoicesRedirectPage() {
  permanentRedirect("/agent/movement-voices");
}
