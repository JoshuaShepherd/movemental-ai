import { redirect } from "next/navigation";

/** Canonical route lives under `/agent/how-we-use-ai` (Ink Band shell). */
export default function HowWeUseAiRedirectPage() {
  redirect("/agent/how-we-use-ai");
}
