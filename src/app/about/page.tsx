import { permanentRedirect } from "next/navigation";

/** Canonical route lives under `/agent/about` (Ink Band shell). */
export default function AboutRedirectPage() {
  permanentRedirect("/agent/about");
}
