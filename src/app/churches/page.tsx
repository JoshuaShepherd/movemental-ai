import { permanentRedirect } from "next/navigation";

/** Canonical route lives under `/agent/churches` (Ink Band shell). */
export default function ChurchesRedirectPage() {
  permanentRedirect("/agent/churches");
}
