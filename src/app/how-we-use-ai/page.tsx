import { permanentRedirect } from "next/navigation";

/** Canonical route lives under `/agent/how-we-use-ai` (Ink Band shell). */
export default function HowWeUseAiRedirectPage() {
  permanentRedirect("/agent/how-we-use-ai");
}
