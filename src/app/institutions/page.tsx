import { permanentRedirect } from "next/navigation";

/** Canonical route lives under `/agent/institutions` (Ink Band shell). */
export default function InstitutionsRedirectPage() {
  permanentRedirect("/agent/institutions");
}
