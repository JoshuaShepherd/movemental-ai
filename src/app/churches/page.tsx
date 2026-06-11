import { redirect } from "next/navigation";

/** Canonical route lives under `/agent/churches` (Ink Band shell). */
export default function ChurchesRedirectPage() {
  redirect("/agent/churches");
}
