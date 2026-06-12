import { permanentRedirect } from "next/navigation";

/** Alias for `/agent/movement-voices` (Ink Band scenius / Movement Voices front door). */
export default function SceniusRedirectPage() {
  permanentRedirect("/agent/movement-voices");
}
