import { redirect } from "next/navigation";

/** Canonical route lives under `/agent/movement-voices` (Ink Band shell). */
export default function MovementVoicesRedirectPage() {
  redirect("/agent/movement-voices");
}
