import { redirect } from "next/navigation";

import { getOptionalAuthUser } from "@/lib/supabase/server";

/**
 * Workspace entry — transactional emails link here. Authenticated users land on
 * the AI Reality dashboard; others sign in first.
 */
export default async function DashboardPage() {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/login?next=/dashboard");
  }

  redirect("/dashboard/ai-reality");
}
