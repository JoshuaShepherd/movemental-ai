import { redirect } from "next/navigation";

/** Canonical route lives under `/agent/nonprofits` (Ink Band shell). */
export default function NonprofitsRedirectPage() {
  redirect("/agent/nonprofits");
}
