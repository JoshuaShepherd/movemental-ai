import { redirect } from "next/navigation";

/** Canonical route lives under `/agent/institutions` (Ink Band shell). */
export default function InstitutionsRedirectPage() {
  redirect("/agent/institutions");
}
