import { permanentRedirect } from "next/navigation";

/** Canonical route lives under `/agent/nonprofits` (Ink Band shell). */
export default function NonprofitsRedirectPage() {
  permanentRedirect("/agent/nonprofits");
}
