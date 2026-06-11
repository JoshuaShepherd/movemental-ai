import { redirect } from "next/navigation";

/** Canonical route lives under `/agent/about` (Ink Band shell). */
export default function AboutRedirectPage() {
  redirect("/agent/about");
}
