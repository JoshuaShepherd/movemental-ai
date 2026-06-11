import { redirect } from "next/navigation";

/** Alias for `/agent/movement-voices` (Ink Band scenius / Movement Voices front door). */
export default function SceniusRedirectPage() {
  redirect("/agent/movement-voices");
}
